import axios from "axios";
import assets from "@/assets.json";
import Cookies from "js-cookie";

export const cekLoginAdmin = async () => {
  const token = Cookies.get("token");
  if (!token) return false;

  const responseToken = await axios.post(assets.API_LINK + "/admin/token", {
    token,
  });

  const msg = responseToken.data.message;

  if (msg == "your not admin") {
    console.log({ msg });
    return false;
  } else if (msg == "Internal server error") {
    console.log({ msg });
    return false;
  } else if (msg == "your is admin") {
    return true;
  } else {
    console.log(msg);
    return false;
  }
};

export const cekLoginGuru = async () => {
  const token = Cookies.get("token");
  if (!token) return false;

  const responseToken = await axios.post(assets.API_LINK + "/guru/token", {
    token,
  });

  const msg = responseToken.data.message;

  if (msg == "your not guru") {
    console.log({ msg });
    return false;
  } else if (msg == "Internal server error") {
    console.log({ msg });
    return false;
  } else if (msg == "your is guru") {
    return true;
  } else {
    console.log(msg);
    return false;
  }
};
