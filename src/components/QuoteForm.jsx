import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import gsap from 'gsap';

export default function QuoteForm({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Aquí puedes manejar el envío de datos, por ejemplo, enviarlos a un servidor
  };

  useEffect(() => {
    gsap.fromTo(
      '.quote-form',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="quote-form bg-[#1F0037] bg-opacity-60 p-8 rounded-2xl shadow-xl w-full max-w-lg text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Solicitar Cotización</h2>

        <input
          type="text"
          placeholder="Nombre completo"
          {...register('name', { required: 'Este campo es obligatorio' })}
          className={`w-full p-4 bg-transparent border ${
            errors.name ? 'border-red-500' : 'border-white/30'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-4`}
        />
        {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>}

        <input
          type="email"
          placeholder="Correo electrónico"
          {...register('email', {
            required: 'Este campo es obligatorio',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Correo electrónico inválido',
            },
          })}
          className={`w-full p-4 bg-transparent border ${
            errors.email ? 'border-red-500' : 'border-white/30'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-4`}
        />
        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}

        <input
          type="tel"
          placeholder="Teléfono de contacto"
          {...register('phone', {
            required: 'Este campo es obligatorio',
            pattern: {
              value: /^[0-9+\s()-]+$/,
              message: 'Número de teléfono inválido',
            },
          })}
          className={`w-full p-4 bg-transparent border ${
            errors.phone ? 'border-red-500' : 'border-white/30'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-4`}
        />
        {errors.phone && <p className="text-red-500 text-sm mb-2">{errors.phone.message}</p>}

        <input
          type="text"
          placeholder="Empresa o razón social"
          {...register('company')}
          className="w-full p-4 bg-transparent border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
        />

        <label className="block mb-2">Tipo de servicio requerido:</label>
        <div className="relative">
          <select
            {...register('serviceType', { required: 'Seleccione un tipo de servicio' })}
            className={`w-full p-4 bg-[#1F0037] bg-opacity-90 rounded-2xl shadow-xxl text-white border ${
              errors.serviceType ? 'border-red-500' : 'border-white/30'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-4 appearance-none`}
          >
            <option value="">Seleccione una opción</option>
            <option value="desarrollo_web">Desarrollo Web</option>
            <option value="aplicaciones_móviles">Aplicaciones Móviles</option>
            <option value="diseño_gráfico">Diseño Gráfico</option>
            <option value="marketing_digital">Marketing Digital</option>
            <option value="otro">Otro</option>
          </select>
          <svg
            className="w-5 h-5 absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {errors.serviceType && <p className="text-red-500 text-sm mb-2">{errors.serviceType.message}</p>}

        <label className="block mb-2">Fecha límite para la entrega:</label>
        <div className="relative mb-4">
          <input
            type="date"
            {...register('deadline', { required: 'Este campo es obligatorio' })}
            className={`w-full p-4 bg-transparent border ${
              errors.deadline ? 'border-red-500' : 'border-white/30'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400`}
          />
          <svg
            className="w-5 h-5 absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 4h10a2 2 0 012 2v9a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z" />
          </svg>
        </div>
        {errors.deadline && <p className="text-red-500 text-sm mb-2">{errors.deadline.message}</p>}

        <input
          type="number"
          placeholder="Presupuesto estimado (BRL)"
          {...register('budget', {
            required: 'Este campo es obligatorio',
            min: { value: 0, message: 'El presupuesto debe ser mayor o igual a 0' },
          })}
          className={`w-full p-4 bg-transparent border ${
            errors.budget ? 'border-red-500' : 'border-white/30'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-4`}
        />
        {errors.budget && <p className="text-red-500 text-sm mb-2">{errors.budget.message}</p>}

        <textarea
          placeholder="Mensaje adicional o descripción detallada"
          {...register('message')}
          className="w-full p-4 bg-transparent border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-4 resize-none"
          rows={4}
        />

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            {...register('terms', { required: 'Debe aceptar los términos y condiciones' })}
            className="mr-2"
          />
          <label className="text-sm">
            Acepto los <a href="/terminos" className="underline">términos y condiciones</a>
          </label>
        </div>
        {errors.terms && <p className="text-red-500 text-sm mb-2">{errors.terms.message}</p>}

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 mr-2 bg-gray-500 text-white py-3 rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="w-1/2 ml-2 bg-green-400 text-gray-900 py-3 rounded-lg shadow-md hover:bg-green-300 transition duration-300"
          >
            Enviar Solicitud
          </button>
        </div>
      </form>
    </div>
  );
}
