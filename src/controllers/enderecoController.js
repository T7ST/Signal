var enderecoModel = require("../models/enderecoModel");

function cadastrar(req, res) {
  const { rua, numero, cidade, estado, fkEmpresa } = req.body;

  if (rua == undefined) {
    res.status(400).send("rua é obrigatório.");
  } else if (numero == undefined) {
    res.status(400).send("numero é obrigatório.");
  } else if (cidade == undefined) {
    res.status(400).send("cidade é obrigatório.");
  } else if (estado == undefined) {
    res.status(400).send("estado é obrigatório.");
  } else if (fkEmpresa == undefined) {
    res.status(400).send("fkEmpresa é obrigatório.");
  }

  enderecoModel
    .cadastrar(rua, numero, cidade, estado, fkEmpresa)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o cadastro! Erro: ",
        erro.sqlMessage,
      );
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  cadastrar,
};
