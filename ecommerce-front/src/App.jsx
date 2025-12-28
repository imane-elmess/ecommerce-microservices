import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { useAuth } from './auth/AuthContext.jsx'
import ProtectedRoute from './auth/ProtectedRoute.jsx'
import LoginPage from './pages/LoginPage.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import CatalogPage from './pages/CatalogPage.jsx'

function HomeRedirect() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? (
    <Navigate to="/catalog" replace />
  ) : (
    <Navigate to="/login" replace />
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/catalog"
        element={
          <ProtectedRoute>
            <CatalogPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<HomeRedirect />} />
    </Routes>
  )
}

export default App
