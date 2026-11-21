var administradorModel = require("../models/administradorModel");

function autenticar(req, res) {
  var senha = req.body.senha;

  if (!senha) {
    return res.status(400).send("Senha não informada!");
  }

  administradorModel
    .buscarSenha()
    .then(function (resultado) {
      if (resultado.length > 0 && resultado[0].senha === senha) {
        res.status(200).json({ autenticado: true });
      } else {
        res.status(401).send("Senha incorreta!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = { autenticar };