var express = require("express");
var router = express.Router();
var controller = require("../controllers/empresaAdminController");

router.get("/", (req, res) => controller.listar(req, res));
router.post("/", (req, res) => controller.criar(req, res));
router.put("/:id", (req, res) => controller.atualizar(req, res));
router.delete("/:id", (req, res) => controller.excluir(req, res));

module.exports = router;