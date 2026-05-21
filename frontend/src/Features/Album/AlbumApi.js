// src/features/album/album.api.js

import api from "../../services/axios";

export const createAlbum = (data) => {
  return api.post("/albums", data);
};

export const updateAlbum = (id, data) => {
  return api.put(`/albums/${id}`, data);
};

export const deleteAlbum = (id) => {
  return api.delete(`/albums/${id}`);
};

export const getAlbums = () => {
  return api.get("/albums/me");
};

// export const getMusic = () => {
//   return api.get("/music/me");
// };
