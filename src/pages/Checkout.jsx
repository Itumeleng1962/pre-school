import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { CreditCard, CheckCircle } from 'lucide-react'
import { supabase } from '../supabaseClient'
import './Contact.css'

export default function Checkout() {
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')
  const navigate = useNavigate()

  const [status, setStatus] = useState('idle')

  const handlePayment = async (e) => {
    e.preventDefault()
    setStatus('loading')

    // Simulate payment gateway delay
    setTimeout(async () => {
      // Update Supabase to Payment Received
      const { error } = await supabase
        .from('applications')
        .update({ status: 'Payment Received' })
        .eq('email', email)

      if (error) {
        console.error(error)
        setStatus('error')
      } else {
        setStatus('success')
      }
    }, 2000)
  }

  if (!email) {
    return (
      <div className="contact-page" style={{ paddingTop: '10rem', textAlign: 'center' }}>
        <h2>Invalid Payment Link</h2>
        <p>No application email provided in the URL.</p>
      </div>
    )
  }

  return (
    <div className="contact-page">
      <header className="page-header" style={{ background: '#0f172a', color: 'white', padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Secure Checkout</h1>
        <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', opacity: 0.9 }}>
          Pay the Registration Fee for your application: <strong>{email}</strong>
        </p>
      </header>

      <section className="contact-content container" style={{ maxWidth: '600px', margin: '4rem auto', padding: '0 1rem' }}>
        {status === 'success' ? (
          <div className="card-glass" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto 1.5rem auto' }} />
            <h2 style={{ marginBottom: '1rem', color: '#0f172a' }}>Payment Successful!</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2rem' }}>
              Your R1,500.00 registration fee has been received securely. The administration team will now generate your Parent Portal login.
            </p>
            <button className="btn btn-outline" onClick={() => navigate('/')}>Return Home</button>
          </div>
        ) : (
          <form className="contact-form card-glass" onSubmit={handlePayment}>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <h3 style={{ margin: 0 }}>Registration Fee</h3>
               <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>R 1,500.00</span>
            </div>
            
            <div className="form-group">
              <label>Cardholder Name</label>
              <input type="text" required placeholder="John Doe" />
            </div>

            <div className="form-group">
              <label>Card Number</label>
              <input type="text" required placeholder="XXXX XXXX XXXX XXXX" maxLength="19" />
            </div>

            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group">
                <label>Expiry Date</label>
                <input type="text" required placeholder="MM/YY" />
              </div>
              <div className="form-group">
                <label>CVC</label>
                <input type="text" required placeholder="123" maxLength="3" />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={status === 'loading'} style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
              <CreditCard size={20} />
              {status === 'loading' ? 'Processing...' : 'Pay R 1,500.00'}
            </button>
          </form>
        )}
      </section>
    </div>
  )
}
