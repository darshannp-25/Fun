require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Connect Database
// We will call connectDB() when we define it, or just do it here.
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const db = process.env.MONGO_URI || 'mongodb://localhost:27017/fullstackfun';

const connect = async () => {
    try {
        await mongoose.connect(db);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('Local MongoDB connection failed:', err.message);
        console.log('Attempting to start In-Memory MongoDB...');
        try {
            const mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            await mongoose.connect(uri);
            console.log('Connected to In-Memory MongoDB at ' + uri);
        } catch (innerErr) {
            console.error('In-Memory MongoDB failed:', innerErr);
            setTimeout(connect, 5000);
        }
    }
};
connect();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
