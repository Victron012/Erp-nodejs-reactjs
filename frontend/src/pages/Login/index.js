import React, { useEffect, useState } from "react";
import style from './style.module.css';
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import Button from "../../components/Button";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    useEffect(() => { localStorage.removeItem('authToken'); }, []);
    const navigate = useNavigate();

    function handleOnChangeEmail(e) {
        setEmail(e.target.value);
    };

    function handleOnChangeSenha(e) {
        setSenha(e.target.value);
    };

    const login = () => {
        if (email === "" || senha === "") {
            setError("Preencha todos os campos");
            return;
        }

        api.post('/users/login', {
            "emailUsuario": `${email}`,
            "senhaUsuario": `${senha}`
        })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    localStorage.setItem('authToken', response.data[0].uuidUsuario);
                    localStorage.setItem('id', response.data[0].idUsario);
                    setError("");
                    navigate('/adm');
                } else {
                    setError("Usuário ou senha incorretos!");
                }
            })
    };

    const cancel = () => {
        navigate('/');
    };

    return (
        <div className={style.container}>
            <div className={style.containerForm}>
                <h2>Login</h2>
                {error !== "" && error}
                <div>
                    <label>Email: </label>
                    <input type="email" value={email} onChange={handleOnChangeEmail} />
                </div>
                <div>
                    <label>Senha: </label>
                    <input type="password" value={senha} onChange={handleOnChangeSenha} />
                </div>
                <div className={style.btn}>
                    <Button
                        texto="Voltar"
                        handleOnClick={() => cancel}
                    />
                    <Button
                        texto="Login"
                        handleOnClick={() => login}
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;