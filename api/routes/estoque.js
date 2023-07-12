import express from "express";
import { addProductsEstoque, getEstoque, getProductsEstoque} from "../controllers/estoque.js";

const router = express.Router();

router.get("/", getEstoque);
router.get("/:id", getProductsEstoque);
router.post("/", addProductsEstoque);

export default router;