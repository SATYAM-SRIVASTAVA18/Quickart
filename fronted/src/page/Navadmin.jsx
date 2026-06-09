import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  //  Proper Logout Function
  // const handleLogout = async () => {
  //   try {
  //     // await axios.post("http://localhost:3000/logout", {} ,  { withCredentials: true });
  //       await axios.post(`${import.meta.env.VITE_BACKEND_URL}/logout`, {} ,  { withCredentials: true });
  //     localStorage.removeItem("user");
  //     navigate("/");
  //   } catch (err) {
  //     console.error("Logout error:", err);
  //   }
  // };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    navigate("/");
    window.location.reload();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate('/');
      setSearch("");
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-gray-950 border-b border-yellow-500/20 shadow-[0_2px_20px_rgba(234,179,8,0.08)]">
      {/* Top accent line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-16 items-center gap-4">

          {/* Logo + Admin Badge */}
          <Link to="/adminehome" className="flex items-center gap-3 shrink-0 group">
            <span className="text-2xl font-black tracking-tighter text-white group-hover:text-yellow-400 transition-colors duration-200">
              QUICK<span className="text-yellow-400 group-hover:text-white transition-colors duration-200">ARD</span>
            </span>
            <span className="bg-yellow-400/10 border border-yellow-400/40 text-yellow-400 text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded-md">
              Admin
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/adminehome"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-150"
            >
              Home
            </Link>

            <Link
              to="/admin"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-150"
            >
              ＋ Add Product
            </Link>

            {/* ✅ NEW: Admin Orders */}
            <Link
              to="/admin/orders"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-150"
            >
              Orders
            </Link>

            <button
              onClick={handleLogout}
              className="ml-2 px-4 py-2 rounded-lg text-sm font-bold text-gray-950 bg-yellow-400 hover:bg-yellow-300 active:scale-95 transition-all duration-150"
            >
              Logout
            </button>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors duration-150"
            >
              <span className="text-lg">{isOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 pb-5 pt-3 space-y-3">

          <div className="flex flex-col gap-1 pt-1">
            <Link
              to="/adminehome"
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800 transition-all"
            >
              Home
            </Link>

            <Link
              to="/admin"
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800 transition-all"
            >
              ＋ Add Product
            </Link>

            {/* ✅ NEW: Admin Orders */}
            <Link
              to="/admin/orders"
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800 transition-all"
            >
              Orders
            </Link>

            <button
              onClick={handleLogout}
              className="mt-2 w-full py-2.5 rounded-lg text-sm font-bold text-gray-950 bg-yellow-400 hover:bg-yellow-300 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}