import ProductCard from "./ProductCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
 const fetchProducts = async () => {
  try {
    const response = await axios.get(
       "https://bolt-cfp7.onrender.com/api/product/products",
    );

    console.log(response.data);

    const products = response.data.products || [];

    setProducts(products.slice(0, 6));
  } catch (error) {
    console.error(error);
    setProducts([]);
  } finally {
    setLoading(false);
  }
};

    fetchProducts();
  }, []);
return (
  <section className="bg-[#0D0B09] py-24 px-6 md:px-16">

    {/* Header */}
    <div className="flex flex-col lg:flex-row justify-between items-center mb-16 gap-8">

      <div>

        <p className="uppercase tracking-[4px] text-[#EEBA02] text-sm font-semibold mb-3">
          ELITE COLLECTION
        </p>

        <h1
          style={{ fontFamily: "Oswald, sans-serif" }}
          className="text-5xl md:text-7xl italic uppercase font-bold text-[#F5F1E8]"
        >
          Featured Products
        </h1>

        <div className="w-24 h-1 bg-[#EEBA02] mt-5 rounded-full"></div>

        <p className="text-[#9C9589] mt-6 text-lg">
          Premium supplements trusted by athletes worldwide.
        </p>

      </div>

      <button
        onClick={() => navigate("/shop")}
        className="border border-[#8C7437] text-[#F5F1E8] px-8 py-4 rounded-lg hover:bg-[#EEBA02] hover:text-black hover:border-[#EEBA02] transition duration-300 uppercase tracking-wider font-semibold"
      >
        View All →
      </button>

    </div>

    {/* Loading */}

    {loading ? (

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-[#1A1713] border border-[#2C2418] rounded-2xl h-[420px] animate-pulse"
          />
        ))}

      </div>

    ) : products.length === 0 ? (

      <div className="text-center py-20">

        <h2
          style={{ fontFamily: "Oswald, sans-serif" }}
          className="text-5xl italic uppercase text-[#EEBA02]"
        >
          No Products Found
        </h2>

        <p className="text-[#9C9589] mt-4">
          Please check back later.
        </p>

      </div>

    ) : (

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}

      </div>

    )}

  </section>
);
}

export default FeaturedProducts;