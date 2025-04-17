import { Rating } from "@mui/material";
import React, { useState } from "react";
import { createReview } from "../services/reviewServices";

const ReviewForm = ({ userId, productId, getThisProduct }) => {
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const submit = async (e) => {
    e.preventDefault();
    // console.log({ comment, rating, userId, productId });

    const response = await createReview({
      comment,
      rating,
      userId,
      productId,
      username,
    });
    if (response.success) {
      // console.log(response);
      setComment("");
      setRating(0);
      getThisProduct();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Review</h2>
      <form onSubmit={submit}>
        <div className="mb-4 space-y-4">
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Your Name..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
          />
          <textarea
            id="review"
            name="review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="Write Your Review..."
            rows="4"
          ></textarea>
          <Rating
            name="simple-controlled"
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            value={rating}
            precision={0.5}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
