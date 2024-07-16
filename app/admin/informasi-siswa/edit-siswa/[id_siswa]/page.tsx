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
import { Kelas } from "@/model/kelas";
import { Siswa } from "@/model/siswa";

const EditSiswaForm = () => {
  const [id_kelas, setIdKelas] = useState("");
  const [nisn, setNisn] = useState("");
  const [nama, setNama] = useState("");
  const [jk, setJk] = useState<string>("");
  const [kelas, setKelas] = useState<Kelas[]>();
  const [alamat, setAlamat] = useState("");
  const [tg_masuk, setTgMasuk] = useState("");
  const [tg_lahir, setTgLahir] = useState("");
  const [tokenSiswa, setToken] = useState("");
  const [guru, setGuru] = useState<Guru[]>([]);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id_siswa } = useParams();
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

  const getSiswaById = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(assets.API_LINK + "/siswa/" + id_siswa, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data: Siswa = response.data;
      setNama(data.nama);
      setAlamat(data.alamat);
      setNisn(data.nisn);
      setIdKelas(data.id_kelas);
      setJk(data.jk ? "Laki-Laki" : "Perempuan");
      setTgLahir(data.tg_lahir);
      setTgMasuk(data.tg_masuk);
      setToken(data.token);
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
        assets.API_LINK + "/siswa/" + id_siswa,
        {
          id_kelas,
          nisn,
          nama,
          jk,
          alamat,
          tg_masuk,
          tg_lahir,
          token: tokenSiswa,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.message == "Siswa updated") {
        router.push("/admin/informasi-siswa");
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
    getSiswaById();
    getKelas();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex text-slate-950">
      <Navbar />
      <main className="flex-1 w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Edit Siswa</h1>
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
              <input
                type="text"
                value={nisn}
                onChange={(e) => setNisn(e.target.value)}
                required
                placeholder="Nisn"
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mt-4">
              <input
                type="text"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                placeholder="Alamat"
                required
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mt-4">
              <input
                type="text"
                value={tokenSiswa}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Token"
                required
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
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
                required
                value={jk}
                onChange={(e) => setJk(e.target.value)}
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="" disabled>
                  Pilih Jenis Kelamin
                </option>
                <option value="Laki-Laki">Laki-Laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div className="mt-4">
              <label htmlFor="tg_lahir">Tanggal Lahir</label>
              <input
                required
                type="date"
                value={tg_lahir}
                onChange={(e) => setTgLahir(e.target.value)}
                placeholder="tangal lahir"
                className="w-full px-4 py-2 mt-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="tg_masuk">Tanggal Masuk</label>
              <input
                required
                type="date"
                value={tg_masuk}
                onChange={(e) => setTgMasuk(e.target.value)}
                placeholder="tangal masuk"
                className="w-full px-4 py-2 mt-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="flex items-center px-4 py-2 text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FaPlus className="mr-2" />
                Edit Siswa
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditSiswaForm;
