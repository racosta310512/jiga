import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop, faCloud, faShieldAlt, faClipboardList } from "@fortawesome/free-solid-svg-icons";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  useEffect(() => {
    // Animación para las tarjetas
    gsap.fromTo(
      ".service-item", // Animación de las tarjetas de servicio
      { opacity: 0, y: 30 }, // Comienzan con opacidad baja y un desplazamiento hacia abajo
      {
        opacity: 1,
        y: 0, // Al final, opacidad completa y sin desplazamiento
        stagger: 0.4, // Retraso entre cada animación
        duration: 1.2, // Duración de la animación
        ease: "power3.out", // Tipo de animación
      }
    );

    // Animación para los textos de las secciones
    gsap.fromTo(
      ".service-text", // Animación de los textos de las secciones
      { opacity: 0, y: 20 }, // Comienzan con opacidad baja y desplazamiento hacia abajo
      {
        opacity: 1,
        y: 0, // Al final, opacidad completa y sin desplazamiento
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".service-text", // Activar la animación cuando el texto entre en la vista
          start: "top 80%", // Cuando el 80% del texto entra en la vista
          end: "top 60%", // Cuando el 60% del texto sale de la vista
          scrub: true, // Vincula la animación con el scroll
        },
      }
    );
  }, []);

  return (
    <div className="p-10 bg-gradient-to-r from-blue-700 to-green-600 rounded-lg shadow-xl">
      <h2 className="text-4xl font-bold text-center text-white mb-10 service-text">Nossos Serviços</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Desenvolvimento de Software */}
        <div id="software" className="service-item text-center p-6 bg-gradient-to-r from-blue-950 to-blue-600 text-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out max-w-sm mx-auto flex flex-col justify-between h-full">
          <FontAwesomeIcon icon={faDesktop} size="3x" className="text-white mb-4" />
          <h3 className="text-2xl font-semibold mb-4">Desenvolvimento de Software</h3>
          <p className="text-gray-100 mb-4">
            Criamos soluções de software personalizadas para atender às necessidades específicas do seu negócio.
          </p>
          <button
            onClick={() => document.getElementById("details-software").scrollIntoView({ behavior: "smooth" })}
            className="px-4 py-2 bg-white text-green-900 rounded-full hover:bg-green-400 transition mt-auto w-auto mx-auto"
          >
            Saiba mais
          </button>
        </div>

        {/* Integração em Nuvem */}
        <div id="cloud" className="service-item text-center p-6 bg-gradient-to-r from-blue-950 to-blue-600 text-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out max-w-sm mx-auto flex flex-col justify-between h-full">
          <FontAwesomeIcon icon={faCloud} size="3x" className="text-white mb-4" />
          <h3 className="text-2xl font-semibold mb-4">Integração em Nuvem</h3>
          <p className="text-gray-100 mb-4">
            Soluções em nuvem que conectam seus sistemas com flexibilidade e alta disponibilidade.
          </p>
          <button
            onClick={() => document.getElementById("details-cloud").scrollIntoView({ behavior: "smooth" })}
            className="px-4 py-2 bg-white text-green-900 rounded-full hover:bg-green-400 transition mt-auto w-auto mx-auto"
          >
            Saiba mais
          </button>
        </div>

        {/* Cibersegurança */}
        <div id="security" className="service-item text-center p-6 bg-gradient-to-r from-blue-950 to-blue-600 text-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out max-w-sm mx-auto flex flex-col justify-between h-full">
          <FontAwesomeIcon icon={faShieldAlt} size="3x" className="text-white mb-4" />
          <h3 className="text-2xl font-semibold mb-4">Cibersegurança</h3>
          <p className="text-gray-100 mb-4">
            Proteção de dados e sistemas com as melhores práticas de segurança cibernética.
          </p>
          <button
            onClick={() => document.getElementById("details-security").scrollIntoView({ behavior: "smooth" })}
            className="px-4 py-2 bg-white text-green-900 rounded-full hover:bg-green-400 transition mt-auto w-auto mx-auto"
          >
            Saiba mais
          </button>
        </div>

        {/* Consultoria em TI */}
        <div id="consulting" className="service-item text-center p-6 bg-gradient-to-r from-blue-950 to-blue-600 text-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out max-w-sm mx-auto flex flex-col justify-between h-full">
          <FontAwesomeIcon icon={faClipboardList} size="3x" className="text-white mb-4" />
          <h3 className="text-2xl font-semibold mb-4">Consultoria em TI</h3>
          <p className="text-gray-100 mb-4">
            Consultoria especializada para otimizar sua infraestrutura e processos de TI.
          </p>
          <button
            onClick={() => document.getElementById("details-consulting").scrollIntoView({ behavior: "smooth" })}
            className="px-4 py-2 bg-white text-green-900 rounded-full hover:bg-green-400 transition mt-auto w-auto mx-auto"
          >
            Saiba mais
          </button>
        </div>
      </div>

      {/* Detalles Explicativos para cada Servicio */}
      <div className="mt-12">
        {/* Sección de Desarrollo de Software */}
        <section id="details-software" className="mb-12 p-8 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-gray-800 text-white service-text">
          <h3 className="text-3xl font-semibold mb-6">Desenvolvimento de Software</h3>
          <p className="text-gray-200 mb-6">
            O nosso serviço de desenvolvimento de software oferece soluções sob medida para atender às necessidades específicas de sua empresa. Criamos aplicações robustas e escaláveis, com uma arquitetura moderna que garante um desempenho excelente, segurança e facilidade de manutenção. Nossa equipe utiliza as melhores práticas de desenvolvimento, incluindo testes rigorosos, integração contínua e metodologias ágeis, para entregar produtos de alta qualidade.
          </p>
          <p className="text-gray-200 mb-6">
            Seja para sistemas corporativos, plataformas web ou aplicativos móveis, nossa abordagem personalizada garante que a solução atendará aos seus requisitos de forma eficiente e inovadora, ajudando sua empresa a se destacar no mercado competitivo.
          </p>
        </section>

        {/* Sección de Integración en Nuvem */}
        <section id="details-cloud" className="mb-12 p-8 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-gray-800 text-white service-text">
          <h3 className="text-3xl font-semibold mb-6">Integração em Nuvem</h3>
          <p className="text-gray-200 mb-6">
            A integração em nuvem permite que você conecte suas plataformas e sistemas em uma infraestrutura flexível e escalável. Usando as melhores soluções de nuvem, como AWS, Azure e Google Cloud, podemos ajudar sua empresa a melhorar a colaboração, reduzir custos com infraestrutura e aumentar a eficiência operacional.
          </p>
          <p className="text-gray-200 mb-6">
            A nuvem oferece recursos sob demanda, permitindo o acesso a dados e sistemas de qualquer lugar, com a segurança necessária para proteger informações sensíveis. Além disso, com a automação e a facilidade de integração com outras ferramentas, sua empresa poderá melhorar a agilidade e a inovação em seus processos.
          </p>
        </section>

        {/* Sección de Cibersegurança */}
        <section id="details-security" className="mb-12 p-8 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-gray-800 text-white service-text">
          <h3 className="text-3xl font-semibold mb-6">Cibersegurança</h3>
          <p className="text-gray-200 mb-6">
            A segurança cibernética é essencial para proteger seus dados, redes e sistemas contra ameaças externas. Oferecemos serviços completos de segurança, incluindo auditoria de sistemas, análise de vulnerabilidades, implementação de firewalls, criptografia de dados e monitoramento contínuo.
          </p>
          <p className="text-gray-200 mb-6">
            Nossa abordagem proativa ajuda a prevenir ataques antes que eles ocorram, garantindo a continuidade do seu negócio e a proteção de informações confidenciais. Além disso, fornecemos treinamentos para sua equipe, para que todos estejam preparados para enfrentar ameaças cibernéticas de forma eficaz.
          </p>
        </section>

        {/* Sección de Consultoria em TI */}
        <section id="details-consulting" className="mb-12 p-8 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-gray-800 text-white service-text">
          <h3 className="text-3xl font-semibold mb-6">Consultoria em TI</h3>
          <p className="text-gray-200 mb-6">
            Nossa consultoria em TI visa otimizar a infraestrutura tecnológica da sua empresa, garantindo que os processos de negócios estejam alinhados com as melhores soluções de tecnologia. Trabalhamos com empresas de diferentes setores, oferecendo estratégias personalizadas para melhorar a eficiência operacional e impulsionar a transformação digital.
          </p>
          <p className="text-gray-200 mb-6">
            Seja no planejamento de sistemas, automação de processos ou análise de dados, nossa equipe de consultores especializados ajudará sua empresa a implementar soluções inovadoras, melhorar a gestão de recursos e aumentar a competitividade no mercado.
          </p>
        </section>
      </div>
    </div>
  );
}
