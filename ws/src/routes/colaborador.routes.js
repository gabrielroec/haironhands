const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Colaborador = require("../models/colaborador");
const pagarme = require("../services/pagarme");

router.post("/", async (req, res) => {
  const db = mongoose.connection;
  const session = await db.startSession();

  try {
    const { colaborador, salaoId } = req.body;
    const existentColaborador = await Colaborador.findOne({
      $or: [{ email: colaborador.email }, { telefone: colaborador.telefone }],
    });

    if (!existentColaborador) {
      //CRIAR CONTA BANCARIA
      const { contaBancaria } = colaborador;
      const pagarmeBankAccount = await pagarme("bank_accounts", {
        agencia: contaBancaria.agencia,
        bank_code: contaBancaria.banco,
        conta: contaBancaria.numero,
        conta_dv: contaBancaria.dv,
        document_number: contaBancaria.cpfCnpj,
        legal_name: contaBancaria.titular,
      });

      if (pagarmeBankAccount.error) {
        throw pagarmeBankAccount;
      }
      //CRIAR RECEBEDOR
      const pagarmeRecipient = await pagarme({'/recipients', {
        transfer_interval: 'day',
        transfer_enabled: true,
        
      })
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.json({ error: true, message: error.message });
  }
});

module.exports = router;
