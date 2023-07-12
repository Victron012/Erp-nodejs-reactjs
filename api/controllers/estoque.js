import { db } from "../db.js";
import { addLog } from "./log.js";

export const getEstoque = (_, res) => {
    try {
        const query = `select 
                            estoque.idEstoque, 
                            estoque.idProduto,
                             produtos.nomeProduto, 
                             estoque.quantidade 
                        from 
                            estoque 
                        inner join 
                            produtos on 
                            estoque.idProduto = produtos.idProduto`;
        db.query(query, (err, response) => {
            if (err) return res.json(err);

            return res.status(200).json(response);
        })
    } catch (error) {
        console.log(error);
    }
}

export const getProductsEstoque = (req, res) => {
    try {
        const query = `select 
                            estoque.idEstoque, 
                            estoque.idProduto, 
                            produtos.nomeProduto, 
                            estoque.quantidade 
                        from 
                            estoque 
                        inner join 
                            produtos on 
                            estoque.idProduto = produtos.idProduto 
                        where 
                            estoque.idProduto = ${req.params.id}`;
        db.query(query, (err, response) => {
            if (err) return res.json(err);

            return res.status(200).json(response);
        })
    } catch (error) {
        console.log(error);
    }
}

export const addProductsEstoque = (req, res) => {
    try {
        const checkId = `select 
                                idEstoque, 
                                quantidade 
                            from 
                                estoque 
                            where 
                                idProduto = ${req.body.idProduto}`;
        db.query(checkId, (err, response) => {
            if (err) return res.json(err);

            if (response && response.length > 0) {
                const idEstoque = response[0].idEstoque;
                const quantidade = response[0].quantidade + req.body.quantidade;
                const query = `update estoque set quantidade = ${quantidade} where idEstoque = ${idEstoque}`;
                db.query(query, (err) => {
                    if (err) return res.json(err);

                    addLog("Inclusão no estoque", req.body.idUser, `Inclusão no estoque de ${req.body.quantidade} unidade(s) do produto ${req.body.nomeProduto}`);
                    return res.status(200).json("Estoque atualizado com sucesso!");
                });
            } else {
                const query = "insert into estoque(`idProduto`, `quantidade`) values(?)";

                const values = [
                    req.body.idProduto,
                    req.body.quantidade
                ]

                db.query(query, [values], (err) => {
                    if (err) return res.json(err);

                    addLog("Inclusão no estoque", req.body.idUser, `Inclusão no estoque de ${req.body.quantidade} unidade(s) do produto ${req.body.nomeProduto}`);
                    return res.status(200).json("Produtos inseridos com sucesso!");
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
};

export const diminuiEstoque = (id, quantidade, quantidadeEstoque) => {
    try {       
        const novaQuantiadade = quantidadeEstoque - quantidade;
        console.log("id: " + id + ", quantidade: "+quantidade+", quantidadeAtual: "+quantidadeEstoque);
        const query = `update estoque set quantidade = ${novaQuantiadade} where idProduto = ${id}`;
        db.query(query, (err) => {
            if (err) return console.log("Erro ao diminuir estoque");
            return console.log("Estoque diminuido");
        });
    } catch (error) {
        console.log(error);
    }
};