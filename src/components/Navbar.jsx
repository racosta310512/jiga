// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, UserPlus, LogOut, ShoppingCart } from "lucide-react";
import Logo from "../assets/logo1.png";
import { useAuth } from "../hooks/useAuth";
import { useCart } from '../hooks/useCart'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cartItemCount = Array.isArray(cart)
  ? cart.reduce((total, item) => total + item.quantity, 0)
  : 0;


  return (
    <header className="bg-[#1F0037] bg-opacity-50 px-6 py-4 shadow-lg z-50 relative">
      <div className="flex justify-between items-center">
        <Link to="/">
          <img src={Logo} alt="Logotipo" className="w-12 h-6" />
        </Link>

        <button
          className="lg:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Navegación escritorio */}
        <nav className="hidden lg:flex flex-1 justify-end space-x-6 text-white/90 text-sm font-medium items-center">
          <Link to="/" className="hover:text-green-400 hover:underline transition duration-200">INÍCIO</Link>
          <Link to="/about" className="hover:text-green-400 hover:underline transition duration-200">QUEM SOMOS</Link>
          <Link to="/services" className="hover:text-green-400 hover:underline transition duration-200">SERVIÇOS</Link>
          <Link to="/contact" className="hover:text-green-400 hover:underline transition duration-200">CONTATO</Link>
          <Link to="/faq" className="hover:text-green-400 hover:underline transition duration-200">PREGUNTAS</Link>

          <Link
            to="/marketplace"
            className="flex items-center space-x-1 text-white hover:text-green-400 transition duration-200"
          >
            <ShoppingCart size={18} />
            <span>MARKETPLACE</span>
          </Link>

          <Link
            to="/cart"
            className="flex items-center space-x-1 text-white hover:text-green-400 transition duration-200"
          >
            <ShoppingCart size={18} />
            <span>Carrito ({cartItemCount})</span>
          </Link>

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="flex items-center space-x-1 hover:text-green-400 transition duration-200">
                <LogIn size={18} />
                <span>Entrar</span>
              </Link>
              <Link to="/register" className="flex items-center space-x-1 hover:text-green-400 transition duration-200">
                <UserPlus size={18} />
                <span>Criar conta</span>
              </Link>
            </>
          ) : (
            <>
              <span className="text-green-400 font-semibold">Olá, {user?.name || "Usuário"}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-red-400 hover:text-red-600 transition duration-200"
              >
                <LogOut size={18} />
                <span>Sair</span>
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Menú móvil */}
      <div
        className={`lg:hidden transition-all duration-700 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-96 opacity-100 translate-y-0 mt-4" : "max-h-0 opacity-0 -translate-y-4"
        }`}
      >
        <nav className="space-y-2 text-white/90 text-sm font-medium text-right">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block hover:text-green-400 hover:underline transition duration-200">INÍCIO</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block hover:text-green-400 hover:underline transition duration-200">QUEM SOMOS</Link>
          <Link to="/services" onClick={() => setIsMenuOpen(false)} className="block hover:text-green-400 hover:underline transition duration-200">SERVIÇOS</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block hover:text-green-400 hover:underline transition duration-200">CONTATO</Link>
          <Link to="/faq" onClick={() => setIsMenuOpen(false)} className="block hover:text-green-400 hover:underline transition duration-200">PREGUNTAS</Link>

          <Link
            to="/marketplace"
            onClick={() => setIsMenuOpen(false)}
            className="block flex items-center justify-end space-x-1 hover:text-green-400 hover:underline transition duration-200"
          >
            <ShoppingCart size={18} />
            <span>Marketplace</span>
          </Link>

          <Link
            to="/cart"
            onClick={() => setIsMenuOpen(false)}
            className="block flex items-center justify-end space-x-1 hover:text-green-400 hover:underline transition duration-200"
          >
            <ShoppingCart size={18} />
            <span>Carrito ({cartItemCount})</span>
          </Link>

          {!isAuthenticated ? (
            <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block hover:text-green-400 transition duration-200">🔑 Entrar</Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)} className="block hover:text-green-400 transition duration-200">📝 Criar conta</Link>
            </>
          ) : (
            <>
              <div className="text-green-400 font-semibold">👤 {user?.name || "Usuário"}</div>
              <button
                onClick={handleLogout}
                className="w-full text-right text-red-400 hover:text-red-600 transition duration-200"
              >
                🚪 Sair
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
