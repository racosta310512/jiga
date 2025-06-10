import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import BackToTop from '../common/BackToTop/BackToTop';
import ScrollToTop from '../common/ScrollToTop/ScrollToTop';
import NotificationContainer from '../ui/Notification/Notification';

/**
 * Layout principal de la aplicación
 */
const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3F00FF] to-[#069494] text-white font-sans">
      <Navbar />
      
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