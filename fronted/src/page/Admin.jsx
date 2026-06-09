import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navadmin from "./Navadmin";
import API from "../component/Ap";

function Admin() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    img: {
      filename: "",
      url: "",
    },
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "url") {
      setProduct({
        ...product,
        img: {
          ...product.img,
          url: value,
        },
      });
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const response = await API.post("/products", product);

      console.log("Product added:", response.data);

      alert("Product Added Successfully ✅");

      navigate("/adminehome");
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      if (error.response?.status === 403) {
        alert("Only Admin Can Add Products");
        navigate("/");
        return;
      }

      alert(
        error.response?.data?.message ||
          "Error adding product. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navadmin />

      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-yellow-400/20 py-12 px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #eab308 0, #eab308 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        ></div>

        <span className="inline-block bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-full mb-4">
          ⚡ Admin Panel
        </span>

        <h1 className="text-4xl font-black text-white tracking-tight">
          ADD NEW <span className="text-yellow-400">PRODUCT</span>
        </h1>

        <p className="text-gray-400 mt-2 text-sm tracking-wide">
          Fill in the details to list a new sports item
        </p>
      </div>

      {/* Form Section */}
      <div className="flex justify-center items-start py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-gray-900 border border-gray-700/60 rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
            <div className="h-1 w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500"></div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              {/* Product Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Pro Running Shoes"
                  value={product.name}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 focus:border-yellow-400 text-white placeholder-gray-500 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-yellow-400/20 text-sm"
                  required
                />
              </div>

              {/* Price */}
              <div className="space-y-1">
                <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                  Price (₹)
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400 font-bold">
                    ₹
                  </span>

                  <input
                    type="number"
                    name="price"
                    placeholder="0.00"
                    value={product.price}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 focus:border-yellow-400 text-white placeholder-gray-500 rounded-xl pl-8 pr-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-yellow-400/20 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-1">
                <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                  Image URL
                </label>

                <input
                  type="text"
                  name="url"
                  placeholder="https://..."
                  value={product.img.url}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 focus:border-yellow-400 text-white placeholder-gray-500 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-yellow-400/20 text-sm"
                  required
                />
              </div>

              {/* Image Preview */}
              {product.img?.url && (
                <div className="relative rounded-xl overflow-hidden border border-yellow-400/30">
                  <img
                    src={product.img.url}
                    alt="preview"
                    className="w-full h-44 object-cover"
                  />

                  <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                    Preview
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                  Description
                </label>

                <input
                  type="text"
                  name="description"
                  placeholder="Short product description..."
                  value={product.description}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 focus:border-yellow-400 text-white placeholder-gray-500 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-yellow-400/20 text-sm"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-black font-black text-sm tracking-widest uppercase py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-yellow-400/20 mt-2"
              >
                ＋ Add Product
              </button>
            </form>
          </div>

          <p className="text-center text-gray-600 text-xs mt-4 tracking-wide">
            Product will be live immediately after submission
          </p>
        </div>
      </div>
    </div>
  );
}

export default Admin;