import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCogs, FaServer, FaMobileAlt, FaChartLine, FaLock, FaTools } from "react-icons/fa";
import QuoteForm from "../components/QuoteForm"; // Asegúrate de que la ruta sea correcta

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  { icon: <FaCogs className="text-green-400 text-4xl mb-4" />, title: "Automação de Processos", description: "Simplifique operações repetitivas e aumente a produtividade da sua empresa com nossas soluções de automação." },
  { icon: <FaServer className="text-green-400 text-4xl mb-4" />, title: "Infraestrutura de TI", description: "Projetamos e implementamos infraestrutura robusta e segura para suportar o crescimento do seu negócio." },
  { icon: <FaMobileAlt className="text-green-400 text-4xl mb-4" />, title: "Aplicativos Mobile", description: "Desenvolvimento de apps nativos e híbridos para impulsionar a presença da sua marca no mundo mobile." },
  { icon: <FaChartLine className="text-green-400 text-4xl mb-4" />, title: "Análise de Dados", description: "Transforme dados em insights valiosos para tomadas de decisão mais estratégicas e inteligentes." },
  { icon: <FaLock className="text-green-400 text-4xl mb-4" />, title: "Segurança Digital", description: "Proteção completa para dados e sistemas contra ameaças cibernéticas e vulnerabilidades." },
  { icon: <FaTools className="text-green-400 text-4xl mb-4" />, title: "Suporte Técnico", description: "Equipe especializada para manter sua operação de TI funcionando com alta disponibilidade." },
];

export default function Services() {
  const sectionRef = useRef();
  const gridRef = useRef();
  const ctaRef = useRef();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
    gsap.fromTo(gridRef.current, { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
      scrollTrigger: { trigger: gridRef.current, start: "top 80%", toggleActions: "play reverse play reverse" },
    });
    gsap.fromTo(ctaRef.current, { opacity: 0, scale: 0.95 }, {
      opacity: 1, scale: 1, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: ctaRef.current, start: "top 85%", toggleActions: "play none none none" },
    });
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] min-h-screen py-24 px-6 md:px-12 text-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Nossos Serviços</h1>
        <p className="text-lg text-white/70 mb-16 max-w-3xl mx-auto leading-relaxed">
          Oferecemos uma gama completa de serviços de tecnologia, pensados para transformar a sua empresa com inovação e eficiência.
        </p>
      </div>

      <div ref={gridRef} className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {servicesList.map((service, index) => (
          <div key={index} className="bg-[#1F0037] bg-opacity-60 p-8 rounded-2xl shadow-xl hover:scale-105 transform transition-transform duration-300 flex flex-col items-center text-center">
            {service.icon}
            <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
            <p className="text-white/80">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Sección CTA */}
      <div ref={ctaRef} className="mt-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para transformar seu negócio?</h2>
        <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
          Fale agora com nossa equipe e descubra como podemos acelerar a sua transformação digital!
        </p>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-400 hover:bg-green-300 text-[#0f0c29] font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          Solicitar Orçamento
        </button>
      </div>

      {showForm && <QuoteForm onClose={() => setShowForm(false)} />}
    </div>
  );
}
