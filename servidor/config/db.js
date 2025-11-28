// config/db.js
// --------------------------------------------
// Conexión a MongoDB usando Mongoose
// --------------------------------------------

const mongoose = require('mongoose')
const { MONGO_URI } = require('./serverConfig')

// Función que inicializa la conexión a MongoDB
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('MongoDB conectado correctamente')
  } catch (error) {
    console.error('Error conectando a MongoDB:', error.message)
    process.exit(1) // Corta la app si la DB no conecta
  }
}

module.exports = connectDB
