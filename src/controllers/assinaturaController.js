var assinaturaModel = require("../models/assinaturaModel");

function registrar(req, res) {
  const { dataInicio, dataFim, statusAssinatura, email, plano } = req.body;

  if (dataInicio == undefined) {
    res.status(400).send("dataInicio é obrigatório.");
  } else if (dataFim == undefined) {
    res.status(400).send("dataFim é obrigatório.");
  } else if (status == undefined) {
    res.status(400).send("status é obrigatório.");
  } else if (email == undefined) {
    res.status(400).send("email é obrigatório.");
  } else if (plano == undefined) {
    res.status(400).send("plano é obrigatório.");
  }

  assinaturaModel
    .registrar(dataInicio, dataFim, statusAssinatura, email, plano)
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
