import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || '57b7c85118a2a23c3c4f779ab0772303';

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

