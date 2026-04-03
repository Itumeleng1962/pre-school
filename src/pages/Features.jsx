import { Link } from 'react-router-dom'
import {
  QrCode, Camera, BarChart3, CreditCard, MessageCircle, Shield,
  Truck, AlertTriangle, Brain, CheckCircle2, Fingerprint,
  Bell, FileText, Video, Calendar, Lock, CloudLightning, ArrowRight, Zap
} from 'lucide-react'
import './Features.css'

const featureSections = [
  {
    id: 'checkin',
    icon: <QrCode size={36}/>,
    color: '#1a73e8',
    title: 'Child Check-In / Check-Out System',
    subtitle: 'Smart & Secure Attendance Tracking',
    desc: 'A secure digital attendance and safety tracking system for children entering and leaving the academy.',
    features: [
      { icon: <QrCode size={18}/>, text: 'QR code check-in per child' },
      { icon: <Fingerprint size={18}/>, text: 'Biometric & facial recognition' },
      { icon: <Bell size={18}/>, text: 'Instant parent notifications on arrival/departure' },
      { icon: <AlertTriangle size={18}/>, text: 'Late pickup alerts' },
      { icon: <FileText size={18}/>, text: 'Daily attendance reports' },
      { icon: <Lock size={18}/>, text: 'Pickup PIN security & authorization' },
    ],
  },
  {
    id: 'classroom',
    icon: <Camera size={36}/>,
    color: '#9b59b6',
    title: 'Live Classroom Updates',
    subtitle: 'Real-Time Parent Connection',
    desc: 'A real-time communication and activity-sharing system keeping parents connected throughout the day.',
    features: [
      { icon: <Camera size={18}/>, text: 'Live photos & videos of activities' },
      { icon: <FileText size={18}/>, text: 'Daily activity timeline' },
      { icon: <Bell size={18}/>, text: 'Meal & nap-time notifications' },
      { icon: <Brain size={18}/>, text: 'AI-generated daily summaries' },
      { icon: <Video size={18}/>, text: 'Classroom live stream (optional)' },
      { icon: <Bell size={18}/>, text: 'Push notifications & class announcements' },
    ],
  },
  {
    id: 'progress',
    icon: <BarChart3 size={36}/>,
    color: '#2ecc71',
    title: 'Child Progress Reports',
    subtitle: 'AI-Powered Development Tracking',
    desc: 'A digital early childhood development tracking system across all key learning and growth areas.',
    features: [
      { icon: <BarChart3 size={18}/>, text: 'Cognitive & language development tracking' },
      { icon: <Brain size={18}/>, text: 'AI learning analysis & insights' },
      { icon: <FileText size={18}/>, text: 'Monthly downloadable reports' },
      { icon: <CheckCircle2 size={18}/>, text: 'Teacher assessments & comments' },
      { icon: <AlertTriangle size={18}/>, text: 'Early developmental alerts' },
      { icon: <FileText size={18}/>, text: 'Personalised learning plans' },
    ],
  },
  {
    id: 'payments',
    icon: <CreditCard size={36}/>,
    color: '#FF6B35',
    title: 'Digital Payments System',
    subtitle: 'Seamless Billing & Invoicing',
    desc: 'A seamless payment infrastructure supporting multiple methods, automation, and financial transparency.',
    features: [
      { icon: <CreditCard size={18}/>, text: 'Multiple payment methods supported' },
      { icon: <Bell size={18}/>, text: 'Payment reminders & notifications' },
      { icon: <FileText size={18}/>, text: 'Automated invoice generation' },
      { icon: <BarChart3 size={18}/>, text: 'Revenue analytics dashboard' },
      { icon: <FileText size={18}/>, text: 'Full payment history per parent' },
      { icon: <CheckCircle2 size={18}/>, text: 'Subscription plans & discounts' },
    ],
  },
  {
    id: 'communication',
    icon: <MessageCircle size={36}/>,
    color: '#e91e8c',
    title: 'Parent-Teacher Communication',
    subtitle: 'Secure Messaging & Collaboration',
    desc: 'A secure messaging and collaboration system connecting parents and educators in one place.',
    features: [
      { icon: <MessageCircle size={18}/>, text: 'Direct messaging & group chats' },
      { icon: <Video size={18}/>, text: 'Video calls & virtual meetings' },
      { icon: <Calendar size={18}/>, text: 'Meeting scheduling system' },
      { icon: <FileText size={18}/>, text: 'File & report sharing' },
      { icon: <Brain size={18}/>, text: 'AI message summarization' },
      { icon: <AlertTriangle size={18}/>, text: 'Emergency communication alerts' },
    ],
  },
  {
    id: 'cctv',
    icon: <Shield size={36}/>,
    color: '#f1c40f',
    title: 'CCTV Secure Viewing Access',
    subtitle: 'Encrypted Parent-Only Monitoring',
    desc: 'A secure monitoring system allowing parents to safely view their children during the day.',
    features: [
      { icon: <Lock size={18}/>, text: 'Encrypted live streaming' },
      { icon: <Fingerprint size={18}/>, text: 'Facial recognition access control' },
      { icon: <Shield size={18}/>, text: 'Parent-only authenticated access' },
      { icon: <CloudLightning size={18}/>, text: 'AI behavior monitoring & alerts' },
      { icon: <CheckCircle2 size={18}/>, text: 'Activity logging & incident reports' },
      { icon: <Lock size={18}/>, text: 'Data protection compliance' },
    ],
  },
  {
    id: 'transport',
    icon: <Truck size={36}/>,
    color: '#00b8d4',
    title: 'Transport Tracking',
    subtitle: 'GPS-Enabled School Transport',
    desc: 'Real-time GPS tracking of school transport with driver verification and pickup alerts.',
    features: [
      { icon: <Truck size={18}/>, text: 'Live GPS vehicle tracking' },
      { icon: <Bell size={18}/>, text: 'Pickup & drop-off alerts' },
      { icon: <CheckCircle2 size={18}/>, text: 'Driver verification system' },
      { icon: <FileText size={18}/>, text: 'Route reports & history' },
    ],
  },
  {
    id: 'emergency',
    icon: <AlertTriangle size={36}/>,
    color: '#e74c3c',
    title: 'Emergency Management',
    subtitle: 'Safety-First Crisis Response',
    desc: 'Instant emergency notifications and incident management for child safety.',
    features: [
      { icon: <AlertTriangle size={18}/>, text: 'Panic button for staff' },
      { icon: <Bell size={18}/>, text: 'Mass emergency notifications' },
      { icon: <FileText size={18}/>, text: 'Digital incident reports' },
      { icon: <Lock size={18}/>, text: 'Emergency contact verification' },
    ],
  },
]

