// src/config/api.js
// -------------------------------------------------------------
// Archivo de configuración de las URLs del backend.
//
// El objetivo es:
//  ✓ Centralizar la base URL de la API
//  ✓ Permitir cambiar entre local y producción fácilmente
//  ✓ Evitar rutas mal formadas (ej: https://site.com/api/api/...)
// -------------------------------------------------------------

/**
 * Determina la URL base del backend según:
 * - VITE_API_URL (si está definida en .env)
 * - http://localhost:4000 como fallback
 *
 * Además, limpia rutas que terminen accidentalmente en /api/contact
 * para evitar duplicados.
 */
const resolveApiBase = () => {
  const envUrl = import.meta.env.VITE_API_URL

  // Si la variable VITE_API_URL existe, intentamos usarla
  if (envUrl) {
    try {
      // Validamos que sea una URL bien formada
      const url = new URL(envUrl)

      // Limpieza de ruta, por si terminaba en /api/contact
      return `${url.origin}${url.pathname.replace(/\/api\/contact$/, '')}`
    } catch (error) {
      // Si falla el parseo, devolvemos la versión "limpia"
      console.warn("URL inválida en VITE_API_URL:", error.message)

      return envUrl.replace(/\/api\/contact$/, '')
    }
  }

  // Si no hay variable de entorno → usamos el backend local
  return 'http://localhost:4000'
}

// Base definitiva de la API
const API_BASE = resolveApiBase()

// Endpoint para enviar el formulario desde la landing
const API_URL = `${API_BASE}/api/contact`

// Endpoint para listar contactos (solo admin)
const ADMIN_API = `${API_BASE}/api/admin/submissions`

export { resolveApiBase, API_BASE, API_URL, ADMIN_API }
