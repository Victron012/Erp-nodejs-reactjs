import React, { useEffect, useState } from "react";
import style from './style.module.css';
import Button from "../Button";
import { toast } from "react-toastify";
import api from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import EditPassword from "../EditPassword";

function AddUser() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [tipoUsuario, settipoUsuario] = useState("C");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");
    const [edtUser, setedtUser] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(id);
        if (id > 0) {
            api.get(`/users/${id}`)
                .then((response) => {
                    setNome(response.data[0].nomeUsuario);
                    setEmail(response.data[0].emailUsuario);
                    settipoUsuario(response.data[0].tipoUsuario);
                    setedtUser(true);
                });
        }
    }, []);

    const addUser = async () => {
        if (nome !== "" && email !== "" && senha !== "" & confirmaSenha !== "") {
            if (senha.length < 4 || confirmaSenha.length < 4) {
                toast.error("A senha precisa ter no mínimo 4 caracteres!");
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
                            navigate("/usuarios");
                        } else {
                            toast.error("Erro aqui ao criar o usuário!")
                        }
                    })
                    .catch((err) => toast.error(err + "Erro ao criar o usuário"))
            } else {
                toast.error("As senhas não são iguais!");
            }
        } else {
            toast.error("Preencha todos os campos antes de prosseguir!");
        }
    };

    const editUser = () => {
        if (nome !== "" && email !== "") {
            api.put(`/users/${id}`, {
                idUser: localStorage.getItem('id'),
                nomeUsuario: nome,
                emailUsuario: email,
                tipoUsuario: tipoUsuario,
                ativo: true
            })
                .then((response) => {
                    if (response.status === 200) {
                        toast.success("Usuário editado com sucesso!");
                    } else {
                        toast.error("Erro aqui ao criar o usuário!")
                    }
                })
                .catch((err) => toast.error(err + "Erro ao criar o usuário"))
        } else {
            toast.error("Preencha todos os campos antes de prosseguir!");
        }
    };

    const cancel = () => {
        navigate("/usuarios");
    };

    const confirm = () => {
        if (edtUser) {
            editUser();
        } else {
            addUser();
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
                    {!edtUser &&
                        <>
                            <label>Senha</label>
                            <input type="password" minLength="4" maxLength="4" inputMode="numeric" placeholder="Insira a senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                            <label>Confirmar Senha</label>
                            <input type="password" minLength="4" maxLength="4" inputMode="numeric" placeholder="Insira a senha" value={confirmaSenha} onChange={(e) => setConfirmaSenha(e.target.value)} />
                        </>
                    }
                    {edtUser &&
                        <a onClick={() => setEditPassword(!editPassword)}>Trocar senha</a>
                    }
                </div>
                <div className={style.btn}>
                    <Button
                        texto="Voltar"
                        handleOnClick={() => cancel}
                    />
                    <Button
                        texto="Adicionar Usuário"
                        handleOnClick={() => confirm}
                    />
                </div>
            </div>
            {editPassword &&
                <EditPassword
                    setEditPassword={setEditPassword}
                    id={id}
                />
            }
        </div>
    );
};

export default AddUser;