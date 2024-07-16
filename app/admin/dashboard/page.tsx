"use client";

import Navbar from "@/layout/navbar";
import { useEffect } from "react";
import { cekLoginAdmin } from "@/middleware";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  useEffect(() => {
    const validLogin = async () => {
      const valid = await cekLoginAdmin();
      if (!valid) router.push("/");
    };

    validLogin();
  }, []);
  return (
    <div className="bg-gray-100 relative min-h-screen flex">
      <Navbar />
      <main className="flex-1 w-full border border-slate-950">
        <div className="p-10 w-full">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <h2 className="text-xl font-bold mb-4 text-slate-950">
              Selamat Datang di Aplikasi Absensi SMK at Taqwa Muhammadiyah Miri
            </h2>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
