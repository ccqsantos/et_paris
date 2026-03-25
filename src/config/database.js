import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '../../.env');

dotenv.config({ path: envPath });

const dburl = process.env.DATABASE_URL;

if (!dburl) {
    console.error('DATABASE_URL environment variable is not defined');
    console.error('Looking for .env path at ', envPath);
    process.exit(1);
}

const sequelize = new Sequelize(dburl);

try{
    await sequelize.authenticate();
    console.log('Authentication succesful');
}catch(error){
    console.log('Not possible to connect: ', error);
}

export default sequelize;