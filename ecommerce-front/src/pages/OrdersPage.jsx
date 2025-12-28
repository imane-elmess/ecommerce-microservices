import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchOrders, placeOrder } from '../api/api.js'
import { useAuth } from '../auth/AuthContext.jsx'

function OrdersPage() {
  const navigate = useNavigate()
  const { logout, role } = useAuth()
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')
  const [productId, setProductId] = useState('')
  const [quantity, setQuantity] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const loadOrders = async () => {
    setError('')
    setIsLoading(true)
    try {
      const data = await fetchOrders()
      setOrders(Array.isArray(data) ? data : [])
    } catch (err) {
      setError("Impossible de charger les commandes. Reessayez plus tard.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormError('')
    setIsSubmitting(true)
    try {
      await placeOrder(productId, quantity)
      setProductId('')
      setQuantity('')
      await loadOrders()
    } catch (err) {
      setFormError("Echec d'envoi de la commande.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page">
      <nav className="navbar">
        <div className="nav-left">
          <span className="brand">
            <i className="ri-store-2-line" />
            E-Shop
          </span>
          <span className="role-badge">
            <i className="ri-shield-user-line" />
            {role || 'UNKNOWN'}
          </span>
        </div>
        <div className="nav-links">
          <Link to="/catalog">
            <i className="ri-store-3-line" />
            Catalogue
          </Link>
          <Link to="/orders">
            <i className="ri-file-list-3-line" />
            Commandes
          </Link>
          <button type="button" className="ghost-button" onClick={handleLogout}>
            <i className="ri-logout-box-line" />
            Logout
          </button>
        </div>
      </nav>
      <header className="page-header">
        <div>
          <h1>Commandes</h1>
          <p className="subtitle">Historique et creation de commandes.</p>
        </div>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <div className="stat-icon">
            <i className="ri-shopping-cart-2-line" />
          </div>
          <div>
            <p className="stat-label">Commandes jour</p>
            <h3>36</h3>
          </div>
        </article>
        <article className="stat-card">
          <div className="stat-icon">
            <i className="ri-time-line" />
          </div>
          <div>
            <p className="stat-label">Traitement</p>
            <h3>2h</h3>
          </div>
        </article>
        <article className="stat-card">
          <div className="stat-icon">
            <i className="ri-shield-check-line" />
          </div>
          <div>
            <p className="stat-label">Succes</p>
            <h3>98%</h3>
          </div>
        </article>
      </section>

      <section className="card">
        <h2>Passer une commande</h2>
        <form onSubmit={handleSubmit} className="form form-row">
          <label className="field">
            <span>Product ID</span>
            <input
              type="number"
              value={productId}
              onChange={(event) => setProductId(event.target.value)}
              min="1"
              required
            />
          </label>
          <label className="field">
            <span>Quantite</span>
            <input
              type="number"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              min="1"
              required
            />
          </label>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Envoi...' : 'Commander'}
          </button>
        </form>
        {formError ? <p className="error">{formError}</p> : null}
      </section>

      {isLoading ? <p>Chargement...</p> : null}
      {error ? <p className="error">{error}</p> : null}

      {!isLoading && !error ? (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product ID</th>
              <th>Quantite</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.productId}</td>
                <td>{order.quantity}</td>
                <td>{order.status ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  )
}

export default OrdersPage
