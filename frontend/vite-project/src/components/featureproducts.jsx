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
       "http://localhost:4000/api/product/products",
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
    <section className="bg-gray-950 py-24 px-6 md:px-16">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
        <div>
          <p className="text-blue-500 uppercase tracking-widest text-sm font-semibold mb-3">
            Top Picks
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-white">
            Featured Products
          </h1>
          <p className="text-gray-400 mt-4 text-lg">
            Premium supplements trusted by athletes
          </p>
        </div>
        <button
          onClick={() => navigate("/shop")}
          className="border border-gray-700 text-gray-300 px-8 py-4 rounded-xl hover:border-blue-500 hover:text-blue-500 transition whitespace-nowrap"
        >
          View All Products →
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-gray-900 rounded-3xl h-96 animate-pulse"
            />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-2xl font-bold">
            No products found
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