const mongoose = require('mongoose');

const connectToMongoDb = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Succesfully Connected to MongoDb!');
} 

module.exports = connectToMongoDb;
