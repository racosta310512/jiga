import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, UserPlus, LogOut } from "lucide-react";
import Logo from "../assets/logo1.png";
import { useAuth } from "../hooks/useAuth"; // importa el hook

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
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

  return (
    <header className="bg-[#1F0037] bg-opacity-50 px-6 py-4">
      <div className="flex justify-between items-center">
        <img src={Logo} alt="Logotipo" className="w-16 h-6" />

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

        {/* Versión de escritorio */}
        <nav className="hidden lg:flex flex-1 justify-end space-x-6 text-white/90 text-sm font-medium items-center">
          <Link to="/" className="hover:text-green-400 hover:underline transition duration-200">INÍCIO</Link>
          <Link to="/about" className="hover:text-green-400 hover:underline transition duration-200">QUEM SOMOS</Link>
          <Link to="/services" className="hover:text-green-400 hover:underline transition duration-200">SERVIÇOS</Link>
          <Link to="/contact" className="hover:text-green-400 hover:underline transition duration-200">CONTATO</Link>
          <Link to="/faq" className="hover:text-green-400 hover:underline transition duration-200">PREGUNTAS</Link>

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
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-red-400 hover:text-red-600 transition duration-200"
            >
              <LogOut size={18} />
              <span>Sair</span>
            </button>
          )}
        </nav>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <nav className="lg:hidden mt-4 space-y-2 text-white/90 text-sm font-medium text-right">
          <Link to="/" className="block hover:text-green-400 hover:underline transition duration-200">INÍCIO</Link>
          <Link to="/about" className="block hover:text-green-400 hover:underline transition duration-200">QUEM SOMOS</Link>
          <Link to="/services" className="block hover:text-green-400 hover:underline transition duration-200">SERVIÇOS</Link>
          <Link to="/contact" className="block hover:text-green-400 hover:underline transition duration-200">CONTATO</Link>
          <Link to="/faq" className="block hover:text-green-400 hover:underline transition duration-200">PREGUNTAS</Link>

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="block hover:text-green-400 transition duration-200">🔑 Entrar</Link>
              <Link to="/register" className="block hover:text-green-400 transition duration-200">📝 Criar conta</Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="block text-red-400 hover:text-red-600 transition duration-200"
            >
              🚪 Sair
            </button>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
