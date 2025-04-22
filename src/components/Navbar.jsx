import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo1.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Cierra el menú si la ventana se redimensiona a un tamaño mayor
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
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <nav className="hidden lg:flex space-x-4 text-white/90 text-sm font-medium">
          <Link to="/" className="hover:text-green-400 hover:underline transition duration-200">
            INÍCIO
          </Link>
          <Link to="/about" className="hover:text-green-400 hover:underline transition duration-200">
            QUEM SOMOS
          </Link>
          <Link to="/services" className="hover:text-green-400 hover:underline transition duration-200">
            SERVIÇOS
          </Link>
          <Link to="/contact" className="hover:text-green-400 hover:underline transition duration-200">
            CONTATO
          </Link>
          <Link to="/faq" className="hover:text-green-400 hover:underline transition duration-200">
            PREGUNTAS
          </Link>
        </nav>
      </div>
      {/* Menú móvil */}
      {isMenuOpen && (
        <nav className="lg:hidden mt-4 space-y-2 text-white/90 text-sm font-medium">
          <Link to="/" className="block hover:text-green-400 hover:underline transition duration-200">
            INÍCIO
          </Link>
          <Link to="/about" className="block hover:text-green-400 hover:underline transition duration-200">
            QUEM SOMOS
          </Link>
          <Link to="/services" className="block hover:text-green-400 hover:underline transition duration-200">
            SERVIÇOS
          </Link>
          <Link to="/contact" className="block hover:text-green-400 hover:underline transition duration-200">
            CONTATO
          </Link>
          <Link to="/faq" className="block hover:text-green-400 hover:underline transition duration-200">
            PREGUNTAS
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
