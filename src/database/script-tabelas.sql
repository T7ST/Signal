CREATE DATABASE signal_db;
USE signal_db;

CREATE TABLE perfil (
    id_perfil INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    descricao VARCHAR(255)
) ;

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    fk_perfil INT NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_perfil) REFERENCES perfil(id_perfil)
) ;

CREATE TABLE filme (
    id_filme INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    genero VARCHAR(50) NOT NULL,
    ano_lancamento INT,
    avaliacao_audiencia DECIMAL(3, 1),
    tempo_assistido_minutos INT DEFAULT 0,
    engajamento_score DECIMAL(5, 2) DEFAULT 0.00
) ;

CREATE TABLE importacao_planilha (
    id_importacao INT AUTO_INCREMENT PRIMARY KEY,
    nome_arquivo VARCHAR(255) NOT NULL,
    caminho_s3 VARCHAR(512),
    data_importacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    status_importacao VARCHAR(50) NOT NULL,
    fk_usuario INT NOT NULL,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario)
) ;

CREATE TABLE recomendacao (
    id_recomendacao INT AUTO_INCREMENT PRIMARY KEY,
    fk_filme INT NOT NULL,
    fk_usuario INT NOT NULL,
    score_recomendacao DECIMAL(5, 2) NOT NULL,
    justificativa TEXT,
    data_geracao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_filme) REFERENCES filme(id_filme),
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario)   
) ;

CREATE TABLE historico_log (
    id_log INT AUTO_INCREMENT PRIMARY KEY,
    nivel_log VARCHAR(20) NOT NULL,
    mensagem TEXT NOT NULL,
    origem VARCHAR(100),
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    fk_usuario INT NULL,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario)
       
) ;

