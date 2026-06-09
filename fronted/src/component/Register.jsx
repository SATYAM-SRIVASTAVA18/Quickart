import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "./Ap";

function Register() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();

  const handel = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handelsubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.name || !form.username || !form.password) {
      alert("Please fill in all fields ❌");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters ❌");
      return;
    }

    try {
      const res = await API.post("/register", form);

      alert(
        res.data.message ||
        "Registered Successfully ✅"
      );

      navigate("/login");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Registration failed ❌"
      );
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gray-950">
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-950 via-gray-900 to-orange-950 opacity-90" />

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

      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-center items-start px-16 w-1/2 z-10 h-full">
        <div className="space-y-6">
          <div className="w-14 h-1.5 bg-orange-500 rounded-full" />

          <h2 className="text-6xl font-black text-white uppercase leading-tight tracking-tight">
            Join
            <br />
            The
            <br />
            <span className="text-orange-500">
              Arena.
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-xs leading-relaxed">
            Create your account and unlock
            exclusive sports gear, deals,
            and a community built for champions.
          </p>

          <div className="flex gap-8 pt-4">
            <div>
              <p className="text-3xl font-black text-orange-500">
                500+
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-widest">
                Products
              </p>
            </div>

            <div>
              <p className="text-3xl font-black text-orange-500">
                50K+
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-widest">
                Athletes
              </p>
            </div>

            <div>
              <p className="text-3xl font-black text-orange-500">
                24/7
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-widest">
                Support
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md mx-4 lg:mx-0 lg:mr-16">

        <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 rounded-t-2xl" />

        <div className="bg-gray-900 bg-opacity-95 backdrop-blur-sm rounded-b-2xl shadow-2xl px-8 py-10 border border-gray-800 border-t-0">

          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center mb-3 shadow-lg shadow-orange-500/30">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>

            <h1 className="text-3xl font-black tracking-widest text-white uppercase">
              Quic
              <span className="text-orange-500">
                Kart
              </span>
            </h1>

            <p className="text-gray-400 text-sm tracking-widest uppercase mt-1 font-medium">
              Create Your Account
            </p>
          </div>

          <form
            onSubmit={handelsubmit}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold tracking-widest text-gray-400 uppercase mb-1.5">
                Full Name
              </label>

              <input
                value={form.name}
                onChange={handel}
                name="name"
                type="text"
                required
                placeholder="Enter your name"
                className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-widest text-gray-400 uppercase mb-1.5">
                Username
              </label>

              <input
                value={form.username}
                onChange={handel}
                name="username"
                type="text"
                required
                placeholder="Choose a username"
                className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-widest text-gray-400 uppercase mb-1.5">
                Password
              </label>

              <input
                value={form.password}
                onChange={handel}
                name="password"
                type="password"
                required
                placeholder="Create a password"
                className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-widest text-gray-400 uppercase mb-1.5">
                Account Type
              </label>

              <select
                name="role"
                value={form.role}
                onChange={handel}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
              >
                <option value="user">
                  User
                </option>

                <option value="admin">
                  Admin
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-black tracking-widest uppercase py-3.5 rounded-xl transition-all duration-200"
            >
              Create Account →
            </button>

            <p className="text-center text-gray-500 text-sm pt-2">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-400 hover:text-orange-300 font-semibold"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>

        <p className="text-center text-gray-600 text-xs tracking-widest uppercase mt-4">
          ⚡ Your Game. Your Gear. Your Victory.
        </p>

      </div>
    </div>
  );
}

export default Register;