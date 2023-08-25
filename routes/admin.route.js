import  Express  from "express";
import {login, users,AddCategory,categorys,userManage,PayFreelancer,Allworks} from "../controllers/admin.controller.js"
import upload from "../middleware/multer.js";
const router = Express.Router()
import { AdminAuth } from "../middleware/AdminAuth.js";

router.post("/login",login)
router.get("/users",AdminAuth,users)
router.post("/addcategory",AdminAuth,upload.single("file"),AddCategory)
router.get("/categorys",AdminAuth,categorys)
router.post("/usermanage/:id",AdminAuth,userManage)
router.post("/payment",AdminAuth,PayFreelancer)
router.get("/works",AdminAuth,Allworks)




export default router



