// src/hooks/usePexelsBannerImages.js
import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = 'WgEFc1OdZHGljXkaxzp9AmeWuAcabpG68bIhOGS6tjawjmvS72Vu4xJH';
const BASE_URL = 'https://api.pexels.com/v1/search';

const categories = [
  { title: "¡Descuentos de Verano!", subtitle: "Hasta 50% OFF en productos seleccionados", query: "summer sale", category: "ofertas" },
  { title: "Tecnología al Mejor Precio", subtitle: "Compra laptops, celulares y más", query: "technology devices", category: "electronica" },
  { title: "Renueva tu Hogar", subtitle: "Ofertas en hogar y decoración", query: "home interior", category: "hogar" },
  { title: "Moda Exclusiva", subtitle: "Tendencias 2025 en ropa y accesorios", query: "fashion clothing", category: "ropa" }
];

const usePexelsBannerImages = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const responses = await Promise.all(
          categories.map(cat =>
            axios.get(BASE_URL, {
              headers: { Authorization: API_KEY },
              params: { query: cat.query, per_page: 1 }
            })
          )
        );

        const result = responses.map((res, i) => ({
          ...categories[i],
          image: res.data.photos[0]?.src?.landscape || "https://via.placeholder.com/800x400?text=Promoción"
        }));

        setBanners(result);
      } catch (err) {
        console.error("Error fetching Pexels images:", err);
        setError(err);
        setBanners(categories.map(cat => ({
          ...cat,
          image: "https://via.placeholder.com/800x400?text=Promoción"
        })));
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return { banners, loading, error };
};

export default usePexelsBannerImages;
