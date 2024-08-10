import express from "express";
import {
  createMessage,
  getMessages,
} from "../controllers/message.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").post(verifyJWT, createMessage);
router.route("/:id").get(verifyJWT, getMessages);

export default router;