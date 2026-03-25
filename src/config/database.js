import { Sequelize } from "sequelize";
import path from "node:path";
import fs from 'node:fs';

const sequelize = new Sequelize('postgresql://postgres:antimatter@localhost:5432/et_paris?schema=public');

try{
    await sequelize.authenticate();
    console.log('Authentication succesful');
}catch(error){
    console.log('Not possible to connect: ', error);
}finally{
    sequelize.close();
}

export default sequelize;