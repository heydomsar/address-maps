import React, { useState, Fragment } from "react";
import AddAddressForm from "./components/AddAddressForm";
import EditAddressForm from "./components/EditAddressForm";
import AddressTable from "./components/AddressTable";

const App = () => {
  // Data
  const usersData = [
    { id: 1, name: "Tania", username: "floppydiskette" },
    { id: 2, name: "Craig", username: "siliconeidolon" },
    { id: 3, name: "Ben", username: "benisphere" },
  ];

  const initialFormState = { id: null, name: "", username: "" };

  // Setting state
  const [users, setUsers] = useState(usersData);
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  // CRUD operations
  const addUser = user => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const deleteUser = id => {
    setEditing(false);

    setUsers(users.filter(user => user.id !== id));
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);

    setUsers(users.map(user => (user.id === id ? updatedUser : user)));
  };

  const editRow = user => {
    setEditing(true);

    setCurrentUser({ id: user.id, name: user.name, username: user.username });
  };

  return (
    <div className="container">
      <h1>Customer Address Book</h1>
      <div className="flex-row">
        <div className="flex-small">
          {editing ? (
            <Fragment>
              <h2>Edit Address</h2>
              <EditAddressForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </Fragment>
          ) : (
            <Fragment>
              <h2>Add Address</h2>
              <AddAddressForm addUser={addUser} />
            </Fragment>
          )}
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <AddressTable
            users={users}
            editRow={editRow}
            deleteUser={deleteUser}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
