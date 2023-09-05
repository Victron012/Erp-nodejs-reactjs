import { useNavigate, useParams } from 'react-router-dom';
import style from './style.module.css';
import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import Button from '../Button';
import { toast } from 'react-toastify';

function AddEstoque() {
    const [produtos, setProdutos] = useState([]);
    const [produto, setProduto] = useState("");
    const [idProduto, setIdProduto] = useState(0);
    const [quantidade, setQuantidade] = useState(0);
    const [edtEstoque, setEdtEstoque] = useState(false);
    const storageData = localStorage.getItem('authToken');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        checkId(storageData);
        if (id > 0) {
            api.get(`/estoque/${id}`)
                .then((response) => {
                    setProduto(response.data[0].nomeProduto);
                    setIdProduto(response.data[0].idProduto);
                    setEdtEstoque(true);
                });
        } else {
            getProducts();
        }
    }, []);

    const checkId = (token) => {
        api.get(`users/checkUser/${token}`)
            .then((response) => {
                if (response.status !== 200) {
                    navigate('/login');
                }
            })
    };

    const getProducts = () => {
        api.get("/products")
            .then((response) => {
                setProdutos(response.data);
                console.log(response.data)
            });
    };

    const cancel = () => {
        navigate("/estoque");
    }

    const confirm = () => {
        if (idProduto != 0 && quantidade > 0) {
            api.post("/estoque", {
                idUser: localStorage.getItem('id'),
                idProduto: idProduto,
                nomeProduto: produto,
                quantidade: quantidade
            })
                .then((response) => {
                    if (response.status === 200) {
                        toast.success("Estoque adicionado com sucesso!");
                        navigate("/estoque");
                    } else {
                        toast.error(response + "Erro ao adicionar o produto!")
                    }
                })
                .catch((err) => toast.error(err + "Erro ao adiconar o produto!"))
        } else {
            toast.error("Preencha todos os campos!");
        }
    }

    return (
        <div className={style.container}>
            <div className={style.container}>
                <div className={style.subContainer}>
                    <h2>Produto</h2>
                    <div className={style.form}>
                        {!edtEstoque &&
                            <>
                                <label>Nome</label>
                                <select onChange={(e) => { setProduto(e.target.name); setIdProduto(e.target.value) }}>
                                    <option value={0}>Escolha um produto</option>
                                    {produtos.map((prod) => (
                                        <option value={prod.idProduto} name={prod.nomeProduto} >{prod.nomeProduto}</option>
                                    ))}
                                </select>
                            </>
                        }
                        <label>Quantidade</label>
                        <input type="text" placeholder="Insira a quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
                    </div>
                    <div className={style.btn}>
                        <Button
                            texto="Voltar"
                            handleOnClick={() => cancel}
                        />
                        <Button
                            texto={"Adicionar Estoque"}
                            handleOnClick={() => confirm}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEstoque;