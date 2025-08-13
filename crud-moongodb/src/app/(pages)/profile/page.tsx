// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Profile = () => {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("/api/auth/profile"); // This endpoint reads token from cookies
//         setUser(res.data.user);
//       } catch (error) {
//         console.log("Error fetching user:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   if (!user) return <div>No user found. Please login.</div>;

//   return (
//     <div>
//       <h1>Profile</h1>
//       <p><strong>Name:</strong> {user.name}</p>
//       <p><strong>Email:</strong> {user.email}</p>
//     </div>
//   );
// };

// export default Profile;



"use client";
import Form from "@/components/form";
import LogoutButton from "@/components/Logout";
import RecordTable from "@/components/table";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaEye, FaLock } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { IoLockOpen } from "react-icons/io5";

  const Profile = () => {
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [showPass, setShowPass] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };




//   const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/profile"); // This endpoint reads token from cookies
        setUser(res.data.user);
      } catch (error) {
        console.log("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user) return <div>No user found. Please login.</div>;



  

  return (
    <>
    <div>
      <Link href="/Record">Record</Link>
<LogoutButton />
    </div>
    <main className="w-full h-screen flex justify-center items-center p-4">
         {/* <p><strong>Name:</strong> {user.name}</p>
       <p><strong>Email:</strong> {user.email}</p>
       <p><strong>Password:</strong> {user.current_password}</p> */}


      <div className="w-full sm:2/3 md:w-1/2 lg:w-1/3 p-8 rounded-lg  bg-black/80 shadow-xl space-y-3 flex flex-col justify-center items-center">
        <h1 className="text-white text-3xl font-bold">Update Profile</h1>

        <div className="flex w-full  items-center border border-white py-2 px-3 gap-2 rounded-full">
          <FiMail className="text-white" size={20} />
          <input
            id="name"
            type="text"
            value={user.name}
            onChange={handleChange}
            placeholder="Name"
            name="name"
            className="bg-transparent  outline-none text-white"
          />
        </div>
        <div className="flex w-full  items-center border border-white py-2 px-3 gap-2 rounded-full">
          <FiMail className="text-white" size={20} />
          <input
            id="email"
            type="text"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            name="email"
            className="bg-transparent  outline-none text-white"
          />
        </div>
        <div className="flex w-full  items-center justify-between border border-white py-2 px-3 gap-2 rounded-full">
          <div className="flex items-center gap-2">
            {showPass ? (
              <IoLockOpen className="text-white" size={20} />
            ) : (
              <FaLock className="text-white" size={20} />
            )}

            <input
              id="password"
              type={showPass ? "text" : "password"}
              value={user.current_password}
              onChange={handleChange}
              placeholder="Password"
              name="Current Password"
              className="bg-transparent  outline-none text-white"
            />
          </div>

          <button onClick={() => setShowPass(!showPass)}>
            <FaEye className="text-white" size={20} />
          </button>
        </div>

        <div className="flex w-full  items-center justify-between border border-white py-2 px-3 gap-2 rounded-full">
          <div className="flex items-center gap-2">
            {showPass ? (
              <IoLockOpen className="text-white" size={20} />
            ) : (
              <FaLock className="text-white" size={20} />
            )}

            <input
              id="password"
              type={showPass ? "text" : "password"}
              value={user.new_password}
              onChange={handleChange}
              placeholder="New Password"
              name="password"
              className="bg-transparent  outline-none text-white"
            />
          </div>

          <button onClick={() => setShowPass(!showPass)}>
            <FaEye className="text-white" size={20} />
          </button>
        </div>

        <div className="flex w-full  items-center justify-between border border-white py-2 px-3 gap-2 rounded-full">
          <div className="flex items-center gap-2">
            {showPass ? (
              <IoLockOpen className="text-white" size={20} />
            ) : (
              <FaLock className="text-white" size={20} />
            )}

            <input
              id="password"
              type={showPass ? "text" : "password"}
              value={user.confirm_password}
              onChange={handleChange}
              placeholder="Confirm Password"
              name="password"
              className="bg-transparent  outline-none text-white"
            />
          </div>

          <button onClick={() => setShowPass(!showPass)}>
            <FaEye className="text-white" size={20} />
          </button>
        </div>

        <div className="flex justify-between gap-5">
          <div className="py-2">
            <button className="rounded-full bg-transparent border border-red-600 text-red-600 px-3 py-1 font-semibold ">
              Cancel
            </button>
          </div>

          <div className="py-2">
            <button className="rounded-full bg-amber-400 px-3 py-1 font-semibold ">
              Update
            </button>
          </div>
        </div>
      </div>
    </main>
    </>
  );
};

export default Profile;