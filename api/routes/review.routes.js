import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  createReview,
  getReviews,
  deleteReview,
} from "../controllers/review.controller.js";

const router = express.Router();

router.route("/").post(verifyJWT, createReview )
router.route("/:gigId").get(getReviews)
router.route("/:id").delete(deleteReview)

export default router;