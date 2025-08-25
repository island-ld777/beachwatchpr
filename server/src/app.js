const express = require('express');
const dotenv = require('dotenv');
const reportsRoutes = require('./routes/reports');
const errorHandler = require('./middleware/errorHandler');
const db = require('./db/index');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/reports', reportsRoutes);
app.use(errorHandler);

db.connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });