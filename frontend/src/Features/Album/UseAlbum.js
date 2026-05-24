import { useEffect, useState } from "react";

import {
  createAlbum,
  updateAlbum,
  deleteAlbum,
  getAlbums,
} from "./AlbumApi";

import { validateAlbum } from "./AlbumValidation";

export function useAlbum(initialAlbumForm, showToast) {
  const [albumForm, setAlbumForm] = useState(initialAlbumForm);

  const [albumErrors, setAlbumErrors] = useState({});

  const [music, setMusic] = useState([]);

  const [albums, setAlbums] = useState([]);

  const [editAlbum, setEditAlbum] = useState(null);

  function toggleId(id) {
    setAlbumForm((prev) => {
      const alreadySelected = prev.musics.includes(id);

      return {
        ...prev,
        musics: alreadySelected
          ? prev.musics.filter((m) => m !== id)
          : [...prev.musics, id],
      };
    });
  }

  async function handleAlbumSubmit() {
    const errs = validateAlbum(albumForm);

    setAlbumErrors(errs);

    if (Object.keys(errs).length > 0) return;

    try {
      let res;

      if (editAlbum?._id) {
        res = await updateAlbum(editAlbum._id, albumForm);

        showToast("Album Updated!");

        setEditAlbum(null);
      } else {
        res = await createAlbum(albumForm);

        showToast("Album Created!");
      }

      setAlbumForm(initialAlbumForm);

      await fetchAlbum();
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";

      console.log(err);
      console.log(err.response);
      console.log(err.response?.data);

      showToast(message);
    }
  }

  async function fetchAlbum() {
    try {
      const res = await getAlbums();

      setAlbums(res.data.albums || []);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  }

  async function handleDelete(id) {
    try {
      const res = await deleteAlbum(id);

      fetchAlbum();

      return res.data;
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  }

  function handleEdit(album) {
    setEditAlbum(album);

    setAlbumForm({
      title: album.title,
      musics: album.musics.map((m) => m._id || m),
    });
  }
  useEffect(() => {
    fetchAlbum();
    // fetchMusic();
  }, []);

  return {
    albumForm,
    setAlbumForm,
    albumErrors,
    // music,
    albums,
    editAlbum,
    setAlbumErrors,
    toggleId,
    handleAlbumSubmit,
    handleDelete,
    handleEdit,
  };
}
