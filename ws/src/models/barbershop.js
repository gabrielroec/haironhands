// Import the mongoose library, which is used for MongoDB object modeling
const mongoose = require("mongoose");

// Create a new Schema constructor from mongoose
const Schema = mongoose.Schema;

// Define a new schema for the BarberShop model
const barberShop = new Schema({
  // The name field is a string and is required with a custom error message if not provided
  name: {
    type: String,
    required: [true, "Nome é obrigatório"],
  },
  // The picture field is a string that holds the URL or path to the picture
  picture: String,
  // The cover field is a string that holds the URL or path to the cover image
  cover: String,
  // The email field is a string, required, and must be unique across all BarberShop documents
  email: {
    type: String,
    required: [true, "Email é obrigatório"],
    unique: true,
  },
  // The password field is a string, required, and must be at least 6 characters long with a custom error message if not
  password: {
    type: String,
    required: [true, "Senha é obrigatória"],
    minlength: [6, "Senha deve ter no mínimo 6 caracteres"],
  },
  // The phone field is a string, required, and must be unique across all BarberShop documents
  phone: {
    type: String,
    required: [true, "Telefone é obrigatório"],
    unique: true,
  },
  // The address field is an object containing several string fields for location details
  adress: {
    city: String,
    postalCode: String,
    number: String,
    country: String,
    state: String,
  },
  // The geo field is an object used for geolocation, containing a type and an array of coordinates
  geo: {
    type: String,
    coordinates: Array,
  },
  // The registerDate field is a date that defaults to the current date and time when the document is created
  registerDate: {
    type: Date,
    default: Date.now,
  },
});

// Create a geospatial index on the geo field for efficient querying of geolocation data
barberShop.index({ geo: "2dsphere" });

// Export the BarberShop model based on the barberShop schema, making it accessible in other files
module.exports = mongoose.model("BarberShop", barberShop);
