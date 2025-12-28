import axios from 'axios'

// Use the Vite dev server proxy to avoid CORS in development.
const BASE_URL = ''

const api = axios.create({
  baseURL: BASE_URL,
})

// Interceptor that injects the JWT into every request automatically.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const login = async (username, password) => {
  const response = await api.post('/api/auth/login', { username, password })
  return response.data
}

export const fetchCatalog = async () => {
  const response = await api.get('/api/catalog')
  return response.data
}

export const fetchOrders = async () => {
  const response = await api.get('/api/orders')
  return response.data
}

export const placeOrder = async (productId, quantity) => {
  const response = await api.post('/api/checkout', {
    productId: Number(productId),
    quantity: Number(quantity),
  })
  return response.data
}

export default api
