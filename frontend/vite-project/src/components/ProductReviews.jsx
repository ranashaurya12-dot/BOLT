import { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const API_BASE = "https://bolt-cfp7.onrender.com/api/reviews";

function StarInput({ rating, setRating }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          onClick={() => setRating(star)}
          className={`text-3xl transition-colors ${
            star <= rating ? "text-[#EEBA02]" : "text-[#3A3226]"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function StarDisplay({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-lg ${
            star <= Math.round(rating) ? "text-[#EEBA02]" : "text-[#3A3226]"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ProductReviews({ productId, avgRating, numReviews, onReviewChange }) {
  const { user } = useContext(AuthContext);

  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const myReview = reviews.find((r) => r.user?._id === user?._id);

  const fetchReviews = async () => {
    try {
      setLoadingReviews(true);
      const res = await axios.get(`${API_BASE}/product/${productId}`);
      setReviews(res.data.reviews);
    } catch (error) {
      toast.error("Failed to load reviews");
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    if (productId) fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to write a review");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    try {
      setSubmitting(true);

      if (myReview) {
        await axios.put(
          `${API_BASE}/update/${myReview._id}`,
          { rating, comment },
          { withCredentials: true }
        );
        toast.success("Review updated");
      } else {
        await axios.post(
          `${API_BASE}/create`,
          { productId, rating, comment },
          { withCredentials: true }
        );
        toast.success("Review submitted");
      }

      setRating(0);
      setComment("");
      await fetchReviews();
      if (onReviewChange) onReviewChange();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`${API_BASE}/delete/${reviewId}`, {
        withCredentials: true,
      });
      toast.success("Review deleted");
      await fetchReviews();
      if (onReviewChange) onReviewChange();
    } catch (error) {
      toast.error("Failed to delete review");
    }
  };

  return (
    <div className="mt-16 border-t border-[#2C2418] pt-12">
      <h2 className="font-['Oswald'] text-3xl font-bold italic uppercase tracking-tight text-[#F5F1E8]">
        Reviews
      </h2>

      <div className="mt-4 flex items-center gap-4">
        <StarDisplay rating={avgRating || 0} />
        <p className="text-[#9C9589]">
          {avgRating ? avgRating.toFixed(1) : "0.0"} out of 5 ·{" "}
          {numReviews || 0} review{numReviews === 1 ? "" : "s"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-lg border border-[#2C2418] bg-[#15120F] p-6"
      >
        <p className="font-semibold uppercase tracking-wide text-[#F5F1E8]">
          {myReview ? "Update your review" : "Write a review"}
        </p>

        <div className="mt-3">
          <StarInput rating={rating || myReview?.rating || 0} setRating={setRating} />
        </div>

        <textarea
          value={comment || myReview?.comment || ""}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this product..."
          rows={3}
          maxLength={500}
          className="mt-4 w-full rounded-lg border border-[#2C2418] bg-[#0D0B09] p-3 text-[#F5F1E8] placeholder-[#6B6355] focus:border-[#EEBA02] focus:outline-none"
        />

        <button
          type="submit"
          disabled={submitting}
          className="mt-4 rounded-lg bg-[#EEBA02] px-8 py-3 font-bold uppercase tracking-wide text-black transition-all duration-300 hover:bg-[#FFD35C] disabled:opacity-50"
        >
          {submitting ? "Submitting..." : myReview ? "Update Review" : "Submit Review"}
        </button>
      </form>

      <div className="mt-8 flex flex-col gap-5">
        {loadingReviews ? (
          <p className="text-[#9C9589]">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-[#9C9589]">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              className="rounded-lg border border-[#2C2418] bg-[#15120F] p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#F5F1E8]">
                    {review.user?.name || "Anonymous"}
                  </p>
                  <StarDisplay rating={review.rating} />
                </div>

                {user?._id === review.user?._id && (
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="text-sm text-red-500 hover:text-red-400"
                  >
                    Delete
                  </button>
                )}
              </div>

              {review.comment && (
                <p className="mt-3 text-[#9C9589]">{review.comment}</p>
              )}

              <p className="mt-2 text-xs text-[#6B6355]">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductReviews;