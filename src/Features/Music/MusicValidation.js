// src/features/music/music.validation.js

export function validateMusic(musicForm, editMusic) {
  const errs = {};

  if (!musicForm.title.trim()) {
    errs.title = "Title is required.";
  } else if (musicForm.title.trim().length < 2) {
    errs.title = "Title must be at least 2 characters.";
  }

  if (!editMusic && !musicForm.image) {
    errs.image = "Cover image is required.";
  }

  if (!editMusic && !musicForm.music) {
    errs.music = "Music file is required.";
  }

  return errs;
}
