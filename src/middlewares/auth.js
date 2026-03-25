import { verifyToken } from '../utils/jwt.mjs';

export const authenticate = (requiredRole = null) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        
        if(!authHeader || !authHeader.startsWith('Bearer')){
            return req.status(401).json({error: 'Token não fornecido'})
        }

        const token = authHeader.substring(7);
        const decoded = verifyToken(token);

        if(!decoded){
            return res.status(401).json({error: 'Token inválido ou expirado'});
        }

        if(requiredRole && decoded.role !== requiredRole){
            return res.status(403).json({error: 'Acesso negado. Permissão insuficiente.'});
        }

        req.user = decoded;
        next();
    }
}