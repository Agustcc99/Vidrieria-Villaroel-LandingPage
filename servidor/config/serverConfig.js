// config/serverConfig.js
// --------------------------------------------
// Centraliza TODA la configuración del servidor:
//  - Variables de entorno (.env)
//  - Puertos
//  - URL de MongoDB
//  - Secret de JWT
//  - Credenciales del admin
//  - Config de CORS y cookies
// --------------------------------------------

// Cargar las variables desde .env
require('dotenv').config()

// --------------------------------------------
// Configuración básica
// --------------------------------------------

// Puerto del servidor
const PORT = process.env.PORT || 4000

// URL de MongoDB
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vidrios_villarroel'

// Clave secreta para firmar JWT
const JWT_SECRET =
  process.env.JWT_SECRET || 'cambia-este-secreto-en-produccion'

// Origen permitido para CORS (frontend)
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

// --------------------------------------------
// Cookie donde guardaremos el JWT del admin
// --------------------------------------------

const COOKIE_CONFIG = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // true solo en HTTPS real
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
  path: '/',
}

// --------------------------------------------
// Credenciales del administrador
// (más adelante puedes moverlas a MongoDB)
// --------------------------------------------

// Email permitido para login de admin
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@vidrios.com'

// Password permitido para login de admin
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin1234'

// --------------------------------------------
// Exportar t0do para usar en cualquier parte
// --------------------------------------------

module.exports = {
  PORT,
  MONGO_URI,
  JWT_SECRET,
  CLIENT_ORIGIN,
  COOKIE_CONFIG,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
}
