import express from 'express';
import cors from 'cors';
import { authController } from '../controllers/authController.js';


const router = express.Router();

//register route
router.post('/register', authController.registerUser);

//login route
router.post('/login', authController.loginUser);

//logout route
router.post('/logout', authController.logoutUser);


export default router;