const express = require("express");
const router = express.Router();
const Salao = require("../models/salao");
const turf = require("@turf/turf");
const Servico = require("../models/servico");

router.post("/", async (req, res) => {
  try {
    const salao = await new Salao(req.body).save();
    res.json({ salao });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.get("/servicos/:salaoId", async (req, res) => {
  try {
    const { salaoId } = req.params;
    const servicos = await Servico.find({
      salaoId,
      status: "A",
    }).select("_id titulo");

    res.json({
      error: false,
      servicos: servicos.map((s) => ({ label: s.titulo, value: s._id })),
    });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.post("/filter/:id", async (req, res) => {
  try {
    const salao = await Salao.findById(req.params.id).select(req.body.fields);
    const userCoordinates = req.body.coordinates;
    const distance = turf
      .distance(turf.point(salao.geo.coordinates), turf.point(userCoordinates))
      .toFixed(2);

    res.json({
      error: false,
      salao: { ...salao._doc, distance, userCoordinates },
    });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

module.exports = router;
