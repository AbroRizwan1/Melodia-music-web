const express = require("express");
const musicController = require("../controllers/music.controllers");
const authMiddleware = require("../middlewares/auth.middlewares");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

const router = express.Router();

router.post(
  "/upload",
  authMiddleware.authArtist,
  upload.fields([
    { name: "music", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  musicController.createMusic,
);

router.get("/", authMiddleware.authUser, musicController.getAllMusics);
router.get("/me", authMiddleware.authUser, musicController.getMyMusic);

router.delete("/:id", authMiddleware.authArtist, musicController.DeleteMusic);

router.put(
  "/:id",
  authMiddleware.authArtist,
  upload.fields([
    { name: "music", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  musicController.updateMusic,
);

module.exports = router;
