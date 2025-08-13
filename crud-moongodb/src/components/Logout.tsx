"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/auth/logout");
      toast.success(res.data.message);
       router.push("/login"); // redirect to login page
    } catch (err: any) {
      toast.error("Logout failed");
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      Logout
    </button>
  );
}
