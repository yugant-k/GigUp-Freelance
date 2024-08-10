import  Review  from "../models/review.model.js";
import  Gig  from "../models/gig.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const createReview = asyncHandler(async (req, res) => {
  const { gigId, desc, star } = req.body;

  if (req.user.isSeller)
    throw new ApiError(403, "Sellers can't create a review!");

  if ([desc, star].some(field => field?.trim() === "")) {
    throw new ApiError(400, "Please fill all required fields");
  }

  const newReview = new Review({
    userId: req.user._id,
    gigId,
    desc,
    star,
  });

  try {
    const existingReview = await Review.findOne({
      gigId,
      userId: req.user._id,
    });

    if (existingReview)
      throw new ApiError(403, "You have already created a review for this gig!");

    const savedReview = await newReview.save();

    await Gig.findByIdAndUpdate(gigId, {
      $inc: { totalStars: star, starNumber: 1 },
    });

    return res.status(201).json(new ApiResponse(201, savedReview, "Your review is saved successfully"));
  } catch (err) {
    throw new ApiError(500, err.message);
  }
});

const getReviews = asyncHandler(async (req, res) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId });
    return res.status(200).json(new ApiResponse(200, reviews));
  } catch (err) {
    throw new ApiError(500, err.message);
  }
});

const deleteReview = asyncHandler(async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      throw new ApiError(404, "Review not found");
    }
    if (review.userId.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You are not authorized to delete this review");
    }
    await Review.findByIdAndDelete(req.params.id);

    await Gig.findByIdAndUpdate(review.gigId, {
      $inc: { totalStars: -review.star, starNumber: -1 },
    });

    return res.status(200).json(new ApiResponse(200, null, "Review deleted successfully"));
  } catch (err) {
    throw new ApiError(500, err.message);
  }
});

export {
  createReview,
  getReviews,
  deleteReview
};