import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail, ShieldCheck, BookOpen, Baby } from 'lucide-react'
import { supabase } from '../supabaseClient'
import './Login.css'

export default function Login() {
  const [role, setRole] = useState('parent') // 'admin' | 'teacher' | 'parent'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (role === 'admin') {
      // Admin: hardcoded credentials
      if (email === 'itumeleng.mahwa@gmail.com' && password === '12345678') {
        navigate('/admin')
      } else {
        setError('Invalid admin credentials.')
      }
      setLoading(false)
      return
    }

    if (role === 'teacher') {
      // Teacher: hardcoded credentials
      if (email === 'teacher@thebeacon.co.za' && password === '12345678') {
        navigate('/teacher')
      } else {
        setError('Invalid teacher credentials.')
      }
      setLoading(false)
      return
    }

    if (role === 'parent') {
      // Parent: real Supabase Auth login
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError('Invalid credentials. Please check your email and password, or confirm your account via the email sent to you.')
      } else if (data.user) {
        navigate('/parent')
      }
      setLoading(false)
      return
    }
  }

  const roles = [
    { id: 'parent', label: 'Parent', icon: Baby, color: '#8b5cf6', hint: 'Login with credentials from your Welcome Email' },
    { id: 'teacher', label: 'Teacher', icon: BookOpen, color: '#f39c12', hint: 'Login with your school-issued credentials' },
    { id: 'admin', label: 'Admin', icon: ShieldCheck, color: '#0f172a', hint: 'Login with your administrator credentials' },
  ]

  const activeRole = roles.find(r => r.id === role)

  return (
    <div className="login-page">
      <div className="login-container card-glass" style={{ maxWidth: '460px' }}>
        <div className="login-header">
          <img src="/logo.jpeg" alt="Logo" style={{ width: '60px', borderRadius: '50%', marginBottom: '1rem' }} />
          <h2>Portal Login</h2>
          <p>Select your role to continue</p>
        </div>

        {/* Role Selector */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {roles.map(r => (
            <button
              key={r.id}
              type="button"
              onClick={() => { setRole(r.id); setError(''); setEmail(''); setPassword('') }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.8rem 0.5rem',
                borderRadius: '10px',
                border: `2px solid ${role === r.id ? r.color : '#e2e8f0'}`,
                background: role === r.id ? r.color : 'white',
                color: role === r.id ? 'white' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontWeight: role === r.id ? '700' : '500',
                fontSize: '0.85rem'
              }}
            >
              <r.icon size={20} />
              {r.label}
            </button>
          ))}
        </div>

        {/* Role Hint */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#475569' }}>
          ℹ️ {activeRole?.hint}
        </div>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrap">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrap">
              <Lock className="input-icon" size={18} />
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary login-btn"
            disabled={loading}
            style={{ background: activeRole?.color, borderColor: activeRole?.color }}
          >
            {loading ? 'Logging in...' : `Login as ${activeRole?.label}`}
          </button>
        </form>

        {/* Staff shortcuts for demo */}
        {role !== 'parent' && (
          <div className="login-footer">
            <strong>Demo Credentials:</strong><br />
            {role === 'admin' && <span>itumeleng.mahwa@gmail.com / 12345678</span>}
            {role === 'teacher' && <span>teacher@thebeacon.co.za / 12345678</span>}
          </div>
        )}
      </div>
    </div>
  )
}
