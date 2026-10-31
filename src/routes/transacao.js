var express = require("express");
var router = express.Router();

var transacaoController = require("../controllers/transacaoController");

//Recebendo os dados do html e direcionando para a função registrar de transacaoController.js
router.post("/registrar", function (req, res) {
  transacaoController.registrar(req, res);
});

module.exports = router;
