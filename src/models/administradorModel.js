var database = require("../database/config");

function buscarSenha() {
  var instrucao = `SELECT senha FROM administrador LIMIT 1;`;
  return database.executar(instrucao);
}

module.exports = { buscarSenha };