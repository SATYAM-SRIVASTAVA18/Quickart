// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import API from "./Ap";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const [cartCount, setCartCount] = useState(0);

//   const navigate = useNavigate();

//   const getCount = async () => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) {
//       try {
//         const res = await API.get(`/cart/${user._id}`);
//         const total = res.data.items.reduce((acc, item) => acc + item.quantity, 0);
//         setCartCount(total);
//       } catch (err) {
//         setCartCount(0);
//       }
//     }
//   };

//   useEffect(() => {
//     getCount();
//     window.addEventListener("cartUpdated", getCount);
//     return () => window.removeEventListener("cartUpdated", getCount);
//   }, []);

//   // Logout Function
//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         "http://localhost:3000/logout",
//         {},
//         { withCredentials: true }
//       );
//       localStorage.removeItem("user");
//       setCartCount(0);
//       navigate("/");
//     } catch (err) {
//       console.error("Logout error:", err);
//     }
//   };

//   return (
//     <nav className="sticky top-0 z-50 bg-gray-950 border-b border-yellow-500/20 shadow-[0_2px_20px_rgba(234,179,8,0.08)]">
//       {/* Top accent line */}
//       <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6">
//         <div className="flex justify-between h-16 items-center gap-6">

//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2 shrink-0 group">
//             <span className="text-2xl font-black tracking-tighter text-white group-hover:text-yellow-400 transition-colors duration-200">
//               QUICK<span className="text-yellow-400 group-hover:text-white transition-colors duration-200">ART</span>
//             </span>
//             <span className="hidden sm:block text-[10px] font-bold tracking-[0.25em] text-yellow-500/70 uppercase mt-1">
//               Sports
//             </span>
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center gap-1 ml-auto">
//             <Link
//               to="/"
//               className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-150"
//             >
//               Home
//             </Link>

//             <Link to="/cart" className="relative px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-150">
//               🛒 Cart
//               {cartCount > 0 && (
//                 <span className="absolute -top-0.5 -right-0.5 bg-yellow-400 text-gray-950 text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>

//             <Link to='/myorder' className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-all">
//               📦 My Orders
//             </Link>

//             <Link to="/about" className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-all">About</Link>

//             <button
//               onClick={handleLogout}
//               className="ml-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-sm font-semibold text-red-400 hover:bg-red-500 hover:text-white transition-all"
//             >
//               Logout
//             </button>

//           </div>

//           {/* Mobile Button */}
//           <div className="md:hidden ml-auto">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors duration-150"
//             >
//               <span className="text-lg">{isOpen ? "✕" : "☰"}</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 pb-5 pt-3">
//           <div className="flex flex-col gap-1">
//             <Link
//               to="/"
//               className="px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800 transition-all"
//             >
//               Home
//             </Link>

//             <Link
//               to="/cart"
//               className="px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800 transition-all flex items-center justify-between"
//             >
//               <span>🛒 Cart</span>
//               {cartCount > 0 && (
//                 <span className="bg-yellow-400 text-gray-950 text-[10px] font-black px-2 py-0.5 rounded-full">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>

//             <Link to='/myorder' className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-all">
//             📦 My Orders
//             </Link>

//             <Link to="/about" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-yellow-400 hover:bg-gray-800">
//               ℹ️ About
//             </Link>

//             <button
//               onClick={handleLogout}
//               className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-red-400 hover:bg-red-500/10"
//             >
//               🚪 Logout
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "./Ap";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const navigate = useNavigate();

  const getCount = async () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (!currentUser) {
      setCartCount(0);
      return;
    }

    try {
      const res = await API.get(`/cart/${currentUser._id}`);

      const total = res.data.items.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      setCartCount(total);
    } catch (err) {
      console.log(err);
      setCartCount(0);
    }
  };

  useEffect(() => {
    getCount();

    window.addEventListener("cartUpdated", getCount);

    return () => {
      window.removeEventListener("cartUpdated", getCount);
    };
  }, []);

  // JWT Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setCartCount(0);

    alert("Logged out successfully");

    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-950 border-b border-yellow-500/20 shadow-[0_2px_20px_rgba(234,179,8,0.08)]">
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-16 items-center gap-6">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0 group"
          >
            <span className="text-2xl font-black tracking-tighter text-white group-hover:text-yellow-400 transition-colors duration-200">
              QUICK
              <span className="text-yellow-400 group-hover:text-white transition-colors duration-200">
                ART
              </span>
            </span>

            <span className="hidden sm:block text-[10px] font-bold tracking-[0.25em] text-yellow-500/70 uppercase mt-1">
              Sports
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1 ml-auto">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-150"
            >
              Home
            </Link>

            {user && (
              <>
                <Link
                  to="/cart"
                  className="relative px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-150"
                >
                  🛒 Cart

                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-yellow-400 text-gray-950 text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/myorder"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-all"
                >
                  📦 My Orders
                </Link>
              </>
            )}

            <Link
              to="/about"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-all"
            >
              About
            </Link>

            {user ? (
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-sm font-semibold text-red-400 hover:bg-red-500 hover:text-white transition-all"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="ml-2 px-4 py-2 bg-yellow-400 text-gray-950 rounded-lg text-sm font-bold hover:bg-yellow-300 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors duration-150"
            >
              <span className="text-lg">
                {isOpen ? "✕" : "☰"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 pb-5 pt-3">
          <div className="flex flex-col gap-1">

            <Link
              to="/"
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800"
            >
              Home
            </Link>

            {user && (
              <>
                <Link
                  to="/cart"
                  className="px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800 flex items-center justify-between"
                >
                  <span>🛒 Cart</span>

                  {cartCount > 0 && (
                    <span className="bg-yellow-400 text-gray-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/myorder"
                  className="px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-300 hover:text-yellow-400 hover:bg-gray-800"
                >
                  📦 My Orders
                </Link>
              </>
            )}

            <Link
              to="/about"
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-300 hover:text-yellow-400 hover:bg-gray-800"
            >
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
              <Link
                to="/login"
                className="px-3 py-2.5 rounded-lg text-sm font-semibold text-yellow-400 hover:bg-gray-800"
              >
                🔑 Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}