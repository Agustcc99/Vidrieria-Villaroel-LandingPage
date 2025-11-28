// routes/publicRoutes.js
// ----------------------------------------------------------
// Rutas públicas del servidor:
//  - GET  /health              -> health-check simple
//  - POST /api/contact         -> recibe formulario de la landing
//
// Estas rutas NO requieren autenticación.
// ----------------------------------------------------------

const express = require('express')
const router = express.Router()

// Usamos el modelo de Mongo en vez de la "DB en memoria"
const Submission = require('../models/submission')

// ----------------------------------------------------------
// GET /health
// Endpoint simple para verificar que el servidor está vivo.
// Útil para monitoreo o para servicios como Render.
// ----------------------------------------------------------

router.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

// ----------------------------------------------------------
// POST /api/contact
// Recibe el formulario de contacto desde la landing.
//
// Espera en el body (JSON):
//  - nombre   (string, requerido)
//  - telefono (string, requerido)
//  - email    (string, requerido)
//  - medidas  (string, opcional)
//
// Guarda los datos en MongoDB usando el modelo Submission.
// ----------------------------------------------------------

router.post('/api/contact', async (req, res) => {
  const { nombre, telefono, email, medidas } = req.body || {}

  // Validamos campos obligatorios
  if (!nombre || !telefono || !email) {
    return res.status(400).json({ error: 'Faltan datos obligatorios.' })
  }

  try {
    // Creamos un nuevo documento en Mongo
    const nuevo = await Submission.create({
      nombre,
      telefono,
      email,
      medidas,
    })

    console.log('Nuevo contacto guardado en Mongo:', nuevo)

    return res.json({
      message: 'Recibido, te contactamos en menos de 30 minutos.',
    })
  } catch (error) {
    console.error('Error al guardar contacto en Mongo:', error.message)
    return res
      .status(500)
      .json({ error: 'Error al guardar el contacto en la base de datos.' })
  }
})

module.exports = router
