const BASE_URL = import.meta.env.VITE_API_URL;

export const getAllProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) {
    throw new Error(`Error al obtener productos: ${res.statusText}`);
  }
  return await res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) {
    throw new Error(`Error al obtener producto: ${res.statusText}`);
  }
  return await res.json();
};
