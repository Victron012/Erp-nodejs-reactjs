import style from "./style.module.css";
import React from 'react';

function  NavBar() {
    return (
        <nav className={style.container}>
            <img src="images/logo.png"/>
            <h1>Café</h1>
        </nav>
    );
};

export default NavBar;