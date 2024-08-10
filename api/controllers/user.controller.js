import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import  {User}  from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user)
        throw new ApiError (401,  "User Does not Exist");
    res.status(200).json(new ApiResponse(201, user, "User Found"));
  });


  
export {getUser};