import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";
import Stripe from "stripe";

const intent = asyncHandler(async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  
    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      throw new ApiError(404, "No gig found");
    }
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount: gig.price * 100,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    if (!paymentIntent) {
      throw new ApiError(500, "Failed to create payment intent");
    }
  
    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: paymentIntent.id,
    });
  
    const savedOrder = await newOrder.save();
  
    if (!savedOrder) {
      throw new ApiError(500, "Failed to save new order");
    }
  
    res.status(201).json(new ApiResponse(201, {
      clientSecret: paymentIntent.client_secret,
    }, "Payment successful"));
  });
  

const getOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({
      ...(req.user.isSeller ? { sellerId: req.user._id } : { buyerId: req.user._id }),
      isCompleted: true,
    });

    res.status(201).json(new ApiResponse(201, orders, "Orders Found"));
  } catch (err) {
    throw new ApiError(500, err.message);
  }
});
const confirm = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    res.status(200).json(new ApiResponse(201, orders, "Order is Confirmed"));
  } catch (err) {
    throw new ApiError(500, err.message);
  }
};

export {
    intent,
    getOrders,
    confirm
};