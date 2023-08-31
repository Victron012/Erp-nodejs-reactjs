import express from "express";
import { addProducts, deleteProduct, editProduct, getProducts, getProduct } from "../controllers/product.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", addProducts);
router.put("/:id", editProduct);
router.delete("/:id", deleteProduct);

export default router;