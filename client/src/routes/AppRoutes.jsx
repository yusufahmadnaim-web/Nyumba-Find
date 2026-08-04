import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Properties from "../pages/Properties";
import PropertyDetails from "../pages/PropertyDetails";
import Favorites from "../pages/Favorites";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import CreateProperty from "../pages/CreateProperty";
import EditProperty from "../pages/EditProperty";
import NotFound from "../pages/NotFound";
import AdminDashboard from "../pages/AdminDashboard";

import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/properties" element={<Properties />} />

      <Route
        path="/properties/:id"
        element={<PropertyDetails />}
      />


      <Route
        path="/admin"
        element={
         <ProtectedRoute>
         <AdminDashboard />
         </ProtectedRoute>
  }
/>



      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-property"
        element={
          <ProtectedRoute>
            <CreateProperty />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-property/:id"
        element={
          <ProtectedRoute>
            <EditProperty />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;