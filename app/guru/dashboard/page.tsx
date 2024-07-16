"use client";

import { useEffect, useState } from "react";
import { cekLoginGuru } from "@/middleware";
import { useRouter } from "next/navigation";
import Navbar from "@/layout/navbarGuru";
import Cookies from "js-cookie";
import axios from "axios";
import assets from "@/assets.json";
import { Guru } from "@/model/guru";
import { FaEdit } from "react-icons/fa";

const Dashboard = () => {
  const [dataGuru, setDataGuru] = useState<Guru>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const token = Cookies.get("token");

  const getGuruByToken = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        assets.API_LINK + "/guru/token/" + token,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setDataGuru(response.data.message);
      console.log(response.data.message);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleAdd = () => {
    router.push("/admin/informasi-guru/tambah-guru");
  };

  const handleEdit = (id: string) => {
    router.push("/admin/informasi-guru/edit-guru/" + id);
  };

  const validLogin = async () => {
    const valid = await cekLoginGuru();
    if (!valid) router.push("/");
  };

  useEffect(() => {
    validLogin();
    getGuruByToken();
  }, []);
  return (
    <div className="bg-gray-100 relative min-h-screen flex">
      <Navbar />
      <main className="flex-1 w-full p-8">
        {/* Informasi Guru */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Informasi Guru</h1>
          {isLoading ? <div>Loading...</div> : <></>}
        </div>
        <div className="shadow-md sm:rounded-lg overflow-hidden">
          <table className="min-w-full bg-white">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="w-20 py-3 px-6 text-left">ID</th>
                <th className="w-1/3 py-3 px-6 text-left">Nama</th>
                <th className="w-1/3 py-3 px-6 text-left">Email</th>
                <th className="w-20 py-3 px-6 text-center">Edit</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              <tr key={dataGuru?.id_guru} className="border-b border-slate-200">
                <td className="py-3 px-6">{dataGuru?.id_guru}</td>
                <td className="py-3 px-6">{dataGuru?.nama}</td>
                <td className="py-3 px-6">{dataGuru?.email}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleEdit(dataGuru ? dataGuru.id_guru : "")}
                  >
                    <FaEdit className="text-blue-500 hover:text-blue-700" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Jadwal Mapel */}
        <div className="flex justify-between items-center my-6">
          <h1 className="text-3xl font-bold">Jadwal Mapel</h1>
        </div>
        <div className="shadow-md sm:rounded-lg overflow-hidden">
          <table className="min-w-full bg-white">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="w-20 py-3 px-6 text-left">NO</th>
                <th className="w-1/3 py-3 px-6 text-left">Senin</th>
                <th className="w-1/3 py-3 px-6 text-left">Selasa</th>
                <th className="w-1/3 py-3 px-6 text-left">Rabu</th>
                <th className="w-1/3 py-3 px-6 text-left">Kemis</th>
                <th className="w-1/3 py-3 px-6 text-left">Jumat</th>
              </tr>
            </thead>
            <tbody className="text-slate-700"></tbody>
          </table>
        </div>

        {/* Permintaan Absensi */}
      </main>
    </div>
  );
};

export default Dashboard;
