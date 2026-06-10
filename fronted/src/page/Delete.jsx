import React, { useState } from 'react';
import API from "../component/Ap";
import { useNavigate } from "react-router-dom";

function Delete({ id }) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await API.delete(`/products/${id}`);
      alert("Product deleted successfully");
      // navigate("/adminehome"); // ← window.location.href hatao, yeh use 
      window.location.href = "/adminehome"; // Redirect to admin home after deletion
    } catch (err) {
      console.error(err);
      alert("Error deleting product");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="w-full bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/40 hover:border-red-500 text-xs font-bold tracking-widest uppercase py-2 rounded-xl transition-all duration-200"
    >
      🗑 Delete
    </button>
  );
}

export default Delete;