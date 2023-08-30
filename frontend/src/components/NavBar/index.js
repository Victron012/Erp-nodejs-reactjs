import style from "./style.module.css";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

function NavBar(logged) {
    const [isLogged, setIsLogged] = useState(false);
    const storageData = localStorage.getItem('authToken');
    const navigate = useNavigate();

    useEffect(() => {
        if(logged===true){
            setIsLogged(true);
        } else{
            api.get(`users/checkUser/${storageData}`)
            .then((response) => {
                console.log(response.status)
                if (response.status === 200) {
                    setIsLogged(true);
                }
            })
        }
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem('authToken');
        navigate("/");
        setIsLogged(false);
    };
    return (
        <nav className={style.container}>
            <a href="/">
                <img src="images/logo.png" alt="Copo de Café" />
            </a>
            <h1>Café</h1>
            {isLogged && <button onClick={handleLogOut}>LogOut</button>}
        </nav>
    );
};

export default NavBar;