import sequelize from '../config/database.js';
import userModel from '../models/userModel.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.js';
import { generateToken } from "../utils/jwt.js";

export const authController = {
    async registerUser(req, res, next){
        const newUser = userModel.build(req.body); // passa o req pro metodo build

        if(!newUser.birthDate || !newUser.createdAt || !newUser.email || !newUser.hash || !newUser.name || !newUser.role || !newUser.id){
                const error = new Error('Information missing!');
                error.status = 400;
                return next(error);
        }
            
        newUser.save(); //salva no banco
        return res.status(201).send({msg: 'Created succesfully!', userCreated: newUser});
    },
    
    async loginUser(req, res, next){
        //checar se o login é válido
            //checar email
            
            //checar senha por rehash

        //se valido, criar token e login
            //mostrar perfil estando logado


            //nao valido: msg: senha ou login incorretos
    },

    async logoutUser(req, res, next){
        //verificar se o estado do user é 'logado'

        //deslogar (apagar cookie/token)

    },
}