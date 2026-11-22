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
    INSERT INTO transacao (fkAssinatura, protocolo, metodoPagamento, statusTransacao, dataPagamento, valor)
    SELECT a.idAssinatura, '${protocolo}', '${metodoPagamento}', '${statusTransacao}', ${formatDataPagamento}, p.preco
    FROM assinatura a
    JOIN plano p ON p.idPlano = a.fkPlano
    WHERE a.idAssinatura = ${fkAssinatura};
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarPorAssinatura(idAssinatura) {
  var instrucaoSql = `
    SELECT idTransacao, protocolo, metodoPagamento, statusTransacao, dataPagamento, dataRegistro, valor
    FROM transacao
    WHERE fkAssinatura = ${idAssinatura}
    ORDER BY COALESCE(dataPagamento, dataRegistro) DESC, idTransacao DESC;
  `;

  console.log("Buscando transações da assinatura:", idAssinatura);
  return database.executar(instrucaoSql);
}

module.exports = {
  registrar,
  buscarPorAssinatura,
};
