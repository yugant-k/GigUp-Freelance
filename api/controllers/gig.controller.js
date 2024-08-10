import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import Gig from "../models/gig.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";

const createGig = asyncHandler(async (req, res) => {
    if (!req.user.isSeller) {
        throw new ApiError(403, "Only sellers can create a gig!");
    }

    const { title, desc, category, price, shortTitle, shortDesc, deliveryTime, revisionNumber, features } = req.body;

    // Validate required fields
    if ([title, desc, category, price, shortTitle, shortDesc, deliveryTime, revisionNumber].some(field => field?.trim() === "")) {
        throw new ApiError(400, "All required fields are not filled");
    }

    // Check for cover image
    const coverImgLocalPath = req.files?.coverImage?.[0]?.path;
    if (!coverImgLocalPath) {
        throw new ApiError(400, "Cover Image is required");
    }

    // Upload cover image to Cloudinary
    const coverImage = await uploadOnCloudinary(coverImgLocalPath);
    if (!coverImage) {
        throw new ApiError(500, "Failed to upload cover image");
    }

    // Upload additional images (if any)
    const mediaPaths = req.files?.descMedia || []; // Array of file paths
    const uploadedMedia = [];
    for (const file of mediaPaths) {
        const result = await uploadOnCloudinary(file.path);
        if (!result) {
            throw new ApiError(500, "Failed to upload one of the additional images");
        }
        uploadedMedia.push(result.url);
    }

    // Create gig
    const gig = await Gig.create({
        userId: req.user._id,
        title,
        desc,
        category,
        price,
        shortTitle,
        shortDesc,
        deliveryTime,
        revisionNumber,
        coverImage: coverImage.url,
        descMedia: uploadedMedia,
        features: Array.isArray(features) ? features : [features] // Ensure features is an array
    });

    // Fetch created gig
    const createdGig = await Gig.findById(gig._id).select("-password -refreshToken");

    if (!createdGig) {
        throw new ApiError(500, "Gig creation failed, please try again");
    }

    // Return success response
    return res.status(201).json(new ApiResponse(201, createdGig, "Gig created successfully"));
});
const deleteGig = asyncHandler(async (req, res) => {
    try {
      const gig = await Gig.findById(req.params.id);

      if (!gig) {
        throw new ApiError(404, "Gig not found!");
      }
      if (gig.userId != req.user._id)
        throw new ApiError(403, "You can delete only your gig!");
  
      await Gig.findByIdAndDelete(req.params.id);
      res.status(201).json(new ApiResponse(201,"Gig has been deleted!"));
    } catch (err) {
        throw new ApiError(500, err.message);
    }
  });
  const getGig = asyncHandler(async (req, res) => {
    try {
      const gig = await Gig.findById(req.params.id);
      if (!gig) 
        throw new ApiError(404, "Gig not found!");
      res.status(200).json(new ApiResponse(201, gig, "Gig Found"));
    } catch (err) {
        throw new ApiError(500, err.message);
    }
  });
  const getGigs = asyncHandler(async (req, res) => {
    const q = req.query;
    // const filters = {
    //     ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    //   };
    const filters = {
      ...(q.userId && { userId: q.userId }),
      ...(q.category && { category: q.category }),
      ...((q.min || q.max) && {
        price: {
          ...(q.min && { $gte: q.min }),
          ...(q.max && { $lte: q.max }),
        },
      }),
      ...(q.search && { title: { $regex: q.search, $options: "i" } }), //regex for searching and options for case sensitivity
    };
    console.log("Filters:", filters);
    try {
      const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
      res.status(200).json(new ApiResponse(201, gigs, "Gigs Found"));
    } catch (err) {
        throw new ApiError(500, err.message);
    }
  });
export { 
    createGig,
    deleteGig,
    getGig,
    getGigs
};
