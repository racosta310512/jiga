// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, UserPlus, LogOut, ShoppingCart, ShoppingBag } from "lucide-react";
import Logo from "../assets/logo1.png";
import { useAuth } from "../hooks/useAuth";
import { useCart } from '../hooks/useCart';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isAuthenticated, user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cartItemCount = Array.isArray(cart)
    ? cart.reduce((total, item) => total + item.quantity, 0)
    : 0;

  return (
    <header className="fixed top-0 w-full bg-[#1F0037] bg-opacity-90 px-6 py-4 shadow-lg z-50">
      <div className="flex justify-between items-center">
        <Link to="/">
          <img src={Logo} alt="Logotipo" className="w-12 h-6" />
        </Link>
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <nav className="hidden lg:flex flex-1 justify-end space-x-6 text-white/90 text-sm font-medium items-center">
          {/* Enlaces */}
          <Link to="/" className="hover:text-green-400 hover:underline">INÍCIO</Link>
          <Link to="/about" className="hover:text-green-400 hover:underline">QUEM SOMOS</Link>
          <Link to="/services" className="hover:text-green-400 hover:underline">SERVIÇOS</Link>
          <Link to="/contact" className="hover:text-green-400 hover:underline">CONTATO</Link>
          <Link to="/faq" className="hover:text-green-400 hover:underline">PREGUNTAS</Link>
          <Link to="/marketplace" className="flex items-center space-x-1 hover:text-green-400">
            <ShoppingBag size={18} /><span>LOJA</span>
          </Link>
          <Link to="/cart" className="flex items-center space-x-1 hover:text-green-400">
            <ShoppingCart size={18} /><span>({cartItemCount})</span>
          </Link>

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="flex items-center space-x-1 hover:text-green-400">
                <LogIn size={18} /><span>Entrar</span>
              </Link>
              <Link to="/register" className="flex items-center space-x-1 hover:text-green-400">
                <UserPlus size={18} /><span>Criar conta</span>
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1 text-green-400 font-semibold"
              >
                <span>👤 {user?.name || "Usuário"}</span>
                <svg className={`w-4 h-4 transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50 text-sm text-gray-800">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">📄 Perfil</Link>
                  <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">📦 Meus pedidos</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-100">🚪 Sair</button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
