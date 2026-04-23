import { stringify } from 'node:querystring';
import userModel from '../models/userModel.js';

export const userController = {

    //funcoes do controller::::(mesmas funcoes do route [CRUD])

    // @desc get all users
    async getProfile(req, res, next) {
        const loggedInUserName = req.user.name;
        const requestedName = req.params.name;

        if(loggedInUserName !== requestedName){
            return res.status(403).json({
                error: "Access denied. You can only access your own profile."
            });
        }

        try {
            const user = await userModel.findOne({ where: { name: requestedName } });

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
            const loggedInUserName = req.user.name;
            const requestedName = req.params.name;

            if(loggedInUserName !== requestedName){
                return res.status(403).json({
                    error: "Access denied. You can only edit your own profile."
                });
            }

            const changingAttribute = req.body;

            const changingUser = await userModel.findOne({where: {name: requestedName}});


            if (!changingUser) {
                const error = new Error('User not found!');
                error.status = 404;
                return next(error);
            }

            await changingUser.update(changingAttribute);

            return res.status(200).json({ msg: 'Attribute changed succesfully', changedUser: changingUser });
        } catch (error) {
            return res.status(500).json({ msg: 'Server Error', errorMsg: error });
        }
    },


    //deletar usuário
    async deleteUser(req, res, next) {
        try {
            const deletingName= req.params.name;
            const loggedInName = req.user.name;

            if(deletingName !== loggedInName){
                return res.status(403).json({error: "Access denied. You can only delete your own profile."});
            }

            const deletingUser = await userModel.findOne({where: {name: deletingName}});

            if (!deletingUser) {
                const error = new Error('User not found!');
                error.status = 404;
                return next(error);
            }

            await deletingUser.destroy({
                where: { name: deletingName }
            });

            return res.status(200).json({ msg: 'User deleted with success', deletedUser: deletingUser });
        } catch (error) {
            return res.status(500).json({ msg: 'Server Error', errorMsg: error });
        }
    }
}