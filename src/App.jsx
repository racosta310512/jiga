import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Contact from './pages/Contact/Contact';
import FAQ from './pages/FAQ/FAQ';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Marketplace
import Marketplace from './pages/Marketplace/Marketplace';
import ProductPage from './pages/Marketplace/ProductPage';
import CartPage from './pages/Marketplace/CartPage';
import CheckoutPage from './pages/Marketplace/CheckoutPage';

// Admin
import AdminProductPage from './pages/Admin/AdminProductPage';

// Components
import PrivateRoute from './components/common/PrivateRoute/PrivateRoute';
import ChatWidget from './components/features/ChatWidget/ChatWidget';

// Config
import { ROUTES } from './config/constants';

/**
 * Componente principal de la aplicación
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.SERVICES} element={<Services />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path={ROUTES.FAQ} element={<FAQ />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          
          {/* Marketplace */}
          <Route path={ROUTES.MARKETPLACE} element={<Marketplace />} />
          <Route path={`${ROUTES.PRODUCT}/:id`} element={<ProductPage />} />
          <Route path={ROUTES.CART} element={<CartPage />} />
          <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
          
          {/* Admin Routes */}
          <Route
            path={ROUTES.ADMIN_PRODUCTS}
            element={
              <PrivateRoute>
                <AdminProductPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
      
      {/* Chat Widget Global */}
      <ChatWidget />
    </Router>
  );
}

export default App;