CREATE DATABASE signal_db;
USE signal_db;



CREATE TABLE empresa {
    idempresa INT AUTO_INCREMENT PRIMARY KEY,
    cnpj VARCHAR(45)
};

CREATE TABLE endereco {
    idendereco INT AUTO_INCREMENT PRIMARY KEY,
    rua VARCHAR(45),
    numero VARCHAR(45),
    cidade VARCHAR(45),
    estado VARCHAR(45),
    empresa_idempresa INT NOT NULL,
    FOREIGN KEY (empresa_idempresa) REFERENCES empresa(idempresa)
};

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
    empresa_idempresa INT NOT NULL,
    planos_idplanos INT,
    assinatura_idassinatura INT NOT NULL,
    FOREIGN KEY (empresa_idempresa) REFERENCES empresa(idempresa),
    FOREIGN KEY (planos_idplanos) REFERENCES planos(idplanos),
    FOREIGN KEY (assinatura_idassinatura) REFERENCES assinatura(idassinatura)
);

CREATE TABLE planos (
    idplanos INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(45),
    preco VARCHAR(45),
);

CREATE TABLE assinatura (
    idassinatura INT AUTO_INCREMENT PRIMARY KEY,
    data_inicio DATE DEFAULT CURRENT_DATE,
    data_fim DATE,
    status VARCHAR(45),
);

CREATE TABLE transacoes {
    idtransacoes INT AUTO_INCREMENT PRIMARY KEY,
    data VARCHAR(45),
    status VARCHAR(45),
    metodoPagamento VARCHAR(45),
    assinatura_idassinatura INT NOT NULL,
    FOREIGN KEY (assinatura_idassinatura) REFERENCES assinatura(idassinatura)
}

CREATE TABLE importacao_planilha (
    id_importacao INT AUTO_INCREMENT PRIMARY KEY,
    data_uso DATETIME DEFAULT CURRENT_TIMESTAMP,
    status_importacao VARCHAR(50) NOT NULL,
    fk_usuario INT NOT NULL, 
);

CREATE TABLE recomendacao (
    id_recomendacao INT AUTO_INCREMENT PRIMARY KEY,
    fk_usuario INT NOT NULL,
    genero VARCHAR(45) NOT NULL,
    duracao INT,
    data_geracao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario)   
) ;

CREATE TABLE historico_log (
    id_log INT AUTO_INCREMENT PRIMARY KEY,
    nivel_log VARCHAR(20) NOT NULL,
    mensagem TEXT NOT NULL,
    origem VARCHAR(100),
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    fk_usuario INT NOT NULL,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario)
) ;

