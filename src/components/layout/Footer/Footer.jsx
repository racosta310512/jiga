import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { ROUTES } from '../../../config/constants';

const footerSections = [
  {
    title: 'Navegação',
    links: [
      { label: 'Home', href: ROUTES.HOME },
      { label: 'Sobre', href: ROUTES.ABOUT },
      { label: 'Soluções', href: ROUTES.SERVICES },
      { label: 'Contatos', href: ROUTES.CONTACT },
      { label: 'Preguntas', href: ROUTES.FAQ },
    ],
  },
  {
    title: 'Contato',
    content: [
      'Telefone: (11) 1234-5678',
      'Email: suporte@jiga.com.br',
      'Endereço: Rua Martim Afonso, 2041 - Curitiba, PR',
    ],
  },
];

const socialLinks = [
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
];

/**
 * Componente Footer optimizado
 */
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Secciones de navegación y contacto */}
        {footerSections.map((section) => (
          <div key={section.title}>
            <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
            
            {section.links ? (
              <ul className="space-y-2 text-sm text-gray-300">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-2 text-sm text-gray-300">
                {section.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Redes sociales */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
          <div className="flex space-x-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Jiga Soluções. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;