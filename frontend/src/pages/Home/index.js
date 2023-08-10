import React from "react";
import style from './style.module.css';
import HomeOptions from "../../components/HomeOptions";

function Home(){
    return(
        <div className={style.container}>
            <HomeOptions
                image='/images/cesta_de_compras.png'
                text="Comprar"
                link="/Compras"
            />
            <HomeOptions
                image='/images/painel_adm.png'
                text="Painel de Administração"
                link="/adm"
            />
        </div>
    );
};

export default Home;