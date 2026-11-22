var database = require("../database/config");

function autenticar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha,
  );
  var instrucaoSql = `
   SELECT idUsuario, fkEmpresa, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}' AND ativo = 1;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, fkEmpresa) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,
    email,
    senha,
    fkEmpresa,
  );

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucaoSql = `
    INSERT INTO usuario (
        nome, email, senha, fkEmpresa,
        fkpreferencias, fkcargo, ativo
    ) VALUES (
        '${nome}', '${email}', '${senha}',
        ${fkEmpresa}, 1, 1, 1
    );
`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarUm(id, fkEmpresa) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    id,
  );

 var instrucaoSql = `
        SELECT idUsuario, nome, email, fkEmpresa
        FROM usuario
        WHERE idUsuario = ${id}
        AND fkEmpresa = ${fkEmpresa}
        AND ativo = 1;
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function excluir(id, fkEmpresa) {

    console.log(
        "ACESSEI O USUARIO MODEL - function excluir():",
        id,
        fkEmpresa
    );

    var instrucaoSql = `
        UPDATE usuario
        SET ativo = 0
        WHERE idUsuario = ${id}
        AND fkEmpresa = ${fkEmpresa}
        AND ativo = 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function atualizar(id, fkEmpresa, nome, email) {
    var instrucaoSql = `
        UPDATE usuario
        SET nome = '${nome}',
            email = '${email}'
        WHERE idUsuario = ${id}
        AND fkEmpresa = ${fkEmpresa}
        AND ativo = 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

module.exports = {
  autenticar,
  cadastrar,
  buscarUm,
  excluir,
  atualizar
};
