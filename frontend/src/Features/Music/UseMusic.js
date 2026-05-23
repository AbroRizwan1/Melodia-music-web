import { useEffect, useState } from "react";
import { createMusic, updateMusic, deleteMusic, getMusic } from "./MusicApi";
import { validateMusic } from "./MusicValidation";

export function useMusic(initialMusicForm, showToast) {
  const [musicForm, setMusicForm] = useState(initialMusicForm);
  const [musicErrors, setMusicErrors] = useState({});
  const [editMusic, setEditMusic] = useState(null);
  const [music, setMusic] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // ✅ Image change handler
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMusicErrors((err) => ({ ...err, image: "Only image files allowed." }));
      return;
    }

    setMusicForm((f) => ({
      ...f,
      image: file,
      imagePreview: URL.createObjectURL(file),
    }));

    setMusicErrors((err) => ({ ...err, image: "" }));
  }

  // ✅ Music file change handler
  function handleMusicFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("audio/")) {
      setMusicErrors((err) => ({ ...err, music: "Only audio files allowed." }));
      return;
    }

    setMusicForm((f) => ({ ...f, music: file, musicName: file.name }));
    setMusicErrors((err) => ({ ...err, music: "" }));
  }

  // ✅ Submit handler — duplicate hata diya
  async function handleMusicSubmit() {
    const errs = validateMusic(musicForm, editMusic);
    setMusicErrors(errs);

    if (Object.keys(errs).length) return;
    if (isUploading) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("title", musicForm.title);

      if (musicForm.image) formData.append("image", musicForm.image);
      if (musicForm.music) formData.append("music", musicForm.music);

      let res;

      if (editMusic?._id) {
        res = await updateMusic(editMusic._id, formData);
        setMusic((prev) =>
          prev.map((m) => m._id === editMusic._id ? res.data.updatedMusic : m)
        );
        showToast("Updated successfully!");
        setEditMusic(null);
      } else {
        res = await createMusic(formData);
        setMusic((prev) => [...prev, res.data.music]);
        showToast("Added successfully!");
      }

      setMusicForm(initialMusicForm);
      setMusicErrors({});
      return res.data;
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setIsUploading(false);
    }
  }

  function handleEdit(song) {
    setEditMusic(song);
    setMusicForm({
      _id: song._id,
      title: song.title || "",
      image: null,
      imagePreview: song.image || "",
      music: null,
      musicName: song.uri || "",
    });
  }

  async function handleDelete(id) {
    try {
      const res = await deleteMusic(id);
      setMusic((prev) => prev.filter((m) => m._id !== id));
      return res.data;
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  }

  async function fetchMusic() {
    try {
      const res = await getMusic();
      setMusic(res.data.music || []);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  }

  useEffect(() => {
    fetchMusic();
  }, []);

  return {
    musicForm,
    setMusicForm,
    musicErrors,
    setMusicErrors,
    editMusic,
    music,
    handleImageChange,    
    handleMusicFileChange,
    handleMusicSubmit,  
    handleEdit,
    isUploading,
    handleDelete,
  };
}