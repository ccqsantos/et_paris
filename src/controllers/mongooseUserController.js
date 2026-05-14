import { stringify } from 'node:querystring';
import {mongooseUserModel as User} from '../models/mongooseUserModel.js';
import { header } from 'express-validator';
import { verifyToken } from '../utils/jwt.js';

export const mongoUserController = {

    // @desc get all users
    async getProfile(req, res, next) {
        const loggedInUserId = req.userId;

        if(!loggedInUserId){
            return res.status(403).json({
                error: "Access denied. You are not logged in."
            });
        }

        try {
            const user = await User.findById(loggedInUserId);

            if(!user){
                return res.status(404).json({msg: "User not found!"});
            }

            return res.status(200).json({ msg: "Profile found!", userFound: user });
        } catch (error) {
            return res.status(500).json({ msg: 'Error searching for profile', error: error.message });
        }
    },

    // @desc atualizar dados de usuário
    async updateProfile(req, res, next) {
        try {
            const loggedInUserId = req.userId;

            if(!loggedInUserId){
                return res.status(403).json({
                    error: "Access denied. You are not logged in."
                });
            }

            const changingAttribute = req.body;

            const changingUser = await User.findById(loggedInUserId);


            if (!changingUser) {
                const error = new Error('User not found!');
                error.status = 404;
                return next(error);
            }

            Object.assign(changingUser, changingAttribute);

            await changingUser.save();

            return res.status(200).json({ msg: 'Attribute changed succesfully', changedUser: changingUser });
        } catch (error) {
            return res.status(500).json({ msg: 'Server Error', errorMsg: error });
        }
    },


    //deletar usuário
    async deleteUser(req, res, next) {
        try {
            const loggedInUserId = req.userId;

            if(!loggedInUserId){
                return res.status(403).json({error: "Access denied. You are not logged in."});
            }

            const deletingUser = await User.findById(loggedInUserId);

            if (!deletingUser) {
                const error = new Error('User not found!');
                error.status = 404;
                return next(error);
            }

            await deletingUser.deleteOne({id: loggedInUserId});

            return res.status(200).json({ msg: 'User deleted with success', deletedUser: deletingUser });
        } catch (error) {
            return res.status(500).json({ msg: 'Server Error', errorMsg: error });
        }
    }
}