import React, { useState } from "react";

const AdminProductPage = () => {
  const [products, setProducts] = useState([]); // En el futuro, useEffect + fetch
  const [form, setForm] = useState({ name: "", price: "", image: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = () => {
    if (!form.name || !form.price) return;
    setProducts([...products, { ...form, _id: Date.now().toString() }]);
    setForm({ name: "", price: "", image: "" });
  };

  const handleDelete = (id) => setProducts(products.filter((p) => p._id !== id));

  return (
    <div className="p-6 text-white max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Painel de Produtos</h1>
      <div className="space-y-2 mb-6">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nome"
          className="w-full px-4 py-2 bg-white text-black rounded"
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Preço"
          type="number"
          className="w-full px-4 py-2 bg-white text-black rounded"
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="URL da Imagem"
          className="w-full px-4 py-2 bg-white text-black rounded"
        />
        <button onClick={handleAdd} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white">
          Adicionar Produto
        </button>
      </div>

      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product._id} className="flex justify-between items-center bg-white/10 p-4 rounded">
            <div>
              <p className="font-medium">{product.name}</p>
              <p>R$ {product.price}</p>
            </div>
            <button onClick={() => handleDelete(product._id)} className="text-red-400 hover:text-red-600">
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProductPage;
