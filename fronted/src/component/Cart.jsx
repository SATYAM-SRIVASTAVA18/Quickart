import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import useEffect, { useState } from "react";
import Produnavbar from "./Produnavbar";
import API from "./Ap";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleRemove = async (itemId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id;
      
      await API.delete(`/cart/remove/${userId}/${itemId}`);

      const res = await API.get(`/cart/${userId}`);
      setCart(res.data);
    } catch (err) {
      console.error(err);

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?._id;
        
        const res = await API.get(`/cart/${userId}`);
        setCart(res.data);
      } catch (err) {
        console.error(err);

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchCart();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
            Loading Cart...
          </p>
        </div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col">
        <Produnavbar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800 rounded-2xl mb-4">
            <span className="text-4xl">🛒</span>
          </div>

          <h2 className="text-white text-2xl font-black uppercase tracking-wide">
            Cart is Empty
          </h2>

          <p className="text-gray-600 text-sm mt-2 font-medium uppercase tracking-widest">
            Add some gear to get started
          </p>
        </div>

        <Footer />
      </div>
    );
  }

  const total = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Produnavbar />

      <div className="relative flex-1 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full opacity-5 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400 rounded-full opacity-5 blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-px h-full bg-orange-500 opacity-5" />
          <div className="absolute top-0 left-3/4 w-px h-full bg-orange-500 opacity-5" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12">

          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-white tracking-tight uppercase">
              My Cart
            </h1>

            <p className="text-gray-500 text-xs mt-1 font-bold uppercase tracking-widest">
              {cart.items.length} item
              {cart.items.length !== 1 ? "s" : ""} in your bag
            </p>
          </div>

          <div className="space-y-5">
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="flex flex-wrap sm:flex-nowrap gap-4 px-5 py-5">

                  <div className="w-24 h-24 flex-shrink-0 bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
                    <img
                      src={item.product.img?.url}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1">
                    <h2 className="font-black text-white text-base uppercase">
                      {item.product.name}
                    </h2>

                    <p className="text-gray-500 text-xs font-bold mt-1">
                      ₹{item.product.price} / unit
                    </p>

                    <p className="text-orange-400 text-xs font-black mt-2">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between gap-3">
                    <p className="text-green-400 font-black text-xl">
                      ₹{item.product.price * item.quantity}
                    </p>

                    <button
                      onClick={() => {
                        localStorage.setItem(
                          "buyProduct",
                          JSON.stringify(item.product)
                        );

                        localStorage.setItem(
                          "buyQuantity",
                          item.quantity
                        );

                        navigate("/addresslist", {
                          state: {
                            product: item.product,
                            quantity: item.quantity,
                          },
                        });
                      }}
                      className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-black px-4 py-2 rounded-xl"
                    >
                      Buy Now
                    </button>

                    <button
                      onClick={() => handleRemove(item._id)}
                      className="text-red-400 text-xs font-bold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-xs font-bold uppercase">
                Order Total
              </span>

              <span className="text-green-400 font-black text-2xl">
                ₹{total}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}