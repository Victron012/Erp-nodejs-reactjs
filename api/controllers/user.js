import { db } from "../db.js";
import bcrypt from "bcrypt";
import { addLog } from "./log.js";
import { v4 as uuidv4 } from "uuid";

export const getUsers = (_, res) => {
    try {
        const query = "select idUsuario, nomeUsuario, emailUsuario, tipoUsuario, ativo from usuarios where ativo = true";

        db.query(query, (err, response) => {
            if (err) return res.json(err);

            return res.status(200).json(response);
        });
    } catch (error) {
        console.log(error);
    }
};

export const getUser = (req, res) => {
    try {
        const query = `select nomeUsuario, emailUsuario, tipoUsuario, ativo from usuarios where ativo = true and idUsuario = ${req.params.id}`;

        db.query(query, (err, response) => {
            if (err) return res.json(err);

            return res.status(200).json(response);
        });
    } catch (error) {
        console.log(error);
    }
};

export const addUser = async (req, res) => {
    try {
        const checkQuery = `select nomeUsuario from usuarios where emailUsuario = "${req.body.emailUsuario}" and ativo = true`;
        db.query(checkQuery, (err, response) => {
            if (err) {
                return res.json(err);
            }

            if (response && response.length > 0) {
                return res.json({ msg: "Email já cadastrado!" });
            }
        })

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(req.body.senhaUsuario, salt);
        const nomeUsuario = req.body.nomeUsuario;
        const emailUsuario = req.body.emailUsuario;
        const tipoUsuario = req.body.tipoUsuario;
        const idUsuario = uuidv4();

        const checkAtivo = `select ativo from usuarios where emailUsuario = "${emailUsuario}"`;
        db.query(checkAtivo, (err, response) => {
            if (err) return res.json(err);

            if (response.length > 0) {
                const query = `update usuarios set nomeUsuario = '${nomeUsuario}', emailUsuario = '${emailUsuario}', senhaUsuario = '${passwordHash}', tipoUsuario = '${tipoUsuario}', ativo = true where emailUsuario = '${emailUsuario}'`;

                db.query(query, (err) => {
                    if (err) return res.json(err);

                    addLog("Reativação de usuário", req.body.idUser, `Reativação do usuário ${emailUsuario}`);

                    return res.status(200).json({ msg: "Usuario atualizado com sucesso" });
                });
            } else {
                const query = "insert into usuarios(`uuidUsuario`,`nomeUsuario` , `emailUsuario`, `senhaUsuario`, `tipoUsuario`, `ativo`) values(?)";

                const values = [
                    idUsuario,
                    nomeUsuario,
                    emailUsuario,
                    passwordHash,
                    tipoUsuario,
                    true
                ];

                db.query(query, [values], async (err, response) => {
                    if (err) return res.json(err);

                    addLog("Adicioção de Usuário.", req.body.idUser, `Criação do usuário ${emailUsuario}`);

                    return res.status(200).json({ msg: "Usuario cadastrado com sucesso" });
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
};

export const editUser = async (req, res) => {
    try {
        const idUsuario = req.params.id;
        const nomeUsuario = req.body.nomeUsuario;
        const emailUsuario = req.body.emailUsuario;
        const tipoUsuario = req.body.tipoUsuario;
        const idUser = req.body.idUser;

        const query = `update usuarios set nomeUsuario = '${nomeUsuario}', emailUsuario = '${emailUsuario}', tipoUsuario = '${tipoUsuario}' where idUsuario = ${idUsuario}`;

        db.query(query, (err) => {
            if (err) return res.json(err);

            addLog("Edição de usuário", idUser, `Edição do usuário ${emailUsuario}`);

            return res.status(200).json({ msg: "Usuário alterado com sucesso!" });
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const query = `update usuarios set ativo = false where idUsuario = ${id}`;

        db.query(query, (err) => {
            if (err) return res.status(204).json(err);

            addLog("Exclusão de Usuário.", req.body.idUser, "Exclusão do usuário")
            return res.status(200).json("Usuário excluido com sucesso!");
        })
    } catch (error) {
        console.log(error);
    }
};

export const login = async (req, res) => {
    try {
        const query = `select idUsuario, uuidUsuario, nomeUsuario, emailUsuario, senhaUsuario, tipoUsuario, ativo from usuarios where emailUsuario = "${req.body.emailUsuario}" and ativo = true`

        db.query(query, async (err, response) => {
            if (err) return res.json(err);

            if(response.length <= 0 ){
                return res.status(204).json({msg: "Usuário não existe"});
            }
            const checkPassword = await bcrypt.compare(req.body.senhaUsuario, response[0].senhaUsuario);

            if (!checkPassword) {
                return res.status(204).json({ msg: "Senha inválida!" });
            } else {
                response[0].senhaUsuario = "";
                return res.status(200).json(response);
            }
        })
    } catch (error) {
        console.log(error);
    }
};

export const checkUser = (req, res) => {
    try {
        const query = `select idUsuario, nomeUsuario, tipoUsuario from usuarios where uuidUsuario = '${req.params.id}' and ativo = true`;
        console.log(req.params.id);
        db.query(query, (err, response) => {
            if (err) return res.status(204).json(err);

            if (response && response.length > 0 && response!=null) {
                console.log("r"+response);
                return res.status(200).json(response);
            } else {
                console.log("estou aqui")
                return res.status(204).json({ msg: "Usuario nao existe" });
            }
        });
    } catch (error) {
        console.log(error);
    }
};

export const editPassword = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(req.body.senhaUsuario, salt);
        const query = `update usuarios set senhaUsuario = '${passwordHash}' where idUsuario = ${req.params.id}`;
        db.query(query, (err) => {
            if(err) return res.json(err);

            addLog("Alteração de Senha", req.body.idUser, `Alteração de senha do usuário ${req.body.emailUsuario}`);
            return res.status(200).json({msg: "Senha alterada com sucesso!"});
        })
    } catch (error) {
        console.log(error);
    }
};