import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import Layout from '../src/components/layout/Layout';

// Pages
import Home from '../src/pages/Home';
import About from '../src/pages/About';
import Services from '../src/pages/Services';
import Contact from '../src/pages/Contact';
import FAQ from '../src/pages/FAQ';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';

// Marketplace
import Marketplace from '../src/pages/Marketplace/Marketplace';
import ProductPage from '../src/pages/Marketplace/ProductPage';
import CartPage from '../src/pages/Marketplace/CartPage';
import CheckoutPage from '../src/pages/Marketplace/CheckoutPage';

// Admin
import AdminProductPage from '../src/pages/Admin/AdminProductPage';

// Components
import PrivateRoute from '../src/components/common/PrivateRoute/PrivateRoute';
// import ChatWidget from '../src/components/features/ChatWidget/ChatWidget';

// Config
import { ROUTES } from '../src/config/constants';

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
      {/*<ChatWidget />*/}
    </Router>
  );
}

export default App;