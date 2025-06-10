// Configuración centralizada de constantes
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://jiga-store.vercel.app',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  CART: 'cart',
  SELECTED_CATEGORY: 'selectedCategory',
  CHAT_MESSAGES: 'chatMessages',
};

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  CONTACT: '/contact',
  FAQ: '/faq',
  MARKETPLACE: '/marketplace',
  PRODUCT: '/marketplace/product',
  CART: '/cart',
  CHECKOUT: '/checkout',
  LOGIN: '/login',
  REGISTER: '/register',
  ADMIN_PRODUCTS: '/admin/products',
};

export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
};

export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
};

export const PEXELS_CONFIG = {
  API_KEY: 'WgEFc1OdZHGljXkaxzp9AmeWuAcabpG68bIhOGS6tjawjmvS72Vu4xJH',
  BASE_URL: 'https://api.pexels.com/v1/search',
};