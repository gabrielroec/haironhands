// Import the mongoose library, which is used for MongoDB object modeling
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const barberShop = new Schema({
  name: {
    type: String,
    required: [true, "Nome é obrigatório"],
  },
  phone: {
    type: String,
    required: [true, "Telefone é obrigatório"],
    unique: true,
  },
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
  picture: String,
  birthdate: {
    type: Date,
    required: [true, "Data de nascimento é obrigatória"],
  },
  gender: {
    type: String,
    required: [true, "Gênero é obrigatório"],
    enum: ["Masculino", "Feminino", "Outro"],
  },
  status: {
    type: String,
    required: [true, "Status é obrigatório"],
    enum: ["Ativo", "Inativo"],
    dafeult: "Ativo",
  },
  bankAccount: {
    cardHolder: {
      type: String,
      required: [true, "Nome do titular da conta é obrigatório"],
    },
    cpfCnpj: {
      type: String,
      required: [true, "CPF/CNPJ é obrigatório"],
      unique: true,
    },
    bankName: {
      type: String,
      required: [true, "Nome do banco é obrigatório"],
    },
    accountType: {
      type: String,
      required: [true, "Tipo de conta é obrigatório"],
      enum: ["Corrente", "Poupança"],
      default: "Corrente",
    },
    agency: {
      type: String,
      required: [true, "Agência é obrigatório"],
    },
    verifyDigit: {
      type: String,
      required: [true, "Dígito verificador é obrigatório"],
    },
    accountNumber: {
      type: String,
      required: [true, "Número da conta é obrigatório"],
    },
    dataRegister: {
      type: String,
      required: [true, "Número da conta é obrigatório"],
    },
  },
  dataRegister: {
    type: Date,
    required: [true, "Data de cadastro é obrigatória"],
    default: Date.now,
  },
  recipientId: {
    type: String,
    required: [true, "Id do destinatário é obrigatório"],
  },
});

module.exports = mongoose.model("Colaborador", barberShop);
