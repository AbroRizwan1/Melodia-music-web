require("dotenv").config();
const mongoose = require("mongoose");

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("DB connected successfully");
  } catch (error) {
    console.log("not Connected", error.message);
  }
}

module.exports = connectDB;