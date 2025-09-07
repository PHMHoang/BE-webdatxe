import React, { useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminBookings from "./AdminBookings";

function AdminApp() {
  const [token, setToken] = useState(localStorage.getItem("admin_token") || "");

  const handleLogin = (tk) => {
    setToken(tk);
    localStorage.setItem("admin_token", tk);
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("admin_token");
  };

  if (!token) return <AdminLogin onLogin={handleLogin} />;
  return <AdminBookings token={token} onLogout={handleLogout} />;
}

export default AdminApp;
