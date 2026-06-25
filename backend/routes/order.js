import express from "express";

import {
  placeOrder,
  myOrders,
  cancelOrder
} from "../controller/order.js";

import { userAuth } from "../middleware/authprotect.js";

const orderRouter = express.Router();

orderRouter.post(
  "/place-order",
  userAuth,
  placeOrder
);

orderRouter.get(
  "/my-orders",
  userAuth,
  myOrders
);
orderRouter.put("/cancel-order/:id", userAuth, cancelOrder)


export default orderRouter;