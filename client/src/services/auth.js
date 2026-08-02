import api from "./api";

export const register = (userData) => {
  return api.post("/auth/register", userData);
};

export const login = (userData) => {
  return api.post("/auth/login", userData);
};

export const getCurrentUser = (token) => {
  return api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};