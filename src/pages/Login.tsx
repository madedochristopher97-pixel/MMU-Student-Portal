import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import '../styles/Login.css'

export default function Login() {
  const [userType, setUserType] = useState<'student' | 'parent'>('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const fillDemoCredentials = () => {
    setEmail('demo@student.edu')
    setPassword('password123')
  }

  return (
    <div className="login-page">
      {/* Background Decoration */}
      <div className="login-bg-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>

      <div className="login-container">
        {/* Logo Section */}
        <div className="login-header">
          <div className="logo-icon-mmu">
            <img 
              src="/mmu logo .png" 
              alt="MMU Logo" 
              className="mmu-logo-img"
            />
          </div>
          <h1 className="login-title">Student Portal</h1>
          <p className="login-subtitle">Multimedia University</p>
        </div>

        {/* User Type Toggle */}
        <div className="user-type-toggle">
          <button
            type="button"
            className={`toggle-button ${userType === 'student' ? 'active' : ''}`}
            onClick={() => setUserType('student')}
          >
            Student
          </button>
          <button
            type="button"
            className={`toggle-button ${userType === 'parent' ? 'active' : ''}`}
            onClick={() => setUserType('parent')}
          >
            Parent
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              {userType === 'student' ? 'Email or Student ID' : 'Parent Email or ID'}
            </label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input
                type="text"
                id="email"
                className="form-input"
                placeholder={userType === 'student' ? 'Enter your email or student ID' : 'Enter your parent email or ID'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Logging in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Demo Info */}
        <div className="demo-info">
          <p className="demo-title">Demo Credentials</p>
          <div className="demo-credentials">
            <div className="demo-item">
              <strong>Email:</strong> demo@student.edu
            </div>
            <div className="demo-item">
              <strong>Password:</strong> password123
            </div>
          </div>
          <button 
            type="button" 
            className="demo-fill-button"
            onClick={fillDemoCredentials}
          >
            Use Demo Credentials
          </button>
        </div>

        {/* Footer */}
        <div className="login-footer">
          <p>© 2025 Multimedia University. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
