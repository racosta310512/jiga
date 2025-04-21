import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  FaLaptopCode,
  FaCloud,
  FaShieldAlt,
  FaLightbulb,
} from "react-icons/fa";

export default function About() {
  // Referencia para la sección animada
  const sectionRef = useRef();

  // Datos de los servicios
  const services = [
    {
      icon: <FaLaptopCode className="text-green-400 text-3xl mb-2" />,
      title: "Desenvolvimento de Software",
      description:
        "Soluções personalizadas que atendem às necessidades específicas do seu negócio, garantindo eficiência e inovação.",
    },
    {
      icon: <FaCloud className="text-green-400 text-3xl mb-2" />,
      title: "Integração em Nuvem",
      description:
        "Conecte seus sistemas à nuvem para maior escalabilidade, flexibilidade e acessibilidade.",
    },
    {
      icon: <FaShieldAlt className="text-green-400 text-3xl mb-2" />,
      title: "Cibersegurança",
      description:
        "Proteja seus dados e sistemas com nossas soluções avançadas de segurança digital.",
    },
    {
      icon: <FaLightbulb className="text-green-400 text-3xl mb-2" />,
      title: "Consultoria em TI",
      description:
        "Orientação especializada para otimizar sua infraestrutura tecnológica e processos de negócios.",
    },
  ];

  // Efecto para animar la sección al montar el componente
  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#3F00FF] to-[#069494] text-white">
      {/* Sección de Introducción */}
      <section className="py-20 px-6 md:px-12" ref={sectionRef}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center">Quem Somos</h2>
          <p className="text-white/80 mb-6 text-left">
            Na{" "}
            <span className="text-green-400 font-semibold">Jiga Soluções</span>,
            oferecemos serviços tecnológicos de ponta, adaptados às necessidades
            em constante evolução das empresas na era digital. Nossa equipe é
            comprometida com a inovação, a qualidade e a satisfação do cliente.
          </p>
          <p className="text-white/80 mb-6 text-left">
            Disponibilizamos uma ampla gama de soluções, incluindo
            desenvolvimento de software, integração em nuvem, cibersegurança e
            consultoria em TI. Nossa missão é capacitar empresas com ferramentas
            tecnológicas escaláveis e eficientes.
          </p>
          <p className="text-white/80 text-left">
            Com uma mentalidade voltada para o futuro e paixão por resolver
            problemas, a Jiga Soluções é sua parceira de confiança para navegar
            no cenário digital em constante mudança.
          </p>
        </div>
      </section>

      {/* Seção de Serviços */}
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
                  <h3 className="text-2xl font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-white/80 text-center">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Missão */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-4">Missão</h3>
          <p className="text-white/80">
            Prover serviços em tecnologia e transformação digital com
            excelência, para que nossa relação seja sempre de confiança e
            duradoura.
          </p>
        </div>
      </section>

      {/* Seção de Visão */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-r from-[#069494] to-[#3F00FF]">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-4">Visão</h3>
          <p className="text-white/80">
            Ser reconhecida globalmente como a melhor empresa de soluções em
            tecnologia.
          </p>
        </div>
      </section>

      {/* Seção de Valores */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-4">Valores</h3>
          <ul className="text-white/80">
            <li>Brilho nos olhos</li>
            <li>Inovação</li>
            <li>Transparência</li>
            <li>Gratidão</li>
            <li>Flexibilidade</li>
            <li>Qualidade</li>
            <li>Respeito</li>
          </ul>
        </div>
      </section>

      {/* Seção de Depoimentos */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-r from-[#3F00FF] to-[#069494]">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-4">Depoimento do Cliente</h3>
          <p className="text-white/80 italic">
            "A parceria com a Jiga Soluções tem sido fundamental para o nosso
            crescimento. Eles são confiáveis, inovadores e sempre entregam
            resultados excepcionais."
          </p>
          <span className="text-white/80">
            Alexandre Fatobene, Gerente de TI da Syngenta
          </span>
        </div>
      </section>

      {/* Seção de Cases de Sucesso */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-4">Cases de Sucesso</h3>
          <p className="text-white/80">
            Descubra como nossas soluções ajudaram grandes empresas a alcançarem
            seus objetivos de transformação digital.
          </p>
        </div>
      </section>
    </div>
  );
}
