const express = require("express");
const router = express.Router();
const Horario = require("../models/horario");

router.post("/", async (req, res) => {
  try {
    const horario = await new Horario(req.body).save();
    res.json({ horario });
  } catch (error) {
    res.json({ error: true, error });
  }
});

module.exports = router;
