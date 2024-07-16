"use client";

import Navbar from "@/layout/navbar";
import React, { useState, useEffect } from "react";
import { cekLoginAdmin } from "@/middleware";
import { useParams, useRouter } from "next/navigation";
import { Guru } from "@/model/guru";
import axios from "axios";
import assets from "@/assets.json";
import Cookies from "js-cookie";
import { Absensi } from "@/model/absensi";
import { FaEdit, FaInfoCircle, FaTrash } from "react-icons/fa";

const InformasiAbsensi = () => {
  const [dataAbsensi, setDataAbsensi] = useState<Absensi[]>([]);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id_siswa, id_jadwal } = useParams();
  const token = Cookies.get("token");
  let index = 1;

  const router = useRouter();

  const getAbsensiBySisiwa = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        assets.API_LINK + "/absensi/siswa/" + id_siswa,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newDataAbsensi: Absensi[] = [];
      const data = response.data.data as Absensi[];
      data.forEach((absensi) => {
        if (absensi.id_jadwal == id_jadwal) newDataAbsensi.push(absensi);
      });

      setIsLoading(false);
      setDataAbsensi(newDataAbsensi);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const validLogin = async () => {
    const valid = await cekLoginAdmin();
    if (!valid) router.push("/");
  };

  useEffect(() => {
    validLogin();
    getAbsensiBySisiwa();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex text-slate-950">
      <Navbar />
      <main className="flex-1 w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Informasi Absensi Untuk Mapel</h1>
        </div>

        {isLoading ? (
          <>
            <span>Loading...</span>
          </>
        ) : (
          <></>
        )}

        <div className="shadow-md sm:rounded-lg overflow-hidden">
          <table className="min-w-full bg-white">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="w-20 py-3 px-6 text-left">NO</th>
                <th className="w-1/4 py-3 px-6 text-left">kehadiran</th>
                <th className="w-20 py-3 px-6 text-left">keterangan</th>
                <th className="w-20 py-3 px-6 text-center">Edit</th>
                <th className="w-20 py-3 px-6 text-center">Hapus</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {dataAbsensi.map((absensi) => (
                <tr
                  key={absensi.id_absensi}
                  className="border-b border-slate-200"
                >
                  <td className="py-3 px-6">{index++}</td>
                  <td className="py-3 px-6">
                    {absensi.kehadiran ? "Hadir" : "Tidak Hadir"}
                  </td>
                  <td className="py-3 px-6">{absensi.keterangan}</td>
                  <td className="py-3 px-6 text-center">
                    <button>
                      <FaEdit className="text-blue-500 hover:text-blue-700" />
                    </button>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button>
                      <FaTrash className="text-red-500 hover:text-red-700" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default InformasiAbsensi;
