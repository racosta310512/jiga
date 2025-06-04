// src/services/productService.js
const API_URL = import.meta.env.VITE_API_URL; // https://jiga-store.vercel.app

export const getAllProducts = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener productos');
  const data = await res.json();
  return data;
};

export const getProductById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Error al obtener producto');
  const data = await res.json();
  return data;
};
