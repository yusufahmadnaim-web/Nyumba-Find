import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { login } from "../services/auth";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
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

      const response = await login(formData);

      // Save JWT token
      localStorage.setItem("token", response.data.access_token);

      // Save logged-in user
      setUser(response.data.user);

      toast.success("Login successful!");

      navigate("/");
    } catch (error) {
      console.error(error);

      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Invalid email or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex justify-center items-center px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-10 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-4 rounded-lg mb-5 bg-gray-800 text-white outline-none"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-4 rounded-lg mb-6 bg-gray-800 text-white outline-none"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 transition py-4 rounded-lg font-bold text-white disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;