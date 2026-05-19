const JWT = require("jsonwebtoken");
const albumModel = require("../models/album.model");

async function createAlbum(req, res) {
  const { title, musics } = req.body;

  if (!title) {
    console.log("fields are required");
  }

  const album = await albumModel.create({
    title,
    artist: req.user.id,
    musics: musics,
  });

  return res.status(201).json({
    message: "Album created Successfully",
    album: {
      id: album._id,
      title: album.title,
      artist: album.artist,
      musics: album.musics,
    },
  });
}

async function getAllAlbums(req, res) {
  const album = await albumModel
    .find()
    .populate("artist", "username email")
    .populate("musics", "title image");

  res.status(200).json({
    message: "Album fetched successfully ",
    album: album,
  });
}

async function getAlbumById(req, res) {
  const albumId = req.params.id;

  const album = await albumModel
    .findById(albumId)
    .populate("artist", "username email")
    .populate("musics");

  res.status(200).json({
    message: "Album Fetched Successfully",
    album: album,
  });
}

async function DeleteAlbum(req, res) {
  const id = req.params.id;

  await albumModel.findByIdAndDelete({
    _id: id,
    artist: req.user.id,
  });

  res.status(200).json({ message: "Album deleted" });
}

async function UpdateAlbum(req, res) {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      message: "Id not found",
    });
  }

  const { title, musics } = req.body;

  const albumUpdated = await albumModel.findOneAndUpdate(
    { _id: id, artist: req.user.id }, // 🔐 ownership check
    {
      ...(title && { title }),
      ...(musics && { musics }),
    },
    { returnDocument: "after" }, // 🔥 return updated doc
  );

  if (!albumUpdated) {
    return res.status(404).json({
      message: "Album not found or not authorized",
    });
  }

  res.status(200).json({
    message: "Album Updated",
    albumUpdated,
  });
}

async function getMyAlbum(req, res) {
  const albums = await albumModel
    .find({ artist: req.user.id })
    .populate("musics", "title image")
    .populate("artist", "username");

  res.status(200).json({
    message: "My albums fetched successfully",
    albums,
  });
}

module.exports = {
  createAlbum,
  getAllAlbums,
  DeleteAlbum,
  getMyAlbum,
  UpdateAlbum,
  getAlbumById,
};
