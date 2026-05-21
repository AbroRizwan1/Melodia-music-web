// src/features/album/album.validation.js

export function validateAlbum(albumForm) {
  const errs = {};

  if (!albumForm.title.trim()) {
    errs.title = "Album title is required.";
  } else if (albumForm.title.trim().length < 2) {
    errs.title = "Title must be at least 2 characters.";
  }

  if (!albumForm.musics.length) {
    errs.musicIds = "Select at least one track.";
  }

  return errs;
}
