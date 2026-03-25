import express from 'express';
import cors from 'cors';
import { userController } from '../controllers/userController.js';

const router = express.Router();

router.use(cors());

//get por id
router.get('/:id', userController.showUserById);


router.patch('/:name', userController.updateUserData);


router.delete('/:name', userController.deleteUser);

router.head('/', (req, res)=>{
    res.set('Content-Type', 'application/json');
    res.status(200).end();
});

export default router;