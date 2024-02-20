const mongoose = require('mongoose');


async function connectDB(uri) {
    try {
        await mongoose.connect(uri);
        console.log('Successfully connected to database');
    } catch (error) {
        console.error('Error connecting to database: ', error);
        process.exit(1);
    }
}

module.exports = connectDB;