import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

// Prevent same user from reviewing the same product twice
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

// Recalculate product's average rating + review count
reviewSchema.statics.calcAverageRatings = async function (productId) {
  const stats = await this.aggregate([
{ $match: { product: new mongoose.Types.ObjectId(productId) } },
    {
      $group: {
        _id: "$product",
        numReviews: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  await mongoose.model("product").findByIdAndUpdate(productId, {
    rating: stats.length > 0 ? stats[0].avgRating : 0,
    numReviews: stats.length > 0 ? stats[0].numReviews : 0,
  });
};

const reviewModel = mongoose.model("review", reviewSchema);

export default reviewModel;