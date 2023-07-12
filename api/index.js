import express from "express";
import cors from "cors";
import userRouter from "./routes/users.js";
import productRouter from "./routes/products.js";
import estoqueRouter from "./routes/estoque.js";
import comprasRouter from "./routes/compras.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/estoque", estoqueRouter);
app.use("/compras", comprasRouter);

app.get("/", (_, res)=>{
    res.status(200).send("API OK");
});


app.listen(8900, console.log("Api rondando em: http://localhost:8900"));