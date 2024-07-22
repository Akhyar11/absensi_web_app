"use client";

import Navbar from "@/layout/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import assets from "@/assets.json";
import Cookies from "js-cookie";
import { cekLoginAdmin } from "@/middleware";
import { useRouter } from "next/navigation";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Mapel } from "@/model/mapel";
import { JadwalMapel } from "@/model/jadwalMapel";

const InformasiJadwalMapel = () => {
  const [dataMapel, setDataMapel] = useState<Mapel[]>([]);
  const [dataJadwalMapel, setDataJadwalMapel] = useState<JadwalMapel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const adaCookie = Cookies.get("token");

  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await axios.get(assets.API_LINK + "/mapel/", {
        headers: { Authorization: `Bearer ${adaCookie}` },
      });

      const responseJadwal = await axios.get(
        assets.API_LINK + "/jadwalMapel/",
        {
          headers: { Authorization: `Bearer ${adaCookie}` },
        }
      );

      const data = response.data;

      setDataMapel(data);
      setDataJadwalMapel(responseJadwal.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleAdd = () => {
    router.push("/admin/mapel/tambah-mapel");
  };

  const handleAdd2 = () => {
    router.push("/admin/jadwal-mapel/tambah-jadwal");
  };

  const handleEdit = (id: string) => {
    router.push("/admin/mapel/edit-mapel/" + id);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(assets.API_LINK + "/mapel/" + id, {
        headers: { Authorization: `Bearer ${adaCookie}` },
      });

      if (response.data.message == "Mapel deleted successfully") {
        await fetchData();
      } else {
        await fetchData();
        setError(response.data.message);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const validLogin = async () => {
      const valid = await cekLoginAdmin();
      if (!valid) router.push("/");
    };

    validLogin();
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {"Internal server Error"}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex text-slate-950">
      <Navbar />
      <main className="flex-1 w-full p-8">
        {/* Informasi Mapel */}

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Informasi Mapel</h1>
          <button
            onClick={handleAdd}
            className="flex items-center px-4 py-2 text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaPlus className="mr-2" />
            Tambah
          </button>
        </div>
        {isLoading ? <div className="mb-6">Loading...</div> : <></>}
        <div className="shadow-md sm:rounded-lg overflow-hidden">
          <table className="min-w-full bg-white">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="w-20 py-3 px-6 text-left">ID</th>
                <th className="w-1/3 py-3 px-6 text-left">Nama</th>
                <th className="w-20 py-3 px-6 text-center">Edit</th>
                <th className="w-20 py-3 px-6 text-center">Hapus</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {dataMapel.map((user) => (
                <tr key={user.id_mapel} className="border-b border-slate-200">
                  <td className="py-3 px-6">{user.id_mapel}</td>
                  <td className="py-3 px-6">{user.nama_mapel}</td>
                  <td className="py-3 px-6 text-center">
                    <button onClick={() => handleEdit(user.id_mapel)}>
                      <FaEdit className="text-blue-500 hover:text-blue-700" />
                    </button>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button onClick={() => handleDelete(user.id_mapel)}>
                      <FaTrash className="text-red-500 hover:text-red-700" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Informasi Jadwal Mapel */}

        <div className="flex justify-between items-center my-6">
          <h1 className="text-3xl font-bold">Informasi Jadwal Mapel</h1>
          <button
            onClick={handleAdd2}
            className="flex items-center px-4 py-2 text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaPlus className="mr-2" />
            Tambah
          </button>
        </div>
        <div className="shadow-md sm:rounded-lg overflow-hidden">
          <table className="min-w-full bg-white">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="w-1/5 py-3 px-6 text-left">Mepel</th>
                <th className="1-1/5 py-3 px-6 text-left">Jam</th>
                <th className="1-1/5 py-3 px-6 text-left">Hari</th>
                <th className="w-1/5 py-3 px-6 text-left">Guru</th>
                <th className="w-1/5 py-3 px-6 text-left">Kelas</th>
                <th className="w-20 py-3 px-6 text-center">Hapus</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {dataJadwalMapel.map((user) => (
                <tr
                  key={user.id_jadwal_mapel}
                  className="border-b border-slate-200"
                >
                  <td className="py-3 px-6">{user.id_mapel}</td>
                  <td className="py-3 px-6">
                    Ke-{user.jam} / Jam{" "}
                    {user.jam == 1
                      ? 7
                      : user.jam == 2
                      ? 9
                      : user.jam == 3
                      ? 12
                      : user.jam == 4
                      ? 14
                      : "Not Define"}
                  </td>
                  <td className="py-3 px-6">{user.hari}</td>
                  <td className="py-3 px-6">{user.id_guru}</td>
                  <td className="py-3 px-6">{user.id_kelas}</td>
                  <td className="py-3 px-6 text-center">
                    <button onClick={() => handleDelete(user.id_jadwal_mapel)}>
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

export default InformasiJadwalMapel;
