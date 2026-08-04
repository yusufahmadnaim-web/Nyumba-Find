import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../services/admin";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await getAllUsers(token);
      setUsers(res.data.users);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRoleChange(userId, currentRole) {
    const newRole = currentRole === "admin" ? "user" : "admin";

    try {
      await updateUserRole(userId, newRole, token);

      toast.success("User role updated.");

      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Unable to update role.");
    }
  }

  async function handleDelete(userId) {
    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteUser(userId, token);

      toast.success("User deleted.");

      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete user.");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#050816] text-white text-2xl">
        Loading users...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#050816] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold mb-8">
          User Management
        </h1>

        <div className="overflow-x-auto">

          <table className="w-full bg-[#111827] rounded-xl overflow-hidden">

            <thead className="bg-[#1F2937]">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Username</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-700"
                >
                  <td className="p-4">{user.id}</td>

                  <td className="p-4">{user.username}</td>

                  <td className="p-4">{user.email}</td>

                  <td className="p-4 capitalize">
                    {user.role}
                  </td>

                  <td className="p-4 flex gap-3 justify-center">

                    <button
                      onClick={() =>
                        handleRoleChange(
                          user.id,
                          user.role
                        )
                      }
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                    >
                      {user.role === "admin"
                        ? "Demote"
                        : "Promote"}
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(user.id)
                      }
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>
    </section>
  );
}

export default AdminUsers;