import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail } from 'lucide-react'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (email === 'itumeleng.mahwa@gmail.com' && password === '12345678') {
      navigate('/admin')
    } else if (email === 'teacher@thebeacon.co.za' && password === '12345678') {
      navigate('/teacher')
    } else {
      setError('Invalid credentials. Please try again.')
    }
  }

  return (
    <div className="login-page">
      <div className="login-container card-glass">
        <div className="login-header">
          <Lock size={40} className="login-icon" />
          <h2>Staff Login</h2>
          <p>Access the smart childcare platform</p>
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

          <button type="submit" className="btn btn-primary login-btn">
            Login
          </button>
        </form>
        <div className="login-footer">
          <strong>Mock Credentials:</strong><br/>
          <span style={{color: 'var(--primary)'}}>Admin:</span> itumeleng.mahwa@gmail.com / 12345678<br/>
          <span style={{color: 'var(--primary)'}}>Teacher:</span> teacher@thebeacon.co.za / 12345678
        </div>
      </div>
    </div>
  )
}
