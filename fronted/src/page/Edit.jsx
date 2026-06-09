import React, { useState, useEffect } from "react";
import API from "../component/Ap";
import { useNavigate, useParams } from "react-router-dom";
import Navadmin from "./Navadmin";

function EditProduct() {
  const { id } = useParams(); // get product ID from URL → e.g. /admin/edit/:id
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    img: { filename: "product-image", url: "" },
    description: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  //  Fetch existing product data and populate form
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);

      const data = res.data;

      setProduct({
        name: data.name || "",
        price: data.price || "",
        img: {
          filename: data.img?.filename || "product-image",
          url: data.img?.url || "",
        },
        description: data.description || "",
      });
    } catch (err) {
      console.error(err);

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      if (err.response?.status === 403) {
        navigate("/");
        return;
      }

      setError("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "url") {
      setProduct((prev) => ({ ...prev, img: { ...prev.img, url: value } }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  setSaving(true);

  try {
    await API.put(`/product/${id}`, product);

    alert("Product Updated Successfully ✅");

    navigate("/adminehome");
  } catch (err) {
    console.error(err);

    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/login");
      return;
    }

    if (err.response?.status === 403) {
      alert("Only Admin Can Update Products");
      navigate("/");
      return;
    }

    setError(
      err.response?.data?.message ||
      "Failed to update product. Please try again."
    );
  } finally {
    setSaving(false);
  }
};

  // ---------- Loading State ----------
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col">
        <Navadmin />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-400 text-sm tracking-widest uppercase">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Main Form ----------
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
            backgroundSize: "20px 20px"
          }}
        ></div>
        <span className="inline-block bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-full mb-4">
          ✏️ Admin Panel
        </span>
        <h1 className="text-4xl font-black text-white tracking-tight">
          EDIT <span className="text-yellow-400">PRODUCT</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm tracking-wide">
          Update the details below — changes go live immediately
        </p>
      </div>

      {/* Form Section */}
      <div className="flex justify-center items-start py-12 px-4">
        <div className="w-full max-w-md">
          {/* Error Banner */}
          {error && (
            <div className="mb-4 bg-red-900/40 border border-red-500/40 text-red-400 text-sm rounded-xl px-4 py-3 text-center">
              {error}
            </div>
          )}

          {/* Card */}
          <div className="bg-gray-900 border border-gray-700/60 rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
            {/* Top color stripe */}
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
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
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
                <textarea
                  name="description"
                  placeholder="Short product description..."
                  value={product.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 focus:border-yellow-400 text-white placeholder-gray-500 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-yellow-400/20 text-sm resize-none"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => navigate("/adminehome")}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold text-sm tracking-widest uppercase py-3.5 rounded-xl transition-all duration-200 border border-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-300 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-black font-black text-sm tracking-widest uppercase py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-yellow-400/20"
                >
                  {saving ? "Saving..." : "✔ Save Changes"}
                </button>
              </div>
            </form>
          </div>

          <p className="text-center text-gray-600 text-xs mt-4 tracking-wide">
            Changes will be visible to all users immediately
          </p>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;