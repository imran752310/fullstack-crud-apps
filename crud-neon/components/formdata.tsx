"use client";

import React, { useEffect, useState } from "react";

type RecordType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  createdAt: string;
};

export default function DataTable() {
  const [records, setRecords] = useState<RecordType[]>([]);

  // Fetch records from API
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/record");
      const data = await res.json();
      setRecords(data);
    };
    fetchData();
  }, []);

  // Edit button handler
  const handleEdit = async (id: string) => {
    alert(`Edit record with ID: ${id}`);
    try {
      const res = await fetch(`/api/record/${id}`, {
        method: "PUT",
      });

      const data = await res.json();
      if (res.ok) {
        alert(`Record deleted: ${data.message}`);
        // Optionally: refresh list or remove item from local state
      } else {
        alert(`Failed to delete: ${data.message}`);
      }
    } catch (err) {
      alert("Error deleting record");
      console.error(err);
    }
  };

  // Delete button handler
  const handleDelete = async (id: string) => {
    const confirmed = confirm(
      `Are you sure you want to delete record ID: ${id}?`
    );
    if (confirmed) {
      alert(`Deleted record with ID: ${id}`);
      // TODO: call API to delete the record
    }

    try {
      const res = await fetch(`/api/record/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok) {
        alert(`Record deleted: ${data.message}`);
        // Optionally: refresh list or remove item from local state
      } else {
        alert(`Failed to delete: ${data.message}`);
      }
    } catch (err) {
      alert("Error deleting record");
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Record List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Message</th>
              <th className="border px-4 py-2">Created At</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id} className="text-center">
                <td className="border px-4 py-2">{record.name}</td>
                <td className="border px-4 py-2">{record.email}</td>
                <td className="border px-4 py-2">{record.phone}</td>
                <td className="border px-4 py-2">{record.address}</td>
                <td className="border px-4 py-2">{record.message}</td>
                <td className="border px-4 py-2">
                  {new Date(record.createdAt).toLocaleString()}
                </td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(record.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(record.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
