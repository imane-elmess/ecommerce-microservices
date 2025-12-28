import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext.jsx'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()

  // Protects private routes by redirecting unauthenticated users.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
