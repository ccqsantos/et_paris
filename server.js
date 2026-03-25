import express from 'express';
const port = process.env.PORT || 8001;
import users from './src/routes/userRoute.js';
import errorHandler from './src/middlewares/errorHandler.js';
import logger from './src/middlewares/logger.js';

const app = express();

app.use(express.json());

//ErrorHandlerr
app.use(errorHandler);

//Logger universal
app.use(logger);

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res)=>{
    res.send('<span>Oieee</span>');
}); 

app.listen(port, ()=> console.log(`server running on port ${port}`));

app.use('/users', users);