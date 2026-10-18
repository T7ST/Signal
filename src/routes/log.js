var express = require("express");
var router = express.Router();

var logController = require("../controllers/logController");

//Recebendo os dados do html e direcionando para a função registrar de logController.js
router.post("/registrar", function (req, res) {
  logController.registrar(req, res);
});

module.exports = router;
