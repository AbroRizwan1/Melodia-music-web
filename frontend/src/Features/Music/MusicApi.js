// src/features/music/music.api.js

import api from "../../services/axios";

export const createMusic = (data) => {
  return api.post("/music/upload", data);
};

export const updateMusic = (id, data) => {
  return api.put(`/music/${id}`, data);
};

export const deleteMusic = (id) => {
  return api.delete(`/music/${id}`);
};

export const getMusic = () => {
  return api.get("music/me");
};
