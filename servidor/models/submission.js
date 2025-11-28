// models/Submission.js
// -------------------------------------------------------
// Modelo de Mongoose para guardar los formularios
// enviados desde la landing de Vidrios Villarroel.
// -------------------------------------------------------

const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    telefono: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    medidas: {
      type: String,
      default: "",
    },
    estado: {
      type: String,
      enum: ["pendiente", "contestado", "terminado", "especial", "proceso"],
      default: "pendiente",
    },
    recibidoEn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false, // evita "__v"
  }
);

// 👇 Muy importante para evitar OverwriteModelError en dev
module.exports =
  mongoose.models.Submission ||
  mongoose.model("Submission", SubmissionSchema);
