import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        {/* Sección de navegación */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Navegação</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Sobre</a></li>
            <li><a href="#" className="hover:text-white">Soluções</a></li>
            <li><a href="#" className="hover:text-white">Cases</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
          </ul>
        </div>

        {/* Sección de soluciones */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Soluções</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white">Gestão de TI</a></li>
            <li><a href="#" className="hover:text-white">Big Data & Analytics</a></li>
            <li><a href="#" className="hover:text-white">Chatbot & IA</a></li>
            <li><a href="#" className="hover:text-white">RPA como Serviço</a></li>
            <li><a href="#" className="hover:text-white">Transformação Digital</a></li>
          </ul>
        </div>

        {/* Sección de contacto */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contato</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Telefone: (11) 1234-5678</li>
            <li>Email: suporte@jiga.com.br</li>
            <li>Endereço: Rua Martim Afonso, 2041 - Curitiba, PR</li>
          </ul>
        </div>

        {/* Sección de redes sociales */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <FaLinkedinIn />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Jiga Soluções. Todos os direitos reservados.
      </div>
    </footer>
  );
}
