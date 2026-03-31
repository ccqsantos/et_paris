import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: console.log
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Authentication successful');
    return sequelize;
  } catch (error) {
    console.error('Not possible to connect: ', error);
    throw error;
  }
};

export default sequelize;