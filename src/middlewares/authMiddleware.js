import { verifyToken } from '../utils/jwt.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '../../.env');

dotenv.config({ path: envPath });

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if(!token){
        return res.status(401).json({msg: "Access denied. No token found!"});
    }

    try{
        const decode = verifyToken(token, JWT_SECRET);
        
        req.user = decode;
        next();
    }catch(error){
        return res.status(500).json({msg: "Server error.", errorMsg: error});
    }
}