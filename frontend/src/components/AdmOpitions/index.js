import React from "react";
import style from './style.module.css';
import { useNavigate } from "react-router-dom";

function AdmOptions({ image, text, page }) {
    const navigate = useNavigate();
    function handleOnClick(){
        navigate(page);
    };
    return (
        <button className={style.container} onClick={handleOnClick}>
            <div className={style.item}>
                <h3>{text}</h3>
                <img src={image} alt={text} />
            </div>
        </button>
    );
};

export default AdmOptions;