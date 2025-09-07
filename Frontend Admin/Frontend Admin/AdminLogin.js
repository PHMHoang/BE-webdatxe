import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000";

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${API_URL}/admin/login`, { username, password });
      onLogin(res.data.access_token);
    } catch (err) {
      setError("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", fontFamily: "sans-serif" }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

export default AdminLogin;
