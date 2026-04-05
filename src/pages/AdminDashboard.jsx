import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, CreditCard, Video, Activity, FileText, Bell, LogOut, Settings, ClipboardList, CheckCircle } from 'lucide-react'
import { supabase } from '../supabaseClient'
import emailjs from '@emailjs/browser'
import './AdminDashboard.css'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')

  // States
  const [students, setStudents] = useState([])
  const [newStudentName, setNewStudentName] = useState('')
  const [newStudentGrade, setNewStudentGrade] = useState('Grade R')
  const [newStudentParent, setNewStudentParent] = useState('')

  const [announcements, setAnnouncements] = useState([])
  const [newAnnouncement, setNewAnnouncement] = useState('')

  const [applications, setApplications] = useState([])

  useEffect(() => {
    fetchAnnouncements()
    fetchApplications()
  }, [])

  const fetchAnnouncements = async () => {
    const { data, error } = await supabase.from('announcements').select('*')
    if (error) {
      console.error('Error fetching announcements:', error)
    } else if (data) {
      // Reverse so newest are at the top
      setAnnouncements(data.reverse())
    }
  }

  const fetchApplications = async () => {
    const { data, error } = await supabase.from('applications').select('*')
    if (error) {
      console.error('Error fetching applications:', error)
    } else if (data) {
      setApplications(data)
    }
  }

  const enrolledStudents = applications.filter(a => ['Enrolled', 'Payment Received'].includes(a.status))

  const handleSendAnnouncement = async () => {
    if (newAnnouncement) {
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      const { data, error } = await supabase
        .from('announcements')
        .insert([{ text: newAnnouncement, time: timeStr }])
        .select()

      if (error) {
        console.error('Error adding announcement:', error)
        alert('Failed to send announcement. Check console.')
      } else if (data) {
        setAnnouncements([data[0], ...announcements])
        setNewAnnouncement('')
      }
    }
  }

  const sidebarItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'admissions', icon: ClipboardList, label: 'Admissions & Inquiries' },
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

        {activeTab === 'dashboard' && (() => {
          const presentToday = enrolledStudents.length > 0 ? enrolledStudents.length : 0 
          const attendanceRate = enrolledStudents.length > 0 ? 100 : 0
          const pendingInvoices = applications.filter(a => a.status === 'Awaiting Payment').length
          const recentLogs = announcements.length
          
          return (
          <>
            <section className="admin-stats">
              <div className="stat-card">
                <h3>Total Active Students</h3>
                <div className="stat-value">{enrolledStudents.length || 0}</div>
                <div className="stat-trend positive">From live enrollments</div>
              </div>
              <div className="stat-card">
                <h3>Present Today</h3>
                <div className="stat-value">{presentToday}</div>
                <div className="stat-trend">{attendanceRate}% attendance rate</div>
              </div>
              <div className="stat-card">
                <h3>Pending Invoices</h3>
                <div className="stat-value">{pendingInvoices}</div>
                <div className="stat-trend" style={{color: pendingInvoices > 0 ? '#ef4444' : '#16a34a'}}>
                  {pendingInvoices > 0 ? 'Requires attention' : 'All accounts settled'}
                </div>
              </div>
              <div className="stat-card">
                <h3>Recent Announcements</h3>
                <div className="stat-value">{recentLogs}</div>
                <div className="stat-trend positive">Logs updated</div>
              </div>
            </section>

            <section className="admin-content-grid">
              <div className="admin-card">
                <h3>Live Activity Feed</h3>
                <ul className="activity-list">
                  {announcements.map((ann, i) => (
                    <li key={i}><strong>{ann.time}:</strong> Admin Announcement: "{ann.text}"</li>
                  ))}
                  {announcements.length === 0 && (
                    <p style={{color: '#64748b', fontSize: '0.9rem', padding: '1rem 0'}}>No recent announcements from Admin.</p>
                  )}
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
          )
        })()}

        {activeTab === 'admissions' && (
          <div className="admin-card">
            <h3 style={{marginBottom: '1rem'}}>Incoming Applications</h3>
            
            {applications.length === 0 ? (
               <p style={{color: '#64748b', textAlign: 'center', padding: '2rem 0'}}>No applications received yet.</p>
            ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {applications.map((app, i) => (
                    <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', background: '#f8fafc' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div>
                          <h4 style={{ margin: 0, fontSize: '1.2rem', color: '#0f172a' }}>{app.child_name} ({app.child_age})</h4>
                          <p style={{ margin: '0.2rem 0', color: '#64748b' }}>Program: {app.program}</p>
                        </div>
                        <span className="status-badge" style={{ background: app.status === 'Approved' ? '#dcfce7' : '#fef08a', color: app.status === 'Approved' ? '#166534' : '#854d0e' }}>
                          {app.status}
                        </span>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem', padding: '1rem', background: 'white', borderRadius: '4px' }}>
                        <div>
                          <strong style={{ display: 'block', fontSize: '0.8rem', color: '#64748b' }}>Parent/Guardian</strong>
                          {app.parent_name}
                        </div>
                        <div>
                          <strong style={{ display: 'block', fontSize: '0.8rem', color: '#64748b' }}>Contact Email</strong>
                          {app.email}
                        </div>
                      </div>
                      
                      {app.message && (
                        <div style={{ marginTop: '1rem', padding: '1rem', background: 'white', borderRadius: '4px' }}>
                          <strong style={{ display: 'block', fontSize: '0.8rem', color: '#64748b' }}>Additional Message</strong>
                          {app.message}
                        </div>
                      )}

                      {(app.doc_birth_certificate || app.doc_parent_id || app.doc_immunization || app.doc_proof_of_address) && (
                        <div style={{ marginTop: '1rem', padding: '1rem', background: 'white', borderRadius: '4px' }}>
                          <strong style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.75rem' }}>📎 Uploaded Documents</strong>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {app.doc_birth_certificate && (
                              <a href={app.doc_birth_certificate} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>📄 Birth Certificate</a>
                            )}
                            {app.doc_parent_id && (
                              <a href={app.doc_parent_id} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>🪪 Parent ID</a>
                            )}
                            {app.doc_immunization && (
                              <a href={app.doc_immunization} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>💉 Immunization Card</a>
                            )}
                            {app.doc_proof_of_address && (
                              <a href={app.doc_proof_of_address} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>📋 Proof of Address</a>
                            )}
                          </div>
                        </div>
                      )}

                      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        {app.status === 'Pending Review' && (
                          <>
                            <button className="btn btn-primary" onClick={async () => {
                              // 1. Update Database
                              const { error } = await supabase.from('applications').update({ status: 'Awaiting Payment' }).eq('email', app.email)
                              if (error) {
                                alert('Error updating: ' + error.message)
                                return
                              }
                              
                              // 2. Send Real Email via EmailJS SDK (handles CORS correctly)
                              try {
                                const result = await emailjs.send(
                                  import.meta.env.VITE_EMAILJS_SERVICE_ID,
                                  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                                  {
                                    to_email: app.email,
                                    parent_name: app.parent_name,
                                    child_name: app.child_name,
                                    payment_link: `http://localhost:5173/pay?email=${encodeURIComponent(app.email)}`
                                  },
                                  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                                )
                                if (result.status === 200) {
                                  alert('✅ Application Approved! Invoice email sent successfully to ' + app.email)
                                } else {
                                  alert('Application Approved but email may not have sent. Status: ' + result.status)
                                }
                              } catch(err) {
                                console.error('EmailJS Error:', err)
                                alert('Application Approved in DB, but email failed: ' + JSON.stringify(err))
                              }
                              
                              fetchApplications() // Refresh UI
                            }}>Approve & Request Payment</button>
                            <button className="btn btn-outline">Reject</button>
                          </>
                        )}

                        {app.status === 'Awaiting Payment' && (
                          <span style={{ color: '#64748b', fontSize: '0.9rem' }}>🕒 Waiting for Parent Payment...</span>
                        )}

                        {app.status === 'Payment Received' && (
                          <button className="btn btn-primary" style={{ background: '#10b981', borderColor: '#10b981' }} onClick={async () => {
                             // 1. Generate secure temp password
                             const tempPassword = 'Beacon' + Math.floor(1000 + Math.random() * 9000) + '!'
                             
                             // 2. Create Supabase Auth Account
                             const { error } = await supabase.auth.signUp({
                               email: app.email,
                               password: tempPassword,
                             })
                             
                             if (error) {
                               alert('Error creating portal account: ' + error.message)
                             } else {
                               // 3. Mark fully enrolled in DB
                               await supabase.from('applications').update({ status: 'Enrolled' }).eq('email', app.email)
                               
                               // 4. Send WELCOME email with credentials using dedicated template
                               try {
                                 await emailjs.send(
                                   import.meta.env.VITE_EMAILJS_SERVICE_ID,
                                   import.meta.env.VITE_EMAILJS_WELCOME_TEMPLATE_ID,
                                   {
                                     to_email: app.email,
                                     parent_name: app.parent_name,
                                     child_name: app.child_name,
                                     email: app.email,
                                     temp_password: tempPassword,
                                     login_url: 'http://localhost:5173/login'
                                   },
                                   import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                                 )
                                 alert(`✅ Portal account created! Welcome email with login credentials sent to ${app.email}`)
                               } catch(emailErr) {
                                 console.error('Welcome email error:', emailErr)
                                 alert(`✅ Portal account created for ${app.email}!\n\nTemporary Password: ${tempPassword}\n\n(Welcome email failed — share credentials manually)`)
                               }
                               
                               fetchApplications()
                             }
                          }}>
                            Generate Portal Account & Admit!
                          </button>
                        )}
                        
                        {app.status === 'Enrolled' && (
                          <span style={{ color: '#10b981', fontWeight: 'bold' }}>✔ Fully Enrolled and Active</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
            )}
          </div>
        )}

        {activeTab === 'students' && (
          <div className="admin-card">
            <h3 style={{marginBottom: '1rem'}}>Enrolled Students Directory</h3>
            
            {enrolledStudents.length === 0 ? (
               <p style={{color: '#64748b', textAlign: 'center', padding: '2rem 0'}}>No enrolled students found in the applications database.</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse', minWidth: '600px'}}>
                    <thead>
                      <tr style={{borderBottom: '1px solid #e2e8f0'}}>
                        <th style={{padding: '1rem'}}>Child Name (Age)</th>
                        <th style={{padding: '1rem'}}>Program</th>
                        <th style={{padding: '1rem'}}>Parent/Guardian</th>
                        <th style={{padding: '1rem'}}>Contact Email</th>
                        <th style={{padding: '1rem'}}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrolledStudents.map((app, i) => (
                        <tr key={i} style={{borderBottom: '1px solid #e2e8f0'}}>
                          <td style={{padding: '1rem', fontWeight: '500'}}>{app.child_name} ({app.child_age})</td>
                          <td style={{padding: '1rem'}}>{app.program}</td>
                          <td style={{padding: '1rem'}}>{app.parent_name}</td>
                          <td style={{padding: '1rem', color: '#64748b'}}>{app.email}</td>
                          <td style={{padding: '1rem'}}>
                             <span className="status-badge ok" style={{ fontSize: '0.75rem' }}>{app.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            )}
          </div>
        )}

        {activeTab === 'attendance' && (() => {
          const gradeRTotal = enrolledStudents.filter(app => app.program === 'Grade R').length
          const gradeRRTotal = enrolledStudents.filter(app => app.program === 'Grade RR').length
          const toddlersTotal = enrolledStudents.filter(app => app.program === 'Toddlers').length
          
          return (
            <div className="admin-card">
              <h3>Today's Attendance Overview</h3>
              <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Mapping real enrolled students from applications database. (Assuming 100% presence for demo purposes)</p>
              
              {enrolledStudents.length === 0 ? (
                 <p style={{color: '#64748b', textAlign: 'center'}}>No enrolled students to track.</p>
              ) : (
                <div style={{marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                   <ul className="status-list">
                      <li>
                        <span>Grade R</span> 
                        <span className="status-badge ok" style={{ background: gradeRTotal === 0 ? '#f1f5f9' : '#dcfce7', color: gradeRTotal === 0 ? '#64748b' : '#166534' }}>
                          {gradeRTotal}/{gradeRTotal} Present
                        </span>
                      </li>
                      <li>
                        <span>Grade RR</span> 
                        <span className="status-badge ok" style={{ background: gradeRRTotal === 0 ? '#f1f5f9' : '#dcfce7', color: gradeRRTotal === 0 ? '#64748b' : '#166534' }}>
                          {gradeRRTotal}/{gradeRRTotal} Present
                        </span>
                      </li>
                      <li>
                        <span>Toddlers</span> 
                        <span className="status-badge ok" style={{ background: toddlersTotal === 0 ? '#f1f5f9' : '#dcfce7', color: toddlersTotal === 0 ? '#64748b' : '#166534' }}>
                          {toddlersTotal}/{toddlersTotal} Present
                        </span>
                      </li>
                    </ul>
                </div>
              )}
            </div>
          )
        })()}

        {activeTab === 'payments' && (
          <div className="admin-card">
            <h3>Payment Records</h3>
            <p style={{color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem'}}>Showing all applications where payment has been received.</p>
            {applications.filter(a => a.status === 'Payment Received' || a.status === 'Enrolled').length === 0 ? (
              <p style={{color: '#64748b', textAlign: 'center', padding: '2rem 0'}}>No payments received yet.</p>
            ) : (
              <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
                <thead>
                  <tr style={{borderBottom: '2px solid #e2e8f0'}}>
                    <th style={{padding: '1rem'}}>Parent</th>
                    <th style={{padding: '1rem'}}>Child</th>
                    <th style={{padding: '1rem'}}>Program</th>
                    <th style={{padding: '1rem'}}>Amount</th>
                    <th style={{padding: '1rem'}}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.filter(a => a.status === 'Payment Received' || a.status === 'Enrolled').map((app, i) => (
                    <tr key={i} style={{borderBottom: '1px solid #e2e8f0'}}>
                      <td style={{padding: '1rem'}}>{app.parent_name}</td>
                      <td style={{padding: '1rem'}}>{app.child_name}</td>
                      <td style={{padding: '1rem'}}>{app.program}</td>
                      <td style={{padding: '1rem', fontWeight: 'bold', color: '#16a34a'}}>R 1,500.00</td>
                      <td style={{padding: '1rem'}}>
                        <span className="status-badge ok">{app.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'cctv' && (
          <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <h3 style={{ margin: 0 }}>Live Camera Feeds</h3>
               <span className="status-badge ok" style={{ animation: 'pulse 2s infinite', background: '#fee2e2', color: '#ef4444', border: '1px solid #fca5a5' }}>🔴 LIVE REC</span>
            </div>
            
            {/* INJECT ANIMATION KEYFRAME */}
            <style>{`
              @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.5; }
                100% { opacity: 1; }
              }
            `}</style>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1.5rem'}}>
               {/* CAM 1 */}
               <div style={{background: '#0f172a', height: '220px', borderRadius: '12px', overflow: 'hidden', position: 'relative', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}}>
                 <div style={{position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.6)', color: 'white', padding: '4px 8px', fontSize: '11px', borderRadius: '4px', zIndex: 10, letterSpacing: '1px'}}>CAM 1 - MAIN GATE</div>
                 <span style={{position:'absolute', top:12, right: 12, color:'#f87171', fontSize:'11px', fontWeight:'700', zIndex: 10, animation: 'pulse 1s infinite'}}>● REC</span>
                 <span style={{position:'absolute', bottom:12, right: 12, color:'rgba(255,255,255,0.7)', fontSize:'11px', zIndex: 10, fontFamily: 'monospace'}}>{new Date().toLocaleTimeString()}</span>
                 <video autoPlay loop muted playsInline style={{width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, filter: 'contrast(1.1) brightness(0.9)'}}>
                    <source src="https://videos.pexels.com/video-files/3121459/3121459-sd_640_360_24fps.mp4" type="video/mp4" />
                 </video>
               </div>
               
               {/* CAM 2 */}
               <div style={{background: '#0f172a', height: '220px', borderRadius: '12px', overflow: 'hidden', position: 'relative', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}}>
                 <div style={{position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.6)', color: 'white', padding: '4px 8px', fontSize: '11px', borderRadius: '4px', zIndex: 10, letterSpacing: '1px'}}>CAM 2 - PLAYGROUND</div>
                 <span style={{position:'absolute', top:12, right: 12, color:'#f87171', fontSize:'11px', fontWeight:'700', zIndex: 10, animation: 'pulse 1s infinite'}}>● REC</span>
                 <span style={{position:'absolute', bottom:12, right: 12, color:'rgba(255,255,255,0.7)', fontSize:'11px', zIndex: 10, fontFamily: 'monospace'}}>{new Date().toLocaleTimeString()}</span>
                 <video autoPlay loop muted playsInline style={{width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, filter: 'contrast(1.1) brightness(0.9)'}}>
                    <source src="https://videos.pexels.com/video-files/3045163/3045163-sd_640_360_24fps.mp4" type="video/mp4" />
                 </video>
               </div>
               
               {/* CAM 3 */}
               <div style={{background: '#0f172a', height: '220px', borderRadius: '12px', overflow: 'hidden', position: 'relative', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}}>
                 <div style={{position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.6)', color: 'white', padding: '4px 8px', fontSize: '11px', borderRadius: '4px', zIndex: 10, letterSpacing: '1px'}}>CAM 3 - CLASSROOM</div>
                 <span style={{position:'absolute', top:12, right: 12, color:'#f87171', fontSize:'11px', fontWeight:'700', zIndex: 10, animation: 'pulse 1s infinite'}}>● REC</span>
                 <span style={{position:'absolute', bottom:12, right: 12, color:'rgba(255,255,255,0.7)', fontSize:'11px', zIndex: 10, fontFamily: 'monospace'}}>{new Date().toLocaleTimeString()}</span>
                 <video autoPlay loop muted playsInline style={{width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, filter: 'contrast(1.1) brightness(0.9) grayscale(0.2)'}}>
                    <source src="https://videos.pexels.com/video-files/4204859/4204859-sd_640_360_25fps.mp4" type="video/mp4" />
                 </video>
               </div>
               
               {/* CAM 4 (Offline Placeholder) */}
               <div style={{background: '#1e293b', height: '220px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#64748b', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}}>
                 <Video size={32} style={{marginBottom: '0.5rem', opacity: 0.5}}/>
                 <span style={{fontWeight: '600', letterSpacing: '1px'}}>CAM 4 - HALLWAY</span>
                 <span style={{fontSize: '0.8rem', marginTop: '0.2rem', color: '#ef4444'}}>NO SIGNAL</span>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="admin-card">
             <h3>Generated Reports</h3>
             <div style={{display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap'}}>
                <button className="btn btn-outline" onClick={() => alert('Downloading PDF...')}>Monthly Attendance PDF</button>
                <button className="btn btn-outline" onClick={() => alert('Downloading Excel...')}>Financial Summary Excel</button>
                <button className="btn btn-outline">Incident Logs</button>
             </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="admin-card">
             <h3>Send Announcement</h3>
             <div style={{marginTop: '1rem'}}>
               <textarea 
                  value={newAnnouncement}
                  onChange={(e) => setNewAnnouncement(e.target.value)}
                  placeholder="Type your message here..." 
                  style={{width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #ccc', minHeight: '100px'}}
                />
               <button className="btn btn-primary" style={{marginTop: '1rem'}} onClick={handleSendAnnouncement}>Push Notification to Parents</button>
             </div>
             {announcements.length > 0 && (
                <>
                  <h4 style={{marginTop: '2rem'}}>Recent Announcements</h4>
                  <ul className="activity-list" style={{marginTop: '1rem'}}>
                     {announcements.map((ann, i) => <li key={i}><strong>{ann.time}:</strong> {ann.text}</li>)}
                  </ul>
                </>
             )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="admin-card">
             <h3>System Settings</h3>
             <div style={{marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <div>
                  <label style={{display: 'block', fontWeight: 'bold', marginBottom: '0.2rem'}}>School Name</label>
                  <input type="text" defaultValue="The Beacon Academy" readOnly style={{padding: '0.5rem', width: '100%', maxWidth: '300px', borderRadius: '4px', border: '1px solid #ccc'}}/>
                </div>
                <div>
                  <label style={{display: 'block', fontWeight: 'bold', marginBottom: '0.2rem'}}>Academic Year</label>
                  <input type="text" defaultValue="2026" readOnly style={{padding: '0.5rem', width: '100%', maxWidth: '300px', borderRadius: '4px', border: '1px solid #ccc'}}/>
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  )
}
