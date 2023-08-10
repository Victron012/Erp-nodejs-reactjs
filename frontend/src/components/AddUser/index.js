import React, { useState } from "react";
import style from './style.module.css';
import Button from "../Button";
import { toast } from "react-toastify";
import api from "../../api/api";

function AddUser({ cancel, getUser, setAddUsuario }) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [tipoUsuario, settipoUsuario] = useState("C");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");

    const addUser = async () => {
        if (nome !== "" && email !== "" && senha !== "" & confirmaSenha !== "") {
            if (senha.length < 4 || confirmaSenha.length < 4) {
                toast.error("A senha precisa ter 4 caracteres!");
            } else if (senha === confirmaSenha) {
                api.post("/users", {
                    idUser: localStorage.getItem('id'),
                    nomeUsuario: nome,
                    emailUsuario: email,
                    senhaUsuario: senha,
                    tipoUsuario: tipoUsuario,
                    ativo: true
                })
                    .then((response) => {
                        if (response.status === 200) {
                            toast.success("Usuário adicionado com sucesso!");
                            getUser();
                            setAddUsuario(false);
                        } else {
                            toast.error("Erro ao criar o usuário!")
                        }
                    })
                    .catch(() => toast.error("Erro ao criar o usuário"))
            } else {
                toast.error("As senhas não são iguais!");
            }
        } else {
            toast.error("Preencha todos os campos antes de prosseguir!");
        }
    };
    return (
        <div className={style.container}>
            <div className={style.subContainer}>
                <h2>Usuário</h2>
                <div className={style.form}>
                    <label>Nome</label>
                    <input type="text" placeholder="Insira o nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                    <label>Email</label>
                    <input type="email" placeholder="Insira o email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Tipo de Usuário</label>
                    <select value={tipoUsuario} onChange={(e) => settipoUsuario(e.target.value)}>
                        <option value="C">Comum</option>
                        <option value="A">Admin</option>
                        <option value="S">Super Admin</option>
                    </select>
                    <label>Senha</label>
                    <input type="password" minLength="4" maxLength="4" inputMode="numeric" placeholder="Insira a senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    <label>Confirmar Senha</label>
                    <input type="password" minLength="4" maxLength="4" inputMode="numeric" placeholder="Insira a senha" value={confirmaSenha} onChange={(e) => setConfirmaSenha(e.target.value)} />
                </div>
                <div className={style.btn}>
                    <Button
                        texto="Voltar"
                        handleOnClick={() => cancel()}
                    />
                    <Button
                        texto="Adicionar Usuário"
                        handleOnClick={() => addUser}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddUser;