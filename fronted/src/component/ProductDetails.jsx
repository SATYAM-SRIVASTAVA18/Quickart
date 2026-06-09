import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Review from "./Review";
import ReviewList from "./ReviewList";
import API from "./Ap";
import Produnavbar from "./Produnavbar";
import Footer from "./Footer";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = async (product) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      await API.post("/add", {
        productId: product._id,
      });

      alert("Added to cart!");

      window.dispatchEvent(
        new Event("cartUpdated")
      );

    } catch (error) {
      console.error("Add Error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to add item"
      );
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {

        const response = await API.get(
          `/products/${id}`
        );

        setProduct(response.data);

      } catch (error) {

        console.error(
          "Error fetching product:",
          error
        );

        if (
          error.response?.status === 401
        ) {
          navigate("/login");
        }

      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-pulse">
            ⚽
          </div>

          <p className="text-gray-400 font-semibold">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-center">
        <div>
          <p className="text-red-400 text-xl font-bold">
            Product not found or please login.
          </p>

          <button
            onClick={() =>
              navigate("/login")
            }
            className="mt-4 bg-yellow-400 text-gray-950 px-6 py-2 rounded-xl font-black"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 min-h-screen">
      <Produnavbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden md:flex shadow-2xl">

          {/* Image Section */}
          <div className="md:w-1/2 bg-gray-800 flex items-center justify-center p-8 relative">

            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,_#facc15_0%,_transparent_70%)]" />

            <img
              src={product.img?.url}
              alt={product.name}
              className="relative rounded-2xl object-cover h-96 shadow-xl hover:scale-105 transition-transform duration-500"
            />

            <div className="absolute top-4 left-4 bg-green-400/90 text-gray-950 text-xs font-black px-3 py-1 rounded-full">
              ✓ In Stock
            </div>

            <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full">
              10% OFF
            </div>

          </div>

          {/* Details Section */}
          <div className="md:w-1/2 p-10 flex flex-col justify-between">

            <div>

              <div className="text-xs font-bold text-yellow-400 uppercase tracking-widest mb-3">
                Sports Equipment
              </div>

              <h1 className="text-4xl font-black text-white mb-4 leading-tight">
                {product.name}
              </h1>

              <p className="text-gray-400 leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="flex items-end gap-3 mb-6 p-4 bg-gray-800 rounded-2xl">

                <span className="text-4xl font-black text-yellow-400">
                  ₹{product.price}
                </span>

                <span className="text-gray-600 line-through text-lg mb-1">
                  ₹{product.price + 500}
                </span>

                <span className="text-green-400 text-sm font-bold ml-auto">
                  Save ₹500!
                </span>

              </div>

              <div className="flex items-center gap-2 mb-6">

                <div className="flex gap-0.5">
                  {"⭐⭐⭐⭐☆"
                    .split("")
                    .map((s, i) => (
                      <span
                        key={i}
                        className="text-lg"
                      >
                        {s}
                      </span>
                    ))}
                </div>

                <span className="text-gray-500 text-sm">
                  (120 Reviews)
                </span>

              </div>

            </div>

            {/* Buttons */}
            <div className="space-y-3">

              <button
                onClick={() =>
                  handleAddToCart(product)
                }
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-950 font-black py-3 rounded-xl shadow-lg shadow-yellow-400/20 transition-all duration-300 text-sm uppercase tracking-wider"
              >
                🛒 Add to Cart
              </button>

              <button
                onClick={async () => {
                  await handleAddToCart(
                    product
                  );

                  navigate(
                    "/addresslist",
                    {
                      state: {
                        product,
                      },
                    }
                  );
                }}
                className="w-full bg-gray-950 hover:bg-gray-800 border border-gray-700 text-white font-black py-3 rounded-xl transition-all duration-300 text-sm uppercase tracking-wider"
              >
                ⚡ Buy Now
              </button>

              <button
                onClick={() =>
                  navigate(-1)
                }
                className="w-full border border-gray-700 hover:border-yellow-400/50 text-gray-400 hover:text-yellow-400 py-3 rounded-xl transition-all text-sm"
              >
                ← Go Back
              </button>

            </div>

          </div>

        </div>

        {/* Reviews Section */}
        <div className="mt-12 bg-gray-900 border border-gray-800 rounded-3xl p-8">

          <div className="flex items-center gap-3 mb-8">

            <h2 className="text-2xl font-black text-white">
              Customer{" "}
              <span className="text-yellow-400">
                Reviews
              </span>
            </h2>

            <div className="h-px flex-1 bg-gradient-to-r from-yellow-400/30 to-transparent" />

          </div>

          <Review />

          <div className="mt-6">
            <ReviewList />
          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}

export default ProductDetails;