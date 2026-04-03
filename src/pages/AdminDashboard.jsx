import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, CreditCard, Video, Activity, FileText, Bell, LogOut, Settings } from 'lucide-react'
import './AdminDashboard.css'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')

  const sidebarItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'students', icon: Users, label: 'Students & Parents' },
    { id: 'attendance', icon: Activity, label: 'Attendance' },
    { id: 'payments', icon: CreditCard, label: 'Payments' },
    { id: 'cctv', icon: Video, label: 'CCTV Live' },
    { id: 'reports', icon: FileText, label: 'Reports' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ]

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <img src="/logo.jpeg" alt="The Beacon Academy Logo" className="sidebar-logo" />
          <span>Admin Panel</span>
        </div>
        <nav className="sidebar-nav">
          {sidebarItems.map(item => (
            <a 
              key={item.id}
              href="#" 
              className={activeTab === item.id ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault()
                setActiveTab(item.id)
              }}
            >
              <item.icon size={18} /> {item.label}
            </a>
          ))}
        </nav>
        <button onClick={() => navigate('/login')} className="logout-btn">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h2>{sidebarItems.find(i => i.id === activeTab)?.label || 'Overview Dashboard'}</h2>
          <div className="admin-user-info">
            <span>Welcome, Itumeleng</span>
            <div className="admin-avatar">IM</div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <>
            <section className="admin-stats">
              <div className="stat-card">
                <h3>Total Active Students</h3>
                <div className="stat-value">145</div>
                <div className="stat-trend positive">+5 this month</div>
              </div>
              <div className="stat-card">
                <h3>Present Today</h3>
                <div className="stat-value">138</div>
                <div className="stat-trend">95% attendance rate</div>
              </div>
              <div className="stat-card">
                <h3>Pending Invoices</h3>
                <div className="stat-value">12</div>
                <div className="stat-trend negative">Requires attention</div>
              </div>
              <div className="stat-card">
                <h3>Recent Incidents / Logs</h3>
                <div className="stat-value">0</div>
                <div className="stat-trend positive">All safe & secure</div>
              </div>
            </section>

            <section className="admin-content-grid">
              <div className="admin-card">
                <h3>Live Activity Feed</h3>
                <ul className="activity-list">
                  <li><strong>08:30 AM:</strong> Morning snacks served in Grade R.</li>
                  <li><strong>08:15 AM:</strong> Teacher Sarah posted a new daily plan.</li>
                  <li><strong>08:00 AM:</strong> 95% of students successfully checked in.</li>
                  <li><strong>07:45 AM:</strong> Payment received for Student #0452.</li>
                </ul>
              </div>
              <div className="admin-card">
                <h3>System Status</h3>
                <ul className="status-list">
                  <li><span>CCTV System:</span> <span className="status-badge ok">Online</span></li>
                  <li><span>Payment Gateway:</span> <span className="status-badge ok">Online</span></li>
                  <li><span>Parent App APIs:</span> <span className="status-badge ok">Online</span></li>
                  <li><span>Smart Check-In:</span> <span className="status-badge ok">Online</span></li>
                </ul>
              </div>
            </section>
          </>
        )}

        {activeTab !== 'dashboard' && (
          <div className="admin-placeholder-card" style={{ background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#64748b' }}>
              <div style={{ opacity: 0.2, marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                {(() => {
                  const activeItem = sidebarItems.find(i => i.id === activeTab)
                  const Icon = activeItem?.icon
                  return Icon ? <Icon size={80} /> : null
                })()}
              </div>
              <h3 style={{ fontSize: '1.5rem', color: '#1e293b', marginBottom: '0.5rem' }}>
                {sidebarItems.find(i => i.id === activeTab)?.label} Module
              </h3>
              <p style={{ maxWidth: '400px', margin: '0.5rem auto', lineHeight: '1.6' }}>
                This is a mock application. In a full production build, you would see the live data and management interface for the {sidebarItems.find(i => i.id === activeTab)?.label.toLowerCase()} system here.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
