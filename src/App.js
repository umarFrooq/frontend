import React, { useState } from "react";
import UserList from "./components/UsersList";
import AddUser from "./components/AddUsers";
import EditUser from "./components/EditUsers";
import "./index";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleUserAdded = () => {
    setRefresh(!refresh); // Refresh the user list
  };

  const handleEditUser = (user) => {
    setEditingUser(user); // Set the user to edit
  };

  const handleUserUpdated = () => {
    setRefresh(!refresh); // Refresh the user list
    setEditingUser(null); // Exit edit mode
  };

  const handleCancelEdit = () => {
    setEditingUser(null); // Exit edit mode
  };

  return (
    <div className="container">
      <h1>User Management System</h1>
      {editingUser ? (
        <EditUser
          user={editingUser}
          onUserUpdated={handleUserUpdated}
          onCancel={handleCancelEdit}
        />
      ) : (
        <AddUser onUserAdded={handleUserAdded} />
      )}
      <UserList onEditUser={handleEditUser} key={refresh} />
    </div>
  );
}

export default App;