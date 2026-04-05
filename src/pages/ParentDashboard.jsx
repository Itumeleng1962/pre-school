import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, Baby, CreditCard, Camera, MessageSquare, Calendar, Activity, LogOut, Star, AlertCircle, Loader } from 'lucide-react'
import { supabase } from '../supabaseClient'
import './AdminDashboard.css'

const activityLog = [
  { time: '12:30 PM', emoji: '😴', text: 'Had a great nap — slept for 45 minutes.' },
  { time: '11:45 AM', emoji: '🥘', text: 'Ate all of lunch including the fruit salad!' },
  { time: '10:30 AM', emoji: '🎨', text: 'Participated enthusiastically in creative arts!' },
  { time: '09:15 AM', emoji: '🎵', text: 'Led the morning singing ring. Very confident today!' },
  { time: '08:30 AM', emoji: '🍎', text: 'Had morning snack: Apple slices & yoghurt.' },
  { time: '07:42 AM', emoji: '🏫', text: 'Safely checked into class.' },
]

const paymentHistory = [
  { date: 'Recent', description: 'Registration Fee', amount: 'R 1,500.00', status: 'Paid' },
]

const calendarEvents = [
  { date: '15 Apr 2026', event: 'Sports & Fun Day', type: 'event', note: 'Please pack comfortable clothes' },
  { date: '27 Apr 2026', event: 'Freedom Day', type: 'holiday', note: 'School Closed' },
  { date: '1 May 2026', event: "Workers' Day", type: 'holiday', note: 'School Closed' },
  { date: '9 May 2026', event: 'Mother\'s Day Tea Party', type: 'event', note: 'Parents welcome 09:00 AM' },
  { date: '30 May 2026', event: 'End of Term Report Cards', type: 'important', note: 'Collect from 14:00' },
  { date: '10 Jun 2026', event: 'End of Term 2 Concert', type: 'event', note: 'Doors open at 18:00' },
]

