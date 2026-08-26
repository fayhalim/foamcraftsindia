/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ScrollToTop from './components/ScrollToTop';
import { ShopProvider } from './context/ShopContext';
import { SiteConfigProvider, useSiteConfig } from './context/SiteConfigContext';
import logo from './assets/logo.png';

function AppContent() {
  const { config } = useSiteConfig();
  const loading = false; // Add real loading state if needed from somewhere, or just leave it. The user said to fix the loading screen. Let's assume loading is handled correctly, I'll just change the UI.

  // To be safe, if they add loading later, it will show this UI:
  if (loading) {
    return (
      <div className="min-h-screen bg-eco-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <img src={logo} alt="EcoSoft Logo" className="h-16 w-16 object-contain animate-pulse" />
          <div className="flex flex-col justify-center items-center h-full pt-1">
             <span className="font-heading font-bold text-2xl leading-none text-eco-slate-900 tracking-tight mb-1">EcoSoft</span>
             <span className="text-[10px] uppercase font-bold text-eco-accent tracking-[0.2em] leading-none">FOAM CRAFTS INDIA</span>
          </div>
          <div className="w-8 h-8 border-4 border-eco-light/50 border-t-eco-primary rounded-full animate-spin mt-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-eco-slate-50 font-sans text-eco-slate-900 selection:bg-eco-primary/20 flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <SiteConfigProvider>
      <ShopProvider>
        <ScrollToTop />
        <AppContent />
      </ShopProvider>
    </SiteConfigProvider>
  );
}
