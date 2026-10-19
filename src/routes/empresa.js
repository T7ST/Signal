var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

//Recebendo os dados do html e direcionando para a função cadastrar de empresaController.js
router.post("/cadastrar", function (req, res) {
  empresaController.cadastrar(req, res);
});

router.get("/:cnpj", function (req, res) {
  empresaController.listarPorCnpj(req, res);
});

module.exports = router;
