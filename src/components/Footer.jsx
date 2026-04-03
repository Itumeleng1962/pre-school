import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Heart } from 'lucide-react'
import { FacebookIcon, TikTokIcon, WhatsAppIcon } from './SocialIcons'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#0d1b3e"/>
        </svg>
      </div>

      <div className="footer-body">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-logo-wrap">
                <img src="/logo.jpeg" alt="The Beacon Academy" />
                <div>
                  <div className="footer-brand-name">The Beacon Academy</div>
                  <div className="footer-brand-tag">We Are The Beacon of Light</div>
                </div>
              </div>
              <p className="footer-desc">
                A secure, technology-integrated environment preparing children for primary school through holistic early childhood development.
              </p>
              <div className="footer-social">
                <a href="#" aria-label="Facebook" className="social-btn"><FacebookIcon size={18} /></a>
                <a href="#" aria-label="TikTok" className="social-btn"><TikTokIcon size={18} /></a>
                <a href="#" aria-label="WhatsApp" className="social-btn"><WhatsAppIcon size={18} /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h4 className="footer-col-title">Quick Links</h4>
              <ul className="footer-links">
                {['Home', 'About Us', 'Programs', 'Features', 'Gallery', 'Contact'].map(l => (
                  <li key={l}><Link to={`/${l.toLowerCase().replace(' ', '-')}`}>{l}</Link></li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div className="footer-col">
              <h4 className="footer-col-title">Programs</h4>
              <ul className="footer-links">
                {['Preschool (Ages 2–6)', 'Technology & Innovation', 'Arts & Creativity', 'Leadership Training', 'Primary Tutoring'].map(p => (
                  <li key={p}><Link to="/programs">{p}</Link></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <h4 className="footer-col-title">Contact Us</h4>
              <ul className="footer-contact">
                <li>
                  <MapPin size={16} />
                  <span>65 Gerty St / 28 Edward St,<br />Sophiatown, 2092</span>
                </li>
                <li>
                  <Phone size={16} />
                  <span>+27 (0) 11 000 0000</span>
                </li>
                <li>
                  <Mail size={16} />
                  <span>admin@thebeacon.co.za</span>
                </li>
              </ul>

              <div className="footer-hours">
                <strong>Operating Hours</strong>
                <p>Mon – Fri: 06:30 – 18:00</p>
                <p>Saturday: 07:00 – 13:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} The Beacon Academy (Pty) Ltd. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link to="/login" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', textDecoration: 'none' }}>Staff Login</Link>
            <p className="made-with">Made with <Heart size={14} fill="currentColor" /> for every bright mind</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
