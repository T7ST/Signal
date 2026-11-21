var transacaoModel = require("../models/transacaoModel");

function registrar(req, res) {
  const {
    fkAssinatura,
    protocolo,
    metodoPagamento,
    statusTransacao,
    dataPagamento,
  } = req.body;

  const assinaturaId = Number(fkAssinatura);
  if (!Number.isSafeInteger(assinaturaId) || assinaturaId <= 0) {
    return res.status(400).send("fkAssinatura inválido.");
  } else if (protocolo == undefined) {
    return res.status(400).send("protocolo é obrigatório.");
  } else if (metodoPagamento == undefined) {
    return res.status(400).send("metodoPagamento é obrigatório.");
  } else if (statusTransacao == undefined) {
    return res.status(400).send("statusTransacao é obrigatório.");
  }

  transacaoModel
    .registrar(
      assinaturaId,
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

function buscarPorAssinatura(req, res) {
  const { idAssinatura } = req.params;
  const assinaturaId = Number(idAssinatura);

  if (!/^\d+$/.test(idAssinatura) || !Number.isSafeInteger(assinaturaId) || assinaturaId <= 0) {
    return res.status(400).json({ mensagem: "Id da assinatura inválido." });
  }

  transacaoModel
    .buscarPorAssinatura(assinaturaId)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log("Erro ao buscar transações da assinatura:", erro);
      res.status(500).json({ mensagem: "Não foi possível buscar as transações." });
    });
}

module.exports = {
  registrar,
  buscarPorAssinatura,
};
