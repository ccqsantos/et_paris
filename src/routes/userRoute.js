import express from 'express';
import cors from 'cors';
import { userController } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(cors());

router.use(authMiddleware);

router.get('/', userController.getProfile);

router.patch('/', userController.updateProfile);

router.delete('/', userController.deleteUser);

router.head('/', (req, res)=>{
    res.set('Content-Type', 'application/json');
    res.status(200).end();
});

export default router;