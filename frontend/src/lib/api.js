import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Token bor bo'lsa qo'shish
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - token expired
      if (typeof window !== 'undefined') {
        localStorage.removeItem('admin_token')
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(error)
  }
)

// API methods
export const postsAPI = {
  getAll: (params) => api.get('/posts', { params }),
  getBySlug: (slug) => api.get(`/posts/${slug}`),
  getCategories: () => api.get('/posts/meta/categories'),
  getPopular: (limit = 5) => api.get('/posts/meta/popular', { params: { limit } }),
  search: (query) => api.get('/posts/search', { params: { q: query } }),
  like: (slug) => api.post(`/posts/${slug}/like`),
}
export const servicesAPI = {
  getAll: () => api.get('/services'),
  getById: (id) => api.get(`/services/${id}`),
}

export const contactAPI = {
  send: (data) => api.post('/contact', data),
}

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
}

export const adminAPI = {
  // Posts management
  getAllPosts: () => api.get('/admin/posts'),
  createPost: (postData) => api.post('/admin/posts', postData),
  updatePost: (id, postData) => api.put(`/admin/posts/${id}`, postData),
  deletePost: (id) => api.delete(`/admin/posts/${id}`),
  
  // Contacts management
  getAllContacts: () => api.get('/admin/contacts'),
  updateContact: (id, data) => api.put(`/admin/contacts/${id}`, data),
  deleteContact: (id) => api.delete(`/admin/contacts/${id}`),
  
  // Portfolio management
  getAllPortfolio: () => api.get('/admin/portfolio'),
  createPortfolio: (portfolioData) => api.post('/admin/portfolio', portfolioData),
  updatePortfolio: (id, portfolioData) => api.put(`/admin/portfolio/${id}`, portfolioData),
  deletePortfolio: (id) => api.delete(`/admin/portfolio/${id}`),
  
  // Dashboard stats
  getStats: () => api.get('/admin/stats'),
}

export default api