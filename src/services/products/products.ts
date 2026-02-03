import axios from "axios";

export const getProducts = async () => {
  const res = await axios.get("http://localhost:3000/api/products", {
    withCredentials: true, // 👈 IMPORTANTE si usas cookies
  });

  return res.data;
};