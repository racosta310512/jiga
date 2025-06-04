// src/pages/Marketplace/ProductPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/productService';
import { useCart } from '../../hooks/useCart';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      getProductById(id).then(setProduct);
    }
  }, [id]);

  if (!product) return <div className="p-8">Cargando producto...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-auto rounded-lg shadow"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-primary font-semibold mb-2">${product.price}</p>
          <p className="mb-4 text-gray-600">{product.description}</p>
          <button
            className="bg-primary text-white px-6 py-3 rounded-xl shadow hover:bg-opacity-80 transition"
            onClick={() => addToCart(product)}
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};


export default ProductPage;
