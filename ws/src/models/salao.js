const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salaoSchema = new Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  foto: String, // Assuming you'll store a URL or reference to the image
  capa: String, // Assuming you'll store a URL or reference to the cover image
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    // Validate email format using regex
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  senha: {
    type: String,
    required: true,
    minlength: 6, // Example minimum length
  },
  telefone: {
    type: String,
    // Validate phone number format using regex
    match: /^[0-9]{10,11}$/, // Example: 10 to 11 digits
  },
  recipientId: String, // Example field, adjust validation as needed
  endereco: {
    cidade: String,
    uf: String,
    cep: {
      type: String,
      // Validate Brazilian zip code (CEP) format using regex
      match: /^[0-9]{5}-[0-9]{3}$/, // Example: 12345-678
    },
    logradouro: String,
    numero: String,
    pais: String,
  },
  geo: {
    type: String,
    coordinates: [],
  },
  dataCadastro: {
    type: Date,
    default: Date.now,
  },
});

// Index for geo location
salaoSchema.index({ geo: "2dsphere" });

module.exports = mongoose.model("Salao", salaoSchema);
