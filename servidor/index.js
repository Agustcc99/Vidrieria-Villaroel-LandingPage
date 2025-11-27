// index.js
// -----------------------------
// Servidor Express sencillo para la landing de Vidrios Villarroel
// Maneja:
//  - POST /api/contact           -> recibe formularios de contacto
//  - GET  /api/admin/submissions -> lista de contactos (solo admin)
//  - PATCH /api/admin/submissions/:id -> cambia el estado del contacto
// -----------------------------

const express = require('express')
const cors = require('cors')

const app = express()

// Puerto donde va a escuchar el servidor
const PORT = process.env.PORT || 4000

// Token de administrador (para proteger el panel /admin)
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'admin123'

// Middlewares globales
app.use(cors())           // Permitir peticiones desde el front (React)
app.use(express.json())   // Parsear JSON en req.body

// Array en memoria para guardar los contactos recibidos
const submissions = []

// Contador simple para asignar IDs únicos a cada contacto
let nextId = 1

// -----------------------------
// Middleware de autenticación admin
// -----------------------------
// Lo usamos en las rutas que empiezan con /api/admin/*
// Verifica que el header Authorization tenga el token correcto
const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.replace('Bearer ', '')

  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'No autorizado' })
  }

  next()
}

// -----------------------------
// Endpoint de health-check
// -----------------------------
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

// -----------------------------
// POST /api/contact
// Recibe los datos del formulario de la landing
// -----------------------------
app.post('/api/contact', (req, res) => {
  const { nombre, telefono, email, medidas } = req.body || {}

  // Validamos campos obligatorios
  if (!nombre || !telefono || !email) {
    return res.status(400).json({ error: 'Faltan datos obligatorios.' })
  }

  // Creamos el objeto que vamos a guardar
  const payload = {
    id: nextId++,                      // ID único incremental
    nombre,
    telefono,
    email,
    medidas: medidas || '',
    estado: 'pendiente',               // Estado inicial por defecto
    recibidoEn: new Date().toISOString(), // Fecha en ISO
  }

  // Guardamos el contacto al inicio del array (el más nuevo primero)
  submissions.unshift(payload)

  // Acá podrías:
  //  - Guardar en una base de datos
  //  - Enviar un email
  //  - Disparar una notificación (Telegram, WhatsApp, etc.)
  console.log('Nuevo contacto recibido:', payload)

  return res.json({
    message: 'Recibido, te contactamos en menos de 30 minutos.',
  })
})

// -----------------------------
// GET /api/admin/submissions
// Devuelve todos los contactos (solo admin)
// -----------------------------
app.get('/api/admin/submissions', adminAuth, (req, res) => {
  return res.json({ items: submissions })
})

// -----------------------------
// PATCH /api/admin/submissions/:id
// Permite cambiar el estado de un contacto:
//  - pendiente
//  - contestado
//  - terminado
// -----------------------------
app.patch('/api/admin/submissions/:id', adminAuth, (req, res) => {
  const id = Number(req.params.id)
  const { estado } = req.body || {}

  const validStates = ['pendiente', 'contestado', 'terminado']

  // Validamos que el estado sea uno de los permitidos
  if (!validStates.includes(estado)) {
    return res.status(400).json({ error: 'Estado inválido' })
  }

  // Buscamos el contacto por ID
  const submission = submissions.find((s) => s.id === id)

  if (!submission) {
    return res.status(404).json({ error: 'No encontrado' })
  }

  // Actualizamos el estado
  submission.estado = estado

  return res.json({ item: submission })
})

// -----------------------------
// Handler 404 (cualquier ruta no definida)
// -----------------------------
app.use((req, res) => {
  res.status(404).json({ error: 'No encontrado' })
})

// -----------------------------
// Inicio del servidor
// -----------------------------
const server = app.listen(PORT, () => {
  console.log(`Servidor de Vidrios Villarroel escuchando en puerto ${PORT}`)
})

// Manejo elegante de cierre (Ctrl+C, etc.)
process.on('SIGINT', () => {
  console.log('Cerrando por SIGINT...')
  server.close(() => process.exit(0))
})

process.on('SIGTERM', () => {
  console.log('Cerrando por SIGTERM...')
  server.close(() => process.exit(0))
})
