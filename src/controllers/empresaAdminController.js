var model = require("../models/empresaAdminModel");

var soDigitos = (v) => String(v || "").replace(/\D/g, "");

function tratarErro(res) {
  return function (erro) {
    if (erro.code === "ER_DUP_ENTRY")
      return res.status(409).send("Esse CNPJ ou código já está cadastrado.");
    if (erro.code === "EMPRESA_COM_USUARIOS")
      return res.status(409).send("Não dá para excluir: a empresa tem usuários cadastrados.");
    console.log(erro);
    res.status(500).send(erro.sqlMessage || "Erro no servidor.");
  };
}

function listar(req, res) {
  model.listar().then((r) => res.status(200).json(r)).catch(tratarErro(res));
}

function criar(req, res) {
  var codigo = String(req.body.codigo || "").trim();
  var nome = String(req.body.nome || "").trim();
  var cnpj = soDigitos(req.body.cnpj);
  var cep = soDigitos(req.body.cep);
  var logradouro = String(req.body.logradouro || "").trim();
  var numero = String(req.body.numero || "").trim();
  var cidade = String(req.body.cidade || "").trim();
  var estado = String(req.body.estado || "").trim().toUpperCase();

  if (codigo === "" || codigo.length > 15) return res.status(400).send("Código inválido (máx. 15 caracteres).");
  if (nome.length < 3) return res.status(400).send("Razão social inválida.");
  if (cnpj.length !== 14) return res.status(400).send("O CNPJ precisa ter 14 dígitos.");
  if (cep.length !== 8) return res.status(400).send("O CEP precisa ter 8 dígitos.");
  if (!logradouro || !numero || !cidade || estado.length !== 2)
    return res.status(400).send("Preencha o endereço completo.");

  model
    .criar({ codigo, nome, cnpj, cep, logradouro, numero, cidade, estado })
    .then((r) => res.status(201).json({ idEmpresa: r.insertId }))
    .catch(tratarErro(res));
}

function atualizar(req, res) {
  var nome = String(req.body.nome || "").trim();
  var cnpj = soDigitos(req.body.cnpj);

  if (nome.length < 3) return res.status(400).send("Razão social inválida.");
  if (cnpj.length !== 14) return res.status(400).send("O CNPJ precisa ter 14 dígitos.");

  model.atualizar(req.params.id, nome, cnpj)
    .then(() => res.status(200).json({ ok: true }))
    .catch(tratarErro(res));
}

function excluir(req, res) {
  model.excluir(req.params.id)
    .then(() => res.status(200).json({ ok: true }))
    .catch(tratarErro(res));
}

module.exports = { listar, criar, atualizar, excluir };