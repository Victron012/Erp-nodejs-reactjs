import style from './style.module.css';
import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Estoque() {
    const [estoque, setEstoque] = useState([]);
    const navigate = useNavigate();

    const getEstoque = () => {
        api.get("/estoque")
            .then((response) => {
                console.log(response.data)
                setEstoque(response.data);
            });
    }

    useEffect(() => {
        getEstoque();
    }, [])

    const criaEstoque = () => {

    }

    const addItenEstoque = () => {

    }

    const deleteEstoque = (id) => {
        api.delete(`/estoque/${id}`, {
            idUser: localStorage.getItem('id')
        })
        .then((response) =>{
            if(response.status === 200) {
                toast.success("Estoque removido com sucesso!");
                window.location.reload(true);
            }
        })
        .catch(() => toast.error("Não foi possível excluir o estoque!"))
    }

    const cancel = () => {
        navigate("/adm");
    }

    return (
        <div className={style.container}>
            <div className={style.content}>
                <div className={style.tab}>
                    <table>
                        <tr>
                            <th>Nome</th>
                            <th>Quantidade</th>
                            <th>Ações</th>
                        </tr>
                        {estoque.map((est) => (
                            <tr>
                                <td>{est.nomeProduto}</td>
                                <td className={style.qnt}>{est.quantidade}</td>
                                <td className={style.act}>+/<p onClick={() => deleteEstoque(est.idEstoque)}>Trash</p></td>
                            </tr>
                        ))}
                    </table>
                </div>
                <div className={style.btn}>
                    <Button
                        texto="Voltar"
                        handleOnClick={() => cancel}
                    />
                    <Button
                        texto="Criar Novo Estoque"
                        handleOnClick={() => { }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Estoque;