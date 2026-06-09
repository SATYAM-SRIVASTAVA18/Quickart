import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import API from "./component/Ap";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const product =
    location.state?.product ||
    JSON.parse(localStorage.getItem("buyProduct"));

  const quantity =
    location.state?.quantity ||
    Number(localStorage.getItem("buyQuantity")) || 1;
  const addressId = location.state?.addressId;

  if (!product) {
    return <h1>No Product Found ❌</h1>;
  }

  const handlePaymentSuccess = async (response) => {
    try {
      await API.post("/razorpay/verify", {
        ...response,
        addressId,
        productId: product._id,
        quantity,
        totalAmount: product.price * quantity,
      });
      alert("Order placed ✅");
      navigate("/order");
    } catch (err) {
      console.log(err);
      alert("Payment verify failed ❌");
    }
  };

  const handlePayment = async () => {
    try {
      const { data } = await API.post("/razorpay/checkout", {
        amount: product.price,
      });
      // const { data: keyData } = await axios.get("http://localhost:3000/getkey");
      const { data: keyData } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getkey`);
      const options = {
        key: keyData.key,
        amount: data.order.amount,
        currency: "INR",
        name: product.name,
        description: "Product Payment",
        order_id: data.order.id,
        handler: async function (response) {
          await handlePaymentSuccess(response);
        },
        prefill: {
          name: "User",
          email: "test@gmail.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
      alert("Payment Failed ❌");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gray-950">

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-950 via-gray-900 to-orange-950 opacity-90" />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-orange-500 opacity-10" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-orange-500 opacity-10" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-orange-500 opacity-10" />
        <div className="absolute top-2/3 left-0 w-full h-px bg-orange-500 opacity-10" />
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full border-2 border-orange-500 opacity-10" />
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full border border-orange-400 opacity-10" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full border-2 border-orange-500 opacity-10" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full border border-orange-400 opacity-10" />
      </div>

      {/* Glow blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full opacity-5 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400 rounded-full opacity-5 blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <main className="relative z-10 w-full max-w-md mx-auto px-4 py-12">

        {/* Brand header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center mb-3 shadow-lg shadow-orange-500/30">
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-black tracking-widest text-white uppercase">
            Quick<span className="text-orange-500">Art</span>
          </h1>
          <p className="text-gray-500 text-xs tracking-widest uppercase mt-1 font-bold">Secure Checkout</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
          <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-yellow-400 to-red-500" />

          <div className="bg-gray-900 border border-gray-800 border-t-0 rounded-b-2xl">

            {/* Card header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Order</p>
                <h2 className="text-xl font-black text-white uppercase tracking-tight">Summary</h2>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>

            <div className="px-6 py-6 space-y-5">

              {/* Product card */}
              <div className="flex items-center gap-4 bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                <div className="w-20 h-20 flex-shrink-0 bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
                  <img
                    src={product.img?.url}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Product</p>
                  <h3 className="text-white font-black text-base leading-snug uppercase truncate">
                    {product.name}
                  </h3>
                  <div className="mt-2 inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full px-3 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                    <span className="text-orange-400 text-xs font-black uppercase tracking-widest">
                      Qty: {quantity}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price breakdown */}
              <div className="bg-gray-800/40 border border-gray-700/40 rounded-xl overflow-hidden">
                <div className="flex justify-between items-center px-5 py-3.5 border-b border-gray-700/40">
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Unit Price</span>
                  <span className="text-white text-sm font-bold">₹{product.price}</span>
                </div>
                <div className="flex justify-between items-center px-5 py-3.5 border-b border-gray-700/40">
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Quantity</span>
                  <span className="text-white text-sm font-bold">× {quantity}</span>
                </div>
                <div className="flex justify-between items-center px-5 py-4 bg-gray-800/60">
                  <span className="text-white font-black text-sm uppercase tracking-widest">Order Total</span>
                  <span className="text-green-400 font-black text-2xl">
                    ₹{product.price * quantity}
                  </span>
                </div>
              </div>

              {/* Pay button */}
              <button
                onClick={handlePayment}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-black tracking-widest uppercase py-4 rounded-xl transition-all duration-200 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Pay Now
              </button>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-5 pt-1">
                {["256-bit SSL", "Razorpay", "Instant Confirm"].map((label) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">{label}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        <p className="text-center text-gray-700 text-xs mt-6 tracking-widest uppercase font-bold">
          ⚡ Your Game. Your Gear. Your Victory.
        </p>
      </main>
    </div>
  );
}