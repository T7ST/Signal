var database = require("../database/config");

function cadastrar(rua, numero, cidade, estado, fkEmpresa) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    rua,
    numero,
    cidade,
    estado,
    fkEmpresa,
  );

  var instrucaoSql = `
        INSERT INTO endereco (rua, numero, cidade, estado, empresa_idempresa) VALUES ('${rua}', '${numero}', '${cidade}', '${estado}', ${fkEmpresa});
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  cadastrar,
};
