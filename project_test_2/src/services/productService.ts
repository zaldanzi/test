import axios from "axios";

export interface Product {
  id?: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  description: string;
}

const API_URL = "/api/products";

export const getProducts = async (): Promise<Product[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createProduct = async (data: Product): Promise<Product> => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateProduct = async (id: string, data: Product): Promise<Product> => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
