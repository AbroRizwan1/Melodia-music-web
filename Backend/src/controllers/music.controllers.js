const musicModel = require("../models/music.model");
const uploadFile = require("../services/storage.service");
const jwt = require("jsonwebtoken");
const { create } = require("../models/user.model");
const albumModel = require("../models/album.model");

async function createMusic(req, res) {
  try {
    const { title } = req.body;

    const musicFile = req.files?.music?.[0];
    const imageFile = req.files?.image?.[0];

    if (!title) {
      return res.status(400).json({ message: "Title required" });
    }

    if (!musicFile || !imageFile) {
      return res.status(400).json({ message: "Files are required" });
    }

    const musicUpload = await uploadFile(
      musicFile.buffer.toString("base64"),
      "music",
    );

    const imageUpload = await uploadFile(
      imageFile.buffer.toString("base64"),
      "image",
    );

    const music = await musicModel.create({
      title,
      uri: musicUpload.url,
      image: imageUpload.url,
      artist: req.user.id,
    });

    res.status(201).json({
      message: "Music created successfully",
      music,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Server error",
    });
  }
}

// ======For Home page
async function getAllMusics(req, res) {
  const musics = await musicModel
    .find()
    .limit(20)
    .populate("artist", "username email");

  res.status(200).json({
    message: "Musics fetched successfully",
    musics,
  });
}

async function getMyMusic(req, res) {
  const music = await musicModel.find({
    artist: req.user.id,
  });

  res.status(200).json({
    message: "My music fetched successfully",
    music,
  });
}

async function DeleteMusic(req, res) {
  try {
    const id = req.params.id;

    const deleted = await musicModel.findOneAndDelete({
      _id: id,
      artist: req.user.id, // 🔐 IMPORTANT SECURITY
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Music not found or unauthorized",
      });
    }

    res.status(200).json({
      message: "Music deleted",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function updateMusic(req, res) {
  try {
    const id = req.params.id;
    const { title } = req.body;

    let imageUrl;
    let musicUrl;

    if (req.files?.image?.[0]) {
      const imageUpload = await uploadFile(
        req.files.image[0].buffer.toString("base64"),
        "image",
      );
      imageUrl = imageUpload.url;
    }

    if (req.files?.music?.[0]) {
      const musicUpload = await uploadFile(
        req.files.music[0].buffer.toString("base64"),
        "music",
      );
      musicUrl = musicUpload.url;
    }

    const updatedMusic = await musicModel.findOneAndUpdate(
      { _id: id, artist: req.user.id },
      {
        ...(title && { title }),
        ...(imageUrl && { image: imageUrl }),
        ...(musicUrl && { uri: musicUrl }),
      },
      { returnDocument: "after" },
    );

    if (!updatedMusic) {
      return res
        .status(404)
        .json({ message: "Music not found or unauthorized" });
    }

    res.status(200).json({ message: "Music updated", updatedMusic });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
module.exports = {
  createMusic,
  getAllMusics,
  getMyMusic,
  DeleteMusic,
  updateMusic,
};
