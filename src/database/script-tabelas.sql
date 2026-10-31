CREATE DATABASE signal_db;

USE signal_db;

create table empresa (
	idEmpresa int primary key auto_increment,
    cnpj char(18) not null,
    nome varchar(100) not null
);
    
create table endereco (
	idEndereco int auto_increment,
    rua varchar(50),
    numero varchar(10),
    cidade varchar(50),
    estado char(2),

    fkEmpresa int not null,

    constraint pkCompostaEndereco primary key (idEndereco, fkEmpresa),
    constraint fkEmpresaConstraint foreign key (fkEmpresa) references empresa(idEmpresa)
);  

CREATE TABLE usuario (
    idUsuario INT AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    dataRegistro datetime default CURRENT_TIMESTAMP,

    fkEmpresa Int not null,

    constraint pkCompostaUsuario primary key (idUsuario, fkEmpresa),
    constraint usuarioEmpresaConstraint foreign key (fkEmpresa) references empresa (idEmpresa)
);

create table plano (
	idPlano int primary key auto_increment,
    titulo varchar(20),
    preco decimal(5,2)
);

create table assinatura (
	idAssinatura int auto_increment,
    dataInicio datetime,
    dataFim datetime,
    statusAssinatura varchar(10),
    dataRegistro datetime default CURRENT_TIMESTAMP,

    fkUsuario int not null,
    fkPlano int not null, 

    constraint pkCompostaAssinatura primary key (idAssinatura, fkUsuario, fkPlano),
    constraint assinaturaUsuarioConstraint foreign key (fkUsuario) references usuario (idUsuario),
    constraint assinaturaPlanoConstraint foreign key (fkPlano) references plano (idPlano)
);

create table transacao (
	idTransacao int auto_increment,
    protocolo VARCHAR(20) NOT NULL
    metodoPagamento varchar(20) NOT NULL,
    statusTransacao varchar(20) NOT NULL,
    dataPagamento datetime,
    dataRegistro datetime default CURRENT_TIMESTAMP,

    fkAssinatura int not null,

    constraint pkCompostaTransacao primary key (idTransacao, fkAssinatura),
    constraint transacaoAssinaturaConstraint foreign key (fkAssinatura) references assinatura (idAssinatura)
);

-- VERIFY

-- create table recomendacao (
-- 	idRecomendacao int primary key auto_increment,
--     genero varchar(20),
--     duracao int,
--     dataRegistro datetime default CURRENT_TIMESTAMP

--     fkUsuario int,
    
--     constraint recomendacaoUsuarioConstraint foreign key (fkUsuario) references usuario(idUsuario)
-- );
    
-- create table historico_log (
-- 	idLog int primary key auto_increment,
--     nivel_log varchar(20),
--     mensagem text,
--     origem varchar(100),
--     data_hora datetime,
--     fkUsuario int,
--     constraint fkUsuariocons2 foreign key (fkUsuario) references usuario(idUsuario)
-- );

-- create table importacao_planilha (
-- 	idImportacao int primary key auto_increment,
--     fkUsuario int,
--     constraint fkUsuariocons3 foreign key (fkUsuario) references usuario(idUsuario),
--     dataa datetime,
--     status_importacao varchar(10)
-- );

------ INSERTS ------

INSERT INTO plano (titulo, preco) VALUES 
    ('Plano Mensal', 49.90), 
    ('Plano Anual', 499.90);

INSERT INTO empresa (nome, cnpj) VALUES 
    ('Empresa Teste', '12345678901234'),
    ('Empresa Teste 2', '12345678901235'),
    ('Empresa Teste 3', '12345678901236');
    
INSERT INTO endereco (rua, numero, cidade, estado, fkEmpresa) VALUES 
    ('Rua A', '123', 'Cidade A', 'SP', 1),
    ('Rua B', '456', 'Cidade B', 'SP', 2),
    ('Rua C', '789', 'Cidade C', 'SP', 3);

