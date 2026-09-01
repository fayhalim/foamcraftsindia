import { Phone, Menu, X, ShoppingCart, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useSiteConfig } from '../context/SiteConfigContext';
import logo from '../assets/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useShop();
  const { config } = useSiteConfig();
  const navigate = useNavigate();
  const location = useLocation();

  const phoneNumber = "+917518233001";
  const whatsappLink = `https://wa.me/917518233001?text=${encodeURIComponent("Hello EcoSoft Foam Crafts India, I would like to know more about your mattresses.")}`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top, behavior: 'smooth' });
        } else if (id === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: 'smooth' });
      } else if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-eco-light/50 py-1' : 'bg-white py-3'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* LEFT SIDE: Brand */}
          <Link to="/" onClick={() => scrollToSection('home')} className="flex items-center gap-4 group cursor-pointer">
            <img src={logo} alt="Ecosoft Logo" className="h-14 w-14 object-contain transition-transform duration-500 group-hover:scale-105" />
            <div className="flex flex-col justify-center h-full pt-1">
              <span className="font-heading font-bold text-2xl leading-none text-eco-slate-900 tracking-tight mb-1">EcoSoft</span>
              <span className="text-[10px] uppercase font-bold text-eco-accent tracking-[0.2em] leading-none">FOAM CRAFTS INDIA</span>
            </div>
          </Link>

          {/* CENTER: Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <button onClick={() => scrollToSection('home')} className={`text-sm font-semibold hover:text-eco-primary transition-colors ${location.pathname === '/' && !location.hash ? 'text-eco-primary' : 'text-eco-slate-900'}`}>Home</button>
            <button onClick={() => scrollToSection('about')} className="text-sm font-semibold text-eco-slate-900 hover:text-eco-primary transition-colors">About Us</button>
            <Link to="/shop" className={`text-sm font-semibold hover:text-eco-primary transition-colors ${location.pathname === '/shop' ? 'text-eco-primary' : 'text-eco-slate-900'}`}>Shop Mattresses</Link>
            <button onClick={() => scrollToSection('features')} className="text-sm font-semibold text-eco-slate-900 hover:text-eco-primary transition-colors">Why Choose Us</button>
            <button onClick={() => scrollToSection('contact')} className="text-sm font-semibold text-eco-slate-900 hover:text-eco-primary transition-colors">Contact</button>
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/cart" className="relative p-2 mr-2 text-eco-slate-900 hover:text-eco-primary transition-colors group">
              <ShoppingCart size={22} className="transition-transform duration-300 group-hover:scale-110" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white transform translate-x-1/4 -translate-y-1/4 bg-eco-primary rounded-full border-2 border-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors" title="WhatsApp Us">
              <MessageCircle size={20} />
            </a>
            <a href={`tel:${phoneNumber}`} className="btn-premium gap-2 shadow-eco-primary/20">
              <Phone size={16} />
              Call Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <Link to="/cart" className="relative p-2 text-eco-slate-900">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white transform translate-x-1/4 -translate-y-1/4 bg-eco-primary rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <button className="p-2 text-eco-slate-900 hover:text-eco-primary transition-colors" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-eco-light/50 shadow-xl transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-6 flex flex-col gap-5">
          <button onClick={() => scrollToSection('home')} className="font-semibold text-lg text-left text-eco-slate-900">Home</button>
          <button onClick={() => scrollToSection('about')} className="font-semibold text-lg text-left text-eco-slate-900">About Us</button>
          <Link to="/shop" className="font-semibold text-lg text-eco-slate-900" onClick={() => setIsOpen(false)}>Shop Mattresses</Link>
          <button onClick={() => scrollToSection('features')} className="font-semibold text-lg text-left text-eco-slate-900">Why Choose Us</button>
          <button onClick={() => scrollToSection('contact')} className="font-semibold text-lg text-left text-eco-slate-900">Contact</button>
          <div className="pt-4 border-t border-eco-light/50 flex flex-col gap-3">
            <a href={`tel:${phoneNumber}`} className="btn-premium w-full gap-2 justify-center">
              <Phone size={18} />
              Call {phoneNumber}
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold gap-2 shadow-lg shadow-[#25D366]/30">
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
