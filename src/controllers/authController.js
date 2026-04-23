import sequelize from '../config/database.js';
import userModel from '../models/userModel.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.js';
import { generateToken } from "../utils/jwt.js";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '../../.env');

dotenv.config({ path: envPath });

const NODE_ENV = process.env.NODE_ENV;

export const authController = {
    async registerUser(req, res, next) {
        const { birthDate, email, password, name } = req.body; // passa o req pra valores separados

        if (!birthDate || !email || !password || !name) {
            const error = new Error('Information missing!');
            error.status = 400;
            return next(error);
        }

        try {
            const existingUser = await userModel.findOne({ where: { email: email } });
            if (existingUser) {
                const error = new Error('Email already signed in!');
                error.status = 400;
                return next(error);
            }
            const hash = await hashPassword(password);

            const newUser = await userModel.create({
                name, birthDate, email, hash
            });  //cria uma instancia e ja salva no banco

            return res.status(201).json({ msg: 'Created succesfully!', userCreated: newUser });
        } catch (error) {
            res.status(500).json({ msg: "Internal Server Error", error: error });
        }
    },

    async loginUser(req, res, next) {
        try {
            //checar se o login é válido
            //checar email
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ msg: 'Bad Request: Info missing!' });
            }
            const user = await userModel.findOne({
                where: { email: email },
            })

            if (!user) {
                return res.status(401).json({ msg: 'Email or password incorrect!' });
            }

            //checar senha por rehash
            const hashInDb = user.hash;
            const comparation = await comparePassword(password, hashInDb);
            //se valido, criar token e login
            //nao valido: msg: senha ou login incorretos
            if (!comparation) {
                return res.status(401).json({ msg: 'Email or Password are incorrect!' });
            }
            //mostrar perfil estando logado
            const token = generateToken(user.name);

            console.log('login realizado com sucesso!,\ntoken: ', token);
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3600000 // 1 hora
            });

            return res.status(200).json({ msg: "Login successful!", token: token, 
                user: {
                    id: user.id,
                    name: user.name,
                    role: user.role
                } });
        }
        catch (error) {
            return res.status(500).json({ msg: "Server Error", errorMsg: error.message });
        }
    },

    async logoutUser(req, res, next) {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.status(200).json({ msg: 'Logout successful' });
    },
}