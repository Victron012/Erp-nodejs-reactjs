import { db } from "../db.js";
import { addLog } from "./log.js";
import { diminuiEstoque } from "./estoque.js";

const addItemCompra = (idCompra, idProduto, quantidade) => {
    try {
        const query = 'insert into itenscompra(`idCompra`, `idProduto`, `quantidade`) values(?)';

        const values = [
            idCompra,
            idProduto,
            quantidade
        ];

        db.query(query, [values], (err) => {
            if (err) return console.log(err);

            return console.log("Item cadastrado");
        });
    } catch (error) {
        console.log(error);
    }
};

export const addCompra = async (req, res) => {
    try {
        const itens = req.body.itens;
        const query = "insert into compras(`idUsuario`, `valorCompra`, `dataCompra`) values(?)";
        const values = [
            req.body.idUsuario,
            req.body.valorCompra,
            req.body.dataCompra
        ];
        db.query(query, [values], async (err, response) => {
            if (err) return res.json(err);

            const idCompra = response.insertId;

            await itens.map((item) => {
                addItemCompra(idCompra, item.idProduto, item.quantidade);
                diminuiEstoque(item.idProduto, item.quantidade, item.quantidadeEstoque);
            });
            addLog("Compra", req.body.idUsuario, `Compra realizada pelo usário ${req.body.idUsuario} no dia ${req.body.dataCompra}`);
            return res.status(200).json(response);
        });
    } catch (error) {
        console.log(error);
    }
};

export const getCompras = (_, res) => {
    try {
        const query = `select 
                            idCompra, 
                            idUsuario, 
                            valorCompra, 
                            dataCompra 
                        from 
                            compras`;
        db.query(query, (err, response) => {
            if (err) return res.json(err);

            return res.status(200).json(response);
        })
    } catch (error) {
        console.log(error);
    }
};

export const getComprasByUser = (req, res) => {
    try {
        const query = `select 
                            idCompra, 
                            idUsuario, 
                            valorCompra, 
                            dataCompra 
                        from 
                            compras 
                        where 
                            idUsuario = ${req.params.id}`;
        db.query(query, (err, response) => {
            if (err) return res.json(err);

            return res.status(200).json(response);
        })
    } catch (error) {
        console.log(error);
    }
};

export const getComprasById = (req, res) => {
    try {
        const query = `select 
                            compras.idCompra, 
                            compras.idUsuario, 
                            usuarios.nomeUsuario,
                            compras.valorCompra, 
                            compras.dataCompra 
                        from 
                            compras
                        inner join
                            usuarios on
                            compras.idUsuario = usuarios.idUsuario
                        where 
                            compras.idCompra = ${req.params.id}`;
        db.query(query, (err, response) => {
            if (err) return res.json(err);

            return res.status(200).json(response);
        })
    } catch (error) {
        console.log(error);
    }
};

export const getCompraDetalhada = (req, res) => {
    try {
        const query = `select 
                            itensCompra.idItensCompra, 
                            itensCompra.idProduto, 
                            produtos.nomeProduto, 
                            itensCompra.quantidade, 
                            produtos.valorProduto, 
                            itensCompra.quantidade*produtos.valorProduto as Preco 
                        from 
                            itensCompra 
                        inner join 
                            produtos on
                                itensCompra.idProduto = produtos.idProduto 
                        where
                            itensCompra.idCompra = ${req.params.id}`;
        db.query(query, (err, response2) => {
            if (err) return res.json(err);

            res.status(200).json((response2));
        });
    } catch (error) {
        console.log(error);
    }
};