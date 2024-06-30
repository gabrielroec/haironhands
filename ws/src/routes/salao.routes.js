const express = require("express");
const router = express.Router();
const Salao = require("../models/salao");
const Servico = require("../models/servico");

// Validation middleware function
router.post("/", async (req, res) => {
  const { nome, email, senha, endereco } = req.body;

  if (!nome || !email || !senha || !endereco) {
    return res
      .status(400)
      .json({ error: true, message: "Missing required fields" });
  }
  try {
    const salao = await new Salao(req.body).save();
    res.json({ salao });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});

router.get("/servicos/:salaoId", async (req, res) => {
  try {
    const { salaoId } = req.params;
    const servicos = await Servico.find({
      salaoId,
      staus: "A",
    }).select("_id titulo");

    res.json({
      servicos: servicos.map((s) => ({ label: s.titulo, value: s._id })),
    });
  } catch (error) {}
});

module.exports = router;
