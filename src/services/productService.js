// src/services/productService.js
const API_URL = import.meta.env.VITE_API_URL + '/products';

export const getAllProducts = async () => {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data;
};

export const getProductById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  const data = await res.json();
  return data;
};
