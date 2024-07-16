"use client";

import Navbar from "@/layout/navbar";
import { Guru } from "@/model/guru";
import { useEffect, useState } from "react";
import axios from "axios";
import assets from "@/assets.json";
import Cookies from "js-cookie";
import { cekLoginAdmin } from "@/middleware";
import { useRouter } from "next/navigation";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

const InformasiGuru = () => {
  const [dataGuru, setDataGuru] = useState<Guru[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const adaCookie = Cookies.get("token");

  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await axios.get(assets.API_LINK + "/guru", {
        headers: {
          Authorization: `Bearer ${adaCookie}`,
        },
      });
      setDataGuru(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    router.push("/admin/informasi-guru/tambah-guru");
  };

  const handleEdit = (id: string) => {
    router.push("/admin/informasi-guru/edit-guru/" + id);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(assets.API_LINK + "/guru/" + id, {
        headers: { Authorization: `Bearer ${adaCookie}` },
      });

      if (response.data.message == "Guru deleted successfully") {
        await fetchData();
      } else {
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Informasi Guru</h1>
          {isLoading ? <div>Loading...</div> : <></>}
          <button
            onClick={handleAdd}
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
                <th className="w-20 py-3 px-6 text-left">ID</th>
                <th className="w-1/3 py-3 px-6 text-left">Nama</th>
                <th className="w-1/3 py-3 px-6 text-left">Email</th>
                <th className="w-20 py-3 px-6 text-center">Edit</th>
                <th className="w-20 py-3 px-6 text-center">Hapus</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {dataGuru.map((user) => (
                <tr key={user.id_guru} className="border-b border-slate-200">
                  <td className="py-3 px-6">{user.id_guru}</td>
                  <td className="py-3 px-6">{user.nama}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6 text-center">
                    <button onClick={() => handleEdit(user.id_guru)}>
                      <FaEdit className="text-blue-500 hover:text-blue-700" />
                    </button>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button onClick={() => handleDelete(user.id_guru)}>
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

export default InformasiGuru;
