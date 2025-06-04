// src/pages/Marketplace/Marketplace.jsx
import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { getAllProducts } from '../../services/productService';

const Marketplace = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">Marketplace</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
