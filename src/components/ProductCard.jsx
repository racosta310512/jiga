// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition">
      <Link to={`/marketplace/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-500">{product.category}</p>
        <p className="text-primary font-bold text-xl">${product.price}</p>
      </Link>
      <button
        onClick={() => addToCart(product)}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-2 w-full"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
};

export default ProductCard;
