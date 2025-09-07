import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000";

function AdminBookings({ token, onLogout }) {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await axios.get(`${API_URL}/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/bookings/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchBookings();
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Admin - Bookings</h2>
      <button onClick={onLogout} style={{ float: "right" }}>Logout</button>
      <ul>
        {bookings.map((b) => (
          <li key={b._id}>
            {b.name} | {b.phone} | {b.car} | {b.date} {b.time}
            <button onClick={() => handleDelete(b._id)} style={{ marginLeft: 8 }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminBookings;
