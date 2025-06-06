// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-[#1c1b29] rounded-2xl shadow-lg p-4 flex flex-col justify-between h-full text-white">
      <Link to={`/marketplace/product/${product._id}`} className="flex-1 flex flex-col">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
          <p className="text-gray-400 text-sm mb-1">{product.category}</p>
          <p className="text-green-400 font-bold text-xl">${product.price}</p>
        </div>
      </Link>

      <div className="mt-4 flex justify-center">
        <button
          onClick={() => addToCart(product)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition w-auto min-w-[140px] text-sm"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

