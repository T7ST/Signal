var database = require("../database/config");

function registrar(
  fkAssinatura,
  protocolo,
  metodoPagamento,
  statusTransacao,
  dataPagamento,
) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function registrar():",
    fkAssinatura,
    protocolo,
    metodoPagamento,
    statusTransacao,
    dataPagamento,
  );

  var formatDataPagamento = dataPagamento
    ? `'${dataPagamento.replace("T", " ").substring(0, 19)}'`
    : "NULL";

  var instrucaoSql = `
    INSERT INTO transacao (fkAssinatura, protocolo, metodoPagamento, statusTransacao, dataPagamento) 
    VALUES (${fkAssinatura}, '${protocolo}', '${metodoPagamento}', '${statusTransacao}', ${formatDataPagamento});
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  registrar,
};