export default function Features() {
  return (
    <div className="features-page">
      <section className="page-hero">
        <div className="page-hero-bg"/>
        <div className="container page-hero-content">
          <h1>Platform <span className="text-gradient-warm">Features</span></h1>
          <p>Every tool your daycare needs — built for safety, connection, and growth.</p>
          <div className="page-hero-breadcrumb">
            <Link to="/">Home</Link> / <span>Features</span>
          </div>
        </div>
      </section>

      {/* Platform Intro */}
      <section className="section-sm features-intro">
        <div className="container text-center">
          <span className="section-tag"><Zap size={14}/> All-In-One Platform</span>
          <h2 className="section-title">A Smart Ecosystem for<br/><span className="text-gradient">Modern Childcare</span></h2>
          <p className="section-sub">
            Our integrated digital platform transforms The Beacon Academy into a smart, data-driven, parent-connected childcare centre.
          </p>
          <div className="platform-chips">
            {['Parent Mobile App','Teacher App','Admin Dashboard','CCTV System','Payment Gateway','AI Analytics'].map(c => (
              <div key={c} className="platform-chip"><CheckCircle2 size={14}/> {c}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      {featureSections.map((f, i) => (
        <section key={f.id} id={f.id} className={`feature-section section ${i % 2 === 1 ? 'feature-section-alt' : ''}`}>
          <div className="container">
            <div className="feature-detail-grid">
              <div className="feature-detail-hero" style={{ '--fc': f.color }}>
                <div className="feature-detail-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p className="feature-detail-sub">{f.subtitle}</p>
              </div>
              <div className="feature-detail-content">
                <p className="feature-detail-desc">{f.desc}</p>
                <div className="feature-items-grid">
                  {f.features.map((item, j) => (
                    <div key={j} className="feature-item" style={{ '--fc': f.color }}>
                      <span className="fi-icon">{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section text-center features-cta">
        <div className="container">
          <h2 className="section-title">Ready to Experience<br/><span className="text-gradient">All These Features?</span></h2>
          <p className="section-sub">Join The Beacon Academy and give your child the most connected, safest early learning experience.</p>
          <Link to="/contact" className="btn btn-primary" id="features-enrol-btn">
            Enrol Your Child Today <ArrowRight size={18}/>
          </Link>
        </div>
      </section>
    </div>
  )
}
