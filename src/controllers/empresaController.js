var empresaModel = require("../models/empresaModel");

function cadastrar(req, res) {
  const { cnpj, nome } = req.body;

  if (cnpj == undefined) {
    res.status(400).send("cnpj é obrigatório.");
  } else if (nome == undefined) {
    res.status(400).send("nome é obrigatório.");
  }

  empresaModel
    .cadastrar(cnpj, nome)
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
