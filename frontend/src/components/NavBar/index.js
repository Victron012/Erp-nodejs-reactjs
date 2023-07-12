import style from "./style.module.css";
import React from 'react';

function  NavBar() {
    return (
        <div className={style.container}>
            <img src="images/logo.png"/>
            <h1>Café</h1>
        </div>
    );
};

export default NavBar;