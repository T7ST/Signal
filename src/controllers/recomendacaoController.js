var recomendacaoModel = require("../models/recomendacaoModel");

function cadastrar(req, res) {
  const { genero, duracao, fkUsuario } = req.body;

  if (genero == undefined) {
    res.status(400).send("genero é obrigatório.");
  } else if (fkUsuario == undefined) {
    res.status(400).send("fkUsuario é obrigatório.");
  }

  recomendacaoModel
    .cadastrar(genero, duracao, fkUsuario)
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
