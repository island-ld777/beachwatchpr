const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432,
});

const connectDB = async () => {
    let client;
    try {
        client = await pool.connect();
        console.log('Connected to PostgreSQL database');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    } finally {
        if (client) {
            client.release();
        }
    }
};

module.exports = {
    pool,
    connectDB,
};