import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchCatalog } from '../api/api.js'
import { useAuth } from '../auth/AuthContext.jsx'

function CatalogPage() {
  const navigate = useNavigate()
  const { logout } = useAuth()
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
      <header className="page-header">
        <div>
          <h1>Catalogue</h1>
          <p className="subtitle">Produits disponibles via API Gateway.</p>
        </div>
        <div className="actions">
          <Link to="/orders">Voir les commandes</Link>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

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
