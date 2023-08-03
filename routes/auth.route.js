import express from 'express';
import { register, login, logout,verification,UserGoogleReg,UserGoogleLogin } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get("/:id/verify/:token", verification);
router.post('/googleRegister',UserGoogleReg);
router.post("/googleLogin", UserGoogleLogin);






export default router;
