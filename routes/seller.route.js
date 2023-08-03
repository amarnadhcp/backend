import express from "express";
import { Auth } from "../middleware/Auth.js";
import { Addpost } from "../controllers/seller.controller.js";
import upload from "../middleware/multer.js";


const router = express.Router();

router.post("/addpost",Auth,upload.array("files",4),Addpost);


export default router;