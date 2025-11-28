// routes/adminRoutes.js
// ----------------------------------------------------------
// Rutas protegidas (panel admin) para gestionar los contactos:
//
//  - GET   /api/admin/submissions
//        -> Lista todos los formularios recibidos
//
//  - PATCH /api/admin/submissions/:id
//        -> Cambia el estado de un formulario específico
//
//  IMPORTANTE:
//  - Estas rutas están protegidas por el middleware adminAuth.
//  - El acceso real lo vamos a manejar con JWT en una cookie,
//    pero la firma del middleware no cambia: (req, res, next).
// ----------------------------------------------------------

const express = require('express')
const adminAuth = require('../middleware/adminAuth')
// Ahora usamos el modelo de Mongo en vez de la "DB en memoria"
const Submission = require('../models/submission')

const router = express.Router()

const validStates = [
  "pendiente",
  "contestado",
  "terminado",
  "especial",
  "proceso",
];




// Aplica el middleware de autenticación a TODAS las rutas de este router.
// Es decir: cualquier /api/admin/* pasa primero por adminAuth.
router.use(adminAuth)

// ----------------------------------------------------------
// GET /api/admin/submissions
// Devuelve la lista completa de contactos almacenados en MongoDB
// ----------------------------------------------------------

router.get('/submissions', async (req, res) => {
  try {
    // Buscar todas las submissions ordenadas de más nueva a más vieja
    const items = await Submission.find().sort({ recibidoEn: -1 })

    return res.json({ items })
  } catch (error) {
    console.error('Error al obtener submissions:', error.message)
    return res
      .status(500)
      .json({ error: 'Error al obtener los contactos desde la base de datos' })
  }
})

// ----------------------------------------------------------
// PATCH /api/admin/submissions/:id
// Cambia el estado de un contacto:
//   Estados válidos: 'pendiente' | 'contestado' | 'terminado'
//
// NOTA FRONT:
//  - Ahora el :id es el _id de Mongo (string), no un número.
//  - En el frontend vas a tener que mandar ese _id en la URL.
// ----------------------------------------------------------

router.patch('/submissions/:id', async (req, res) => {
  const { id } = req.params
  const { estado } = req.body || {}


  // Validamos que el estado sea uno de los permitidos
  if (!validStates.includes(estado)) {
    return res.status(400).json({ error: 'Estado inválido' })
  }

  try {
    // Buscamos y actualizamos en UNA sola operación
    const actualizado = await Submission.findByIdAndUpdate(
      id,
      { estado },
      { new: true } // new: true -> devuelve el documento ya actualizado
    )

    if (!actualizado) {
      return res.status(404).json({ error: 'No encontrado' })
    }

    return res.json({ item: actualizado })
  } catch (error) {
    console.error('Error al actualizar estado:', error.message)
    return res
      .status(500)
      .json({ error: 'Error al actualizar el estado en la base de datos' })
  }
})

module.exports = router
