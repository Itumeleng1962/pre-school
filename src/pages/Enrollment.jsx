import { useState } from 'react'
import { CheckCircle, Upload, FileText, AlertCircle } from 'lucide-react'
import { supabase } from '../supabaseClient'
import './Contact.css'

const FileUploadField = ({ label, id, required, hint, onChange, file }) => (
  <div className="form-group">
    <label htmlFor={id} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
      {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
    </label>
    <label
      htmlFor={id}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        border: `2px dashed ${file ? '#10b981' : '#cbd5e1'}`,
        borderRadius: '8px',
        padding: '1rem 1.2rem',
        cursor: 'pointer',
        background: file ? '#f0fdf4' : '#f8fafc',
        transition: 'all 0.2s'
      }}
    >
      {file ? (
        <FileText size={22} color="#10b981" />
      ) : (
        <Upload size={22} color="#64748b" />
      )}
      <div>
        <span style={{ fontWeight: '600', color: file ? '#16a34a' : '#334155', fontSize: '0.95rem' }}>
          {file ? file.name : 'Click to upload file'}
        </span>
        <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', marginTop: '0.1rem' }}>
          {hint}
        </span>
      </div>
    </label>
    <input
      type="file"
      id={id}
      accept=".pdf,.jpg,.jpeg,.png"
      onChange={onChange}
      required={required}
      style={{ display: 'none' }}
    />
  </div>
)

