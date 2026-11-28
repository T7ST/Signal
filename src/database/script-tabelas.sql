CREATE DATABASE signal_db;
USE signal_db;

create table empresa (
	idEmpresa int primary key auto_increment,
    cnpj char(18) not null UNIQUE,
    nome varchar(100) not null,
    codigo varchar(15) not null
);
    
create table endereco (
	idEndereco int auto_increment,
    logradouro varchar(50),
    numero varchar(10),
    cidade varchar(50),
    estado char(2),
    fkEmpresa int not null,
    constraint pkCompostaEndereco primary key (idEndereco, fkEmpresa),
    constraint fkEmpresaConstraint foreign key (fkEmpresa) references empresa(idEmpresa)
);  
create table preferencias (
	idpreferencias int primary key auto_increment,
    meioNotificacao varchar(45),
    statuss tinyint
    );
    
create table cargos (
	idcargos int primary key auto_increment,
    titulo varchar(45),
    descricao varchar(100)
    );
    
    

CREATE TABLE usuario (
    idUsuario INT UNIQUE AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    dataRegistro datetime default CURRENT_TIMESTAMP,
    fotoPerfil varchar(45),
    ativo tinyint,
    fkEmpresa Int not null,
    fkpreferencias int not null,
    fkcargo int not null,
    constraint pkCompostaUsuario primary key (idUsuario, fkEmpresa),
    constraint usuarioEmpresaConstraint foreign key (fkEmpresa) references empresa (idEmpresa),
    constraint preferenciasconst foreign key (fkpreferencias) references preferencias (idpreferencias),
    constraint cargoconst foreign key (fkcargo) references cargos (idcargos)
);

create table recomendacoes (
	idrecomendacoes int primary key auto_increment,
    genero varchar(45),
    duracao int,
    datageracao datetime,
    fkusuario int,
    
    constraint fkusuarioconst foreign key (fkusuario) references usuario(idUsuario)
    );


create table plano (
	idPlano int primary key auto_increment,
    titulo varchar(20),
    preco decimal(5,2)
);

create table assinatura (
	idAssinatura int UNIQUE auto_increment,
    dataInicio datetime,
    dataFim datetime,
    statusAssinatura varchar(10),
    metodoPagamento varchar(10),
    dataRegistro datetime default CURRENT_TIMESTAMP,

    fkUsuario int not null,
    fkPlano int not null, 

    constraint pkCompostaAssinatura primary key (idAssinatura, fkUsuario, fkPlano),
    constraint assinaturaUsuarioConstraint foreign key (fkUsuario) references usuario (idUsuario),
    constraint assinaturaPlanoConstraint foreign key (fkPlano) references plano (idPlano)
);

create table transacao (
	idTransacao int auto_increment,
    protocolo VARCHAR(20) NOT NULL UNIQUE,
    valor DECIMAL(7,2) NOT NULL,
    metodoPagamento varchar(20) NOT NULL,
    statusTransacao varchar(20) NOT NULL,
    dataPagamento datetime,
    dataRegistro datetime default CURRENT_TIMESTAMP,

    fkAssinatura int not null,

    constraint pkCompostaTransacao primary key (idTransacao, fkAssinatura),
    constraint transacaoAssinaturaConstraint foreign key (fkAssinatura) references assinatura (idAssinatura)
);

create table dados_tratados (
	iddadostratados int primary key auto_increment,
    linhaOrigem int,
    titulo varchar(45),
    disponiveisGlobalmente tinyint,
    dataLancamento datetime,
    horasAssistidas varchar(45),
    generos varchar(45),
    nota int,
    palavraChave text,
    descricao text,
    dataRegistro datetime
    );
    
create table historico_log (
	idHistorico_log int primary key auto_increment,
    nivel_log varchar(45),
    mensagem text,
    origem varchar(100),
    data_hora datetime
    );
    
create table administrador (
    idAdministrador int primary key auto_increment,
    senha varchar(30)
    );

INSERT INTO plano (titulo, preco) VALUES 
    ('Plano Mensal', 49.90), 
    ('Plano Anual', 499.90);
    
insert into administrador(senha) values
    ("senha123");    
    
    
INSERT INTO empresa (nome, cnpj, codigo) VALUES
    ('Empresa Teste', '12345678901234', 'teste123'),
    ('Empresa Teste 2', '12345678901235', 'teste2123'),
    ('Empresa Teste 3', '12345678901236', 'teste3123');

INSERT INTO endereco (logradouro, numero, cidade, estado, fkEmpresa) VALUES
    ('Rua A', '123', 'Cidade A', 'SP', 1),
    ('Rua B', '456', 'Cidade B', 'SP', 2),
    ('Rua C', '789', 'Cidade C', 'SP', 3);
    
insert into cargos (titulo, descricao) values
	('Usuário', 'Usuário padrão do sistema');
    
insert into preferencias (meioNotificacao, statuss) values 
	('E-mail', 1);
        
INSERT INTO usuario (nome, email, senha, fkEmpresa, fkpreferencias, fkcargo) VALUES
    ('Importador de Planilhas', 'importador@signal.local', 'SEM_LOGIN', 1, 1, 1);

-- VIEWS

CREATE VIEW detalhesAssinatura AS
SELECT
    a.idAssinatura,
    a.fkUsuario,
    a.fkPlano,
    a.dataInicio,
    a.dataFim,
    a.statusAssinatura,
    a.metodoPagamento,
    a.dataRegistro,
    p.titulo,
    p.preco
FROM assinatura a
    JOIN plano p
        ON p.idPlano = a.fkPlano;

select usuario.*, empresa.*, endereco.*
from endereco
join empresa
on empresa.idEmpresa = endereco.fkEmpresa
join usuario
on empresa.idEmpresa = usuario.fkEmpresa;

select * from usuario;
select * from empresa;