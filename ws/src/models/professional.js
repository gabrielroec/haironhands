const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const professional = new Schema({
  name: {
    type: String,
    required: [true, "Nome é obrigatório"],
  },
  picture: String,
  cover: String,
  email: {
    type: String,
    required: [true, "Email é obrigatório"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Senha é obrigatória"],
    minlength: [6, "Senha deve ter no mínimo 6 caracteres"],
  },
  phone: {
    type: String,
    required: [true, "Telefone é obrigatório"],
    unique: true,
  },
  adress: {
    city: String,
    postalCode: String,
    number: String,
    country: String,
    state: String,
  },
  geo: {
    type: String,
    coordinates: Array,
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
});

barberShop.index({ geo: "2dsphere" });

module.exports = mongoose.model("BarberShop", professional);
