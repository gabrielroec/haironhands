// Import the mongoose library, which is used for MongoDB object modeling
const mongoose = require("mongoose");

// Create a new Schema constructor from mongoose
const Schema = mongoose.Schema;

// Define a new schema for the professional model
const professional = new Schema({
  // The name field is a string and is required with a custom error message if not provided
  name: {
    type: String,
    required: [true, "Nome é obrigatório"],
  },
  // The phone field is a string, required, and must be unique across all professional documents
  phone: {
    type: String,
    required: [true, "Telefone é obrigatório"],
    unique: true,
  },
  // The email field is a string, required, and must be unique across all professional documents
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
  // The picture field is a string that holds the URL or path to the picture
  picture: String,
  // The birthdate field is a date and is required with a custom error message if not provided
  birthdate: {
    type: Date,
    required: [true, "Data de nascimento é obrigatória"],
  },
  // The gender field is a string and is required, with specified possible values
  gender: {
    type: String,
    required: [true, "Gênero é obrigatório"],
    enum: ["Masculino", "Feminino", "Outro"],
  },
  // The status field is a string, required, with specified possible values, and a default value
  status: {
    type: String,
    required: [true, "Status é obrigatório"],
    enum: ["Ativo", "Inativo"],
    default: "Ativo",
  },
  // The bankAccount field is an object containing several required string fields for bank details
  bankAccount: {
    // The cardHolder field is a string and is required with a custom error message if not provided
    cardHolder: {
      type: String,
      required: [true, "Nome do titular da conta é obrigatório"],
    },
    // The cpfCnpj field is a string, required, and must be unique across all professional documents
    cpfCnpj: {
      type: String,
      required: [true, "CPF/CNPJ é obrigatório"],
      unique: true,
    },
    // The bankName field is a string and is required with a custom error message if not provided
    bankName: {
      type: String,
      required: [true, "Nome do banco é obrigatório"],
    },
    // The accountType field is a string, required, with specified possible values, and a default value
    accountType: {
      type: String,
      required: [true, "Tipo de conta é obrigatório"],
      enum: ["Corrente", "Poupança"],
      default: "Corrente",
    },
    // The agency field is a string and is required with a custom error message if not provided
    agency: {
      type: String,
      required: [true, "Agência é obrigatório"],
    },
    // The verifyDigit field is a string and is required with a custom error message if not provided
    verifyDigit: {
      type: String,
      required: [true, "Dígito verificador é obrigatório"],
    },
    // The accountNumber field is a string and is required with a custom error message if not provided
    accountNumber: {
      type: String,
      required: [true, "Número da conta é obrigatório"],
    },
    // The dataRegister field is a string and is required with a custom error message if not provided
    dataRegister: {
      type: String,
      required: [true, "Número da conta é obrigatório"],
    },
  },
  // The dataRegister field is a date, required, with a default value of the current date and time
  dataRegister: {
    type: Date,
    required: [true, "Data de cadastro é obrigatória"],
    default: Date.now,
  },
  // The recipientId field is a string and is required with a custom error message if not provided
  recipientId: {
    type: String,
    required: [true, "Id do destinatário é obrigatório"],
  },
});

// Export the professional model based on the professional schema, making it accessible in other files
module.exports = mongoose.model("Professional", professional);
