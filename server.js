import express from 'express';
const port = process.env.PORT || 8001;
import sUsers from './src/routes/sequelizeUserRoutes.js';
import mUsers from './src/routes/mongooseUserRoutes.js';
import auth from './src/routes/authRoutes.js';
import errorHandler from './src/middlewares/errorHandler.js';
import logger from './src/middlewares/logger.js';
import { connectDB } from './src/config/database.js';
import { mongoConnectDB } from './src/config/mongodatabase.js'; 
import mongoose from 'mongoose';
import { type } from 'os';
import  { randomUUID } from 'crypto';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Logger universal
app.use(logger);

app.get('/', (req, res)=>{
    res.send('<span>Oieee :3</span>');
}); 

//app.use('/sequelize/users', sUsers);

app.use('/users', mUsers);

app.use('/auth', auth);


//ErrorHandlerr
app.use(errorHandler);


mongoConnectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
});