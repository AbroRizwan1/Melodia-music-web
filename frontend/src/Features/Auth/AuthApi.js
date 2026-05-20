import api from "../../services/axios";

export const loginUser = (data) => {
  return api.post("/auth/login", data, {
    withCredentials: true,
  });
};

export const registerUser = (data) => {
  return api.post("/auth/register", data, {
    withCredentials: true,
  });
};
