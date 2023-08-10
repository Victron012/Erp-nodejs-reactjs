import React from 'react';
import style from './style.module.css';

function HomeOptions({ image, text, link }) {
    return (
        <a href={link}>
            <div className={style.container}>
                <img src={image} alt={text}/>
                <h2>{text}</h2>
            </div>
        </a>
    );
};

export default HomeOptions;