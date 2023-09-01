import { db } from "../db.js";
import { addLog } from "./log.js";
import { addProductsEstoque } from "./estoque.js";

export const getProducts = (_, res) => {
    try {
        const query = "select produtos.idProduto, produtos.nomeProduto, produtos.valorProduto, produtos.imagemProduto from produtos where ativo = true";
        db.query(query, (err, response)=>{
            if(err) return res.json(err);
        
            return res.status(200).json(response);
        })
    } catch (error) {
        console.log(error);
    }
};

export const getProduct = (req, res) => {
    try {
        const query = `select nomeProduto, valorProduto, imagemProduto from produtos where ativo = true and idProduto = ${req.params.id}`;
        db.query(query, (err, response)=>{
            if(err) return res.status(204).json(err);
        
            return res.status(200).json(response);
        })
    } catch (error) {
        console.log(error);
    }
};

export const addProducts = (req, res) => {
    try {
        const checkQuery = `select nomeProduto from produtos where nomeProduto = "${req.body.nomeProduto}" and ativo = true`;
        db.query(checkQuery, (err, response) => {
            if (err) {
                return res.status(500).json(err);
            }

            if (response && response.length > 0) {
                return res.status(500).json({ msg: "Produto já cadastrado!" });
            }
        })

        const nomeProduto = req.body.nomeProduto;
        const valorProduto = req.body.valorProduto;
        const imagemProduto = req.body.imagemProduto;

        const checkAtivo = `select ativo from produtos where nomeProduto = "${nomeProduto}"`;
        db.query(checkAtivo, (err, response) => {
            if(err) return res.json(err);

            if(response.length > 0){
                const query = `update produtos set nomeProduto = '${nomeProduto}', valorProduto = '${valorProduto}', imagemProduto = '${imagemProduto}', ativo = true where nomeProduto = '${nomeProduto}'`;

                db.query(query, (err) => {
                    if (err) return res.status(204).json(err);

                    addLog("Reativação de Produto", req.body.idUser, `Reativação do produto ${nomeProduto}`);

                    return res.status(200).json({ msg: "Produto cadastrado com sucesso!" });
                });
            } else {
                const query =  "insert into produtos(`nomeProduto`, `valorProduto`, `imagemProduto`, `ativo`) values(?)";
                const values = [
                    nomeProduto,
                    valorProduto,
                    imagemProduto,
                    true
                ];
                db.query(query, [values], (err)=>{
                    if(err) return res.staus(204).json(err);

                    addLog("Criação de Produto", req.body.idUser, `Criação do produto ${nomeProduto}`);
                    return res.status(200).json({msg: "Produto cadastrado com sucesso!"});
                })
            }
        })
    } catch (error) {
        console.log(error);
    }
};

export const editProduct = (req, res) => {
    try {
        const query = `update produtos set nomeProduto = '${req.body.nomeProduto}', valorProduto = '${req.body.valorProduto}' where idProduto = ${req.params.id}`;
        db.query(query, (err) => {
            if(err) return res.status(204).json(err);

            addLog("Edição de Produto", req.body.idUser, `Edição do produto ${req.body.nomeProduto}`);
            return res.status(200).json({msg: "Produto editado com sucesso!"});
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteProduct = (req, res) => {
    try {
        const query = `update produtos set ativo = false where idProduto = ${req.params.id}`;
        db.query(query, (err)=>{
            if(err) return res.status(204).json(err);

            addLog("Exclusão de Produto", req.body.idUser, `Exclusão do produto ${req.body.nomeProduto}`);
            return res.status(200).json({msg: "Produto excluido com sucesso!"});
        });
    } catch (error) {
        console.log(error);
    }
};