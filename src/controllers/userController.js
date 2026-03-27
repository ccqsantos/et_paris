import sequelize from '../config/database.js';
import userModel from '../models/userModel.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.js';
import { generateToken } from "../utils/jwt.js";

export const userController = {

    //funcoes do controller::::(mesmas funcoes do route [CRUD])
    
    // @desc get all users
    async getProfile(req, res, next){
        const findUser = req.params;
        try{
            const userSearched = await userModel.findOne({where: {name: findUser}}); 
            return res.status(200).json({msg: "Profile found!", userFound: userSearched}); 
        }catch(error){
            return res.status(500).json({msg: 'Error searching for profile', error: error});
        }
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
    return res.status(200).json({msg: `User changed at index ${findUserIndex + 1}`, changedUser: mockUsers[findUserIndex]});
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

    return res.status(200).json({msg: 'Attribute changed succesfully', changedUser: mockUsers[findUserIndex]});
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
    return res.status(200).json({msg: `User deleted with success at index ${findUserIndex+1}`, deletedUser: deletedUser});
    }


}