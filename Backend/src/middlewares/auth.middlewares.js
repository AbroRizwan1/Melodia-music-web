require("dotenv").config();
const jwt = require("jsonwebtoken");

async function authArtist(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "token not found",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "artist") {
      return res.status(401).json({
        message: "You don't have access",
      });
    }

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "unauthorized",
    });
  }
}

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "unauthorized",
    });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // if (decoded.role !== "artist") {
    //   return res.status(403).json({
    //     message: "You dont have access",
    //   });
    // }
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "unauthorized",
    });
  }
}

module.exports = { authArtist, authUser };
