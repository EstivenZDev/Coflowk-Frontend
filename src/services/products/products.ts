import axios from "axios";

export const getProducts = async () => {
  const res = await axios.get("http://localhost:3000/api/products", {
    withCredentials: true, 
  });

  return res.data;
};

export const getProductById = async (id: string) => {
  const res = await axios.get(`http://localhost:3000/api/products/${id}`, {
    withCredentials: true, 
  });
  return res.data;
}


export const createProduct = async (formData: FormData) => {
  const res = await axios.post("http://localhost:3000/api/products", formData, {
    withCredentials: true,
  });

  return res.data;
}


export const deleteProduct = async (id: string) => {
  const res = await axios.delete(`http://localhost:3000/api/products/${id}`, {
    withCredentials: true,
  });
  return res.data;
}



export const updateProduct = async (id: string, formData: FormData) => {
  const res = await axios.put(`http://localhost:3000/api/products/${id}`, formData, {
    withCredentials: true,
  });
  return res.data;
}