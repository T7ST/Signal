var database = require("../database/config");

function registrar(nivel, mensagem, origem, fkUsuario) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function registrar():",
    nivel,
    mensagem,
    origem,
    fkUsuario,
  );

  var instrucaoSql = `
        INSERT INTO historico_log (nivel_log, mensagem, origem, fk_usuario) VALUES ('${nivel}', '${mensagem}', '${origem}', ${fkUsuario});
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  registrar,
};
