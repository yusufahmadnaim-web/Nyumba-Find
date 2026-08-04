import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { register } from "../services/auth";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await register(formData);

      toast.success("🎉 Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error(error);

      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-10 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Create Account
        </h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-4 mb-4 rounded-lg bg-gray-800 text-white outline-none"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-4 mb-4 rounded-lg bg-gray-800 text-white outline-none"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-4 mb-6 rounded-lg bg-gray-800 text-white outline-none"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-lg font-bold text-white transition disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;