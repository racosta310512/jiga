// src/pages/Marketplace/Marketplace.jsx
import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { getAllProducts } from '../../services/productService';
import { categories } from '../../utils/categories';
import BannerCarousel from '../../components/BannerCarousel';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Marketplace = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    const storedCategory = localStorage.getItem('selectedCategory');

    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
      localStorage.setItem('selectedCategory', categoryFromUrl);
    } else if (storedCategory) {
      setSelectedCategory(storedCategory);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError('Hubo un error al cargar los productos. Intenta más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategorySelect = (category) => {
    const newCategory = category === selectedCategory ? 'Todas' : category;
    setSelectedCategory(newCategory);
    localStorage.setItem('selectedCategory', newCategory);

    // Actualizar la URL para permitir navegación clara
    navigate(`?category=${newCategory !== 'Todas' ? newCategory : ''}`);
  };

  const filteredProducts =
    selectedCategory === 'Todas'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      {/* Banner promocional */}
      <div className="w-full mb-6 rounded-xl overflow-hidden">
        <BannerCarousel />
      </div>

      {/* Filtro por categoría tipo Shopee */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex sm:justify-center gap-3 sm:flex-wrap w-max sm:w-full px-2 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleCategorySelect(cat.name)}
              className={`flex flex-col items-center min-w-[64px] px-3 py-2 rounded-xl transition-all duration-300 ${
                selectedCategory === cat.name
                  ? 'bg-green-500 text-white'
                  : 'bg-[#1c1b29] text-gray-300 hover:bg-[#2a2940]'
              }`}
            >
              <cat.icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Título */}
      <h1 className="text-2xl font-semibold mb-4 text-center text-green-400">
        Productos en destaque
      </h1>

      {/* Estados */}
      {loading && <p className="text-center text-gray-400">Cargando productos...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && filteredProducts.length === 0 && (
        <p className="text-center text-gray-400">Ningún producto encontrado en esta categoría.</p>
      )}

      {/* Grid de productos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
