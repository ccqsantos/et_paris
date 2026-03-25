import express from 'express';
import cors from 'cors';
import { userController } from '../controllers/userController.js';
const app = express();

const router = express.Router();

router.use(cors());

//get por id
router.get('/:id', userController.showUserById);

//get geral
router.get('/', userController.listAllUsers);


router.post('/', userController.registerUser);


router.put('/:name', userController.putUser);


router.patch('/:name', userController.updateUserData);


router.delete('/:name', userController.deleteUser);

router.head('/', (req, res)=>{
    res.set('Content-Type', 'application/json');
    res.status(200).end();
});

export default router;