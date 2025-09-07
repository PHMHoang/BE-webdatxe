
import React, { useState } from "react";
import axios from "axios";
import "./admin.css";

const API_URL = "http://localhost:8000";

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);
      const res = await axios.post(`${API_URL}/admin/login`, params);
      onLogin(res.data.access_token);
    } catch (err) {
      setError("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default AdminLogin;
