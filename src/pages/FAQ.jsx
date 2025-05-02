import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiChevronDown, FiChevronUp, FiCpu } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
  const faqRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setHasLoaded(true);

    const sections = faqRef.current.querySelectorAll('.faq-section');

    sections.forEach((section, index) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
        delay: index * 0.2,
      });
    });
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      title: '¿Qué servicios tecnológicos ofrecen?',
      content: (
        <>
          <p>
            Ofrecemos desarrollo de software a medida, aplicaciones móviles, diseño web futurista, consultoría en inteligencia artificial y soluciones en la nube adaptadas a tu negocio.
          </p>
          <p>
            Nuestro equipo tiene amplia experiencia en crear soluciones escalables y personalizadas, basadas en tecnologías de vanguardia, que permiten a las empresas optimizar sus procesos y mejorar la experiencia de sus usuarios.
          </p>
        </>
      ),
    },
    {
      title: '¿Cómo garantizan la seguridad de mis datos?',
      content: (
        <>
          <p>
            Aplicamos cifrado de extremo a extremo, autenticación multifactor y revisiones constantes de seguridad para proteger todos tus datos y los de tus usuarios.
          </p>
          <p>
            Además, realizamos auditorías regulares y mantenemos protocolos de seguridad avanzados para asegurar que tu información esté siempre protegida frente a posibles amenazas.
          </p>
        </>
      ),
    },
    {
      title: '¿Trabajan con startups y pequeñas empresas?',
      content: (
        <>
          <p>
            ¡Claro que sí! Nos encanta ayudar a startups a lanzar sus productos, optimizar procesos y escalar rápidamente con soluciones tecnológicas de vanguardia.
          </p>
          <p>
            Trabajamos de cerca con cada cliente, adaptando nuestras soluciones a sus necesidades específicas para garantizar el éxito de sus proyectos y el crecimiento de su negocio.
          </p>
        </>
      ),
    },
    {
      title: '¿Qué tecnologías utilizan?',
      content: (
        <>
          <p>
            Usamos React, Node.js, MongoDB, Next.js, Python, inteligencia artificial, blockchain y tecnologías cloud como AWS y Azure.
          </p>
          <p>
            Nuestras soluciones están basadas en tecnologías modernas y robustas, lo que nos permite ofrecer un rendimiento óptimo, escalabilidad y una experiencia de usuario excepcional.
          </p>
        </>
      ),
    },
    {
      title: '¿Cómo es el proceso de trabajo?',
      content: (
        <>
          <p>
            Comenzamos con una reunión inicial, definimos objetivos, diseñamos prototipos, desarrollamos iterativamente y hacemos despliegues controlados para garantizar calidad y eficiencia.
          </p>
          <p>
            Nuestra metodología ágil nos permite adaptarnos rápidamente a los cambios, asegurando entregas a tiempo y un producto final que cumpla con las expectativas del cliente.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div
        ref={faqRef}
        className={`relative z-10 max-w-4xl mx-auto p-8 text-white ${!hasLoaded ? 'opacity-0' : 'opacity-100'}`}
      >
        <h1 className="text-4xl font-bold mb-12 text-center text-green-400">
          Preguntas Frecuentes
        </h1>
        <div className="space-y-6">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="faq-section bg-[#1F0037] bg-opacity-60 rounded-2xl p-6 shadow-xl cursor-pointer transition transform hover:scale-105"
              onClick={() => toggleAccordion(index)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FiCpu className="text-green-400 text-xl animate-pulse" />
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                </div>
                {activeIndex === index ? (
                  <FiChevronUp className="text-green-400 text-2xl" />
                ) : (
                  <FiChevronDown className="text-green-400 text-2xl" />
                )}
              </div>
              <div
                className={`mt-4 text-white/80 text-base transition-all duration-500 ease-in-out ${
                  activeIndex === index ? 'h-auto opacity-100' : 'h-0 opacity-0 overflow-hidden'
                }`}
              >
                {item.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
