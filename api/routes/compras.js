import express from "express";
import { addCompra, getCompraDetalhada, getCompras, getComprasById, getComprasByUser } from "../controllers/compra.js";

const router = express.Router();

router.get("/", getCompras);
router.get("/user/:id", getComprasByUser);
router.get("/:id", getComprasById);
router.get("/details/:id", getCompraDetalhada);
router.post("/", addCompra);


export default router;