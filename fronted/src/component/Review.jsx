import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "./Ap";

const Review = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const res = await API.post(
        `/products/${id}/reviews`,
        {
          comment,
          rating,
        }
      );

      setMessage("Review added successfully ✅");
      setComment("");
      setRating(1);

      console.log(res.data);

      setTimeout(() => {
        window.location.reload();
      }, 500);

    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        "Error adding review ❌"
      );

      console.error(
        err.response?.data || err.message
      );
    }
  };

  const stars = [
    "1 ⭐",
    "2 ⭐⭐",
    "3 ⭐⭐⭐",
    "4 ⭐⭐⭐⭐",
    "5 ⭐⭐⭐⭐⭐",
  ];

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 max-w-lg">
      <h2 className="text-xl font-black text-white mb-1">
        Write a <span className="text-yellow-400">Review</span>
      </h2>

      <div className="h-0.5 w-10 bg-yellow-400 rounded-full mb-5" />

      {message && (
        <div className="mb-4 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm text-center py-2 px-4 rounded-xl">
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Rating */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
            Rating
          </label>

          <select
            value={rating}
            onChange={(e) =>
              setRating(Number(e.target.value))
            }
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-xl px-4 py-3 outline-none focus:border-yellow-400 transition-colors text-sm"
          >
            {stars.map((s, i) => (
              <option
                key={i}
                value={i + 1}
              >
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
            Comment
          </label>

          <textarea
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            required
            rows="3"
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-xl px-4 py-3 outline-none focus:border-yellow-400 transition-colors placeholder-gray-500 text-sm resize-none"
            placeholder="Share your experience..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-yellow-400 text-gray-950 py-3 rounded-xl font-black hover:bg-yellow-300 transition-colors text-sm uppercase tracking-wider"
        >
          Submit Review →
        </button>
      </form>
    </div>
  );
};

export default Review;