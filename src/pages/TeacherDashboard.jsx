import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, Camera, BookOpen, Coffee, MessageSquare, Calendar, LogOut, CheckCircle, XCircle, Loader, Search } from 'lucide-react'
import { supabase } from '../supabaseClient'
import './AdminDashboard.css'

const weekPlan = [
  { day: 'Monday', theme: 'Under the Sea', activities: 'Ocean crafts, sea creature story time, blue painting.' },
  { day: 'Tuesday', theme: 'Numbers & Shapes', activities: 'Counting 1–20, shape sorting, number painting.' },
  { day: 'Wednesday', theme: 'Outdoor Sports', activities: 'Obstacle course, ball skills, gross motor activities.' },
  { day: 'Thursday', theme: 'Music & Movement', activities: 'Drumming, rhythm games, freeze dance.' },
  { day: 'Friday', theme: 'Baking Day', activities: 'Measure & mix muffins, follow instructions, fine motor skills.' },
]

const todaySchedule = [
  { time: '07:30', label: 'Welcome & Free Play' },
  { time: '08:00', label: 'Morning Ring & Calendar' },
  { time: '08:45', label: 'Phonics / Literacy Circle' },
  { time: '09:30', label: 'Morning Snack' },
  { time: '10:00', label: 'Creative Arts — Finger Painting' },
  { time: '11:00', label: 'Outdoor Play' },
  { time: '11:30', label: 'Lunch Time' },
  { time: '12:15', label: 'Nap / Rest Time' },
  { time: '13:30', label: 'Story Time & Numeracy' },
  { time: '14:30', label: 'Afternoon Snack' },
  { time: '15:00', label: 'Home Time / Pickup' },
]

