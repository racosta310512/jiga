import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus, LogOut, ShoppingCart, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Logo from '../../../assets/logo1.png';
import { ROUTES } from '../../../config/constants';
import useAuthStore from '../../../stores/authStore';
import useCartStore from '../../../stores/cartStore';
import useUIStore from '../../../stores/uiStore';
import Button from '../../ui/Button/Button';

const navItems = [
  { label: 'INÍCIO', path: ROUTES.HOME },
  { label: 'QUEM SOMOS', path: ROUTES.ABOUT },
  { label: 'SERVIÇOS', path: ROUTES.SERVICES },
  { label: 'CONTATO', path: ROUTES.CONTACT },
  { label: 'PREGUNTAS', path: ROUTES.FAQ },
];

/**
 * Componente Navbar optimizado
 */
const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { getItemCount } = useCartStore();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();

  const cartItemCount = getItemCount();

  // Cerrar menú móvil en resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        closeMobileMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [closeMobileMenu]);

  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  const NavLink = ({ to, children, onClick, className = '' }) => (
    <Link
      to={to}
      onClick={onClick}
      className={`hover:text-green-400 hover:underline transition duration-200 ${className}`}
    >
      {children}
    </Link>
  );

  return (
    <header className="fixed top-0 w-full bg-[#1F0037] bg-opacity-90 px-6 py-4 shadow-lg z-50 backdrop-blur-sm">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to={ROUTES.HOME}>
          <img src={Logo} alt="Logotipo" className="w-12 h-6" />
        </Link>

        {/* Botón menú móvil */}
        <button
          className="lg:hidden text-white"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navegación escritorio */}
        <nav className="hidden lg:flex flex-1 justify-end space-x-6 text-white/90 text-sm font-medium items-center">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path}>
              {item.label}
            </NavLink>
          ))}

          <NavLink to={ROUTES.MARKETPLACE} className="flex items-center space-x-1">
            <ShoppingBag size={18} />
            <span>LOJA</span>
          </NavLink>

          <NavLink to={ROUTES.CART} className="flex items-center space-x-1">
            <ShoppingCart size={18} />
            <span>({cartItemCount})</span>
          </NavLink>

          {!isAuthenticated ? (
            <>
              <NavLink to={ROUTES.LOGIN} className="flex items-center space-x-1">
                <LogIn size={18} />
                <span>Entrar</span>
              </NavLink>
              <NavLink to={ROUTES.REGISTER} className="flex items-center space-x-1">
                <UserPlus size={18} />
                <span>Criar conta</span>
              </NavLink>
            </>
          ) : (
            <>
              <span className="text-green-400 font-semibold">
                Olá, {user?.name || 'Usuário'}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-1 text-red-400 hover:text-red-600"
              >
                <LogOut size={18} />
                <span>Sair</span>
              </Button>
            </>
          )}
        </nav>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden mt-4"
          >
            <nav className="space-y-2 text-white/90 text-sm font-medium text-right">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className="block"
                >
                  {item.label}
                </NavLink>
              ))}

              <NavLink
                to={ROUTES.MARKETPLACE}
                onClick={closeMobileMenu}
                className="block flex items-center justify-end space-x-1"
              >
                <ShoppingBag size={18} />
                <span>Marketplace</span>
              </NavLink>

              <NavLink
                to={ROUTES.CART}
                onClick={closeMobileMenu}
                className="block flex items-center justify-end space-x-1"
              >
                <ShoppingCart size={18} />
                <span>Carrito ({cartItemCount})</span>
              </NavLink>

              {!isAuthenticated ? (
                <>
                  <NavLink to={ROUTES.LOGIN} onClick={closeMobileMenu} className="block">
                    🔑 Entrar
                  </NavLink>
                  <NavLink to={ROUTES.REGISTER} onClick={closeMobileMenu} className="block">
                    📝 Criar conta
                  </NavLink>
                </>
              ) : (
                <>
                  <div className="text-green-400 font-semibold">
                    👤 {user?.name || 'Usuário'}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-right text-red-400 hover:text-red-600 transition duration-200"
                  >
                    🚪 Sair
                  </button>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;