import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";
import { userAuth } from "../middleware/authprotect.js";
import {
  getStats,
  allUsers,
  deleteUser,
  allOrders,
  updateOrderStatus,
} from "../controller/admincontroller.js"; // ← fixed
import {
  allProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controller/products.js";

const adminRouter = express.Router();

// stats
adminRouter.get("/stats", userAuth, adminAuth, getStats);

// users
adminRouter.get("/users", userAuth, adminAuth, allUsers);
adminRouter.delete("/user/:id", userAuth, adminAuth, deleteUser);

// orders
adminRouter.get("/orders", userAuth, adminAuth, allOrders);
adminRouter.put("/order/:id", userAuth, adminAuth, updateOrderStatus);

// products
adminRouter.get("/products", userAuth, adminAuth, allProducts);
adminRouter.post("/add-product", userAuth, adminAuth, addProduct);
adminRouter.put("/product/:id", userAuth, adminAuth, updateProduct);
adminRouter.delete("/product/:id", userAuth, adminAuth, deleteProduct);

export default adminRouter;