import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef();
  const formRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      [formRef.current, mapRef.current],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );
  }, []);

  return (
    <div
      ref={sectionRef}
      className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] min-h-screen py-24 px-6 md:px-12 text-white"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">Entre em Contato</h2>
        <p className="text-lg text-white/70 mb-16 max-w-3xl mx-auto leading-relaxed">
          Fale conosco para saber como podemos ajudar a transformar seu negócio com inovação e tecnologia.
        </p>
      </div>

      {/* Contenedor de las dos columnas */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Columna del formulario */}
        <section
          ref={formRef}
          className="bg-[#1F0037] bg-opacity-60 p-8 rounded-2xl shadow-xl"
        >
          <h3 className="text-2xl font-semibold mb-6">Envie uma mensagem</h3>
          <form className="space-y-6">
            <div>
              <label className="block text-white/80 mb-2" htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-4 bg-transparent border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label className="block text-white/80 mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-4 bg-transparent border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Seu email"
              />
            </div>
            <div>
              <label className="block text-white/80 mb-2" htmlFor="message">Mensagem</label>
              <textarea
                id="message"
                name="message"
                className="w-full p-4 bg-transparent border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Sua mensagem"
                rows="6"
              ></textarea>
            </div>
            {/* Botón de envio */}
            <div className="text-right">
              <button
                type="submit"
                className="px-6 py-3 bg-green-400 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-green-300 transition duration-300"
              >
                Enviar mensagem
              </button>
            </div>
          </form>
        </section>

        {/* Columna de Google Maps */}
        <section
          ref={mapRef}
          className="bg-[#1F0037] bg-opacity-60 p-8 rounded-2xl shadow-xl"
        >
          <h3 className="text-2xl font-semibold mb-6">Nossa localização</h3>
          <div className="w-full h-64 rounded-lg overflow-hidden shadow-md">
            <iframe
              title="Google Maps"
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.1701352869744!2d-49.28035968422623!3d-25.452136733991415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce5977efba197%3A0xd0e8c96ff30d68d7!2sR.%20Martim%20Afonso%2C%202041%20-%20Bigorrilho%2C%20Curitiba%20-%20PR%2C%2080730-030!5e0!3m2!1ses-419!2smx!4v1682180878909!5m2!1ses-419!2smx"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
}
