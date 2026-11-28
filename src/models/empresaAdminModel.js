var database = require("../database/config");
var mysql = require("mysql2");
var q = mysql.escape

function listar() {
  return database.executar(
    `SELECT idEmpresa, nome, cnpj FROM empresa ORDER BY nome;`
  );
}

async function criar(e) {
  var r = await database.executar(
    `INSERT INTO empresa (codigo, nome, cnpj) VALUES (${q(e.codigo)}, ${q(e.nome)}, ${q(e.cnpj)});`
  );
  try {
    await database.executar(
      `INSERT INTO endereco (cep, logradouro, numero, cidade, estado, fkEmpresa)
       VALUES (${q(e.cep)}, ${q(e.logradouro)}, ${q(e.numero)}, ${q(e.cidade)}, ${q(e.estado)}, ${r.insertId});`
    );
  } catch (erro) {
    await database.executar(`DELETE FROM empresa WHERE idEmpresa = ${r.insertId};`);
    throw erro;
  }
  return r;
}

function atualizar(id, nome, cnpj) {
  return database.executar(
    `UPDATE empresa SET nome = ${q(nome)}, cnpj = ${q(cnpj)} WHERE idEmpresa = ${Number(id)};`
  );
}

async function excluir(id) {
  id = Number(id);
  var usuarios = await database.executar(
    `SELECT COUNT(*) AS total FROM usuario WHERE fkEmpresa = ${id};`
  );
  if (usuarios[0].total > 0) {
    var erro = new Error("Empresa com usuários vinculados");
    erro.code = "EMPRESA_COM_USUARIOS";
    throw erro;
  }
  await database.executar(`DELETE FROM endereco WHERE fkEmpresa = ${id};`);
  return database.executar(`DELETE FROM empresa WHERE idEmpresa = ${id};`);
}

module.exports = { listar, criar, atualizar, excluir };