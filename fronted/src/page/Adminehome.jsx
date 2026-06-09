import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navadmin from "./Navadmin";
import Delete from "./Delete";
import API from "../component/Ap";

function Adminehome() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await API.get("/data");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }

        if (error.response?.status === 403) {
          alert("Access Denied");
          navigate("/");
        }
      }
    };

    fetchData();
  }, [navigate]);

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
          🏆 Admin Dashboard
        </span>

        <h1 className="text-4xl font-black text-white tracking-tight">
          MANAGE <span className="text-yellow-400">PRODUCTS</span>
        </h1>

        <p className="text-gray-400 mt-2 text-sm tracking-wide">
          You are logged in as an admin — {data.length} product
          {data.length !== 1 ? "s" : ""} listed
        </p>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {data.map((item) => (
              <div
                key={item._id}
                className="group bg-gray-900 border border-gray-800 hover:border-yellow-400/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-400/10 hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-48 bg-gray-800">
                  <img
                    src={item.img?.url}
                    alt={item.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>

                  <span className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-black px-2.5 py-1 rounded-full">
                    ₹{item.price}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h2 className="text-white font-black text-base tracking-tight truncate">
                    {item.name}
                  </h2>

                  <p className="text-gray-500 text-xs mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex gap-2 mt-4">
                    <Link
                      to={`/edit/${item._id}`}
                      className="flex-1 bg-gray-800 hover:bg-yellow-400 hover:text-black text-yellow-400 border border-yellow-400/40 hover:border-yellow-400 text-xs font-bold tracking-widest uppercase py-2 rounded-xl text-center transition-all duration-200"
                    >
                      ✏️ Edit
                    </Link>

                    <div className="flex-1">
                      <Delete id={item._id} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-4xl mb-4">
              📦
            </div>

            <h3 className="text-white font-black text-xl">
              No Products Yet
            </h3>

            <p className="text-gray-500 text-sm mt-2 mb-6">
              Start by adding your first sports product
            </p>

            <Link
              to="/admin"
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm tracking-widest uppercase px-6 py-3 rounded-xl transition-all"
            >
              ＋ Add Product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Adminehome;