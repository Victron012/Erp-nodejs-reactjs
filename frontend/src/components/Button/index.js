import React from "react";
import style from "./style.module.css";

function Button({ estilo, texto, handleOnClick }) {
    return (
        <button className={style.btn} onClick={handleOnClick()}>{texto}</button>
    );
};

export default Button;