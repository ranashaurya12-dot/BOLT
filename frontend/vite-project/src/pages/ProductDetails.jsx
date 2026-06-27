import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

import lCarnitineVideo from "../assets/L carnitine.mp4";

function ProductDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://bolt-cfp7.onrender.com/api/product/single-product/${id}`
        );
        setProduct(response.data.product);
      } catch (error) {
        toast.error("Failed to load product");
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://bolt-cfp7.onrender.com/api/cart/add-cart",
        {
          productId: product._id,
          quantity: 1,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Added To Cart");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0D0B09] flex items-center justify-center">
        <h1 className="text-4xl text-white">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0B09] px-6 py-14 md:px-10 lg:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 rounded-lg border border-[#2C2418] bg-[#15120F] p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">

        {/* Product Media */}
        <div className="overflow-hidden rounded-lg border border-[#2C2418]">
          {product.name === "L-CARNITINE" ? (
            <video
              src={lCarnitineVideo}
              autoPlay
              muted
              loop
              controls
              playsInline
              className="h-[550px] w-full object-cover"
            />
          ) : (
            <img
              src={product.image}
              alt={product.name}
              className="h-[550px] w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">

          <p className="font-['Oswald'] text-sm uppercase italic tracking-[4px] text-[#8C7437]">
            {product.category}
          </p>

          <h1 className="mt-4 font-['Oswald'] text-5xl lg:text-6xl font-bold italic uppercase tracking-tight leading-tight text-[#F5F1E8]">
            {product.name}
          </h1>

          <div className="mt-8 flex items-center gap-5">
            <p className="text-5xl font-bold text-[#EEBA02]">
              ₹{product.price}
            </p>

            {product.discountPrice > 0 && (
              <p className="text-2xl line-through text-[#9C9589]">
                ₹{product.discountPrice}
              </p>
            )}
          </div>

          <p className="mt-8 text-lg leading-8 text-[#9C9589]">
            {product.description}
          </p>

          <p
            className={`mt-6 font-semibold uppercase tracking-wide ${
              product.stock > 0 ? "text-[#EEBA02]" : "text-red-500"
            }`}
          >
            {product.stock > 0
              ? `In Stock (${product.stock} left)`
              : "Out of Stock"}
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-5">

            <button
              onClick={handleAddToCart}
              disabled={loading || product.stock === 0}
              className="rounded-lg bg-[#EEBA02] px-10 py-4 font-bold uppercase tracking-wide text-black transition-all duration-300 hover:scale-[1.02] hover:bg-[#FFD35C] disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add To Cart"}
            </button>

            <button
              onClick={() => {
                handleAddToCart();
                navigate("/cart");
              }}
              disabled={loading || product.stock === 0}
              className="rounded-lg border border-[#8C7437] px-10 py-4 font-bold uppercase tracking-wide text-[#F5F1E8] transition-all duration-300 hover:border-[#EEBA02] hover:bg-[#EEBA02] hover:text-black disabled:opacity-50"
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ProductDetails;