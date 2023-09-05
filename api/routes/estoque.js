import express from "express";
import { addProductsEstoque, getEstoque, getProductsEstoque, removeEstoque} from "../controllers/estoque.js";

const router = express.Router();

router.get("/", getEstoque);
router.get("/:id", getProductsEstoque);
router.post("/", addProductsEstoque);
router.delete("/:id", removeEstoque);

export default router;