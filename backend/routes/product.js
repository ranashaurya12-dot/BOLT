import express from "express";
import { addProduct, allProducts, singleProduct, updateProduct, deleteProduct } from "../controller/products.js";
import { userAuth } from "../middleware/authprotect.js";

const productRouter = express.Router();

// public routes — no auth needed
productRouter.get("/products", allProducts);
productRouter.get("/single-product/:id", singleProduct);

// protected routes — auth required
productRouter.post("/add-product", userAuth, addProduct);
productRouter.put("/update-product/:id", userAuth, updateProduct);
productRouter.delete("/delete-product/:id", userAuth, deleteProduct);

export default productRouter;