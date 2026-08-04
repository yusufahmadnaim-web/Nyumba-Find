import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    total_users: 0,
    total_properties: 0,
    total_images: 0,
    total_favorites: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(res.data.statistics);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load admin dashboard.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white text-2xl">
        Loading Admin Dashboard...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#050816] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold mb-3">
          Admin Dashboard 👑
        </h1>

        <p className="text-gray-400 mb-8">
          Monitor the entire NyumbaFind platform.
        </p>

        <Link
          to="/admin/users"
          className="inline-block mb-10 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold transition"
        >
          Manage Users →
        </Link>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-[#111827] rounded-2xl p-8">
            <p className="text-gray-400">Users</p>
            <h2 className="text-5xl font-bold mt-4 text-green-400">
              {stats.total_users}
            </h2>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8">
            <p className="text-gray-400">Properties</p>
            <h2 className="text-5xl font-bold mt-4 text-blue-400">
              {stats.total_properties}
            </h2>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8">
            <p className="text-gray-400">Images</p>
            <h2 className="text-5xl font-bold mt-4 text-purple-400">
              {stats.total_images}
            </h2>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8">
            <p className="text-gray-400">Favorites</p>
            <h2 className="text-5xl font-bold mt-4 text-red-400">
              {stats.total_favorites}
            </h2>
          </div>

        </div>

      </div>
    </section>
  );
}

export default AdminDashboard;