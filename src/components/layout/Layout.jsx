import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import BackToTop from '../common/BackToTop/BackToTop';
import ScrollToTop from '../common/ScrollToTop/ScrollToTop';
import NotificationContainer from '../ui/Notification/Notification';
import useAuthStore from '../../stores/authStore'; // ✅ Corrección aquí

const Layout = () => {
  const { user } = useAuthStore(); // ✅ Usamos el store correcto

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3F00FF] to-[#069494] text-white font-sans">
      <Navbar key={user?.id || 'guest'} />
      <main className="pt-24">
        <BackToTop />
        <ScrollToTop />
        <Outlet />
      </main>
      <Footer />
      <NotificationContainer />
    </div>
  );
};

export default Layout;

