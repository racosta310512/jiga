import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLaptopCode, FaCloud, FaShieldAlt, FaLightbulb } from "react-icons/fa";
import Quem_somos from "../assets/quienes_somos.jpg";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: <FaLaptopCode className="text-green-400 text-3xl mb-2" />,
    title: "Desenvolvimento de Software",
    description: "Soluções personalizadas que atendem às necessidades específicas do seu negócio, garantindo eficiência e inovação.",
  },
  {
    icon: <FaCloud className="text-green-400 text-3xl mb-2" />,
    title: "Integração em Nuvem",
    description: "Conecte seus sistemas à nuvem para maior escalabilidade, flexibilidade e acessibilidade.",
  },
  {
    icon: <FaShieldAlt className="text-green-400 text-3xl mb-2" />,
    title: "Cibersegurança",
    description: "Proteja seus dados e sistemas com nossas soluções avançadas de segurança digital.",
  },
  {
    icon: <FaLightbulb className="text-green-400 text-3xl mb-2" />,
    title: "Consultoria em TI",
    description: "Orientação especializada para otimizar sua infraestrutura tecnológica e processos de negócios.",
  },
];

const cases = [
  {
    title: "Syngenta",
    description: "A Jiga Soluções desempenhou um papel essencial na modernização dos sistemas internos da Syngenta.",
    quote: "Resultados excepcionais com uma equipe altamente confiável e inovadora.",
  },
  {
    title: "Bradesco",
    description: "Atuamos na consultoria e na implementação de soluções em nuvem.",
    quote: "Uma parceria transformadora para nosso ambiente tecnológico.",
  },
  {
    title: "Natura",
    description: "Contribuímos com soluções personalizadas de logística e análise de dados.",
    quote: "Tecnologia que nos aproximou dos nossos objetivos de sustentabilidade.",
  },
];

export default function About() {
  const sectionRef = useRef();
  const missionVisionRef = useRef();
  const casesRef = useRef();
  const quemSomosImageRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    [missionVisionRef, casesRef, quemSomosImageRef].forEach((ref) => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse", // Scroll reversible
          },
        }
      );
    });
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#3F00FF] to-[#069494] text-white" ref={sectionRef}>
      
      {/* Quem Somos */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Quem Somos</h2>
            <p className="text-lg text-white/80 mb-6 leading-relaxed">
              Somos uma empresa de tecnologia focada em entregar soluções inovadoras, sob medida e de alto impacto para nossos clientes.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              Nossa jornada é marcada pela excelência, compromisso com a qualidade e pelo desejo constante de evoluir junto aos nossos parceiros.
            </p>
          </div>
          <div ref={quemSomosImageRef} className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <img
              src={Quem_somos}
              alt="Equipe de tecnologia"
              className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0f0c29]/60 via-[#302b63]/40 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Nossas Soluções */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-r from-[#069494] to-[#3F00FF]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Nossas Soluções</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-[#1F0037] bg-opacity-50 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex flex-col items-center">
                  {service.icon}
                  <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-white/80 text-center">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section ref={missionVisionRef} className="py-24 px-6 md:px-12 bg-gradient-to-br from-[#0abab5] via-[#302b63] to-[#24243e]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16">Missão, Visão e Valores</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Missão", text: "Fornecer soluções tecnológicas inovadoras que potencializam o crescimento e a eficiência dos nossos clientes." },
              { title: "Visão", text: "Ser referência no mercado de tecnologia como uma empresa confiável, criativa e comprometida com resultados." },
              { title: "Valores", text: "Ética, inovação, colaboração, responsabilidade e foco no cliente estão no centro de tudo o que fazemos." },
            ].map((item, idx) => (
              <div key={idx}>
                <h3 className="text-2xl font-semibold mb-2 text-green-400">{item.title}</h3>
                <p className="text-white/80">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases de Sucesso */}
      <section ref={casesRef} className="py-24 px-6 md:px-12 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Cases de Sucesso</h2>
          <p className="text-white/80 text-center mb-20 max-w-3xl mx-auto">
            Conheça algumas histórias de sucesso que mostram como nossas soluções contribuíram para grandes conquistas tecnológicas.
          </p>
          <div className="relative border-l-2 border-green-400 pl-10 ml-3 space-y-16">
            {cases.map((item, idx) => (
              <div key={idx} className="relative pl-6">
                <span className="absolute -left-[1.25rem] top-2 w-5 h-5 bg-green-400 rounded-full shadow-lg"></span>
                <h3 className="text-2xl font-semibold mb-1 text-green-400">{item.title}</h3>
                <p className="text-white mb-1">{item.description}</p>
                <span className="text-sm text-white/60 italic">“{item.quote}”</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
