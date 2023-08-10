import React, { useEffect } from "react";
import style from './style.module.css';
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import AdmOptions from "../../components/AdmOpitions";

function Adm() {
    const storageData = localStorage.getItem('authToken');
    const navigate = useNavigate();

    useEffect(() => {
        checkId(storageData);
    }, []);

    const checkId = (token) => {
        api.get(`users/checkUser/${token}`)
            .then((response) => {
                console.log(response.status)
                if (response.status !== 200) {
                    navigate('/login');
                }
            })
    };
    return (
        <div className={style.container}>
            <AdmOptions
                image ="/images/logo.png"
                text="Usuários"
                page="/usuarios"
            />
            <AdmOptions
                image ="/images/logo.png"
                text="Produtos"
                page="/produtos"
            />
            <AdmOptions
                image ="/images/logo.png"
                text="Estoque"
                page="/estoque"
            />
            <AdmOptions
                image ="/images/logo.png"
                text="Vendas"
                page="/vendas"
            />
        </div>
    );
};

export default Adm;