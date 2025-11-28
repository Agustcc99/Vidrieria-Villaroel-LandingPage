// middleware/adminAuth.js
// ---------------------------------------------------
// Middleware para proteger rutas de administrador.
//
// Lógica:
//  - Lee la cookie "token" (puesta en el login)
//  - Verifica el JWT con JWT_SECRET
//  - Se asegura de que el usuario tenga role: "admin"
//  - Si t0do OK, guarda los datos en req.user y sigue
// ---------------------------------------------------

const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/serverConfig')

const adminAuth = (req, res, next) => {
  try {
    // Leer la cookie "token" (gracias a cookie-parser)
    const token = req.cookies?.token

    if (!token) {
      return res.status(401).json({ error: 'No autorizado: falta token' })
    }

    // Verificar y decodificar el JWT
    const payload = jwt.verify(token, JWT_SECRET)

    // Opcional: chequear role específico
    if (payload.role !== 'admin') {
      return res.status(403).json({ error: 'No autorizado: rol inválido' })
    }

    // Guardamos el payload para uso posterior en los controladores
    req.user = payload

    next()
  } catch (error) {
    console.error('Error verificando JWT:', error.message)
    return res.status(401).json({ error: 'Token inválido o expirado' })
  }
}

module.exports = adminAuth
