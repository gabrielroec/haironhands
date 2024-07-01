const express = require("express");
const router = express.Router();
const Busboy = require("busboy");
const aws = require("../services/aws");
const Servico = require("../models/servico");
const Arquivos = require("../models/arquivos");
// const moment = require("moment");

//ROTA RECEBE FORM DATA
router.post("/", async (req, res) => {
  var busboy = new Busboy({ headers: req.headers });
  busboy.on("finish", async () => {
    try {
      let errors = [];
      let arquivos = [];

      if (req.files && Object.keys(req.files).length > 0) {
        for (let key of Object.keys(req.files)) {
          const file = req.files[key];

          const nameParts = file.name.split(".");
          const fileName = `${new Date().getTime()}.${
            nameParts[nameParts.length - 1]
          }`;
          const path = `servicos/${req.body.salaoId}/${fileName}`;

          const response = await aws.uploadToS3(
            file,
            path
            //, acl = https://docs.aws.amazon.com/pt_br/AmazonS3/latest/dev/acl-overview.html
          );

          if (response.error) {
            errors.push({ error: true, message: response.message.message });
          } else {
            arquivos.push(path);
          }
        }
      }

      if (errors.length > 0) {
        res.json(errors[0]);
        return false;
      }

      // CRIAR SERVIÇO
      let jsonServico = JSON.parse(req.body.servico);
      jsonServico.salaoId = req.body.salaoId;
      const servico = await new Servico(jsonServico).save();

      // CRIAR ARQUIVO
      arquivos = arquivos.map((arquivo) => ({
        referenciaId: servico._id,
        model: "Servico",
        arquivo,
      }));
      await Arquivos.insertMany(arquivos);

      res.json({ error: false, arquivos, servico });
    } catch (err) {
      res.json({ error: true, message: err.message });
    }
  });
  req.pipe(busboy);
});

router.put("/:id", async (req, res) => {
  var busboy = new Busboy({ headers: req.headers });
  busboy.on("finish", async () => {
    try {
      let errors = [];
      let arquivos = [];

      if (req.files && Object.keys(req.files).length > 0) {
        for (let key of Object.keys(req.files)) {
          const file = req.files[key];

          const nameParts = file.name.split(".");
          const fileName = `${new Date().getTime()}.${
            nameParts[nameParts.length - 1]
          }`;
          const path = `servicos/${req.body.salaoId}/${fileName}`;

          const response = await aws.uploadToS3(
            file,
            path
            //, acl = https://docs.aws.amazon.com/pt_br/AmazonS3/latest/dev/acl-overview.html
          );

          if (response.error) {
            errors.push({ error: true, message: response.message.message });
          } else {
            arquivos.push(path);
          }
        }
      }

      if (errors.length > 0) {
        res.json(errors[0]);
        return false;
      }

      //  ATUALIZAR SERVIÇO
      let jsonServico = JSON.parse(req.body.servico);
      await Servico.findByIdAndUpdate(req.params.id, jsonServico);

      // CRIAR ARQUIVO
      arquivos = arquivos.map((arquivo) => ({
        referenciaId: req.params.id,
        model: "Servico",
        arquivo,
      }));
      await Arquivos.insertMany(arquivos);

      res.json({ error: false, jsonServico });
    } catch (err) {
      res.json({ error: true, message: err.message });
    }
  });
  req.pipe(busboy);
});

router.post("/remove-arquivo", async (req, res) => {
  try {
    console.log(req.body); // Log para verificar o corpo da requisição
    const { id } = req.body;

    if (!id || typeof id !== "string") {
      throw new Error("ID do arquivo não fornecido ou não é uma string");
    }

    // EXCLUIR DA AWS
    await aws.deleteFileS3(id);

    // EXCLUIR DO BANCO DE DADOS
    await Arquivos.findOneAndDelete({
      arquivo: id, // Usando o campo correto para buscar o documento
    });

    res.json({ error: false, message: "Arquivo excluído com sucesso!" });
  } catch (err) {
    console.error("Erro ao excluir arquivo:", err);
    res.json({ error: true, message: err.message });
  }
});

router.get("/salao/:salaoId", async (req, res) => {
  try {
    let servicosSalao = [];
    const servicos = await Servico.find({
      salaoId: req.params.salaoId,
      status: { $ne: "E" },
    });

    for (let servico of servicos) {
      const arquivos = await Arquivos.find({
        model: "Servico",
        referenciaId: servico._id,
      });
      servicosSalao.push({ ...servico._doc, arquivos });
    }

    res.json({
      error: false,
      servicos: servicosSalao,
    });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Servico.findByIdAndUpdate(req.params.id, { status: "E" });
    res.json({ error: false });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

module.exports = router;
