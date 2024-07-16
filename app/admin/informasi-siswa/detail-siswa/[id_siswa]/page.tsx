"use client";

import Navbar from "@/layout/navbar";
import { useEffect, useState } from "react";
import { Siswa } from "@/model/siswa";
import axios from "axios";
import assets from "@/assets.json";
import Cookies from "js-cookie";
import { cekLoginAdmin } from "@/middleware";
import { useParams, useRouter } from "next/navigation";
import { FaEdit, FaPlus, FaTrash, FaInfoCircle } from "react-icons/fa";
import { Absensi } from "@/model/absensi";
import { JadwalMapel } from "@/model/jadwalMapel";

const InformasiSiswaById = () => {
  const [dataSiswa, setDataSiswa] = useState<Siswa>();
  const [dataMapel, setDataMapel] = useState<JadwalMapel[]>([]);
  const [namaKelas, setNamaKelas] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [dataAbsensi, setDataAbsensi] = useState<Absensi[]>([]);
  const [error, setError] = useState(null);
  const { id_siswa } = useParams();
  const adaCookie = Cookies.get("token");

  const router = useRouter();

  const getMapel = async () => {
    try {
      const response = await axios.get(assets.API_LINK + "/jadwalMapel/", {
        headers: { Authorization: `Bearer ${adaCookie}` },
      });

      const data = response.data;
      console.log(data);
      setDataMapel(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const getKelasById = async (id_kelas: string) => {
    setIsLoading(true);

    try {
      const response = await axios.get(assets.API_LINK + "/kelas/" + id_kelas, {
        headers: { Authorization: `Bearer ${adaCookie}` },
      });

      const { nama_kelas } = response.data.data;
      setNamaKelas(nama_kelas);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const getAbsensi = async () => {
    try {
      const response = await axios.get(
        assets.API_LINK + "/absensi/siswa/" + id_siswa,
        { headers: { Authorization: `Bearer ${adaCookie}` } }
      );
      setDataAbsensi(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(assets.API_LINK + "/siswa/" + id_siswa, {
        headers: {
          Authorization: `Bearer ${adaCookie}`,
        },
      });
      await getKelasById(response.data.id_kelas);
      await getAbsensi();
      await getMapel();
      setDataSiswa(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    router.push("/admin/informasi-siswa/tambah-siswa");
  };

  const handleDetail = (id: string) => {
    router.push("/admin/informasi-siswa/detail-siswa/" + id_siswa + "/" + id);
  };

  const handleEdit = (id: string) => {
    router.push("/admin/informasi-siswa/edit-siswa/" + id);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(assets.API_LINK + "/siswa/" + id, {
        headers: { Authorization: `Bearer ${adaCookie}` },
      });

      if (response.data.message == "Siswa deleted successfully") {
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
        {/* General Infromasiton */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Informasi Siswa</h1>
        </div>
        {isLoading ? <div className="mb-6">Loading...</div> : <></>}
        <div className="max-w-sm bg-white border border-gray-300 rounded-md shadow-md overflow-hidden mb-6">
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {dataSiswa?.nama}
            </h2>
            <p className="mt-2 text-gray-700">
              <strong>NISN:</strong> {dataSiswa?.nisn}
            </p>
            <p className="mt-2 text-gray-700">
              <strong>Kelas:</strong> {namaKelas}
            </p>
            <p className="mt-2 text-gray-700">
              <strong>Detail:</strong>{" "}
              {`${dataSiswa?.nama} adalah seorang ${
                dataSiswa?.jk ? "Laki-Laki" : "Perempuan"
              } yang saat ini berada di ${namaKelas}. Dia tinggal di ${
                dataSiswa?.alamat
              }. ${dataSiswa?.nama} lahir pada tanggal ${
                dataSiswa?.tg_lahir
              } dan telah menjadi bagian dari sekolah ini sejak ${
                dataSiswa?.tg_masuk
              }.`}
            </p>
          </div>
        </div>

        {/* Absensi Informasiton */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Informasi Absensi/Mapel</h1>
        </div>

        <div className="shadow-md sm:rounded-lg overflow-hidden">
          <table className="min-w-full bg-white">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="w-1/4 py-3 px-6 text-left">Nama</th>
                <th className="w-1/4 py-3 px-6 text-left">Jam</th>
                <th className="w-1/4 py-3 px-6 text-left">Hari</th>
                <th className="w-20 py-3 px-6 text-center">Detail</th>
                <th className="w-20 py-3 px-6 text-center">Edit</th>
                <th className="w-20 py-3 px-6 text-center">Hapus</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {dataMapel.map((mapel) => (
                <tr
                  key={mapel.id_jadwal_mapel}
                  className="border-b border-slate-200"
                >
                  <td className="py-3 px-6">{mapel.id_mapel}</td>
                  <td className="py-3 px-6">{mapel.jam}</td>
                  <td className="py-3 px-6">{mapel.hari}</td>
                  <td className="py-3 px-6 text-center">
                    <button onClick={() => handleDetail(mapel.id_jadwal_mapel)}>
                      <FaInfoCircle className="text-blue-500 hover:text-blue-700" />
                    </button>
                  </td>
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

export default InformasiSiswaById;
