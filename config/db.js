const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(`MongoDB Connected`))
    .catch(err => console.log('Database connection error:', err));
};

module.exports = connectDB;