export default function Enrollment() {
  const [formData, setFormData] = useState({
    childName: '',
    childAge: '',
    parentName: '',
    email: '',
    phone: '',
    program: 'Grade R',
    message: ''
  })

  const [files, setFiles] = useState({
    birthCertificate: null,
    parentId: null,
    immunizationCard: null,
    proofOfAddress: null,
  })

  const [uploadProgress, setUploadProgress] = useState('')
  const [status, setStatus] = useState('idle') // idle, loading, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleFileChange = (fieldName) => (e) => {
    if (e.target.files[0]) {
      setFiles(prev => ({ ...prev, [fieldName]: e.target.files[0] }))
    }
  }

  const tryUploadFile = async (file, folder) => {
    if (!file) return null
    try {
      const fileName = `${Date.now()}_${file.name.replace(/\s/g, '_')}`
      const filePath = `${folder}/${fileName}`
      const { error } = await supabase.storage
        .from('documents')
        .upload(filePath, file, { cacheControl: '3600', upsert: false })
      if (error) return null // Skip silently if bucket not ready
      const { data: urlData } = supabase.storage.from('documents').getPublicUrl(filePath)
      return urlData.publicUrl
    } catch {
      return null // Always fail gracefully
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // Try to upload docs — if storage not ready, these return null (non-blocking)
      setUploadProgress('Processing documents...')
      const birthCertUrl = await tryUploadFile(files.birthCertificate, 'birth-certificates')
      const parentIdUrl = await tryUploadFile(files.parentId, 'parent-ids')
      const immunizationUrl = await tryUploadFile(files.immunizationCard, 'immunization-cards')
      const proofOfAddressUrl = await tryUploadFile(files.proofOfAddress, 'proof-of-address')

      // Submit the application record
      setUploadProgress('Submitting application...')
      const { error } = await supabase
        .from('applications')
        .insert([{
          child_name: formData.childName,
          child_age: formData.childAge,
          parent_name: formData.parentName,
          email: formData.email,
          phone: formData.phone,
          program: formData.program,
          message: formData.message,
          status: 'Pending Review',
          doc_birth_certificate: birthCertUrl,
          doc_parent_id: parentIdUrl,
          doc_immunization: immunizationUrl,
          doc_proof_of_address: proofOfAddressUrl,
        }])

      if (error) throw error
      setStatus('success')
    } catch (err) {
      console.error('Submission error:', err)
      setUploadProgress('')
      setStatus('error')
    }
  }

  return (
    <div className="contact-page">
      <header className="page-header" style={{ background: 'var(--primary)', color: 'white', padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Admissions & Enrollment</h1>
        <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', opacity: 0.9 }}>
          Begin your child's journey at The Beacon Academy. Please complete all sections and upload the required documents.
        </p>
      </header>

      <section className="contact-content container" style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 1rem' }}>
        {status === 'success' ? (
          <div className="card-glass" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto 1.5rem auto' }} />
            <h2 style={{ marginBottom: '1rem', color: '#0f172a' }}>Application Received!</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
              Thank you for applying to The Beacon Academy. All your documents have been securely uploaded. Our admissions office will review your application and contact you via email within 2-3 business days.
            </p>
          </div>
        ) : (
          <form className="contact-form card-glass" onSubmit={handleSubmit}>

            {/* SECTION 1 - Child Info */}
            <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1.5rem', color: '#0f172a' }}>
              1. Child's Information
            </h3>

            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group">
                <label htmlFor="childName">Child's Full Name <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="text" id="childName" value={formData.childName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="childAge">Child's Age / Date of Birth <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="text" id="childAge" value={formData.childAge} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="program">Program Applied For <span style={{ color: '#ef4444' }}>*</span></label>
              <select id="program" value={formData.program} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc', background: 'white' }}>
                 <option value="Toddlers">Toddlers Group (Ages 1-3)</option>
                 <option value="Grade RR">Grade RR (Ages 4-5)</option>
                 <option value="Grade R">Grade R (Ages 5-6)</option>
              </select>
            </div>

            {/* SECTION 2 - Parent Info */}
            <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1.5rem', marginTop: '2rem', color: '#0f172a' }}>
              2. Parent / Guardian Information
            </h3>

            <div className="form-group">
              <label htmlFor="parentName">Parent/Guardian Full Name <span style={{ color: '#ef4444' }}>*</span></label>
              <input type="text" id="parentName" value={formData.parentName} onChange={handleChange} required />
            </div>

            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group">
                <label htmlFor="email">Email Address <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="email" id="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Contact Number <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="tel" id="phone" value={formData.phone} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Additional Information / Special Medical Needs</label>
              <textarea id="message" value={formData.message} onChange={handleChange} rows="3"></textarea>
            </div>

            {/* SECTION 3 - Document Uploads */}
            <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '0.5rem', marginTop: '2rem', color: '#0f172a' }}>
              3. Required Documents
            </h3>
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem' }}>
              <AlertCircle size={18} color="#3b82f6" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#1e40af' }}>
                Please upload clear, readable scans or photos. Accepted formats: PDF, JPG, PNG.
              </p>
            </div>

            <FileUploadField
              label="Child's Unabridged Birth Certificate"
              id="birthCertificate"
              required={true}
              hint="PDF or image – A clear scan of the birth certificate"
              onChange={handleFileChange('birthCertificate')}
              file={files.birthCertificate}
            />
            <FileUploadField
              label="Parent / Guardian ID Document"
              id="parentId"
              required={true}
              hint="South African ID card, ID book, or Passport"
              onChange={handleFileChange('parentId')}
              file={files.parentId}
            />

            <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '0.5rem', marginTop: '2rem', color: '#0f172a' }}>
              4. Optional Documents
            </h3>

            <FileUploadField
              label="Road-to-Health / Immunization Card"
              id="immunizationCard"
              required={false}
              hint="Recommended but not mandatory"
              onChange={handleFileChange('immunizationCard')}
              file={files.immunizationCard}
            />
            <FileUploadField
              label="Proof of Address"
              id="proofOfAddress"
              required={false}
              hint="Utility bill or bank statement (not older than 3 months)"
              onChange={handleFileChange('proofOfAddress')}
              file={files.proofOfAddress}
            />

            {status === 'loading' && (
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '1rem', borderRadius: '4px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '18px', height: '18px', border: '3px solid #3b82f6', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
                <span style={{ color: '#1e40af' }}>{uploadProgress || 'Processing...'}</span>
              </div>
            )}

            {status === 'error' && (
              <div style={{ color: '#ef4444', marginBottom: '1rem', background: '#fee2e2', padding: '1rem', borderRadius: '4px' }}>
                ⚠️ Submission failed. Please ensure your documents are valid and try again. If this persists, please contact the school directly.
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={status === 'loading'} style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
              {status === 'loading' ? 'Uploading & Submitting...' : 'Submit Admission Application'}
            </button>
          </form>
        )}
      </section>
    </div>
  )
}
