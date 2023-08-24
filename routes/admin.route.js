import  Express  from "express";
import {login, users,AddCategory,categorys,userManage,PayFreelancer,Allworks} from "../controllers/admin.controller.js"
import upload from "../middleware/multer.js";
const router = Express.Router()

router.post("/login",login)
router.get("/users",users)
router.post("/addcategory",upload.single("file"),AddCategory)
router.get("/categorys",categorys)
router.post("/usermanage/:id",userManage)
router.post("/payment",PayFreelancer)
router.get("/works",Allworks)




export default router



