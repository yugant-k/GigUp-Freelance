import express from "express";
import { //deleteUser, 
    getUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

//router.route("/:id").delete(verifyToken, deleteUser);
router.route("/:id").get(getUser);

export default router;