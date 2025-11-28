// index.js 
// -----------------------------------------
// Servidor Express para la landing Vidrios Villarroel
//
// ✅ Ahora:
//  - Conectado a MongoDB (Mongoose)
//  - Rutas modularizadas (public, admin, auth)
//  - Soporta JWT en cookie (cookie-parser)
//  - CORS configurado para trabajar con el front en React
//
// Rutas principales:
//  - GET  /health
//  - POST /api/contact
//  - POST /api/auth/login
//  - POST /api/auth/logout
//  - GET  /api/admin/submissions
//  - PATCH /api/admin/submissions/:id
// -----------------------------------------

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

// Configuración centralizada
const { PORT, CLIENT_ORIGIN } = require('./config/serverConfig')

// Conexión a la base de datos MongoDB
const connectDB = require('./config/db')

// Rutas
const publicRoutes = require('./routes/publicRoutes')
const adminRoutes = require('./routes/adminRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express()

// -----------------------------------------
// Conectar a MongoDB al iniciar el servidor
// -----------------------------------------
connectDB()

// -----------------------------------------
// Middlewares globales
// -----------------------------------------

// CORS: permite que el frontend (por ejemplo Vite) haga peticiones
// y envíe/reciba cookies (credentials: 'include')
app.use(
  cors({
    origin: CLIENT_ORIGIN, // ej: 'http://localhost:5173'
    credentials: true,     // permite el envío de cookies
  })
)

// Parseo de JSON en el body
app.use(express.json())

// Habilitar lectura de cookies (req.cookies)
app.use(cookieParser())

// -----------------------------------------
// Rutas
// -----------------------------------------

// Rutas públicas: health + formulario de contacto
app.use('/', publicRoutes)

// Rutas de autenticación (login/logout admin)
app.use('/api/auth', authRoutes)

// Rutas protegidas de administrador (requieren JWT válido)
app.use('/api/admin', adminRoutes)

// -----------------------------------------
// Handler 404 (cualquier ruta no definida)
// -----------------------------------------

app.use((req, res) => {
  res.status(404).json({ error: 'No encontrado' })
})

// -----------------------------------------
// Inicio del servidor
// -----------------------------------------

const server = app.listen(PORT, () => {
  console.log(`Servidor de Vidrios Villarroel escuchando en puerto ${PORT}`)
})

// -----------------------------------------
// Manejo elegante de cierre (Ctrl+C, SIGINT/SIGTERM)
// -----------------------------------------

process.on('SIGINT', () => {
  console.log('Cerrando por SIGINT...')
  server.close(() => process.exit(0))
})

process.on('SIGTERM', () => {
  console.log('Cerrando por SIGTERM...')
  server.close(() => process.exit(0))
})
