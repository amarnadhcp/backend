import express from "express";
import { BecomeSeller } from "../controllers/user.controller.js";
import { Auth } from "../middleware/Auth.js";


const router = express.Router();

router.post("/seller",Auth, BecomeSeller);

export default router;

 