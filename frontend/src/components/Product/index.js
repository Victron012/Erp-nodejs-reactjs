import React from "react";
import style from "./style.module.css";
import Button from "../Button";
import api from "../../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function Product({ id, nome, preco, imagem }) {
    const navigate = useNavigate();

    const handleOnDelete = () => {
        api.get(`/estoque/${id}`)
            .then((response) => {
                console.log(response.data.length)
                if (response.status === 200 && response.data.length > 0) {
                    console.log(response.data[0].quantidade)
                    if (response.data[0].quantidade === 0) {
                        api.delete(`/products/${id}`, {
                            idUser: localStorage.getItem('id')
                        })
                            .then((res) => {
                                if (res.status === 200) {
                                    toast.success('Produto excluido com sucesso!');
                                    window.location.reload(true);
                                } else {
                                    toast.error('Erro ao excluir produto!');
                                }
                            });
                    } else {
                        toast.error("Não é possível excluir o produto porque ele tem itens em estoque!");
                    }
                } else {
                    api.delete(`/products/${id}`, {
                        idUser: localStorage.getItem('id')
                    })
                        .then((res) => {
                            if (res.status === 200) {
                                toast.success('Produto excluido com sucesso!');
                                window.location.reload(true);
                            } else {
                                toast.error('Erro ao excluir produto!');
                            }
                        });
                }
            });
    };

    const handleOnEdit = () => {
        navigate(`/produtos/add/${id}`);
    };

    return (
        <div className={style.container} id={id} >
            <img src={imagem} />
            <div>Nome: <h4>{nome}</h4></div>
            <div>Preço: <p>{preco}</p></div>
            <div className={style.btn}>
                <Button
                    texto="Excluir"
                    handleOnClick={() => handleOnDelete}
                />
                <Button
                    texto="Editar"
                    handleOnClick={() => handleOnEdit}
                />
            </div>
        </div>
    );
};

export default Product;