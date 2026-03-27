import userModel from '../models/userModel.js';

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

    // @desc atualizar dados de usuário
    async updateUserData(req, res, next){
        try{
            const id = req.params;

            const changingAttribute = req.body;

            const changingUser = await userModel.findByPk(id);

            if(!changingUser){
                const error = new Error('User not found!');
                error.status = 404;
                return next(error);
            }

            await changingUser.update(changingAttribute);

            return res.status(200).json({msg: 'Attribute changed succesfully', changedUser: changingUser});
        }catch(error){
            return res.status(500).json({msg: 'Server Error', errorMsg: error});
        }
    },


    //deletar usuário
    async deleteUser(req, res, next) {
        try{
            const deletingId = req.params;

            const deletingUser = await userModel.findByPk(deletingId);

            if(!deletingUser){
                const error = new Error('User not found!');
                error.status = 404;
                return next(error);
            }

            await deletingUser.destroy({
                where: {id: deletingId}
            });

            return res.status(200).json({msg: 'User deleted with success', changedUser: deletingUser});
        }catch(error){
            return res.status(500).json({msg: 'Server Error', errorMsg: error});
        }
    }
}