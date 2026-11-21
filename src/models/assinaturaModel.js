var database = require("../database/config");

function registrar(dataInicio, dataFim, statusAssinatura, email, plano) {
  console.log(
    "ACESSEI O ASSINATURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function registrar():",
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

function ativar(id, metodo) {
  console.log(
    "ACESSEI O ASSINATURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function registrar():",
    id,
    metodo,
  );

  var instrucaoSql = `
    UPDATE assinatura SET statusAssinatura = 'Ativo', metodoPagamento = '${metodo}' WHERE idAssinatura = ${id};
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cancelar(idAssinatura) {
  var instrucaoSql = `
    UPDATE assinatura
    SET statusAssinatura = 'Cancelado',
        dataFim = CURRENT_TIMESTAMP
    WHERE idAssinatura = ${idAssinatura};
  `;

  console.log("Cancelando assinatura:", idAssinatura);
  return database.executar(instrucaoSql);
}

function reativar(idAssinatura) {
  var instrucaoSql = `
    UPDATE assinatura
    SET statusAssinatura = 'Ativo',
        dataFim = NULL
    WHERE idAssinatura = ${idAssinatura};
  `;

  console.log("Reativando assinatura:", idAssinatura);
  return database.executar(instrucaoSql);
}

function buscarUltima(idUsuario) {
  console.log(
    "ACESSEI O ASSINATURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    idUsuario,
  );

  var instrucaoSql = `
    SELECT * FROM detalhesAssinatura
    WHERE fkUsuario = ${idUsuario}
    ORDER BY idAssinatura DESC
    LIMIT 1;    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  registrar,
  ativar,
  cancelar,
  reativar,
  buscarUltima,
};
