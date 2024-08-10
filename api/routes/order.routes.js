import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getOrders, 
         intent, 
         confirm } from "../controllers/order.controller.js";

const router = express.Router();

// router.post("/:gigId", verifyToken, createOrder);
router.route("/").get(verifyJWT, getOrders);
router.route("/payment/:id").post(verifyJWT, intent);
router.route("/").post(verifyJWT, confirm);

export default router;