var database = require("../database/config");

function registrar(dataInicio, dataFim, statusAssinatura, email, plano) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function registrar():",
    dataInicio,
    dataFim,
    statusAssinatura,
    email,
    plano,
  );

  var fkUsuario = database.executar(
    `SELECT idUsuario from usuario WHERE email = ${email}`,
  );

  var instrucaoSql = `
        INSERT INTO historico_log (dataInicio, dataFim, statusAssinatura, fkUsuario, fkPlano) VALUES ('${dataInicio}', '${dataFim}', '${statusAssinatura}', ${fkUsuario}, ${plano});
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  registrar,
};
