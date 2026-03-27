import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '../../.env');

dotenv.config({ path: envPath });

const JWT_SECRET = process.env.JWT_SECRET;

console.log(JWT_SECRET);
const JWT_EXPIRES_IN = '7d';

export const generateToken = (id, role = 'USER') => {
    return jwt.sign(
        {id, role},
        JWT_SECRET,
        {expiresIn: JWT_EXPIRES_IN}
    );
}

export const verifyToken = (token) => {
    try{
        return jwt.verify(token, JWT_SECRET)
    } catch(error){
        return console.log("(500) Internal Server Error... (I dont know how to handle this ://)").status(500);
    }
}

