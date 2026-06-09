import React from "react";
import { useNavigate,useLocation} from "react-router-dom";

export default function OrderCon() {
  const navigate = useNavigate();
  const location = useLocation();
    const orderId = location.state?.orderId;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 relative overflow-hidden">

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

      {/* Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl shadow-black/40">

        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-yellow-400 to-red-500" />

        <div className="bg-gray-900 border border-gray-800 border-t-0 rounded-b-2xl p-8 text-center">

          {/* Brand */}
          <div className="flex flex-col items-center mb-7">
            <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center mb-3 shadow-lg shadow-orange-500/30">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-black tracking-widest text-white uppercase">
              Quick<span className="text-orange-500">Art</span>
            </h1>
          </div>

          {/* Success icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-2xl mx-auto mb-5 shadow-lg shadow-green-500/10">
            <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          {/* Title */}
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Status</p>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-3">
            Order <span className="text-green-400">Confirmed!</span>
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-7 font-medium">
            Thank you for your purchase. Your order has been successfully placed and is being processed.
          </p>

          {/* Order info card */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 mb-6 text-left">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Order Details</p>
            <div className="flex justify-between items-center py-3 border-b border-gray-700/40">
              <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Order ID</span>
              <span className="text-white font-black text-sm bg-gray-700/50 px-2.5 py-0.5 rounded-lg">#12345</span>
            </div>
            <div className="flex justify-between items-center pt-3">
              <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Est. Delivery</span>
              <div className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                <span className="text-orange-400 text-xs font-black uppercase tracking-widest">3–5 Business Days</span>
              </div>
            </div>
          </div>

          {/* CTA button */}
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-black tracking-widest uppercase py-4 rounded-xl transition-all duration-200 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Shop More
          </button>

        </div>
      </div>

      <p className="absolute bottom-5 text-gray-700 text-xs tracking-widest uppercase font-bold z-10">
        ⚡ Your Game. Your Gear. Your Victory.
      </p>
    </div>
  );
}