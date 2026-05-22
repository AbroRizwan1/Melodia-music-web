const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const musicRouter = require("./routes/music.route");
const albumRouter = require("./routes/album.route");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cookieParser());

// ✅ Sirf yeh rakho — manual header wala hatao
app.use(cors({
  origin: [
    "https://melodia-music-web-v9jq.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/music", musicRouter);
app.use("/api/albums", albumRouter);

module.exports = app;