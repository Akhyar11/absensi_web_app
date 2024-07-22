"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const handleLink = (path: string) => {
    router.push(path);
  };
  return (
    <div
      className={`transition-all duration-300 bg-slate-950 text-slate-50 min-h-screen w-64`}
    >
      <div className="p-4 text-2xl font-semibold border-b mb-4">
        Sistem Absensi
      </div>
      <nav className={`transition-all duration-300`}>
        <ul>
          <li className="py-2 px-4 hover:bg-slate-500">
            <button onClick={() => handleLink("/admin/dashboard")}>
              Beranda
            </button>
          </li>
          <li className="py-2 px-4 hover:bg-slate-500">
            <button onClick={() => handleLink("/admin/jadwal-mapel")}>
              Jadwal Mapel
            </button>
          </li>
          <li className="py-2 px-4 hover:bg-slate-500">
            <button onClick={() => handleLink("/admin/informasi-guru")}>
              Informasi Guru
            </button>
          </li>
          <li className="py-2 px-4 hover:bg-slate-500">
            <button onClick={() => handleLink("/admin/informasi-siswa")}>
              Informasi Siswa
            </button>
          </li>
          <li className="py-2 px-4 hover:bg-slate-500">
            <button onClick={() => handleLink("/admin/informasi-kelas")}>
              Informasi Kelas
            </button>
          </li>
          <li className="py-2 px-4 hover:bg-slate-500">
            <button onClick={() => handleLink("/admin/informasi-admin")}>
              Informasi Admin
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
