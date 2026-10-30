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

  var dataInicioFormatada = dataInicio
    ? dataInicio.replace("T", " ").substring(0, 19)
    : null;

  var formatDataFim = dataFim
    ? `'${dataFim.replace("T", " ").substring(0, 19)}'`
    : "NULL";

  var instrucaoSql = `
    INSERT INTO assinatura (dataInicio, dataFim, statusAssinatura, fkUsuario, fkPlano) 
    VALUES ('${dataInicioFormatada}', ${formatDataFim}, '${statusAssinatura}', (SELECT idUsuario FROM usuario WHERE email = '${email}'), ${plano});
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  registrar,
};
