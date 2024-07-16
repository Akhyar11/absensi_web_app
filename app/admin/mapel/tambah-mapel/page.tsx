"use client";

import Navbar from "@/layout/navbar";
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { cekLoginAdmin } from "@/middleware";
import { useRouter } from "next/navigation";
import axios from "axios";
import assets from "@/assets.json";
import Cookies from "js-cookie";

const AddMapelForm = () => {
  const [nama_mapel, setNama] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = Cookies.get("token");

      const response = await axios.post(
        assets.API_LINK + "/mapel/create",
        {
          nama_mapel,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.message == "Mapel created successfully") {
        router.push("/admin/jadwal-mapel");
      } else {
        setMsg(response.data.message);
      }

      setIsLoading(false);

      setNama("");
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
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex text-slate-950">
      <Navbar />
      <main className="flex-1 w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Tambah Mapel</h1>
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
            <div className="mt-4">
              <input
                type="text"
                value={nama_mapel}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama Mapel"
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="flex items-center px-4 py-2 text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FaPlus className="mr-2" />
                Tambah Mapel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddMapelForm;
