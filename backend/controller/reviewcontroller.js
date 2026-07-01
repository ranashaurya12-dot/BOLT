import reviewModel from "../model/review.js";
import productModel from "../model/products.js";
// Create a review
export const createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user._id; // assumes auth middleware sets req.user

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const review = await reviewModel.create({
      user: userId,
      product: productId,
      rating,
      comment,
    });

    await reviewModel.calcAverageRatings(productId);

    return res.status(201).json({ success: true, review });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update your own review
export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id;

    const review = await reviewModel.findOne({ _id: reviewId, user: userId });
    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;
    await review.save();

    await reviewModel.calcAverageRatings(review.product);

    return res.status(200).json({ success: true, review });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete your own review
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user._id;

    const review = await reviewModel.findOneAndDelete({ _id: reviewId, user: userId });
    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    await reviewModel.calcAverageRatings(review.product);

    return res.status(200).json({ success: true, message: "Review deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all reviews for a product (with pagination)
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const reviews = await reviewModel
      .find({ product: productId })
      .populate("user", "name") // adjust field to match your user model
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await reviewModel.countDocuments({ product: productId });

    return res.status(200).json({
      success: true,
      reviews,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};