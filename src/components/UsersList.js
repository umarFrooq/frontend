import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = ({ onEditUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://umarfarooq234.ddns.net/api/users?page=${page}&limit=3&search=${search}`
      );
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://umarfarooq234.ddns.net/api/users/${id}`);
      fetchData(); // Refresh the user list
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={handleSearch}
      />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="alert error">Error: {error}</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td className="actions">
                    <button
                      className="edit"
                      onClick={() => onEditUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;