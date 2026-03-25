import dotenv from 'dotenv';

dotenv.config({
    override: true,
    path: path.join(__dirname, '.env')
});
const { Pool, Client} = require('pg');

const port = process.env.PORT;
const dbHost = process.env.DB_HOST;
const apiKey = process.env.API_KEY;

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
});

(async () => {
    const client = await pool.connect();
    try{
        const {rows} = await client.query('SELECT User')
        const User = rows[0]['User']
        console.log(User);

    }catch(err){
        console.log(err);
    }finally{
        client.release();
    }
})();

