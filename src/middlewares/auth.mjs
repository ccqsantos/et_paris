import { verifyToken } from '../utils/jwt.mjs';

export const authenticate = (requiredRole = null) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        
        if(!authHeader || !authHeader.startsWith('Bearer')){
            return req.status(401).json({error: 'Token não fornecido'})
        }

        
    }
}