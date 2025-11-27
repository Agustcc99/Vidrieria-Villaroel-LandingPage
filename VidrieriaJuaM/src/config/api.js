// src/config/api.js

const resolveApiBase = () => {
  const envUrl = import.meta.env.VITE_API_URL

  if (envUrl) {
    try {
      const url = new URL(envUrl)
      return `${url.origin}${url.pathname.replace(/\/api\/contact$/, '')}`
    } catch (error) {
      console.warn("URL inválida en VITE_API_URL:", error.message);
      return envUrl.replace(/\/api\/contact$/, '');
    }
    
  }

  return 'http://localhost:4000'
}

const API_BASE = resolveApiBase()
const API_URL = `${API_BASE}/api/contact`
const ADMIN_API = `${API_BASE}/api/admin/submissions`

export { resolveApiBase, API_BASE, API_URL, ADMIN_API }
