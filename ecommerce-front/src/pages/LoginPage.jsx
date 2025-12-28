import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await login(username.trim(), password)
      navigate('/catalog', { replace: true })
    } catch (err) {
      setError("Echec de connexion. Verifiez vos identifiants.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page page-center">
      <div className="card card-compact">
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit} className="form">
          <label className="field">
            <span>Username</span>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              required
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          {error ? <p className="error">{error}</p> : null}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Connexion...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
