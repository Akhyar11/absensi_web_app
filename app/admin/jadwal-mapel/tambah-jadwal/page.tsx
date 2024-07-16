"use client";

import Navbar from "@/layout/navbar";
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { cekLoginAdmin } from "@/middleware";
import { useRouter } from "next/navigation";
import { Kelas } from "@/model/kelas";
import axios from "axios";
import assets from "@/assets.json";
import Cookies from "js-cookie";
import { Guru } from "@/model/guru";
import { Mapel } from "@/model/mapel";

const AddSiswaForm = () => {
  const [id_kelas, setIdKelas] = useState("");
  const [id_guru, setIdGuru] = useState("");
  const [id_mapel, setIdMapel] = useState("");
  const [hari, setHari] = useState<string>("");
  const [jam, setJam] = useState<number>(0);
  const [kelas, setKelas] = useState<Kelas[]>([]);
  const [guru, setDataGuru] = useState<Guru[]>([]);
  const [mapel, setDataMapel] = useState<Mapel[]>([]);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("token");

  const router = useRouter();

  const getKelas = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(assets.API_LINK + "/kelas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      setKelas(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getGuru = async () => {
    try {
      const response = await axios.get(assets.API_LINK + "/guru", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDataGuru(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getMapel = async () => {
    try {
      const response = await axios.get(assets.API_LINK + "/mapel/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;

      setDataMapel(data);
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
      const response = await axios.post(
        assets.API_LINK + "/jadwalMapel/create",
        {
          id_kelas,
          id_guru,
          id_mapel,
          jam,
          hari,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.message == "Jadwal created") {
        router.push("/admin/jadwal-mapel");
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
    getKelas();
    getGuru();
    getMapel();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex text-slate-950">
      <Navbar />
      <main className="flex-1 w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Tambah jadwal</h1>
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
              <select
                value={hari}
                onChange={(e) => setHari(e.target.value)}
                required
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="" disabled>
                  Pilih Hari
                </option>
                <option value="senin">senin</option>
                <option value="selasa">selasa</option>
                <option value="rabu">rabu</option>
                <option value="kamis">kamis</option>
                <option value="jumat">jumat</option>
              </select>
            </div>
            <div className="mt-4">
              <select
                value={jam}
                onChange={(e) => setJam(Number(e.target.value))}
                required
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="" disabled>
                  Pilih Jam
                </option>
                <option value="1">Ke-1</option>
                <option value="2">Ke-2</option>
                <option value="3">Ke-3</option>
                <option value="4">Ke-4</option>
              </select>
            </div>
            <div className="mt-4">
              <select
                value={id_kelas}
                onChange={(e) => setIdKelas(e.target.value)}
                required
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="" disabled>
                  Pilih Kelas
                </option>
                {kelas?.map((kls) => (
                  <option key={kls.id_kelas} value={kls.id_kelas}>
                    {kls.nama_kelas}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4">
              <select
                value={id_guru}
                onChange={(e) => setIdGuru(e.target.value)}
                required
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="" disabled>
                  Pilih Guru
                </option>
                {guru?.map((kls) => (
                  <option key={kls.id_guru} value={kls.id_guru}>
                    {kls.nama}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4">
              <select
                value={id_mapel}
                onChange={(e) => setIdMapel(e.target.value)}
                required
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="" disabled>
                  Pilih Mapel
                </option>
                {mapel?.map((kls) => (
                  <option key={kls.id_mapel} value={kls.id_mapel}>
                    {kls.nama_mapel}
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
                Tambah Jadwal
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddSiswaForm;
