import { Mail, Phone } from 'lucide-react'
import { FacebookIcon, TikTokIcon, WhatsAppIcon } from './SocialIcons'
import './TopHeader.css'

export default function TopHeader() {
  return (
    <div className="top-header">
      <div className="container top-header-inner">
        <div className="top-header-contact">
          <a href="mailto:admin@thebeacon.co.za" className="top-header-item">
            <Mail size={14} />
            <span>admin@thebeacon.co.za</span>
          </a>
          <a href="tel:+27110000000" className="top-header-item">
            <Phone size={14} />
            <span>+27 (0) 11 000 0000</span>
          </a>
        </div>
        <div className="top-header-social">
          <span className="social-text">Follow us:</span>
          <a href="#" aria-label="Facebook" className="top-social-btn"><FacebookIcon size={14} /></a>
          <a href="#" aria-label="TikTok" className="top-social-btn"><TikTokIcon size={14} /></a>
          <a href="#" aria-label="WhatsApp" className="top-social-btn"><WhatsAppIcon size={14} /></a>
        </div>
      </div>
    </div>
  )
}
