import express from "express";
import {
  createConversation,
  getConversations,
  getSingleConversation,
  updateConversation,
} from "../controllers/conversation.controller.js";
import { verifyJWT } from "../middleware/jwt.js";

const router = express.Router();

router.route("/").get(verifyJWT, getConversations);
router.route("/").post(verifyJWT, createConversation);
router.route("/single/:id").get(verifyJWT, getSingleConversation);
router.route("/:id").put(verifyJWT, updateConversation);

export default router;