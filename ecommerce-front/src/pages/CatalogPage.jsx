import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchCatalog } from '../api/api.js'
import { useAuth } from '../auth/AuthContext.jsx'

function CatalogPage() {
  const navigate = useNavigate()
  const { logout, role } = useAuth()
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const loadProducts = async () => {
    setError('')
    setIsLoading(true)
    try {
      const data = await fetchCatalog()
      setProducts(Array.isArray(data) ? data : [])
    } catch (err) {
      setError("Impossible de charger le catalogue. Reessayez plus tard.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
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
          <h1>Catalogue</h1>
          <p className="subtitle">Produits disponibles via API Gateway.</p>
        </div>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <div className="stat-icon">
            <i className="ri-box-3-line" />
          </div>
          <div>
            <p className="stat-label">Produits actifs</p>
            <h3>128</h3>
          </div>
        </article>
        <article className="stat-card">
          <div className="stat-icon">
            <i className="ri-truck-line" />
          </div>
          <div>
            <p className="stat-label">Livraisons</p>
            <h3>24h</h3>
          </div>
        </article>
        <article className="stat-card">
          <div className="stat-icon">
            <i className="ri-bar-chart-2-line" />
          </div>
          <div>
            <p className="stat-label">Taux de stock</p>
            <h3>96%</h3>
          </div>
        </article>
      </section>

      {isLoading ? <p>Chargement...</p> : null}
      {error ? <p className="error">{error}</p> : null}

      {!isLoading && !error ? (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prix</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  )
}

export default CatalogPage
