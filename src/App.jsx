import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Footer from "./components/Footer";
import Logo from "./assets/logo1.png";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[#3F00FF] to-[#069494] text-white font-sans">
        <header className="flex justify-between items-center px-12 py-6 bg-[#1F0037] bg-opacity-50">
          <div className="text-white font-bold text-2xl flex items-center gap-2">
            <div className="w-16 h-6 "><img src={Logo} alt="Logotipo" /></div>
            
          </div>
          <nav className="space-x-4 text-white/90 text-sm font-medium">
            <Link to="/" className="hover:text-green-400 hover:underline transition duration-200">INÍCIO</Link>
            <Link to="/about" className="hover:text-green-400 hover:underline transition duration-200">QUEM SOMOS</Link>
            <Link to="/services" className="hover:text-green-400 hover:underline transition duration-200">SERVIÇOS</Link>
            <Link to="/contact" className="hover:text-green-400 hover:underline transition duration-200">CONTATO</Link>
            <Link to="/faq" className="hover:text-green-400 hover:underline transition duration-200">PREGUNTAS</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </Router>
  );
}
