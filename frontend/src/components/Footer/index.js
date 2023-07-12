import style from './style.module.css';
import React from 'react';

function Footer() {
    return (
        <footer className={style.container}>
            <p className={style.copy_right}><span>Café</span> &copy; 2023</p>
        </footer>
    );
};

export default Footer;