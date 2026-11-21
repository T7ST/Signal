var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        return res.status(400).send("Seu email está undefined!");
    }

    if (senha == undefined) {
        return res.status(400).send("Sua senha está indefinida!");
    }

    usuarioModel
        .autenticar(email, senha)
        .then(function (resultadoAutenticar) {
            console.log("Resultados encontrados:", resultadoAutenticar.length);

            if (resultadoAutenticar.length > 0) {
                return res.json(resultadoAutenticar);
            }

            return res.status(403).send("Email e/ou senha inválido(s)");
        })
        .catch(function (erro) {
            console.log("Erro ao realizar login:", erro);
            return res.status(500).json(erro.sqlMessage);
        });
}

function cadastrar(req, res) {
    const { nome, email, senha, fkEmpresa } = req.body;

    if (nome == undefined) {
        return res.status(400).send("Seu nome está undefined!");
    }

    if (email == undefined) {
        return res.status(400).send("Seu email está undefined!");
    }

    if (senha == undefined) {
        return res.status(400).send("Sua senha está undefined!");
    }

    if (fkEmpresa == undefined) {
        return res.status(400).send("fkEmpresa é obrigatório.");
    }

    usuarioModel
        .cadastrar(nome, email, senha, fkEmpresa)
        .then(function (resultado) {
            return res.json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao realizar cadastro:", erro);
            return res.status(500).json(erro.sqlMessage);
        });
}

function buscar(req, res) {
    const id = req.params.id;

    if (!id || !/^\d+$/.test(id)) {
        return res.status(400).send("Id do usuário inválido!");
    }

    usuarioModel
        .buscarUm(id)
        .then(function (resultado) {
            return res.json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao buscar usuário:", erro);
            return res.status(500).json(erro.sqlMessage);
        });
}

function excluir(req, res) {
    const id = req.params.id;
    const fkEmpresa = req.params.fkEmpresa;

    if (
        !id || !/^\d+$/.test(id) ||
        !fkEmpresa || !/^\d+$/.test(fkEmpresa)
    ) {
        return res.status(400).json({
            mensagem: "ID do usuário ou da empresa inválido!"
        });
    }

    usuarioModel
        .excluir(id, fkEmpresa)
        .then(function (resultado) {
            if (resultado.affectedRows > 0) {
                return res.status(200).json({
                    mensagem: "Usuário excluído com sucesso!"
                });
            }

            return res.status(404).json({
                mensagem: "Usuário não encontrado ou já excluído."
            });
        })
        .catch(function (erro) {
            console.log("Erro ao excluir usuário:", erro);

            return res.status(500).json({
                mensagem: "Erro ao tentar excluir o usuário."
            });
        });
}

module.exports = {
    autenticar,
    cadastrar,
    buscar,
    excluir
};
