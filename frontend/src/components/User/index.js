import React from "react";
import style from "./style.module.css";
import Button from "../Button";
import api from "../../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function User({ nome, email, id, tipoUsuario, keyUser}) {
    const navigate = useNavigate();

    const tipo = () => {
        if (tipoUsuario === "C") {
            return "Comum"
        } else if (tipoUsuario === "A") {
            return "Admin"
        } else {
            return "Super Admin"
        }
    };

    const handleOnDelete = () => {
        const token = localStorage.getItem('authToken');
        api.get(`users/checkUser/${token}`)
            .then((response) => {
                if (response.status === 200) {
                    if (id !== response.data[0].idUsuario) {
                        api.delete(`/users/${id}`,{
                            idUser: response.data[0].idUser
                        })
                            .then((res) => {
                                if (res.status === 200) {
                                    toast.success('Usuário excluido com sucesso!');
                                    window.location.reload(true);
                                } else {
                                    toast.error('Erro ao excluir usuário!');
                                }
                            })
                    }else{
                        toast.error('Não é possível excluir o próprio usuário!');
                    }
                }
            })
    };

    const handleOnEdit = () => {
        navigate(`/usuarios/add/${id}`);
    };

    return (
        <div className={style.container} id={id} key={keyUser}>
            <div>Nome: <h4>{nome}</h4></div>
            <div>Email: <p>{email}</p></div>
            <div>Tipo Usuário: <p>{tipo()}</p></div>
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
}

export default User;