import express from 'express';
const port = process.env.PORT || 8001;
import users from './src/routes/userRoute.js';
import auth from './src/routes/authRoutes.js';
import errorHandler from './src/middlewares/errorHandler.js';
import logger from './src/middlewares/logger.js';
import { connectDB } from './src/config/database.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Logger universal
app.use(logger);

app.get('/', (req, res)=>{
    res.send('<span>Oieee :3</span>');
}); 

app.use('/users', users);

app.use('/auth', auth);

app.listen(port, ()=> console.log(`server running on port ${port}`));

//ErrorHandlerr
app.use(errorHandler);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
});