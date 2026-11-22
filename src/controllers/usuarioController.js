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
    const fkEmpresa = req.params.fkEmpresa;

    if (
        !id || !/^\d+$/.test(id) ||
        !fkEmpresa || !/^\d+$/.test(fkEmpresa)
    ) {
        return res.status(400).json({
            mensagem: "ID do usuário ou da empresa inválido!"
        });
    }

    usuarioModel.buscarUm(id, fkEmpresa)
        .then(function (resultado) {
            if (resultado.length > 0) {
                return res.json(resultado[0]);
            }

            return res.status(404).json({
                mensagem: "Usuário não encontrado."
            });
        })
        .catch(function (erro) {
            console.log("Erro ao buscar usuário:", erro);

            return res.status(500).json({
                mensagem: "Erro ao buscar os dados do usuário."
            });
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

function atualizar(req, res) {
    const id = req.params.id;
    const fkEmpresa = req.params.fkEmpresa;
    const { nome, email } = req.body;

    if (!id || !/^\d+$/.test(id) ||
        !fkEmpresa || !/^\d+$/.test(fkEmpresa)) {
        return res.status(400).json({
            mensagem: "Identificação inválida."
        });
    }

   if (
    typeof nome !== "string" || !nome.trim() ||
    typeof email !== "string" || !email.trim()
) {
    return res.status(400).json({
        mensagem: "Nome e e-mail são obrigatórios."
    });
}
    usuarioModel.atualizar(id, fkEmpresa, nome.trim(), email.trim())
        .then(function (resultado) {
            if (resultado.affectedRows > 0) {
                return res.json({
                    mensagem: "Dados atualizados com sucesso!",
                    nome: nome.trim(),
                    email: email.trim()
                });
            }

            return res.status(404).json({
                mensagem: "Usuário não encontrado."
            });
        })
        .catch(function (erro) {
            console.log("Erro ao atualizar usuário:", erro);

            return res.status(500).json({
                mensagem: "Erro ao atualizar os dados."
            });
        });
}

function atualizarSenha(req, res) {
    const id = req.params.id;
    const fkEmpresa = req.params.fkEmpresa;
    const { senhaAtual, novaSenha } = req.body;

    if (
        !id || !/^\d+$/.test(id) ||
        !fkEmpresa || !/^\d+$/.test(fkEmpresa)
    ) {
        return res.status(400).json({
            mensagem: "Identificação inválida."
        });
    }

    if (!senhaAtual || !novaSenha) {
        return res.status(400).json({
            mensagem: "Informe a senha atual e a nova senha."
        });
    }

    if (novaSenha.length < 8) {
        return res.status(400).json({
            mensagem: "A nova senha precisa ter no mínimo 8 caracteres."
        });
    }

    usuarioModel.atualizarSenha(id, fkEmpresa, senhaAtual, novaSenha)
        .then(function (resultado) {
            if (resultado.affectedRows > 0) {
                return res.json({
                    mensagem: "Senha atualizada com sucesso!"
                });
            }

            return res.status(400).json({
                mensagem: "Senha atual incorreta ou usuário não encontrado."
            });
        })
        .catch(function (erro) {
            console.log("Erro ao atualizar senha:", erro);

            return res.status(500).json({
                mensagem: "Erro ao atualizar a senha."
            });
        });
}

module.exports = {
    autenticar,
    cadastrar,
    buscar,
    excluir,
    atualizar,
    atualizarSenha
};
