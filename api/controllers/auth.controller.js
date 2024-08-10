import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import  {User}  from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import bcrypt from 'bcrypt';

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, country, password, phone, desc, isSeller } = req.body;

    // Validate required fields
    if ([username, email, country, password].some(field => field?.trim() === "")) {
        throw new ApiError(400, "Please fill all required fields");
    }

    // Check if user already exists
    const userExists = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (userExists) throw new ApiError(409, "User with username or email already exists");

    // Check for profile image
    const imgLocalPath = req.files?.img?.[0]?.path;
    if (!imgLocalPath) {
        throw new ApiError(400, "Profile image is required");
    }

    // Upload image to Cloudinary
    const img = await uploadOnCloudinary(imgLocalPath);
    if (!img) {
        throw new ApiError(500, "Failed to upload profile image");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        img: img.url,
        country,
        phone,
        desc,
        isSeller
    });

    // Fetch created user and exclude sensitive fields
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) throw new ApiError(500, "User registration failed, please try again");

    // Return success response
    return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) =>{
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const {email, username, password} = req.body
    console.log(email);

    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }
    
    // Here is an alternative of above code based on logic discussed in video:
    // if (!(username || email)) {
    //     throw new ApiError(400, "username or email is required")
        
    // }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

   const isPasswordValid = await user.comparePassword(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    //const { password, ...loggedInUser } = user._doc;

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

export {
    registerUser,
    loginUser,
    logoutUser
}
