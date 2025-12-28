import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchOrders, placeOrder } from '../api/api.js'
import { useAuth } from '../auth/AuthContext.jsx'

function OrdersPage() {
  const navigate = useNavigate()
  const { logout } = useAuth()
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
      <header className="page-header">
        <div>
          <h1>Commandes</h1>
          <p className="subtitle">Historique et creation de commandes.</p>
        </div>
        <div className="actions">
          <Link to="/catalog">Voir le catalogue</Link>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

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
