import sequelize from '../config/database.js';
import userModel from '../models/userModel.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.js';
import { generateToken } from "../utils/jwt.js";

export const userController = {

    //funcoes do controller::::(mesmas funcoes do route [CRUD])
    // @desc get by id
    async showUserById(req, res, next){
        const idFound = parseInt(req.params.id);
    
        const userFound = mockUsers.find((user)=>user.id === idFound);
        const userIndex = mockUsers.findIndex((user)=>user.id === idFound);
    
        if(!userFound) {
            const error = new Error(`A user with the id ${idFound} was not found`);
            error.status = 404;
            return next(error);
        }
    
        return res.status(200).send(userFound, console.log(`user found at index ${userIndex+1}`));
    },
    
    // @desc get all users
    async getProfile(req, res){
        const findName = req.query.name;
    
        const userFound = mockUsers.find((user)=>user.name === findName);
        const userIndex = mockUsers.findIndex((user)=>user.name === findName);
    
        if(!userFound){
            return res.status(200).send(mockUsers);
        };
    
        return res.status(200).send(userFound, console.log(`user found at index ${userIndex+1}`));
    },

    // @desc mudar completamente o usuario
    async updateProfile(req, res, next){

    const findName = req.params.name; 

    const findUserIndex = mockUsers.findIndex((user)=> user.name === findName);

    const putUser = req.body;

    if(findUserIndex === -1){
        const error = new Error(`User ${findName} not found`);
        error.status = 404;
        return next(error);
    }

    if(!putUser.birthDate || !putUser.createdAt || !putUser.email || !putUser.hash || !putUser.name || !putUser.role || !putUser.id){
        const error = new Error('Information missing!');
        error.status = 400;
        return next(error);
    }

    mockUsers[findUserIndex] = putUser;
    return res.status(200).send({msg: `User changed at index ${findUserIndex + 1}`, changedUser: mockUsers[findUserIndex]});
    },

    // @desc atualizar dados de usuário
    async updateUserData(req, res, next){
    const findName = req.params.name;
    const findUserIndex = mockUsers.findIndex((user)=> user.name === findName);
    const changingAttribute = req.body;

    if(findUserIndex === -1){
        const error = new Error('User not found!');
        error.status = 404;
        return next(error);
    }

    Object.assign(mockUsers[findUserIndex], changingAttribute);

    return res.status(200).send({msg: 'Attribute changed succesfully', changedUser: mockUsers[findUserIndex]});
    },


    //deletar usuário
    async deleteUser(req, res, next) {
    const findName = req.params.name; 

    const findUserIndex = mockUsers.findIndex((user)=> user.name === findName);

    if(findUserIndex === -1){
        const error = new Error('User not found!');
        error.status = 404;
        return next(error);
    }
    const deletedUser = mockUsers[findUserIndex];

    mockUsers.splice([findUserIndex], 1);
    return res.status(200).send({msg: `User deleted with success at index ${findUserIndex+1}`, deletedUser: deletedUser});
    }


}