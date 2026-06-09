import React, { useState } from "react";
import Navbar from "./Navbar";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gray-950 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-block bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-1 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-4">📬 Get In Touch</div>
          <h1 className="text-5xl font-black text-white mb-2">Contact <span className="text-yellow-400">Us</span></h1>
          <p className="text-gray-500">Have questions? We'd love to hear from you.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
          {/* Left */}
          <div className="bg-gray-800 p-10 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_70%,_#facc15_0%,_transparent_50%)]" />
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-white mb-2">Let's <span className="text-yellow-400">Talk</span></h2>
              <div className="h-1 w-12 bg-yellow-400 rounded-full mb-6" />
              <p className="text-gray-400 mb-10 leading-relaxed">Have questions or feedback? Fill out the form and we'll get back to you within 24 hours.</p>
              <div className="space-y-4">
                {[
                  { icon: "📧", label: "Email", value: "satyamsrivastava7869@gmail.com" },
                  { icon: "📞", label: "Phone", value: "+91 8114123188" },
                  { icon: "📍", label: "Location", value: "India" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-yellow-400/10 border border-yellow-400/30 rounded-xl flex items-center justify-center text-lg">{item.icon}</div>
                    <div>
                      <div className="text-gray-500 text-xs uppercase tracking-wider">{item.label}</div>
                      <div className="text-white text-sm font-semibold">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right (Form) */}
          <div className="p-10">
            <h2 className="text-xl font-black text-white mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { label: "Name", name: "name", type: "text", placeholder: "Your full name" },
                { label: "Email", name: "email", type: "email", placeholder: "Your email address" },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{f.label}</label>
                  <input
                    type={f.type}
                    name={f.name}
                    value={formData[f.name]}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-yellow-400 transition-colors placeholder-gray-600 text-sm"
                    placeholder={f.placeholder}
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Message</label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-yellow-400 transition-colors placeholder-gray-600 text-sm resize-none"
                  placeholder="Write your message..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-400 text-gray-950 py-3 rounded-xl font-black hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/20 text-sm uppercase tracking-wider"
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;