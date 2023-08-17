import express from "express";
import { Auth } from "../middleware/Auth.js";
import { Addpost,MyGigs,AllGigs,allProposal,proposalstatus,Allongoing ,profiledata,EditProfile} from "../controllers/seller.controller.js";
import upload from "../middleware/multer.js";


const router = express.Router();

router.post("/addpost",Auth,upload.array("files",4),Addpost);
router.get("/mygigs",Auth,MyGigs);
router.get("/gigs",Auth,AllGigs);
router.get("/mypreposal",Auth,allProposal)
router.post("/accept",Auth,proposalstatus)
router.get("/ongoing",Auth,Allongoing)
router.get("/profiledata",Auth,profiledata)
router.post("/editprofile",Auth,EditProfile)









export default router;