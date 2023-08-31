import React, { useEffect, useState } from "react";
import style from './style.module.css';
import api from "../../api/api";
import User from "../../components/User";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";


function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const storageData = localStorage.getItem('authToken');
    const navigate = useNavigate();

    useEffect(() => {
        checkId(storageData);
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
        navigate("/usuarios/add");
    };

    const getUsers = () => {
        api.get("/users")
            .then((response) => {
                setUsuarios(response.data);
                console.log(response.data)
            });
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className={style.container}>
                <div className={style.usuarios}>
                {usuarios.map((user) => (
                    <User
                        nome={user.nomeUsuario}
                        email={user.emailUsuario}
                        tipoUsuario={user.tipoUsuario}
                        id={user.idUsuario}
                        keyUser={user.idUsuario}
                        getUsers={() => getUsers}
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

export default Usuarios;