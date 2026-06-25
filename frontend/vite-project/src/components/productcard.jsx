import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

function ProductCard({ product }) {
  console.log("Rendering:", product.name);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (product.stock === 0) {
      toast.error("Product is out of stock");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/api/cart/add-cart",
        { productId: product._id, quantity: 1 },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Added To Cart");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const discountPercent = product.discountPrice && product.discountPrice > product.price
    ? Math.round(((product.discountPrice - product.price) / product.discountPrice) * 100)
    : null;

  return (
    <div
      onClick={handleCardClick}
      className="group bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden hover:border-blue-500/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-72">
       {/* <img
  src={product.image}
  alt={product.name}
  loading="lazy"
  decoding="async"
  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
/> */}

        {/* Discount badge */}
        {discountPercent && (
          <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {discountPercent}% OFF
          </div>
        )}

        {/* Out of stock overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="bg-red-500 text-white px-6 py-2 rounded-full font-bold">
              Out Of Stock
            </span>
          </div>
        )}

        {/* Low stock badge */}
        {product.stock > 0 && product.stock <= 5 && (
          <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
            Only {product.stock} left!
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-blue-500 font-semibold uppercase tracking-wider text-sm">
          {product.category}
        </p>

        <h2 className="text-xl font-black text-white mt-2 leading-tight">
          {product.name}
        </h2>

        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-3 mt-4">
          <p className="text-2xl text-blue-500 font-black">
            ₹{product.price}
          </p>
          {product.discountPrice > 0 && (
            <p className="line-through text-gray-600 text-sm">
              ₹{product.discountPrice}
            </p>
          )}
        </div>

        {/* Button */}
        <button
          onClick={handleAddToCart}
          disabled={loading || product.stock === 0}
          className={`w-full py-3 rounded-xl mt-5 font-bold transition-all duration-300
            ${product.stock === 0
              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500 text-white hover:scale-[1.02] shadow-lg shadow-blue-500/20"
            } disabled:opacity-50`}
        >
          {product.stock === 0
            ? "Out Of Stock"
            : loading
            ? "Adding..."
            : "Add To Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;