export default function TeacherDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('classroom')
  const [searchTerm, setSearchTerm] = useState('')
  
  const [roster, setRoster] = useState([])
  const [loading, setLoading] = useState(true)

  const [attendance, setAttendance] = useState({})
  const [meals, setMeals] = useState({})
  const [naps, setNaps] = useState({})
  const [assessments, setAssessments] = useState({})
  
  const [lessons, setLessons] = useState(weekPlan)
  const [newLessonDay, setNewLessonDay] = useState('Monday')
  const [newLessonPlan, setNewLessonPlan] = useState('')
  const [updates, setUpdates] = useState([
    { time: '10:05 AM', text: '"The class loved finger painting today! Everyone was so creative." — Posted to all parents.' },
    { time: '08:15 AM', text: '"Good morning! We have a fun-filled day ahead. Today\'s theme is Creative Arts!" — Posted to all parents.' },
  ])
  const [newUpdate, setNewUpdate] = useState('')
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [selectedChildEmail, setSelectedChildEmail] = useState('')

  const fetchMessages = async (email) => {
    if (!email) return
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('parent_email', email)
      .order('created_at', { ascending: true })
    if (data) setMessages(data)
  }

  // Poll messages when a child/parent is selected
  useEffect(() => {
    if (selectedChildEmail) {
      fetchMessages(selectedChildEmail)
      const interval = setInterval(() => fetchMessages(selectedChildEmail), 3000)
      return () => clearInterval(interval)
    } else {
      setMessages([])
    }
  }, [selectedChildEmail])

  useEffect(() => {
    const fetchClassroom = async () => {
      // Pull only students who have successfully enrolled
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .in('status', ['Enrolled', 'Payment Received', 'Pending Review']) 
        // Showing all temporarily so you have rich data during the demo presentation

      if (data) {
        setRoster(data)
        
        const initAtt = {}, initMeals = {}, initNaps = {}, initAssessments = {}
        data.forEach(s => {
           initAtt[s.child_name] = 'Present'
           initMeals[s.child_name] = 'Ate All'
           initNaps[s.child_name] = '1h Nap'
           initAssessments[s.child_name] = { lit: 'On Track', num: 'On Track', mot: 'Excellent' }
        })
        setAttendance(initAtt)
        setMeals(initMeals)
        setNaps(initNaps)
        setAssessments(initAssessments)
      }
      setLoading(false)
    }
    fetchClassroom()
  }, [])

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', flexDirection: 'column', gap: '1rem', color: '#0f172a' }}>
        <Loader size={40} className="spinner" />
        <h2>Loading Classroom Data...</h2>
      </div>
    )
  }

  const presentCount = roster.filter(s => attendance[s.child_name] === 'Present').length

  const safeSearch = searchTerm.toLowerCase();
  const filteredRoster = roster.filter(s => s.child_name?.toLowerCase().includes(safeSearch) || s.parent_name?.toLowerCase().includes(safeSearch) || s.email?.toLowerCase().includes(safeSearch))
  const filteredMessages = messages.filter(m => m.text?.toLowerCase().includes(safeSearch) || m.parent_email?.toLowerCase().includes(safeSearch))

  const sidebarItems = [
    { id: 'classroom', icon: LayoutDashboard, label: 'My Classroom' },
    { id: 'attendance', icon: Users, label: 'Attendance' },
    { id: 'schedule', icon: Calendar, label: 'Lesson Plans' },
    { id: 'learning', icon: BookOpen, label: 'Assessments' },
    { id: 'meals_naps', icon: Coffee, label: 'Meals & Naps' },
    { id: 'daily_updates', icon: Camera, label: 'Daily Updates' },
    { id: 'messages', icon: MessageSquare, label: 'Parent Messages' },
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
            <a key={item.id} href="#" className={activeTab === item.id ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); setActiveTab(item.id) }}>
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
          <h2>{sidebarItems.find(i => i.id === activeTab)?.label}</h2>

          <div className="admin-search-bar" style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', padding: '0.5rem 1rem', borderRadius: '20px', flex: 1, margin: '0 2rem', border: '1px solid #e2e8f0' }}>
             <Search size={18} color="#64748b" style={{ marginRight: '0.8rem' }} />
             <input 
               type="text" 
               placeholder={`Search for students, messages, or keywords...`} 
               value={searchTerm} 
               onChange={e => setSearchTerm(e.target.value)} 
               style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', color: '#334155', fontSize: '0.95rem' }} 
             />
          </div>

          <div className="admin-user-info">
             <span>Ms. Sarah Dlamini — Grade R</span>
             <div className="admin-avatar" style={{ background: '#f39c12' }}>SD</div>
          </div>
        </header>

        {/* CLASSROOM OVERVIEW */}
        {activeTab === 'classroom' && (
          <>
            <section className="admin-stats">
              <div className="stat-card">
                <h3>Students Present</h3>
                <div className="stat-value">{presentCount} / {roster.length}</div>
                <div className="stat-trend positive">{roster.length ? Math.round((presentCount / roster.length) * 100) : 0}% Attendance Rate</div>
              </div>
              <div className="stat-card">
                <h3>Current Activity</h3>
                <div className="stat-value" style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>🎨 Arts & Crafts</div>
                <div className="stat-trend">Ends at 11:00 AM</div>
              </div>
              <div className="stat-card">
                <h3>Parent Messages</h3>
                <div className="stat-value">{messages.length || 0}</div>
                <div className="stat-trend positive">From active thread</div>
              </div>
              <div className="stat-card">
                <h3>Today's Theme</h3>
                <div className="stat-value" style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>{lessons[0]?.theme || 'Creative Arts 🎨'}</div>
                <div className="stat-trend positive">Lesson plan ready</div>
              </div>
            </section>

            <section className="admin-content-grid">
              <div className="admin-card">
                <h3>Today's Schedule</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                  {todaySchedule.map((s, i) => (
                    <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '0.6rem 0.8rem', background: i === 4 ? '#eff6ff' : '#f8fafc', borderRadius: '6px', border: i === 4 ? '1px solid #bfdbfe' : '1px solid #e2e8f0' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: '700', color: i === 4 ? '#3b82f6' : '#64748b', minWidth: '50px' }}>{s.time}</span>
                      <span style={{ fontSize: '0.9rem', color: i === 4 ? '#1e40af' : '#334155', fontWeight: i === 4 ? '600' : '400' }}>{s.label}</span>
                      {i === 4 && <span className="status-badge ok" style={{ marginLeft: 'auto', fontSize: '0.7rem' }}>Now</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="admin-card">
                <h3>Quick Class Roster</h3>
                {filteredRoster.length === 0 ? (
                  <p style={{ color: '#64748b', marginTop: '1rem' }}>No students match your search.</p>
                ) : (
                  <ul className="status-list" style={{ marginTop: '1rem' }}>
                    {filteredRoster.map((s, i) => (
                      <li key={i}>
                        <span>{s.child_name} <span style={{fontSize: '0.8rem', color: '#94a3b8'}}>({s.child_age})</span></span>
                        {attendance[s.child_name] === 'Present'
                          ? <span className="status-badge ok">✓ Present</span>
                          : <span className="status-badge" style={{ background: '#fee2e2', color: '#ef4444' }}>✗ Absent</span>
                        }
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          </>
        )}

        {/* ATTENDANCE */}
        {activeTab === 'attendance' && (
          <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0 }}>Take Attendance</h3>
              <span className="status-badge ok">{presentCount}/{roster.length} Present</span>
            </div>
            {filteredRoster.length === 0 ? (
              <p style={{ color: '#64748b' }}>No students match your search.</p>
            ) : (
              <ul className="status-list">
                {filteredRoster.map(student => (
                  <li key={student.id}>
                    <span style={{ fontWeight: '500' }}>{student.child_name}</span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn" style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem', background: attendance[student.child_name] === 'Present' ? '#10b981' : '#f1f5f9', color: attendance[student.child_name] === 'Present' ? 'white' : '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                        onClick={() => setAttendance(p => ({ ...p, [student.child_name]: 'Present' }))}>
                        <CheckCircle size={14} /> Present
                      </button>
                      <button className="btn" style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem', background: attendance[student.child_name] === 'Absent' ? '#ef4444' : '#f1f5f9', color: attendance[student.child_name] === 'Absent' ? 'white' : '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                        onClick={() => setAttendance(p => ({ ...p, [student.child_name]: 'Absent' }))}>
                        <XCircle size={14} /> Absent
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <button className="btn btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => alert('Attendance saved successfully!')}>
              Save & Submit Attendance
            </button>
          </div>
        )}

        {/* LESSON PLANS */}
        {activeTab === 'schedule' && (
          <div className="admin-card">
            <h3>Weekly Lesson Plans</h3>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <select className="btn btn-outline" style={{ padding: '0.8rem' }} value={newLessonDay} onChange={e => setNewLessonDay(e.target.value)}>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(d => (
                  <option key={d}>{d}</option>
                ))}
              </select>
              <input type="text" value={newLessonPlan} onChange={e => setNewLessonPlan(e.target.value)}
                placeholder="Add activity description..."
                style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', minWidth: '200px' }} />
              <button className="btn btn-primary" onClick={() => {
                if (newLessonPlan.trim()) {
                  setLessons([...lessons, { day: newLessonDay, theme: 'Custom', activities: newLessonPlan }])
                  setNewLessonPlan('')
                }
              }}>Add</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {lessons.map((plan, i) => (
                <div key={i} style={{ borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                  <div style={{ background: '#0f172a', color: 'white', padding: '0.7rem 1rem', display: 'flex', justifyContent: 'space-between' }}>
                    <strong>{plan.day}</strong>
                    <span style={{ opacity: 0.7, fontSize: '0.85rem' }}>Theme: {plan.theme}</span>
                  </div>
                  <div style={{ padding: '0.8rem 1rem', background: '#f8fafc', color: '#475569' }}>{plan.activities}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ASSESSMENTS */}
        {activeTab === 'learning' && (
          <div className="admin-card">
            <h3>Learning & Development Assessments — Term 2</h3>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Track developmental milestones across literacy, numeracy, and motor skills.</p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    {['Student', 'Literacy', 'Numeracy', 'Motor Skills'].map(h => (
                      <th key={h} style={{ padding: '1rem' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRoster.map((s, i) => {
                    const badge = (val) => {
                      if (val === 'Excellent') return { bg: '#dcfce7', color: '#166534' }
                      if (val === 'On Track') return { bg: '#dbeafe', color: '#1e40af' }
                      return { bg: '#fee2e2', color: '#b91c1c' }
                    }
                    const l = assessments[s.child_name]?.lit || 'On Track'
                    const n = assessments[s.child_name]?.num || 'On Track'
                    const m = assessments[s.child_name]?.mot || 'On Track'
                    
                    return (
                      <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '1rem', fontWeight: '500' }}>{s.child_name}</td>
                        {[
                          { val: l, key: 'lit' },
                          { val: n, key: 'num' },
                          { val: m, key: 'mot' }
                        ].map((item, j) => (
                           <td key={j} style={{ padding: '1rem' }}>
                             <select 
                               value={item.val} 
                               onChange={(e) => setAssessments(prev => ({
                                  ...prev, 
                                  [s.child_name]: { ...prev[s.child_name], [item.key]: e.target.value } 
                               }))}
                               style={{ ...badge(item.val), padding: '0.4rem 0.6rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '600', border: 'none', cursor: 'pointer', outline: 'none' }}
                             >
                               <option style={{ background: 'white', color: 'black' }}>Excellent</option>
                               <option style={{ background: 'white', color: 'black' }}>On Track</option>
                               <option style={{ background: 'white', color: 'black' }}>Needs Review</option>
                             </select>
                           </td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MEALS & NAPS */}
        {activeTab === 'meals_naps' && (
          <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0 }}>Meals & Naps Log</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-primary" style={{ fontSize: '0.85rem' }} onClick={() => setMeals(Object.fromEntries(roster.map(s => [s.child_name, 'Ate All'])))}>✓ All Ate</button>
                <button className="btn btn-primary" style={{ fontSize: '0.85rem' }} onClick={() => setNaps(Object.fromEntries(roster.map(s => [s.child_name, '1h Nap'])))}>✓ All Napped</button>
              </div>
            </div>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '0.8rem' }}>Student</th>
                  <th style={{ padding: '0.8rem' }}>Meal Status</th>
                  <th style={{ padding: '0.8rem' }}>Nap Duration</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoster.filter(s => attendance[s.child_name] === 'Present').map((s, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.8rem', fontWeight: '500' }}>{s.child_name}</td>
                    <td style={{ padding: '0.8rem' }}>
                      <select value={meals[s.child_name] || 'Ate All'} onChange={e => setMeals(p => ({ ...p, [s.child_name]: e.target.value }))}
                        style={{ padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid #ccc', background: 'white', fontSize: '0.85rem' }}>
                        {['Ate All', 'Ate Some', 'Did Not Eat'].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </td>
                    <td style={{ padding: '0.8rem' }}>
                      <select value={naps[s.child_name] || '1h Nap'} onChange={e => setNaps(p => ({ ...p, [s.child_name]: e.target.value }))}
                        style={{ padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid #ccc', background: 'white', fontSize: '0.85rem' }}>
                        {['Did Not Nap', '30min', '45min', '1h Nap', '1h 15m', '1h 30m'].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => alert('Meal & nap log saved successfully!')}>Save Log</button>
          </div>
        )}

        {/* DAILY UPDATES */}
        {activeTab === 'daily_updates' && (
          <div className="admin-card">
            <h3>Post a Class Update to Parents</h3>
            <div style={{ marginTop: '1rem' }}>
              <textarea value={newUpdate} onChange={e => setNewUpdate(e.target.value)}
                placeholder="Share a class moment, a reminder, or a daily highlight with all parents..."
                style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #ccc', minHeight: '100px', resize: 'vertical' }} />
              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Camera size={16} /> Attach Photos
                </button>
                <button className="btn btn-primary" onClick={() => {
                  if (newUpdate.trim()) {
                    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    setUpdates([{ time, text: `"${newUpdate}" — Posted to all parents.` }, ...updates])
                    setNewUpdate('')
                  }
                }}>Post Update to Parents</button>
              </div>
            </div>
            <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Posted Today</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {updates.map((upd, i) => (
                <div key={i} style={{ padding: '1rem 1.2rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                  <strong style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.3rem' }}>📢 {upd.time}</strong>
                  {upd.text}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MESSAGES */}
        {activeTab === 'messages' && (
          <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', height: '600px' }}>
            <h3 style={{ margin: '0 0 1rem 0' }}>Parent Inbox</h3>
            <div style={{ display: 'flex', gap: '1rem', flex: 1, overflow: 'hidden' }}>
              {/* Sidebar Parent List */}
              <div style={{ width: '280px', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', flexDirection: 'column', background: 'white' }}>
                 <div style={{ padding: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
                   <input 
                     type="text" 
                     placeholder="Search parents by name..." 
                     value={searchTerm} 
                     onChange={e => setSearchTerm(e.target.value)}
                     style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #cbd5e1', outline: 'none' }}
                   />
                 </div>
                 <div style={{ flex: 1, overflowY: 'auto' }}>
                    {filteredRoster.length === 0 && <p style={{ padding: '1rem', color: '#64748b', fontSize: '0.85rem', textAlign: 'center' }}>No parents match your search.</p>}
                    {filteredRoster.map(s => (
                      <div 
                        key={s.email} 
                        onClick={() => setSelectedChildEmail(s.email)}
                        style={{ 
                          padding: '0.85rem 1rem', cursor: 'pointer', borderBottom: '1px solid #f1f5f9', 
                          background: selectedChildEmail === s.email ? '#eff6ff' : 'white',
                          borderLeft: selectedChildEmail === s.email ? '3px solid #3b82f6' : '3px solid transparent'
                        }}
                      >
                         <strong style={{ display: 'block', fontSize: '0.9rem', color: selectedChildEmail === s.email ? '#1e40af' : '#0f172a' }}>{s.parent_name}</strong>
                         <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{s.child_name}'s Parent</span>
                      </div>
                    ))}
                 </div>
              </div>
              
              {/* Chat View */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {selectedChildEmail ? (
              <>
                <div style={{ flex: 1, border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', overflowY: 'auto', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {filteredMessages.length === 0 && <p style={{color: '#94a3b8', textAlign: 'center', marginTop: 'auto', marginBottom: 'auto'}}>No messages yet or none match your search.</p>}
                  {filteredMessages.map((msg, i) => {
                    const isMe = msg.sender_role === 'teacher'
                    const time = new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    return (
                    <div key={i} style={{ background: isMe ? '#0f172a' : 'white', color: isMe ? 'white' : 'inherit', padding: '0.9rem 1.1rem', borderRadius: '10px', maxWidth: '75%', alignSelf: isMe ? 'flex-end' : 'flex-start', border: isMe ? 'none' : '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                      <strong style={{ display: 'block', fontSize: '0.75rem', opacity: 0.7, marginBottom: '0.25rem' }}>
                        {isMe ? 'Me (Teacher)' : 'Parent'}
                      </strong>
                      {msg.text}
                      <span style={{ display: 'block', fontSize: '0.7rem', opacity: 0.6, marginTop: '0.3rem', textAlign: 'right' }}>{time}</span>
                    </div>
                  )})}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)}
                    onKeyDown={async e => {
                      if (e.key === 'Enter' && newMessage.trim()) {
                         const msg = { parent_email: selectedChildEmail, sender_role: 'teacher', text: newMessage }
                         setMessages([...messages, { ...msg, created_at: new Date().toISOString() }])
                         setNewMessage('')
                         const { error } = await supabase.from('chat_messages').insert([msg])
                         if (!error) fetchMessages(selectedChildEmail)
                         else alert('Could not send message. Please ensure the chat_messages table exists in Supabase.')
                      }
                    }}
                    placeholder="Reply to parent..."
                    style={{ flex: 1, padding: '0.9rem', borderRadius: '8px', border: '1px solid #ccc' }} />
                  <button className="btn btn-primary" onClick={async () => {
                    if (newMessage.trim()) {
                      const msg = { parent_email: selectedChildEmail, sender_role: 'teacher', text: newMessage }
                      setMessages([...messages, { ...msg, created_at: new Date().toISOString() }])
                      setNewMessage('')
                      const { error } = await supabase.from('chat_messages').insert([msg])
                      if (!error) fetchMessages(selectedChildEmail)
                      else alert('Could not send message. Please ensure the chat_messages table exists in Supabase.')
                    }
                  }}>Send</button>
                </div>
              </>
            ) : (
              <div style={{ flex: 1, display:'flex', alignItems:'center', justifyContent:'center', border: '1px dashed #cbd5e1', borderRadius: '8px', color: '#64748b', background: '#f8fafc' }}>
                Please select a parent from the left sidebar to view or send messages.
              </div>
            )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
