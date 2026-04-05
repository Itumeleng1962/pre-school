import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Baby } from 'lucide-react'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({
    parentName: '', childName: '', childAge: '', phone: '', email: '', programme: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="contact-page">
      <section className="page-hero">
        <div className="page-hero-bg"/>
        <div className="container page-hero-content">
          <h1>Get In <span className="text-gradient-warm">Touch</span></h1>
          <p>We'd love to welcome your family to the The Beacon Academy community.</p>
          <div className="page-hero-breadcrumb">
            <Link to="/">Home</Link> / <span>Contact</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Info Side */}
            <div className="contact-info">
              <h2 className="section-title" style={{textAlign:'left',marginBottom:'1.5rem'}}>
                Visit or <span className="text-gradient">Contact Us</span>
              </h2>

              <div className="contact-info-cards">
                <div className="contact-info-card">
                  <div className="cic-icon"><MapPin size={22}/></div>
                  <div>
                    <h4>Address</h4>
                    <p>65 Gerty Street / 28 Edward St</p>
                    <p>Sophiatown, 2092</p>
                  </div>
                </div>
                <div className="contact-info-card">
                  <div className="cic-icon"><Phone size={22}/></div>
                  <div>
                    <h4>Phone</h4>
                    <p>+27 (0) 11 000 0000</p>
                    <p>+27 (0) 76 000 0000</p>
                  </div>
                </div>
                <div className="contact-info-card">
                  <div className="cic-icon"><Mail size={22}/></div>
                  <div>
                    <h4>Email</h4>
                    <p>admin@thebeacon.co.za</p>
                    <p>principal@thebeacon.co.za</p>
                  </div>
                </div>
                <div className="contact-info-card">
                  <div className="cic-icon"><Clock size={22}/></div>
                  <div>
                    <h4>Operating Hours</h4>
                    <p>Mon – Fri: 06:30 – 18:00</p>
                    <p>Saturday: 07:00 – 13:00</p>
                  </div>
                </div>
              </div>

              <div className="wait-list-note">
                <Baby size={20}/>
                <div>
                  <strong>Limited Spaces Available</strong>
                  <p>We maintain small class sizes. Apply early to secure your child's place for 2025/2026.</p>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="contact-form-wrap">
              {submitted ? (
                <div className="success-card card-glass text-center">
                  <CheckCircle2 size={56} color="#2ecc71"/>
                  <h3>Application Received! 🎉</h3>
                  <p>Thank you for reaching out. A member of our team will contact you within 24 hours to discuss your child's enrolment.</p>
                  <button
                    className="btn btn-primary"
                    style={{marginTop:'1.5rem'}}
                    onClick={() => setSubmitted(false)}
                    id="submit-another-btn"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form className="contact-form card-glass" onSubmit={handleSubmit} id="enrolment-form">
                  <h3 className="form-title">Enrolment / General Enquiry</h3>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="parentName">Parent / Guardian Name *</label>
                      <input id="parentName" name="parentName" type="text" required placeholder="Your full name" value={form.parentName} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="childName">Child's Name *</label>
                      <input id="childName" name="childName" type="text" required placeholder="Your child's name" value={form.childName} onChange={handleChange}/>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="childAge">Child's Age *</label>
                      <select id="childAge" name="childAge" required value={form.childAge} onChange={handleChange}>
                        <option value="">Select age</option>
                        {[2,3,4,5,6,7,8,9,10,11,12].map(a => (
                          <option key={a} value={a}>{a} years old</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="programme">Programme of Interest *</label>
                      <select id="programme" name="programme" required value={form.programme} onChange={handleChange}>
                        <option value="">Select programme</option>
                        <option>Preschool (Full Day)</option>
                        <option>Preschool (Half Day)</option>
                        <option>Coding for Kids & Technology</option>
                        <option>Arts & Creativity</option>
                        <option>Leadership Training</option>
                        <option>Primary Tutoring</option>
                        <option>General Enquiry</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input id="phone" name="phone" type="tel" required placeholder="+27 00 000 0000" value={form.phone} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input id="email" name="email" type="email" required placeholder="your@email.com" value={form.email} onChange={handleChange}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Additional Message</label>
                    <textarea id="message" name="message" rows={4} placeholder="Tell us more about your child or any specific needs..." value={form.message} onChange={handleChange}/>
                  </div>
                  <button type="submit" className="btn btn-primary form-submit-btn" id="submit-enquiry-btn">
                    <Send size={18}/>
                    Submit Enquiry
                  </button>
                  <p className="form-note">We respond within 24 business hours.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
