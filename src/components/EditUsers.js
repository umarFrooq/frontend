import React, { useState, useEffect } from "react";
import axios from "axios";

const EditUser = ({ user, onUserUpdated, onCancel }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://umarfarooq234.ddns.net/api/users/${user._id}`,
        { name, email, address }
      );
      setSuccess(true);
      setError(null);
      onUserUpdated(); // Refresh the user list
    } catch (err) {
      setError("Failed to update user");
      setSuccess(false);
    }
  }; 

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button type="submit">Update User</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
      {success && <p className="alert success">User updated successfully!</p>}
      {error && <p className="alert error">{error}</p>}
    </div>
  );
};

export default EditUser;