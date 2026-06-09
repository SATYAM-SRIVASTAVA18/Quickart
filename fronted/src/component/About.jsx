import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const About = () => {
  return (
    <div className="bg-gray-950 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gray-900 border-b border-gray-800 py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-5 `bg-[radial-gradient(circle_at_50%_50%,_#facc15_0%,_transparent_70%)]" />
        <div className="relative z-10">
          <div className="inline-block bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-1 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-6">
            🏆 About Us
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            Our <span className="text-transparent bg-clip-text `bg-gradient-to-r from-yellow-400 to-orange-500">Story</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-400">
            We provide high-quality sports products with the best prices and fast delivery. Your victory is our mission.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-yellow-400/10 rounded-3xl blur-xl" />
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="About us"
            className="relative rounded-2xl shadow-2xl border border-gray-700 w-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-4xl font-black text-white mb-4">
            Who We <span className="text-yellow-400">Are</span>
          </h2>
          <div className="h-1 w-16 bg-yellow-400 rounded-full mb-6" />
          <p className="text-gray-400 mb-4 leading-relaxed">
            We are a passionate team dedicated to bringing you the best shopping experience. Our mission is to deliver quality sports products and build trust with our customers.
          </p>
          <p className="text-gray-400 mb-8 leading-relaxed">
            From cricket to football, we carefully select products to ensure premium quality and affordability for every athlete.
          </p>
          <button className="bg-yellow-400 text-gray-950 px-8 py-3 rounded-xl font-black hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/20">
            Learn More →
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-900 border-y border-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white">Why Choose <span className="text-yellow-400">Quickart</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "⚡", title: "Fast Delivery", desc: "We ensure quick and secure delivery at your doorstep within 3-5 days." },
              { icon: "🏆", title: "Best Quality", desc: "All products are tested and verified for top quality performance." },
              { icon: "🎯", title: "24/7 Support", desc: "Our dedicated support team is always ready to help you win." },
            ].map((f, i) => (
              <div key={i} className="group bg-gray-950 border border-gray-800 hover:border-yellow-400/50 rounded-2xl p-8 text-center hover:shadow-xl hover:shadow-yellow-400/10 transition-all duration-300">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-black text-white mb-3 group-hover:text-yellow-400 transition-colors">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;