

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./admin.css";

const API_URL = "http://localhost:8000";

function AdminBookings({ token, onLogout }) {
  const [bookings, setBookings] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", phone: "", car: "", date: "", time: "" });

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

  const handleEdit = (booking) => {
    setEditId(booking._id);
    setEditForm({
      name: booking.name,
      phone: booking.phone,
      car: booking.car,
      date: booking.date,
      time: booking.time,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${API_URL}/bookings/${editId}`, editForm, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEditId(null);
    fetchBookings();
  };

  const handleCancelEdit = () => {
    setEditId(null);
  };

  return (
    <div className="admin-bookings">
      <h2>Admin - Bookings</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center' }}>
        {bookings.map((b) => (
          <div key={b._id} className="booking-card">
            {editId === b._id ? (
              <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input name="name" value={editForm.name} onChange={handleEditChange} required />
                <input name="phone" value={editForm.phone} onChange={handleEditChange} required />
                <input name="car" value={editForm.car} onChange={handleEditChange} required />
                <input name="date" type="date" value={editForm.date} onChange={handleEditChange} required />
                <input name="time" type="time" value={editForm.time} onChange={handleEditChange} required />
                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                  <button type="submit">Lưu</button>
                  <button type="button" onClick={handleCancelEdit} style={{ background: '#757575' }}>Hủy</button>
                </div>
              </form>
            ) : (
              <>
                <div><b>Khách:</b> {b.name}</div>
                <div><b>Điện thoại:</b> {b.phone}</div>
                <div><b>Xe:</b> {b.car}</div>
                <div><b>Ngày:</b> {b.date}</div>
                <div><b>Giờ:</b> {b.time}</div>
                <button className="edit-btn" onClick={() => handleEdit(b)} style={{ marginTop: 10 }}>Edit</button>
              </>
            )}
          </div>
        ))}
      </div>
      <button className="logout-btn-fixed" onClick={onLogout}>Logout</button>
    </div>
  );
}

export default AdminBookings;
