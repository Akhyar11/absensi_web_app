"use client";

import Navbar from "@/layout/navbar";
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { cekLoginAdmin } from "@/middleware";
import { useParams, useRouter } from "next/navigation";
import { Guru } from "@/model/guru";
import axios from "axios";
import assets from "@/assets.json";
import Cookies from "js-cookie";

const EditKelasForm = () => {
  const [id_guru, setIdGuru] = useState("");
  const [nama, setNama] = useState("");
  const [guru, setGuru] = useState<Guru[]>([]);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id_kelas } = useParams();
  const token = Cookies.get("token");

  const router = useRouter();

  const getGuru = async () => {
    try {
      const response = await axios.get(assets.API_LINK + "/guru", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGuru(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getKelasById = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(assets.API_LINK + "/kelas/" + id_kelas, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { nama_kelas, id_guru } = response.data.data;
      setNama(nama_kelas);
      setIdGuru(id_guru);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.put(
        assets.API_LINK + "/kelas/" + id_kelas,
        {
          id_guru,
          nama_kelas: nama,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.message == "Update kelas successfully") {
        router.push("/admin/informasi-kelas");
      } else {
        setMsg(response.data.message);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const validLogin = async () => {
    const valid = await cekLoginAdmin();
    if (!valid) router.push("/");
  };

  useEffect(() => {
    validLogin();
    getGuru();
    getKelasById();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex text-slate-950">
      <Navbar />
      <main className="flex-1 w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Edit Kelas</h1>
        </div>

        {isLoading ? (
          <>
            <span>Loading...</span>
          </>
        ) : (
          <></>
        )}

        <div
          className={
            msg !== ""
              ? "bg-red-400 flex justify-between px-4 py-2 rounded-md"
              : "hidden"
          }
        >
          <span>{msg}</span>
          <button className="text-slate-950" onClick={() => setMsg("")}>
            x
          </button>
        </div>

        <div className="mt-6">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center">
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama"
                required
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mt-4">
              <select
                value={id_guru}
                onChange={(e) => {
                  console.log(e.target.value);
                  setIdGuru(e.target.value);
                }}
                required
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="" disabled>
                  Pilih Wali Kelas
                </option>
                {guru?.map((user) => (
                  <option key={user.id_guru} value={user.id_guru}>
                    {user.nama}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="flex items-center px-4 py-2 text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FaPlus className="mr-2" />
                Edit Kelas
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditKelasForm;
