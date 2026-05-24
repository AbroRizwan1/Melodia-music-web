require("dotenv").config();
const mongoose = require("mongoose");

let isConnected = false;

async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) return;
  
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log("DB connected successfully");
  } catch (error) {
    isConnected = false;
    console.log("not Connected", error.message);
  }
}

module.exports = connectDB;