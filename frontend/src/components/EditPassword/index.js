import style from './style.module.css';
import React, { useState } from "react";
import Button from '../Button';
import api from '../../api/api';
import { toast } from "react-toastify";

function EditPassword({ setEditPassword, id }) {
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");

    const cancel = () => {
        setEditPassword(false);
    }

    const confirm = () => {
        if (senha !== "" && confirmaSenha !== "") {
            if (senha === confirmaSenha) {
                if (senha.length > 3) {
                    api.put(`/users/password/${id}`, {
                        idUser: localStorage.getItem('id'),
                        senhaUsuario: senha,
                    }).then((response) => {
                        if (response.status === 200) {
                            toast.success("Senha alterada com sucesso!");
                            cancel();
                        } else {
                            toast.error("Erro ao atualizar a senha!");
                        }
                    }).catch((err) => toast.error(err+"Erro ao atualizar a senha!"));
                } else {
                    toast.error("A senha precisa ter 4 mínimo caracteres!");
                }
            } else {
                toast.error("As senhas precisam ser iguais!");
            }
        } else {
            toast.error("Insira todos os dados!");
        }
    }

    return (
        <div className={style.container}>
            <h2>Editar senha</h2>
            <div className={style.content}>
                <label>Senha</label>
                <input type='password' value={senha} onChange={(e) => setSenha(e.target.value)} />
                <label>Confirmar Senha</label>
                <input type='password' value={confirmaSenha} onChange={(e) => setConfirmaSenha(e.target.value)} />
                <div className={style.btn}>
                    <Button
                        texto="Voltar"
                        handleOnClick={() => cancel}
                    />
                    <Button
                        texto="Editar Senha"
                        handleOnClick={() => confirm}
                    />
                </div>
            </div>
        </div>
    );
}

export default EditPassword;