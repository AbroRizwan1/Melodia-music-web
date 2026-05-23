require("dotenv").config();
const userModel = require("../models/user.model");
const musicModel = require("../models/music.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const albumModel = require("../models/album.model");
const connectDB = require("../db/db");

async function registerUser(req, res) {
  await connectDB();
  const { username, email, password, role = "user" } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    res.status(400).json({
      message: "User already exist",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
    role,
  });
  // create JWT TOKEN
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  // save token to cookies
  const result = res.cookie("token", token, {
    httpOnly: true,
    secure: true, // local dev
    sameSite: "None",
  });

  res.status(201).json({
    message: "User register successfully",
    user: {
      id: user._id,
      username,
      email,
      password: hash,
      role: user.role,
    },
  });
}

async function loginUser(req, res) {
  await connectDB();
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  // compare password to data base
  const isPasswordValide = await bcrypt.compare(password, user.password);

  if (!isPasswordValide) {
    return res.status(401).json({
      message: "Invalid Credentials",
    });
  }

  // create token
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      username: user.usernmae,
      email: user.email,
      password: user.password,
      role: user.role,
    },
  });
}

async function logoutUser(req, res) {
  await connectDB();
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  res.status(200).json({
    message: "logged out successfully",
  });
}
async function currentUser(req, res) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id).select("username role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

module.exports = { registerUser, loginUser, logoutUser, currentUser };
