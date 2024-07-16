"use client";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const handlePilih = (path: string) => {
    router.push(path);
  };
  return (
    <div className="bg-gray-100 min-h-screen justify-center items-center flex text-slate-950">
      <div className="p-8 bg-white rounded-lg shadow-md h-max text-center flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-2xl">
            Selamat datang di Sistem Absensi Smk At Taqwa Muhammadiyah Miri
          </span>
          <span>Silahkan Pilih Login</span>
        </div>
        <div className="flex gap-4 justify-center">
          <button
            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => handlePilih("/auth/login/admin")}
          >
            Login Sebagai Admin
          </button>

          <button
            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => handlePilih("/auth/login/guru")}
          >
            Login Sebagai Guru
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
