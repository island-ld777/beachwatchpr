const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const reportsRoutes = require('./routes/reports');
const errorHandler = require('./middleware/errorHandler');
const db = require('./db/index');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
let corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? ['http://localhost', 'http://localhost:80']
        : ['http://localhost:5173'],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use('/api/reports', reportsRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(errorHandler);

db.connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });