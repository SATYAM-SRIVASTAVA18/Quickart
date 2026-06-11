import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "./Ap";

import Slider from "./Slider";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/data");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-950 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Hero Section */}
        <div className="text-center mb-10 py-8">
          <div className="inline-block bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-1 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-4">
            🏆 India's #1 Sports Store
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Quickart
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Discover premium sports gear at unbeatable prices. Elevate your game.
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-black text-yellow-400">500+</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">
                Products
              </div>
            </div>

            <div className="w-px bg-gray-700" />

            <div className="text-center">
              <div className="text-2xl font-black text-yellow-400">10k+</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">
                Happy Players
              </div>
            </div>

            <div className="w-px bg-gray-700" />

            <div className="text-center">
              <div className="text-2xl font-black text-yellow-400">24/7</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">
                Support
              </div>
            </div>
          </div>
        </div>

        <Slider />

        {/* Section Header */}
        <div className="flex items-center justify-between mt-14 mb-8">
          <div>
            <h2 className="text-3xl font-black text-white">
              Featured <span className="text-yellow-400">Products</span>
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Top picks for champions
            </p>
          </div>

          <div className="h-px flex-1 mx-6 bg-gradient-to-r from-yellow-400/50 to-transparent" />
          <div className="w-2 h-2 bg-yellow-400 rounded-full" />
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-white text-lg">Loading Products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.length > 0 ? (
              data.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden group hover:border-yellow-400/50 hover:shadow-xl hover:shadow-yellow-400/10 transition-all duration-300"
                >
                  <Link to={`/products/${item._id}`}>
                    <div className="overflow-hidden relative bg-gray-800">
                      <img
                        src={item.img?.url}
                        alt={item.name}
                        className="h-72 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="absolute top-3 right-3 bg-green-400/90 text-gray-950 text-xs font-bold px-2 py-0.5 rounded-full">
                        In Stock
                      </div>
                    </div>

                    <div className="p-4">
                      <h2 className="text-sm font-bold text-white truncate group-hover:text-yellow-400 transition-colors">
                        {item.name}
                      </h2>

                      <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
                        <span className="text-xl font-black text-yellow-400">
                          ₹{item.price}
                        </span>

                        <span className="text-xs text-gray-600 line-through">
                          ₹{item.price + 500}
                        </span>
                      </div>

                      <div className="mt-3 w-full bg-yellow-400/0 border border-yellow-400/30 group-hover:bg-yellow-400 group-hover:border-yellow-400 text-yellow-400 group-hover:text-gray-950 text-xs font-bold py-2 rounded-xl text-center transition-all duration-300">
                        View Product →
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="text-4xl mb-3">🏋️</div>
                <p className="text-gray-500 text-lg">
                  No products available yet
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Home;