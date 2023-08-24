import express from "express";
import { BecomeSeller,SingleGig,newPropsal,myproposal,Ongoing,categoryfilter,payment,getChat,categorys
    ,addMessage,getAllMessages,senderDetails,getAllContacts,findUser,createPreposal,Recieved,history,preposalPayment,PayPreposal
} from "../controllers/user.controller.js";
import { Auth } from "../middleware/Auth.js";


const router = express.Router();

router.post("/seller",Auth, BecomeSeller);
router.get("/gig/:id",Auth,SingleGig)
router.post("/newproposal",Auth,newPropsal);
router.get("/mypreposal",Auth,myproposal);
router.get("/categorys",categorys)
router.get("/ongoing",Auth,Ongoing)
router.get("/category/:id",Auth,categoryfilter)
router.post("/payment/:id",Auth,payment)
router.post("/preposal-payment/:id",Auth,preposalPayment)
router.get("/getchat/:id",Auth,getChat)
router.post("/sentmsg",Auth,addMessage)
router.get("/getAllmessage",Auth,getAllMessages)
router.get("/senderDetails",Auth,senderDetails)
router.get("/finduser",Auth,findUser)
router.get("/getAllContacts",Auth,getAllContacts)
router.post("/paymentsuccess",Auth,createPreposal)
router.post("/Pro-paymentsuccess",Auth,PayPreposal)


router.post("/Recieved",Auth,Recieved)
router.get("/history",Auth,history)








export default router;

 