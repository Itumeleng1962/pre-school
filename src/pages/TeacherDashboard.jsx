import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, Camera, BookOpen, Coffee, MessageSquare, Calendar, LogOut } from 'lucide-react'
import './AdminDashboard.css' // We can reuse the AdminDashboard layout styles!

export default function TeacherDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('classroom')

  const sidebarItems = [
    { id: 'classroom', icon: LayoutDashboard, label: 'My Classroom' },
    { id: 'attendance', icon: Users, label: 'Attendance & Check-in' },
    { id: 'daily_updates', icon: Camera, label: 'Daily Photos & Updates' },
    { id: 'learning', icon: BookOpen, label: 'Learning & Assessments' },
    { id: 'meals_naps', icon: Coffee, label: 'Meals & Naps Log' },
    { id: 'messages', icon: MessageSquare, label: 'Parent Messages' },
    { id: 'schedule', icon: Calendar, label: 'Lesson Plans' },
  ]

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar" style={{ background: '#0f172a' }}>
        <div className="sidebar-brand">
          <img src="/logo.jpeg" alt="The Beacon Academy Logo" className="sidebar-logo" />
          <span>Teacher Portal</span>
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
          <h2>{sidebarItems.find(i => i.id === activeTab)?.label || 'Classroom Overview'}</h2>
          <div className="admin-user-info">
            <span>Class Grade R - Sarah</span>
            <div className="admin-avatar" style={{ background: '#f39c12' }}>S</div>
          </div>
        </header>

        {activeTab === 'classroom' && (
          <>
            <section className="admin-stats">
              <div className="stat-card">
                <h3>Students Present</h3>
                <div className="stat-value">22 / 24</div>
                <div className="stat-trend positive">91% Attendance</div>
              </div>
              <div className="stat-card">
                <h3>Next Activity</h3>
                <div className="stat-value" style={{ fontSize: '1.4rem', marginTop: '0.5rem' }}>Snack Time 🍎</div>
                <div className="stat-trend">Starts in 15 mins</div>
              </div>
              <div className="stat-card">
                <h3>Unread Parent Messages</h3>
                <div className="stat-value">3</div>
                <div className="stat-trend negative">Requires reply</div>
              </div>
              <div className="stat-card">
                <h3>Daily Updates Posted</h3>
                <div className="stat-value">12</div>
                <div className="stat-trend positive">Parents notified!</div>
              </div>
            </section>

            <section className="admin-content-grid">
              <div className="admin-card">
                <h3>My Class Roster (Quick Look)</h3>
                <ul className="status-list">
                  <li><span>Johnny Appleseed</span> <button className="btn btn-primary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>Log Nap</button></li>
                  <li><span>Mia Jenkins</span> <button className="btn btn-outline" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>Add Note</button></li>
                  <li><span>Liam Smith</span> <span className="status-badge" style={{ background: '#fee2e2', color: '#ef4444' }}>Absent</span></li>
                  <li><span>Chloe Ndlovu</span> <button className="btn btn-outline" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>Add Note</button></li>
                </ul>
              </div>
              <div className="admin-card">
                <h3>Today's Schedule</h3>
                <ul className="activity-list">
                  <li><strong>08:00 AM:</strong> Free Play & Welcome.</li>
                  <li><strong>09:00 AM:</strong> Morning Ring & Songs.</li>
                  <li><strong>10:00 AM:</strong> Creative Arts (Finger painting).</li>
                  <li><strong>11:30 AM:</strong> Outdoor Play.</li>
                </ul>
              </div>
            </section>
          </>
        )}

        {activeTab !== 'classroom' && (
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
                {sidebarItems.find(i => i.id === activeTab)?.label}
              </h3>
              <p style={{ maxWidth: '400px', margin: '0.5rem auto', lineHeight: '1.6' }}>
                This is a mock application. In a full production system, teachers would use this module to seamlessly manage '{sidebarItems.find(i => i.id === activeTab)?.label.toLowerCase()}' without relying on paperwork!
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
