// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";

import Marketplace from "./pages/Marketplace/Marketplace";
import ProductPage from "./pages/Marketplace/ProductPage";
import CartPage from "./pages/Marketplace/CartPage";
import AdminProductPage from "./pages/Admin/AdminProductPage";
import CheckoutPage from './pages/Marketplace/CheckoutPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-[#3F00FF] to-[#069494] text-white font-sans">
          <Navbar />
          <main className="pt-24"> {/* <-- padding agregado para compensar navbar fija */}
            <BackToTop />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/marketplace/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/admin/products" element={<AdminProductPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
