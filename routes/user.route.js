import express from "express";
import { BecomeSeller,SingleGig,newPropsal,myproposal,Ongoing,categoryfilter,payment,getChat
    ,addMessage,getAllMessages,senderDetails
} from "../controllers/user.controller.js";
import { Auth } from "../middleware/Auth.js";


const router = express.Router();

router.post("/seller",Auth, BecomeSeller);
router.get("/gig/:id",Auth,SingleGig)
router.post("/newproposal",Auth,newPropsal);
router.get("/mypreposal",Auth,myproposal);
router.get("/ongoing",Auth,Ongoing)
router.get("/category/:id",Auth,categoryfilter)
router.post("/payment/:id",Auth,payment)
router.get("/getchat/:id",Auth,getChat)
router.post("/sentmsg",Auth,addMessage)
router.get("/getAllmessage",Auth,getAllMessages)
router.get("/senderDetails",Auth,senderDetails)







export default router;

 