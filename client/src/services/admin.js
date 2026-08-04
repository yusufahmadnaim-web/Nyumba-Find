import api from "./api";

export const getDashboardStats = (token) => {
  return api.get("/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllUsers = (token) => {
  return api.get("/admin/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserRole = (userId, role, token) => {
  return api.patch(
    `/admin/users/${userId}`,
    { role },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteUser = (userId, token) => {
  return api.delete(`/admin/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};