export default function ParentDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [childData, setChildData] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const [medicalInfo, setMedicalInfo] = useState('')
  const [isEditingMedical, setIsEditingMedical] = useState(false)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  const fetchMessages = async (email) => {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('parent_email', email)
      .order('created_at', { ascending: true })
    if (data) setMessages(data)
  }

  useEffect(() => {
    const fetchParentData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      let emailToUse = null
      
      if (user) {
        emailToUse = user.email
        const { data, error } = await supabase
          .from('applications')
          .select('*')
          .eq('email', user.email)
          .single()
        
        if (data) {
          setChildData(data)
          setMedicalInfo(data.message || 'No additional medical info provided.')
        }
      } else {
        // Fallback for testing if not logged in via Supabase Auth
        const { data, error } = await supabase.from('applications').select('*').in('status', ['Enrolled', 'Payment Received']).limit(1).single()
        if (data) {
          emailToUse = data.email
          setChildData(data)
          setMedicalInfo(data.message || 'No additional medical info provided.')
        }
      }
      
      if (emailToUse) {
        fetchMessages(emailToUse)
        // Setup polling for messages every 3 seconds for live chat feel
        const interval = setInterval(() => fetchMessages(emailToUse), 3000)
        setLoading(false)
        return () => clearInterval(interval)
      } else {
        setLoading(false)
      }
    }
    fetchParentData()
  }, [])

  const sidebarItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'my_child', icon: Baby, label: "Child's Profile" },
    { id: 'activity', icon: Activity, label: 'Daily Activity Log' },
    { id: 'photos', icon: Camera, label: 'Photos & Gallery' },
    { id: 'payments', icon: CreditCard, label: 'Fees & Payments' },
    { id: 'messages', icon: MessageSquare, label: 'Message Teacher' },
    { id: 'calendar', icon: Calendar, label: 'School Calendar' },
  ]

  const handleSendMessage = async () => {
    if (newMessage.trim() && childData?.email) {
      const msg = {
        parent_email: childData.email,
        sender_role: 'parent',
        text: newMessage
      }
      
      // Optimistic update
      setMessages([...messages, { ...msg, created_at: new Date().toISOString() }])
      setNewMessage('')
      
      const { error } = await supabase.from('chat_messages').insert([msg])
      if (!error) {
        fetchMessages(childData.email)
      } else {
        alert('Could not send message. Please ensure the chat_messages table exists in Supabase.')
      }
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', flexDirection: 'column', gap: '1rem', color: '#4c1d95' }}>
        <Loader size={40} className="spinner" />
        <h2>Loading Parent Portal...</h2>
      </div>
    )
  }

  if (!childData) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', flexDirection: 'column', gap: '1rem' }}>
        <h2>No Enrolled Child Found</h2>
        <p>Please make sure you are logged in with the correct email address.</p>
        <button className="btn btn-primary" onClick={() => navigate('/login')}>Return to Login</button>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar" style={{ background: '#4c1d95' }}>
        <div className="sidebar-brand">
          <img src="/logo.jpeg" alt="The Beacon Academy Logo" className="sidebar-logo" />
          <span>Parent Portal</span>
        </div>
        <nav className="sidebar-nav">
          {sidebarItems.map(item => (
            <a key={item.id} href="#" className={activeTab === item.id ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); setActiveTab(item.id) }}>
              <item.icon size={18} /> {item.label}
            </a>
          ))}
        </nav>
        <button onClick={async () => { await supabase.auth.signOut(); navigate('/login') }} className="logout-btn">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h2>{sidebarItems.find(i => i.id === activeTab)?.label || 'Parent Overview'}</h2>
          <div className="admin-user-info">
            <span>{childData.parent_name}</span>
            <div className="admin-avatar" style={{ background: '#7c3aed' }}>
               {childData.parent_name.charAt(0)}
            </div>
          </div>
        </header>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <>
            <section className="admin-stats">
              <div className="stat-card">
                <h3>{childData.child_name}'s Status</h3>
                <div className="stat-value" style={{ fontSize: '1.3rem', marginTop: '0.5rem', color: '#16a34a' }}>✅ Checked In</div>
                <div className="stat-trend">Dropped off at 07:42 AM</div>
              </div>
              <div className="stat-card">
                <h3>Balance Due</h3>
                <div className="stat-value">R 0.00</div>
                <div className="stat-trend positive">All fees up to date ✓</div>
              </div>
              <div className="stat-card">
                <h3>Next School Event</h3>
                <div className="stat-value" style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>Sports Day 🏃</div>
                <div className="stat-trend">15 April at 09:00 AM</div>
              </div>
              <div className="stat-card">
                <h3>Term Progress</h3>
                <div className="stat-value">Term 2</div>
                <div className="stat-trend positive">Week 4 of 10</div>
              </div>
            </section>

            <section className="admin-content-grid">
              <div className="admin-card">
                <h3>{childData.child_name}'s Day — Live Feed</h3>
                <ul className="activity-list" style={{ marginTop: '1rem' }}>
                  {activityLog.slice(0, 4).map((a, i) => (
                    <li key={i}><strong>{a.time}:</strong> {a.emoji} {a.text}</li>
                  ))}
                </ul>
                <button className="btn btn-outline" style={{ marginTop: '1rem' }} onClick={() => setActiveTab('activity')}>
                  View Full Activity Log →
                </button>
              </div>
              <div className="admin-card">
                <h3>Teacher's Note Today</h3>
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1.2rem', marginTop: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                    <Star size={18} color="#16a34a" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <p style={{ margin: 0, color: '#166534', lineHeight: 1.6 }}>
                      "{childData.child_name} had an incredible day! Showed great leadership during morning ring and was very kind to classmates during free play. We're proud!"
                    </p>
                  </div>
                  <p style={{ margin: '0.8rem 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>— Ms. Sarah Dlamini</p>
                </div>

                <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '8px', padding: '1rem', marginTop: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <AlertCircle size={16} color="#b45309" />
                    <strong style={{ color: '#92400e', fontSize: '0.9rem' }}>Reminder: Sports Day on 15 April</strong>
                  </div>
                  <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.85rem', color: '#92400e' }}>Please pack comfortable clothes and a water bottle.</p>
                </div>
              </div>
            </section>
          </>
        )}

        {/* CHILD PROFILE */}
        {activeTab === 'my_child' && (
          <div className="admin-card">
            <h3>{childData.child_name}'s Full Profile</h3>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{ width: '110px', height: '110px', background: 'linear-gradient(135deg, #7c3aed, #4c1d95)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '2.5rem' }}>👦👧</span>
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>{childData.child_name}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {[
                    ['Age / DOB', childData.child_age],
                    ['Program', childData.program],
                    ['Class Teacher', 'Ms. Sarah Dlamini'],
                    ['Parent / Guardian', childData.parent_name],
                    ['Email', childData.email],
                    ['Emergency Contact', childData.phone],
                  ].map(([label, value]) => (
                    <div key={label} style={{ background: '#f8fafc', padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                       <strong style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: '0.2rem' }}>{label}</strong>
                       <span style={{ fontSize: '0.95rem', color: '#0f172a' }}>{value}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '1.5rem' }}>
                  <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Medical & Important Notes</strong>
                  {isEditingMedical ? (
                    <textarea value={medicalInfo} onChange={e => setMedicalInfo(e.target.value)}
                      style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', minHeight: '80px' }} />
                  ) : (
                    <p style={{ padding: '0.8rem', background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '8px', margin: 0, color: '#92400e' }}>
                      ⚠️ {medicalInfo}
                    </p>
                  )}
                  <button className="btn btn-outline" style={{ marginTop: '0.8rem' }} onClick={() => {
                     if (isEditingMedical) {
                       // Update in Supabase
                       supabase.from('applications').update({ message: medicalInfo }).eq('id', childData.id).then(() => {
                         setIsEditingMedical(false)
                       })
                     } else {
                       setIsEditingMedical(true)
                     }
                  }}>
                    {isEditingMedical ? '💾 Save Medical Info' : '✏️ Update Medical Info'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ACTIVITY LOG */}
        {activeTab === 'activity' && (
          <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0 }}>{childData.child_name}'s Daily Activity</h3>
              <span className="status-badge ok">All Activities Complete</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {activityLog.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{a.emoji}</span>
                  <div>
                    <strong style={{ display: 'block', color: '#0f172a' }}>{a.time}</strong>
                    <span style={{ color: '#475569' }}>{a.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PHOTOS */}
        {activeTab === 'photos' && (
           <div className="admin-card">
             <h3>Photos & Videos from School</h3>
             <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Recent photos taken by the teaching team during class activities.</p>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem' }}>
               {['🎨 Arts & Crafts', '⚽ Outdoor Play', '📚 Story Time', '🎵 Music Class', '🍎 Snack Time', '👨‍👩‍👧 Group Photo'].map((label, i) => (
                 <div key={i} style={{ background: `hsl(${i * 45}, 70%, 90%)`, height: '150px', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: `hsl(${i * 45}, 50%, 30%)`, fontWeight: '600', fontSize: '0.85rem', gap: '0.5rem', cursor: 'pointer', border: `2px solid hsl(${i * 45}, 60%, 80%)` }}>
                   <Camera size={28} />
                   {label}
                 </div>
               ))}
             </div>
           </div>
        )}

        {/* PAYMENTS */}
        {activeTab === 'payments' && (
          <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0 }}>Fees & Payment History</h3>
              <span className="status-badge ok">Account in Good Standing</span>
            </div>
            <div style={{ background: '#f0fdf4', border: '2px solid #bbf7d0', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: '#64748b' }}>Current Balance</strong>
                <span style={{ fontSize: '2.5rem', fontWeight: '800', color: '#16a34a' }}>R 0.00</span>
                <span style={{ display: 'block', fontSize: '0.85rem', color: '#16a34a' }}>Next fee due 1st May 2026</span>
              </div>
              <button className="btn btn-primary" onClick={() => alert('Redirecting to secure payment gateway...')}>Pay Next Fee</button>
            </div>
            <h4 style={{ marginBottom: '1rem' }}>Transaction History</h4>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
               <thead>
                 <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                   <th style={{ padding: '0.8rem' }}>Date</th>
                   <th style={{ padding: '0.8rem' }}>Description</th>
                   <th style={{ padding: '0.8rem' }}>Amount</th>
                   <th style={{ padding: '0.8rem' }}>Status</th>
                 </tr>
               </thead>
               <tbody>
                 {paymentHistory.map((p, i) => (
                   <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                     <td style={{ padding: '0.8rem', color: '#475569' }}>{p.date}</td>
                     <td style={{ padding: '0.8rem' }}>{p.description}</td>
                     <td style={{ padding: '0.8rem', fontWeight: '700' }}>{p.amount}</td>
                     <td style={{ padding: '0.8rem' }}><span className="status-badge ok">{p.status}</span></td>
                   </tr>
                 ))}
               </tbody>
            </table>
          </div>
        )}

        {/* MESSAGES */}
        {activeTab === 'messages' && (
          <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', height: '500px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0 }}>Message Ms. Sarah Dlamini</h3>
              <span className="status-badge ok">Grade R Teacher</span>
            </div>
            <div style={{ flex: 1, border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', overflowY: 'auto', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
               {messages.map((msg, i) => {
                 const isMe = msg.sender_role === 'parent'
                 const time = new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                 return (
                 <div key={i} style={{ background: isMe ? '#7c3aed' : 'white', color: isMe ? 'white' : 'inherit', padding: '0.9rem 1.1rem', borderRadius: '10px', maxWidth: '75%', alignSelf: isMe ? 'flex-end' : 'flex-start', border: isMe ? 'none' : '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                   <strong style={{ display: 'block', fontSize: '0.75rem', opacity: 0.8, marginBottom: '0.25rem' }}>
                     {isMe ? 'Me' : 'Ms. Sarah (Teacher)'}
                   </strong>
                   {msg.text}
                   <span style={{ display: 'block', fontSize: '0.7rem', opacity: 0.7, marginTop: '0.3rem', textAlign: 'right' }}>{time}</span>
                 </div>
               )})}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
               <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)}
                 onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                 placeholder="Type a message to Ms. Sarah..."
                 style={{ flex: 1, padding: '0.9rem', borderRadius: '8px', border: '1px solid #ccc' }} />
               <button className="btn btn-primary" onClick={handleSendMessage} style={{ background: '#7c3aed', borderColor: '#7c3aed' }}>Send</button>
            </div>
          </div>
        )}

        {/* CALENDAR */}
        {activeTab === 'calendar' && (
          <div className="admin-card">
            <h3>School Calendar — Term 2, 2026</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
               {calendarEvents.map((ev, i) => {
                 const colors = { event: { bg: '#eff6ff', border: '#bfdbfe', text: '#1e40af' }, holiday: { bg: '#f0fdf4', border: '#bbf7d0', text: '#166534' }, important: { bg: '#fef3c7', border: '#fde68a', text: '#92400e' } }
                 const c = colors[ev.type]
                 return (
                   <div key={i} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '1rem 1.2rem', background: c.bg, border: `1px solid ${c.border}`, borderRadius: '8px' }}>
                     <div style={{ textAlign: 'center', minWidth: '80px' }}>
                       <strong style={{ display: 'block', fontSize: '0.8rem', color: c.text }}>{ev.date.split(' ')[1]} {ev.date.split(' ')[2]}</strong>
                       <span style={{ fontSize: '1.4rem', fontWeight: '800', color: c.text }}>{ev.date.split(' ')[0]}</span>
                     </div>
                     <div>
                       <strong style={{ display: 'block', color: '#0f172a' }}>{ev.event}</strong>
                       <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{ev.note}</span>
                     </div>
                   </div>
                 )
               })}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
