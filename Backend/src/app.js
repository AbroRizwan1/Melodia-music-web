const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const musicRouter = require("./routes/music.route");
const albumRouter = require("./routes/album.route");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://melodia-music-web.vercel.app",
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/music", musicRouter);
app.use("/api/albums", albumRouter);

module.exports = app;
