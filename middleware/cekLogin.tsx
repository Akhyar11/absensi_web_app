"use client";

import Cookie from "js-cookie";
import axios from "axios";
import assets from "@/assets.json";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const CekLoginAdmin = () => {
  const adaCookie = Cookie.get("token");
  const router = useRouter();

  const cek = async () => {
    if (!adaCookie) router.push("/");
    try {
      const responseLoginAdmin = await axios.post(
        assets.API_LINK + "/admin/token",
        { token: `${adaCookie}` }
      );

      router.push("/");
    } catch (error) {
      console.log(error);
      return router.push("/");
    }
  };

  useEffect(() => {
    cek();
  }, []);

  return <></>;
};
