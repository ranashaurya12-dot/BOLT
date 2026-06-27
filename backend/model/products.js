import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      required: true,
    },

image: {
  type: String,
  required: true,
},

video: {
  type: String,
  default: "",
},

stock: {
  type: Number,
  default: 1,
},
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model(
  "product",
  productSchema
);

export default productModel