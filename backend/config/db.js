const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://varamban2007_db_user:gYzA50S6OcaLFQP7@mern-stack.itachtr.mongodb.net/', );
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
