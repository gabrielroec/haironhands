const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salaoSchema = new Schema({
  nome: String,
  foto: String,
  capa: String,
  email: String,
  senha: String,
  telefone: String,
  recipientId: String,
  endereco: {
    cidade: String,
    uf: String,
    cep: String,
    logradouro: String,
    numero: String,
    pais: String,
  },
  geo: {
    type: { type: String, default: "Point" }, // Specify the type as "Point"
    coordinates: { type: [Number], default: [0, 0] }, // Array of numbers for coordinates
  },
  dataCadastro: {
    type: Date,
    default: Date.now,
  },
});

// Create a 2dsphere index on the 'geo.coordinates' field
salaoSchema.index({ "geo.coordinates": "2dsphere" });

module.exports = mongoose.model("Salao", salaoSchema);
