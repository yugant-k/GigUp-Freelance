import express from "express";
import {
  createGig,
  deleteGig,
   getGig,
   getGigs
} from "../controllers/gig.controller.js";
import {upload} from "../middleware/multer.middleware.js"
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").post(
    verifyJWT,
    upload.fields([
        {
            name: "coverImage",
            maxCount: 1
        },
        {
            name: "descMedia",
            maxCount: 10
        }
    ]) ,
    createGig
);
router.route("/:id").delete(verifyJWT, deleteGig);
router.route("/single/:id").get(getGig);
router.route("/").get(getGigs);

export default router;