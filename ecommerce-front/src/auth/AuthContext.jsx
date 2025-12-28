import { createContext, useContext, useMemo, useState } from 'react'
import { login as apiLogin } from '../api/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '')
  const [role, setRole] = useState(() => localStorage.getItem('role') || '')

  const isAuthenticated = Boolean(token)

  const login = async (username, password) => {
    const data = await apiLogin(username, password)
    localStorage.setItem('token', data.token)
    localStorage.setItem('role', data.role)
    setToken(data.token)
    setRole(data.role)
    return data
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    setToken('')
    setRole('')
  }

  const value = useMemo(
    () => ({ token, role, isAuthenticated, login, logout }),
    [token, role, isAuthenticated],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
