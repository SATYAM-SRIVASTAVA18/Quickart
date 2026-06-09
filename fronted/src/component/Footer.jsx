import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <footer className="bg-gray-950 text-gray-300 mt-16 border-t border-yellow-500/20">
      <div className="h-1 w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400" />

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-gray-950 font-black">Q</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              QUICK<span className="text-yellow-400">ART</span>
            </h2>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed">
            Your one-stop shop for quality sports gear at unbeatable prices.
            Shop smart. Shop fast.
          </p>

          <div className="flex gap-3 mt-4">
            {["📘", "🐦", "📸"].map((icon, i) => (
              <div
                key={i}
                className="w-8 h-8 bg-gray-800 hover:bg-yellow-400 hover:text-gray-950 rounded-lg flex items-center justify-center cursor-pointer transition-all text-sm"
              >
                {icon}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-widest mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2"
              >
                → Home
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2"
              >
                → About Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-widest mb-4">
            Customer Care
          </h3>

          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/contact"
                className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2"
              >
                → Contact Us
              </Link>
            </li>

            {user ? (
              <>
                <li>
                  <Link
                    to="/cart"
                    className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2"
                  >
                    → Cart
                  </Link>
                </li>

                <li>
                  <Link
                    to="/myorder"
                    className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2"
                  >
                    → My Orders
                  </Link>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-2"
                  >
                    → Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2"
                >
                  → Login
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-widest mb-4">
            Stay Updated
          </h3>

          <p className="text-sm text-gray-500 mb-3">
            Get exclusive deals on sports gear.
          </p>

          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 outline-none focus:border-yellow-400 transition-colors"
            />

            <button className="bg-yellow-400 text-gray-950 px-3 py-2 rounded-lg text-sm font-bold hover:bg-yellow-300 transition-colors">
              →
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-600">
        © {new Date().getFullYear()}{" "}
        <span className="text-yellow-400 font-semibold">Quickart</span>. All
        rights reserved. Built with ❤️ for sports lovers.
      </div>
    </footer>
  );
}