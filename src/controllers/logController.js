var logModel = require("../models/logModel");

function registrar(req, res) {
  const { nivel, mensagem, origem, fkUsuario } = req.body;

  if (nivel == undefined) {
    res.status(400).send("nivel é obrigatório.");
  } else if (mensagem == undefined) {
    res.status(400).send("mensagem é obrigatório.");
  } else if (origem == undefined) {
    res.status(400).send("origem é obrigatório.");
  } else if (fkUsuario == undefined) {
    res.status(400).send("fkUsuario é obrigatório.");
  }

  logModel
    .registrar(nivel, mensagem, origem, fkUsuario)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o registro! Erro: ",
        erro.sqlMessage,
      );
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  registrar,
};
