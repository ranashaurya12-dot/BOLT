import express from "express";
import { addToCart,getCart,updateCart,removeCart } from "../controller/cartcontroller.js";
import { userAuth } from "../middleware/authprotect.js";

const cartRouter = express.Router();

cartRouter.post(
  "/add-cart",
  userAuth,
  addToCart
);
cartRouter.get(
  "/get-cart",
  userAuth,
  getCart
);
cartRouter.put(
  "/update-cart/:id",
  userAuth,
updateCart
);
cartRouter.delete(
  "/delete-cart/:id",
  userAuth,
removeCart
);
export default cartRouter;