import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import './Navbar.css'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  {
    label: 'Programs', path: '/programs',
    dropdown: [
      { label: 'Preschool', path: '/programs#preschool' },
      { label: 'Tech & Innovation', path: '/programs#tech' },
      { label: 'Arts & Creativity', path: '/programs#arts' },
      { label: 'Leadership', path: '/programs#leadership' },
    ]
  },
  { label: 'Features', path: '/features' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setOpenDropdown(null)
  }, [location])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src="/logo.jpeg" alt="The Beacon Academy Logo" />
          <div className="navbar-brand-text">
            <span className="brand-main">The Beacon</span>
            <span className="brand-sub">Academy</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li
              key={link.label}
              className="nav-item"
              onMouseEnter={() => link.dropdown && setOpenDropdown(link.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
                {link.dropdown && <ChevronDown size={14} />}
              </Link>
              {link.dropdown && openDropdown === link.label && (
                <ul className="dropdown-menu">
                  {link.dropdown.map((d) => (
                    <li key={d.label}>
                      <Link to={d.path} className="dropdown-item">{d.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="navbar-cta" style={{ gap: '0.8rem' }}>
          <Link to="/login" className="btn btn-outline nav-enroll-btn" style={{ padding: '0.5rem 1rem', border: '1px solid var(--primary)', color: 'var(--primary)', background: 'transparent' }}>
            Portal Login
          </Link>
          <Link to="/enroll" className="btn btn-primary nav-enroll-btn">
            Enrol Now
          </Link>
        </div>

        {/* Hamburger */}
        <button
          id="mobile-menu-btn"
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <div key={link.label} className="mobile-nav-group">
            <Link to={link.path} className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}>
              {link.label}
            </Link>
            {link.dropdown && (
              <div className="mobile-dropdown">
                {link.dropdown.map((d) => (
                  <Link key={d.label} to={d.path} className="mobile-dropdown-item">{d.label}</Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <Link to="/enroll" className="btn btn-primary" style={{ margin: '1rem 1.5rem' }}>
          Enrol Now
        </Link>
      </div>
    </nav>
  )
}
