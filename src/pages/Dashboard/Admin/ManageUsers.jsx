import React, { useState, useEffect } from "react";
import Table from "../../../components/Table";

const ManageUsers = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  // For now: Dummy data (replace with API later)
  useEffect(() => {
    const dummyUsers = [
      { name: "Joy Chanda", email: "joy@example.com", role: "Admin" },
      { name: "Alex Doe", email: "alex@example.com", role: "User" },
      { name: "Sarah Khan", email: "sarah@example.com", role: "User" },
    ];
    setUsers(dummyUsers);
  }, []);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Manage Users</h1>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 rounded mb-4 w-64"
      />

      {/* Users Table */}
      <Table
        columns={["Name", "Email", "Role", "Actions"]}
        data={filteredUsers}
      />
    </div>
  );
};

export default ManageUsers;
