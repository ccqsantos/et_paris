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
    const authHeader = req.headers.authorization;
        
    console.log('Auth Header:', authHeader);
    console.log('Auth Header type:', typeof authHeader);
    console.log('Auth Header length:', authHeader?.length);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            error: "Access denied. No token provided or invalid format. Use: Bearer <token>"
        });
    }

    const token = authHeader.split(' ')[1];
    
    // Debug the token
    console.log('Raw token string:', token);
    console.log('Token type:', typeof token);
    console.log('Token length:', token?.length);
    console.log('Token first 10 chars:', token?.substring(0, 10));
    console.log('Token last 10 chars:', token?.substring(token?.length - 10));
    console.log('Token includes dots?', token?.includes('.'));
    console.log('Number of dots:', token?.split('.').length - 1);
    
    // Check for hidden characters
    console.log('Token char codes:', Array.from(token?.slice(0, 20) || '').map(c => c.charCodeAt(0)));
    
    if(!token){
        return res.status(401).json({msg: "Access denied. No token found!"});
    }

    try{
        const decoded = verifyToken(token);

        req.userName = decoded.name;
        req.userId = decoded.id;
        next();
    } catch(error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                error: "Invalid token", 
                details: error.message,
                tokenPreview: token?.substring(0, 20) + '...'
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                error: "Token expired", 
                details: error.message 
            });
        }
        
        return res.status(401).json({ 
            error: "Authentication failed", 
            details: error.message 
        });
    }
}