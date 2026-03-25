import { hashPassword, comparePassword } from '../utils/bcrypt.js';
import { generateToken } from "../utils/jwt.js";
export const mockUsers = [
        {id: 1, name: 'Caua Junior', createdAt: '2025/03/02', role: 'USER', birthDate: '23/08/2005', email: 'example@gmail.com', hash: '$2a$10$NQI6As9jkqZENNpU2y.gHu3JnoGNApkBENW0KA2JzoFZ.sB0y4E4i'},
        {id: 2, name: 'Marcio Freitas', createdAt: '2025/03/02', role: 'USER', birthDate: '22/03/1987', email: 'example@gmail.com', hash: '$2a$10$NQI6As9jkqZENNpU2y.gHu3JnoGNApkBENW0KA2JzoFZ.sB0y4E4i'},
        {id: 3, name: 'Khalil Rountree', createdAt: '2025/03/02', role: 'USER', birthDate: '21/07/2005', email: 'example@gmail.com', hash: '$2a$10$NQI6As9jkqZENNpU2y.gHu3JnoGNApkBENW0KA2JzoFZ.sB0y4E4i'},
        {id: 4, name: 'Jorge Santana', createdAt: '2025/03/02', role: 'USER', birthDate: '20/06/2005', email: 'example@gmail.com', hash: '$2a$10$NQI6As9jkqZENNpU2y.gHu3JnoGNApkBENW0KA2JzoFZ.sB0y4E4i'},
        {id: 5, name: 'Bryan Brown', createdAt: '2025/03/02', role: 'USER', birthDate: '14/11/2005', email: 'example@gmail.com', hash: '$2a$10$NQI6As9jkqZENNpU2y.gHu3JnoGNApkBENW0KA2JzoFZ.sB0y4E4i'},
        {id: 6, name: 'Hiro Fushiguro', createdAt: '2025/03/02', role: 'USER', birthDate: '19/12/2005', email: 'example@gmail.com', hash: '$2a$10$NQI6As9jkqZENNpU2y.gHu3JnoGNApkBENW0KA2JzoFZ.sB0y4E4i'},
        {id: 7, name: 'Lillian Wagner', createdAt: '2025/03/02', role: 'USER', birthDate: '26/09/2005', email: 'example@gmail.com', hash: '$2a$10$NQI6As9jkqZENNpU2y.gHu3JnoGNApkBENW0KA2JzoFZ.sB0y4E4i'},
    ];

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
    async listAllUsers(req, res){
        const findName = req.query.name;
    
        const userFound = mockUsers.find((user)=>user.name === findName);
        const userIndex = mockUsers.findIndex((user)=>user.name === findName);
    
        if(!userFound){
            return res.status(200).send(mockUsers);
        };
    
        return res.status(200).send(userFound, console.log(`user found at index ${userIndex+1}`));
    },

    // @desc registrar usuario
    async registerUser(req, res, next) {
            const newUser = await req.body;

            if(!newUser.birthDate || !newUser.createdAt || !newUser.email || !newUser.hash || !newUser.name || !newUser.role || !newUser.id){
                const error = new Error('Information missing!');
                error.status = 400;
                return next(error);
            }
            
            mockUsers.push(newUser);
            return res.status(201).send({msg: 'Created succesfully!'});
    },

    async validateLogin(req, res, next) {
        //checar se o login é válido
            //checar email

            //checar senha por rehash


        //se valido, criar token e login
            //mostrar perfil estando logado


            //nao valido: msg: senha ou login incorretos
    },

    // @desc mudar completamente o usuario
    async putUser(req, res, next){

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