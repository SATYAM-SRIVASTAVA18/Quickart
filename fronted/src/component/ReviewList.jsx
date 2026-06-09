import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "./Ap";

const ReviewList = () => {
  const { id } = useParams();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const fetchReviews = async () => {
    try {
      const res = await API.get(`/products/${id}/review`);
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(
        `/products/${id}/reviews/${reviewId}`
      );

      setReviews(
        reviews.filter(
          (review) => review._id !== reviewId
        )
      );

      alert("Review deleted successfully ✅");
    } catch (error) {
      console.error("Delete error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete review ❌"
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-500">
        Loading reviews...
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
        All Reviews{" "}
        <span className="text-yellow-400 text-sm">
          ({reviews.length})
        </span>
      </h3>

      {reviews.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <div className="text-3xl mb-2">⭐</div>
          <p>No reviews yet. Be the first!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="relative bg-gray-800 border border-gray-700 hover:border-yellow-400/30 p-5 rounded-2xl transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">

                  {/* User */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-yellow-400/10 border border-yellow-400/30 rounded-full flex items-center justify-center text-yellow-400 font-black text-xs">
                      {(review.author?.name || "A")[0].toUpperCase()}
                    </div>

                    <h4 className="text-sm font-bold text-white">
                      {review.author?.name || "Anonymous"}
                    </h4>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-700"
                        }`}
                      >
                        ★
                      </span>
                    ))}

                    <span className="text-gray-500 text-xs ml-1">
                      ({review.rating}/5)
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {review.comment}
                  </p>
                </div>

                {/* Delete Button */}
                {user &&
                  review.author &&
                  user._id === review.author._id && (
                    <button
                      onClick={() =>
                        handleDelete(review._id)
                      }
                      className="shrink-0 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg text-xs font-bold transition-all"
                    >
                      Delete
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;