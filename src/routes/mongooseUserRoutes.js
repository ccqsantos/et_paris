import express from 'express';
import cors from 'cors';
import { mongoUserController } from '../controllers/mongooseUserController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(cors());

router.use(authMiddleware);

router.get('/', mongoUserController.getProfile);

router.patch('/', mongoUserController.updateProfile);

router.delete('/', mongoUserController.deleteUser);

router.head('/', (req, res)=>{
    res.set('Content-Type', 'application/json');
    res.status(200).end();
});

export default router;