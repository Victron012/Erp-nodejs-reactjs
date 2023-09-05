import React, { useEffect, useState } from "react";
import style from './style.module.css';
import api from "../../api/api";
import Product from "../../components/Product";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";


function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const storageData = localStorage.getItem('authToken');
    const navigate = useNavigate();

    useEffect(() => {
        checkId(storageData);
        getProducts();
    }, []);

    const checkId = (token) => {
        api.get(`users/checkUser/${token}`)
            .then((response) => {
                if (response.status !== 200) {
                    navigate('/login');
                }
            })
    };

    const voltar = () => {
        navigate("/adm");
    };

    const AddUser = () => {
        navigate("/produtos/add");
    };

    const getProducts = () => {
        api.get("/products")
            .then((response) => {
                setProdutos(response.data);
            });
    };

    return (
        <div className={style.container}>
                <div className={style.usuarios}>
                {produtos.map((produto) => (
                    <Product
                        nome={produto.nomeProduto}
                        imagem={produto.imagemProduto}
                        preco={produto.valorProduto}
                        id={produto.idProduto}
                    />
                ))}
            </div>
            <div className={style.btn}>
                <Button
                    texto="Voltar"
                    handleOnClick={() => voltar}
                />
                <Button
                    texto="Adicionar"
                    handleOnClick={() => AddUser}
                />
            </div>
        </div>
    );
};

export default Produtos;