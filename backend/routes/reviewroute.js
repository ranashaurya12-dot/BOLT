import express from "express";
import {
  createReview,
  updateReview,
  deleteReview,
  getProductReviews,
} from "../controller/reviewcontroller.js";
import { userAuth } from "../middleware/authprotect.js";

const router = express.Router();

router.post("/create", userAuth, createReview);
router.put("/update/:reviewId", userAuth, updateReview);
router.delete("/delete/:reviewId", userAuth, deleteReview);
router.get("/product/:productId", getProductReviews);

export default router;