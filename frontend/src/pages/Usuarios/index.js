import React, { useEffect, useState } from "react";
import style from './style.module.css';
import api from "../../api/api";
import User from "../../components/User";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import AddUser from "../../components/AddUser";


function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [addUsuario, setAddUsuario] = useState(false);

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

    const changeAddUser = () => {
        setAddUsuario(!addUsuario);
    };

    const getUsers = () => {
        api.get("/users")
            .then((response) => {
                setUsuarios(response.data);
            });
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className={style.container}>
            {addUsuario &&
                <AddUser
                    cancel={() => changeAddUser}
                    getUser={getUsers}
                />
            }
            <div className={style.usuarios}>
                {usuarios.map((user) => (
                    <User
                        nome={user.nomeUsuario}
                        email={user.emailUsuario}
                        tipoUsuario={user.tipoUsuario}
                        id={user.idUsuario}
                        keyUser={user.idUsuario}
                        getUsers={() => getUsers}
                        setAddUsuario={setAddUsuario}
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
                    handleOnClick={() => changeAddUser}
                />
            </div>
        </div>
    );
};

export default Usuarios;