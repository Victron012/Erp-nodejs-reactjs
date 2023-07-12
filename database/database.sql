create database erp;

use erp;

create table usuarios (
	idUsuario int not null auto_increment,
    uuidUsuario varchar(500) not null,
    nomeUsuario varchar(255) not null,
    emailUsuario varchar(255) not null,
    senhaUsuario varchar(255) not null,
    tipoUsuario char(1) not null,
    ativo boolean not null,
    constraint PK_Usuario primary key (idUsuario)
);

create table produtos (
	idProduto int not null auto_increment,
    nomeProduto varchar(255) not null,
    valorProduto double not null,
    imagemProduto varchar(255) not null,
    ativo boolean not null,
    constraint PK_Produto primary key (idProduto)
);

create table estoque (
	idEstoque int not null auto_increment,
    idProduto int not null,
    quantidade int not null,
    constraint PK_Estoque primary key (idEstoque),
    constraint FK_Estoque_Produtos foreign key (idProduto) references produtos(idProduto)
);

create table compras (
	idCompra int not null auto_increment,
    idUsuario int not null,
    valorCompra double not null,
    dataCompra varchar(255) not null,
    constraint PK_Compra primary key (idCompra),
    constraint FK_Compras_Usuarios foreign key (idUsuario) references usuarios(idUsuario)
);

create table itensCompra (
	idItensCompra int not null auto_increment,
    idCompra int not null,
    idProduto int not null,
    quantidade int not null,
    constraint PK_ItensCompra primary key (idItensCompra),
    constraint FK_ItensCompra_Compras foreign key (idCompra) references compras(idCompra),
    constraint FK_ItensCompra_Produtos foreign key (idProduto) references produtos(idProduto)
);

create table log (
	idLog int not null auto_increment,
    tipoAcao varchar(255) not null,
    idUsuario int not null,
    descricao varchar(255) not null,
    constraint PK_Log primary key (idLog),
    constraint FK_Log_Usuarios foreign key (idUsuario) references usuarios(idUsuario)
);

alter table usuarios add emailUsuario varchar(255) not null;
alter table usuarios add uuidUsuario varchar(500) not null;

select * from usuarios;

select * from log;

select * from produtos;

select tipoUsuario from usuarios where uuidUsuario = '6836f2d9-60f3-495c-8cd2-025e1f95f97e';

select idUsuario, nomeUsuario, emailUsuario, senhaUsuario, tipoUsuario, ativo from usuarios where emailUsuario = "teste@teste.com"
