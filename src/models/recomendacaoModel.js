var database = require("../database/config");

function cadastrar(genero, duracao, fkUsuario) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    genero,
    duracao,
    fkUsuario,
  );

  var instrucaoSql = `
        INSERT INTO recomendacao (genero, duracao, fk_usuario) VALUES ('${genero}', ${duracao}, ${fkUsuario});
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  cadastrar,
};
