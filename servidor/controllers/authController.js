// controllers/authController.js
// ---------------------------------------------------
// Controlador de autenticación de administrador
//  - POST /api/auth/login
//  - POST /api/auth/logout
//
// La idea es simple:
//  - Validamos email y password contra valores de configuración
//  - Si son correctos -> generamos un JWT y lo guardamos en cookie
// ---------------------------------------------------

const jwt = require('jsonwebtoken')
const {
  JWT_SECRET,
  COOKIE_CONFIG,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
} = require('../config/serverConfig')

// POST /api/auth/login
// Body esperado: { email, password }
async function login(req, res) {
  const { email, password } = req.body || {}

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: 'Email y password son obligatorios.' })
  }

  // En este caso, comparamos contra credenciales fijas desde .env
  // (Más adelante podrías tener una colección de usuarios en Mongo)
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Credenciales inválidas.' })
  }

  // Armamos el payload del JWT
  const payload = {
    email,
    role: 'admin',
  }

  // Firmamos el token (válido por 7 días, por ejemplo)
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })

  // Guardamos el token en una cookie HTTP-only
  res.cookie('token', token, COOKIE_CONFIG)

  return res.json({
    message: 'Login exitoso',
    user: {
      email,
      role: 'admin',
    },
  })
}

// POST /api/auth/logout
// Elimina la cookie "token"
async function logout(req, res) {
  // Limpiar la cookie (usamos las mismas opciones base)
  res.clearCookie('token', {
    httpOnly: COOKIE_CONFIG.httpOnly,
    secure: COOKIE_CONFIG.secure,
    sameSite: COOKIE_CONFIG.sameSite,
    path: COOKIE_CONFIG.path,
  })

  return res.json({ message: 'Logout exitoso' })
}

module.exports = {
  login,
  logout,
}
