import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../../services/productService';
import { useCart } from '../../hooks/useCart';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [tab, setTab] = useState('description');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getProductById(id).then((data) => {
        setProduct(data);
        setSelectedImage(data.image);
      });
    }
  }, [id]);

  if (!product) return <div className="p-8 text-white">Cargando producto...</div>;

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white">
      <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row gap-10">
        {/* Galería de imágenes */}
        <div className="md:w-1/2 flex flex-col items-center">
          <div className="border border-gray-700 rounded-xl overflow-hidden shadow-lg bg-[#1c1c1e] p-4">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-auto object-contain max-h-[500px] transition-transform hover:scale-105"
            />
          </div>
          <div className="flex gap-3 mt-4">
            {[product.image, ...(product.gallery || [])].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumbnail-${index}`}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                  selectedImage === img ? 'border-cyan-400' : 'border-transparent'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Detalles del producto */}
        <div className="md:w-1/2 flex flex-col gap-6">
          <h1 className="text-3xl font-bold leading-tight">{product.name}</h1>
          <div className="flex items-center gap-3">
            <div className="text-yellow-400 font-semibold">★★★★☆</div>
            <span className="text-sm text-gray-400">(128 opiniones)</span>
          </div>
          <div className="text-2xl font-semibold text-cyan-400">${product.price}</div>

          {/* Tarjeta de compra */}
          <div className="bg-[#1f1f22] border border-gray-700 rounded-xl p-6 mt-4 shadow-lg max-w-sm">
            <div className="text-2xl font-bold text-green-400 mb-2">${product.price}</div>
            <p className="text-sm text-gray-400 mb-4">Envío gratis con Jiga Premium</p>
            <button
              onClick={() => addToCart(product)}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg shadow transition"
            >
              Añadir al carrito
            </button>
            <button
              onClick={() => {
                addToCart(product);
                navigate('/checkout');
              }}
              className="w-full mt-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition"
            >
              Comprar ahora
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-8">
            <div className="flex gap-6 border-b border-gray-700 pb-2">
              {['description', 'specs', 'reviews'].map((key) => (
                <button
                  key={key}
                  className={`uppercase text-sm font-semibold tracking-wide ${
                    tab === key ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'
                  }`}
                  onClick={() => setTab(key)}
                >
                  {key === 'description' && 'Descripción'}
                  {key === 'specs' && 'Especificaciones'}
                  {key === 'reviews' && 'Opiniones'}
                </button>
              ))}
            </div>

            <div className="mt-4 text-gray-300 text-sm">
              {tab === 'description' && <p>{product.description}</p>}
              {tab === 'specs' && (
                <ul className="list-disc list-inside space-y-1">
                  {product.specs
                    ? product.specs.map((spec, i) => <li key={i}>{spec}</li>)
                    : <li>No hay especificaciones disponibles.</li>}
                </ul>
              )}
              {tab === 'reviews' && (
                <div>
                  <p>⭐️⭐️⭐️⭐️⭐️ Excelente producto, lo volvería a comprar. – Juan P.</p>
                  <p className="mt-2">⭐️⭐️⭐️⭐️ Muy bueno, calidad precio inmejorable. – Ana R.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
