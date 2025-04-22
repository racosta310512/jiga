import React from "react";

export default function Contact() {
  return (
    <div className="p-8 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-4xl font-semibold text-center text-white mb-8">Entre em contato</h2>

      {/* Contenedor de las dos columnas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Columna del formulario */}
        <section className="p-6 bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-white mb-6">Envie uma mensagem</h3>
          <form className="space-y-6">
            <div>
              <label className="block text-white/80" htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-1/2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label className="block text-white/80" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-1/2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Seu email"
              />
            </div>
            <div>
              <label className="block text-white/80" htmlFor="message">Mensagem</label>
              <textarea
                id="message"
                name="message"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Sua mensagem"
                rows="6"
              ></textarea>
            </div>
            {/* Botón de envío alineado a la derecha */}
            <div className="text-right">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
              >
                Enviar mensagem
              </button>
            </div>
          </form>
        </section>

        {/* Columna de Google Maps */}
        <section className="p-6 bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-white mb-6">Nossa localização</h3>
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
