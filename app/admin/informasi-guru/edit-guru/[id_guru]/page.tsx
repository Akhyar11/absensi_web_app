"use client";

import Navbar from "@/layout/navbar";
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { cekLoginAdmin } from "@/middleware";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import assets from "@/assets.json";
import Cookies from "js-cookie";

const AddGuruForm = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [passwordBaru, setPassBaru] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("token");
  const { id_guru } = useParams();

  const router = useRouter();

  const getGuruById = async () => {
    try {
      const response = await axios.get(assets.API_LINK + "/guru/" + id_guru, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { nama, email } = response.data;
      setNama(nama);
      setEmail(email);
    } catch (error) {
      console.log(error);
    }
  };

  const cekPassword = async () => {
    try {
      const response = await axios.post(
        assets.API_LINK + "/guru/cekPassword/" + id_guru,
        { password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.message == "wrong password") {
        setMsg(response.data.message);
        return false;
      } else if (response.data.message == "valid password") {
        setMsg("");
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const validPassword = await cekPassword();

      if (validPassword) {
        const response = await axios.put(
          assets.API_LINK + "/guru/" + id_guru,
          {
            nama,
            email,
            password,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.message == "Guru updated successfully") {
          router.push("/admin/informasi-guru");
        } else {
          setMsg(response.data.message);
        }
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
    getGuruById();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex text-slate-950">
      <Navbar />
      <main className="flex-1 w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Edit Guru</h1>
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
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mt-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mt-4">
              <input
                type="text"
                value={password}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Password Lama"
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mt-4">
              <input
                type="text"
                value={passwordBaru}
                onChange={(e) => setPassBaru(e.target.value)}
                placeholder="Password Baru"
                required
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="flex items-center px-4 py-2 text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FaPlus className="mr-2" />
                Edit Guru
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddGuruForm;
