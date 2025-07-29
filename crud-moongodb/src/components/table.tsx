// app/components/RecordTable.tsx
"use client";

import React, { useEffect, useState } from "react";

type RecordType = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  createdAt: string;
};

const RecordTable = () => {

    const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
    createdAt: "",
  });

  const [records, setRecords] = useState<RecordType[]>([]);

  useEffect(() => {
    const fetchRecords = async () => {
      const res = await fetch("/api/record");
      const data = await res.json();
      setRecords(data);
    };

    fetchRecords();
  }, []);

const handleDelete = async (_id: string) => {
  const confirmed = confirm("Are you sure you want to delete this record?");
  if (!confirmed) return;
  const id = _id;
  try {
    const res = await fetch(`/api/record/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message || "Record deleted successfully");

      // Remove deleted record from state
      setRecords((prev) => prev.filter((record) => record._id !== _id));
    } else {
      alert(`Failed to delete record: ${data.message}`);
    }
  } catch (error) {
    console.error("Error deleting record:", error);
    alert("Something went wrong while deleting the record.");
  }
};


    function handleEdit(_id: string): void {
       const confirmed = confirm("Are you sure you want to Update this record?:");
  if (!confirmed) return;
    }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Records</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Address</th>
              <th className="py-2 px-4 border">Message</th>
              <th className="py-2 px-4 border">Created</th>
               <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{record.name}</td>
                <td className="py-2 px-4 border">{record.email}</td>
                <td className="py-2 px-4 border">{record.phone}</td>
                <td className="py-2 px-4 border">{record.address}</td>
                <td className="py-2 px-4 border">{record.message}</td>
                <td className="py-2 px-4 border">{new Date(record.createdAt).toLocaleString()}</td>
                <td>
                    <button 
                     onClick={() => handleDelete(
                      record._id)}
                    className="bg-red-500 text-white px-3 py-2">Delete</button>
                    <button 
                     onClick={() => handleEdit(record._id)}
                    className="bg-blue-500 text-white px-3 py-2">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecordTable;
