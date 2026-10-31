var express = require("express");
var router = express.Router();

var assinaturaController = require("../controllers/assinaturaController");

//Recebendo os dados do html e direcionando para a função registrar de assinaturaController.js
router.post("/registrar", function (req, res) {
  assinaturaController.registrar(req, res);
});

router.patch("/ativar", function (req, res) {
  assinaturaController.ativar(req, res);
});

module.exports = router;
