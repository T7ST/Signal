CREATE DATABASE signal_db;
USE signal_db;

create table empresa (
	idEmpresa int primary key auto_increment,
    cnpj char(18) not null,
    nome varchar(100) not null
    );
create table endereco (
	idEndereco int auto_increment,
    fkEmpresa int not null,
    rua varchar(50),
    numero varchar(10),
    cidade varchar(50),
    estado char(2),
    constraint pkcomposta primary key (idEndereco, fkEmpresa),
    constraint fkEmpresacocons foreign key (fkEmpresa) references empresa(idEmpresa)
);


    
create table planos (
	idPlanos int primary key auto_increment,
    titulo varchar(10),
    preco decimal(5,2)
    );
    create table assinatura (
	idAssinatUra int auto_increment,
    data_inicio date,
    data_fim date,
    status_assinatura varchar(10),
    fkIdUsuario int,
    fkUsuario_idAssinatura int, 
    fkIdPlanos int, 
    fkUsuario_idEmpresa int,
    primary key (idAssinatura, fkIdUsuario, fkUsuario_idAssinatura, fkIdPlanos, fkUsuario_idEmpresa)
);
CREATE TABLE usuario (
    idUsuario INT AUTO_INCREMENT ,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkEmpresa Int not null,
    fkAssinatura int not null,
    constraint pkcomposta2 primary key (idUsuario, fkEmpresa),
   constraint fkEmpresacons foreign key (fkEmpresa) references empresa(idEmpresa),
   constraint fkAssinaturacons2 foreign key (fkAssinatura) references assinatura(idAssinatura)
) ;


create table transacoes (
	idTransacoes int,
    fkAssinatura int,
     fkIdUsuario int,
    fkUsuario_idAssinatura int, 
    fkIdPlanos int, 
    fkUsuario_idEmpresa int,
    constraint pkcomposta3 primary key (idTransacoes, fkAssinatura,  fkIdUsuario, fkUsuario_idAssinatura, fkIdPlanos, fkUsuario_idEmpresa),
    data_transacao date,
    status_transacao varchar(10),
    metodo_pagamento varchar(10)
    );

create table recomendacao (
	idRecomendacao int primary key auto_increment,
    fkUsuario int,
    constraint fkUsuariocons foreign key (fkUsuario) references usuario(idUsuario),
    genero varchar(20),
    duracao int,
    data_geracao datetime
    );
    
create table historico_log (
	idLog int primary key auto_increment,
    nivel_log varchar(20),
    mensagem text,
    origem varchar(100),
    data_hora datetime,
    fkUsuario int,
    constraint fkUsuariocons2 foreign key (fkUsuario) references usuario(idUsuario)
    );

create table importacao_planilha (
	idImportacao int primary key auto_increment,
    fkUsuario int,
    constraint fkUsuariocons3 foreign key (fkUsuario) references usuario(idUsuario),
    dataa datetime,
    status_importacao varchar(10)
    );
    
    

------ INSERTS ------

INSERT INTO planos (titulo, preco) VALUES 
    ('Plano Mensal', 'R$ 49,90/mês'), 
    ('Plano Anual', 'R$ 499,90/ano');

INSERT INTO empresa (nome, cnpj) VALUES 
    ('Empresa Teste', '12345678901234'),
    ('Empresa Teste 2', '12345678901235'),
    ('Empresa Teste 3', '12345678901236');

INSERT INTO endereco (rua, numero, cidade, estado, empresa_idempresa) VALUES 
    ('Rua A', '123', 'Cidade A', 'SP', 1),
    ('Rua B', '456', 'Cidade B', 'SP', 2),
    ('Rua C', '789', 'Cidade C', 'SP', 3);