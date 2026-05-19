const albumController = require("../controllers/album.Controllers");
const authMiddleware = require("../middlewares/auth.middlewares");
const express = require("express");

const router = express.Router();

const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/", authMiddleware.authArtist, albumController.createAlbum);
router.get("/", authMiddleware.authUser, albumController.getAllAlbums);
router.get("/me", authMiddleware.authArtist, albumController.getMyAlbum);

router.get("/:id", authMiddleware.authUser, albumController.getAlbumById);
router.delete("/:id", authMiddleware.authArtist, albumController.DeleteAlbum);
router.put(
  "/:id",
  upload.fields([
    { name: "music", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  authMiddleware.authArtist,
  albumController.UpdateAlbum,
);

module.exports = router;
