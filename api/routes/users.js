import express from "express";
import { getUsers, addUser, login, deleteUser, checkUser, editUser, editPassword } from "../controllers/user.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", addUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);
router.post("/login", login);
router.get("/checkUser/:id", checkUser);
router.put("/password/:id", editPassword);


export default router;