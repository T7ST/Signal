var transacaoModel = require("../models/transacaoModel");

function registrar(req, res) {
  const {
    fkAssinatura,
    protocolo,
    metodoPagamento,
    statusTransacao,
    dataPagamento,
  } = req.body;

  if (fkAssinatura == undefined) {
    return res.status(400).send("fkAssinatura é obrigatório.");
  } else if (protocolo == undefined) {
    return res.status(400).send("protocolo é obrigatório.");
  } else if (metodoPagamento == undefined) {
    return res.status(400).send("metodoPagamento é obrigatório.");
  } else if (statusTransacao == undefined) {
    return res.status(400).send("statusTransacao é obrigatório.");
  }

  transacaoModel
    .registrar(
      fkAssinatura,
      protocolo,
      metodoPagamento,
      statusTransacao,
      dataPagamento,
    )
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
