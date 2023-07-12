import { db } from "../db.js";

export const addLog = (tipoAcao, idUsuario, descricao) => {
    const query = "insert into log(`tipoAcao` , `idUsuario`, `descricao`) values(?)";

    const values = [
        tipoAcao,
        idUsuario,
        descricao
    ];

    db.query(query, [values], (err) => {
        if (err) return console.log(err);

        return console.log("log cadastrado");
    });
}