import React, { useEffect, useState } from "react";
import style from './style.module.css';
import Button from "../Button";
import { toast } from "react-toastify";
import api from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";

function AddProduct() {
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [imagem, setImagem] = useState("");
    const [edtProduct, setEdtProduct] = useState(false);
    const [editImage, setEditImage] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(id);
        if (id > 0) {
            api.get(`/products/${id}`)
                .then((response) => {
                    setNome(response.data[0].nomeProduto);
                    setPreco(response.data[0].valorProduto);
                    //setImagem(response.data[0].imagemProduto);
                    setEdtProduct(true);
                });
        }
    }, []);

    const addProduct = () => {
        if (nome !== "" && preco !== "") {
            console.log(localStorage.getItem('id'))
            api.post("/products", {
                idUser: localStorage.getItem('id'),
                nomeProduto: nome,
                valorProduto: preco,
                imagemProduto: imagem,               
                ativo: true
            })
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response);
                        toast.success("Produto adicionado com sucesso!");
                        navigate("/produtos");
                    } else {
                        toast.error("Erro ao criar o produto!");
                    }
                })
                .catch((err) => toast.error(err + "Erro ao criar o produto!"));
        } else {
            toast.error("Preencha todos os campos antes de prosseguir!");
        }
    };

    const editProduct = () => {
        if (nome !== "" && preco !== "") {
            console.log(localStorage.getItem('id'))
            api.put(`/products/${id}`, {
                idUser: localStorage.getItem('id'),
                nomeProduto: nome,
                valorProduto: parseFloat(preco.toString().replace(',','.'))
            })
                .then((response) => {
                    if (response.status === 200) {
                        toast.success("Produto editado com sucesso!");
                        navigate("/produtos");
                    } else {
                        toast.error(response+"Erro ao editar o produto!")
                    }
                })
                .catch((err) => toast.error(err + "Erro ao editar o produto"))
        } else {
            toast.error("Preencha todos os campos antes de prosseguir!");
        }
    };

    const cancel = () => {
        navigate("/produtos");
    };

    const confirm = () => {
        if (edtProduct) {
            editProduct();
        } else {
            addProduct();
        }
    };

    return (
        <div className={style.container}>
            <div className={style.subContainer}>
                <h2>Produto</h2>
                <div className={style.form}>
                    <label>Nome</label>
                    <input type="text" placeholder="Insira o nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                    <label>Preço</label>
                    <input type="text" placeholder="Insira o preço" value={preco} onChange={(e) => setPreco(e.target.value)} />
                    {!edtProduct &&
                        <>
                            <label>Imagem</label>
                            <input type="file" multiple accept="image/*" onChange={(e) => setImagem(e.target.files[0].name)} />
                        </>
                    }
                    {edtProduct &&
                        <a onClick={() => setEditImage(!editImage)}>Trocar imagem</a>
                    }
                </div>
                <div className={style.btn}>
                    <Button
                        texto="Voltar"
                        handleOnClick={() => cancel}
                    />
                    <Button
                        texto={`${edtProduct? "Editar" : "Adicionar"} Produto`}
                        handleOnClick={() => confirm}
                    />
                </div>
            </div>
            {/* {editPassword &&
                <EditPassword
                    setEditPassword={setEditPassword}
                    id={id}
                />
            } */}
        </div>
    );
};

export default AddProduct;