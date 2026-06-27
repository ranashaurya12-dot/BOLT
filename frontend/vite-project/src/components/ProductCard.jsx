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
        "https://bolt-cfp7.onrender.com/api/cart/add-cart",
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
    className="group bg-[#15120F] border border-[#2C2418] rounded-lg overflow-hidden hover:border-[#EEBA02] transition-all duration-300 cursor-pointer"
  >

    {/* Image */}
    <div className="relative h-60 bg-[#0F0D0B] flex items-center justify-center border-b border-[#2C2418]">

      <img
        src={product.image}
        alt={product.name}
        className="h-44 object-contain group-hover:scale-105 transition duration-300"
      />

      <div className="absolute top-3 left-3 text-[10px] uppercase px-2 py-1 border border-[#8C7437] text-[#EEBA02] tracking-wider">
        {product.category}
      </div>

      {discountPercent && (
        <div className="absolute top-3 right-3 bg-[#EEBA02] text-black text-xs font-bold px-2 py-1">
          {discountPercent}% OFF
        </div>
      )}

    </div>

    {/* Content */}
    <div className="p-5">

      <h2
        style={{ fontFamily: "Oswald, sans-serif" }}
        className="text-2xl italic uppercase text-[#F5F1E8]"
      >
        {product.name}
      </h2>

      <p className="text-[#9C9589] text-sm mt-3 line-clamp-2 h-10">
        {product.description}
      </p>

      <div className="flex items-center gap-3 mt-5">

        <p className="text-2xl font-bold text-[#EEBA02]">
          ₹{product.discountPrice}
        </p>

        {product.discountPrice > 0 && (
          <p className="line-through text-[#7E7668]">
            ₹{product.price}
          </p>
        )}

      </div>

      {product.stock <= 5 && product.stock > 0 && (
        <p className="text-[#EEBA02] text-xs mt-3 uppercase">
          Only {product.stock} Left
        </p>
      )}

      {product.stock === 0 && (
        <p className="text-red-400 text-xs mt-3 uppercase">
          Out Of Stock
        </p>
      )}

      <button
        onClick={handleAddToCart}
        disabled={loading || product.stock === 0}
        className={`w-full mt-6 py-3 uppercase font-bold tracking-wider transition
        ${
          product.stock === 0
            ? "bg-[#2A2A2A] text-gray-500 cursor-not-allowed"
            : "bg-[#EEBA02] text-black hover:bg-[#FFD35C]"
        }`}
      >
        {loading
          ? "ADDING..."
          : product.stock === 0
          ? "OUT OF STOCK"
          : "ADD TO CART"}
      </button>

    </div>

  </div>
);
}

export default ProductCard;