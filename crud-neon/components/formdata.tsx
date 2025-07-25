"use client";

import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type RecordType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  createdAt: string;
};

export default function DataTable({records}: { records: RecordType[] }) {
  // const [records, setRecords] = useState<RecordType[]>([]);

  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
    createdAt: "",
  });

  // Fetch records from API
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch("/api/record");
  //     const data = await res.json();
  //     setRecords(data);
  //   };
  //   fetchData();
  // }, []);

  const handleEdit = async (id: string) => {
    // alert(`Edit record with ID: ${id}`);
    try {
      const res = await fetch(`/api/record/${id}`);
      // const data = await res.json();
      const data = await res.json();

      if (res.ok) {
        setForm(data.data);
        alert(`Fetched record: ${JSON.stringify(data.data)}`);
      } else {
        alert(`Failed to fetch record: ${data.message}`);
      }
    } catch (error) {
      console.error("Error fetching record:", error);
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

  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    await fetch(`/api/record/${form.id}` , {
      method : "PUT",
      body: JSON.stringify(form),
    }).then(async (res) => {
      setForm({
        id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        message: "",
        createdAt: "",
      });
      const result = await res.json()
      alert(result.message);
      return result;
    }).catch((err) => {
      console.error("Error updating record:", err);
      alert("Error updating record");
    });
  };

  return (
    <>
      {/* {form.id && JSON.stringify(form)} */}

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
                    {/* <button
                      onClick={() => handleEdit(record.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button> */}
                    <Dialog>
                      <DialogTrigger
                        onClick={() => handleEdit(record.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </DialogTrigger>

                      <DialogContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Full Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={form.name}
                              onChange={handleChange}
                              placeholder="Enter your full name"
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={form.email}
                              onChange={handleChange}
                              placeholder="example@mail.com"
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="phone"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={form.phone}
                              onChange={handleChange}
                              placeholder="03XX-XXXXXXX"
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="address"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Address
                            </label>
                            <input
                              type="text"
                              id="address"
                              name="address"
                              value={form.address}
                              onChange={handleChange}
                              placeholder="Street, City, ZIP"
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="message"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Message
                            </label>
                            <textarea
                              id="message"
                              name="message"
                              rows={4}
                              value={form.message}
                              onChange={handleChange}
                              placeholder="Type your message here..."
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                              required
                            ></textarea>
                          </div>

                          <div>
                            <button
                              type="submit"
                              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-300"
                            >
                              Update Message
                            </button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
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
  
    </>
  );
}