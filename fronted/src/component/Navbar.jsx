import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "./Ap";

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    setUser(storedUser);
  }, []);

  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/login");
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {

      const res = await API.get(
        `/search?q=${search}`
      );

      navigate("/search", {
        state: {
          results: res.data,
        },
      });

    } catch (err) {
      console.log(err);
    }
  };
  return (
    <nav className="bg-gray-950 text-white shadow-2xl sticky top-0 z-50 border-b border-yellow-500/20">
      <div className="h-1 w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-gray-950 font-black text-sm">Q</span>
            </div>
            <span className="text-xl font-black tracking-tight">QUICK<span className="text-yellow-400">ART</span></span>
          </Link>
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md items-center bg-gray-800 border border-gray-700 rounded-xl px-3 gap-2 focus-within:border-yellow-400 transition-colors">
            <span className="text-gray-400 text-sm">🔍</span>
            <input type="text" placeholder="Search sports gear..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent outline-none py-2 text-sm flex-1 text-gray-200 placeholder-gray-500" />
            <button type="submit" className="bg-yellow-400 text-gray-950 px-3 py-1 rounded-lg text-xs font-bold hover:bg-yellow-300 transition-colors">GO</button>
          </form>
          <div className="hidden md:flex items-center gap-1">
            <Link to="/" className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-all">Home</Link>
            
            {user ? (
              <Link to="/cart" className="relative px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-all flex items-center gap-1">
                🛒 <span>Cart</span>
                {cart.length > 0 && (<span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">{cart.length}</span>)}
              </Link>
            ) : null}
            {user ? (
              <Link to='/myorder' className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-all">
                📦 My Orders
              </Link>
            ) : null}
            <Link to="/about" className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-all">About</Link>
            {user ? (
              <button onClick={handleLogout} className="ml-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-sm font-semibold text-red-400 hover:bg-red-500 hover:text-white transition-all">Logout</button>
            ) : (
              <Link to="/login" className="ml-2 px-4 py-2 bg-yellow-400 text-gray-950 rounded-lg text-sm font-bold hover:bg-yellow-300 transition-colors">Login</Link>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="w-9 h-9 flex items-center justify-center bg-gray-800 rounded-lg text-lg">{isOpen ? "✕" : "☰"}</button>
          </div>
        </div>
      </div>

{/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 pb-4 pt-2 space-y-2">
          <form onSubmit={handleSearch} className="flex items-center bg-gray-800 rounded-xl border border-gray-700 px-3 mb-3">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none py-2 text-sm text-gray-200"
            />
            <button type="submit" className="bg-yellow-400 text-gray-950 px-3 py-1 rounded-lg text-xs font-bold">
              Go
            </button>
          </form>

          <Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-yellow-400 hover:bg-gray-800">
            🏠 Home
          </Link>

          {user && (
            <Link to="/cart" className="relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-yellow-400 hover:bg-gray-800">
              🛒 Cart
              {cart.length > 0 && (
                <span className="ml-auto bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {cart.length}
                </span>
              )}
            </Link>
          )}

          {user && (
            <Link to="/myorder" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-yellow-400 hover:bg-gray-800">
              📦 My Orders
            </Link>
          )}

          <Link to="/about" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-yellow-400 hover:bg-gray-800">
            ℹ️ About
          </Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-red-400 hover:bg-red-500/10"
            >
              🚪 Logout
            </button>
          ) : (
            <Link to="/login" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-yellow-400 hover:bg-gray-800">
              🔑 Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}