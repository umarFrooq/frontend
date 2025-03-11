import React, { useState } from "react";
import axios from "axios";

const AddUser = ({ onUserAdded }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://umarfarooq234.ddns.net/api/users", {
        name,
        email,
        address,
      });
      setSuccess(true);
      setError(null);
      setName("");
      setEmail("");
      setAddress("");
      onUserAdded(); // Refresh the user list
    } catch (err) {
      setError("Failed to add user");
      setSuccess(false);
    }
  };

  return (
    <div>
      <h2>Add New User</h2>
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
        <button type="submit">Add User</button>
      </form>
      {success && <p className="alert success">User added successfully!</p>}
      {error && <p className="alert error">{error}</p>}
    </div>
  );
};

export default AddUser;