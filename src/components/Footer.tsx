import { MapPin, Phone, Mail, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteConfig } from '../context/SiteConfigContext';
import logo from '../assets/logo.png';

export default function Footer() {
  const { config } = useSiteConfig();

  return (
    <footer className="bg-eco-slate-900 text-eco-slate-50 py-16 border-t border-eco-dark/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-4 group">
              <img src={logo} alt="EcoSoft Logo" className="h-14 w-14 object-contain transition-transform duration-500 group-hover:scale-105 filter brightness-0 invert" />
              <div className="flex flex-col justify-center h-full pt-1">
                <span className="font-heading font-bold text-2xl leading-none text-white tracking-tight mb-1">EcoSoft</span>
                <span className="text-[10px] uppercase font-bold text-eco-light tracking-[0.2em] leading-none">FOAM CRAFTS INDIA</span>
              </div>
            </Link>
            <p className="text-eco-light/80 leading-relaxed max-w-sm">
              Your trusted partner for premium, customized, and bulk mattress solutions. Quality craftsmanship tailored for your perfect sleep.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-sm font-medium border border-white/10 backdrop-blur-sm">
              <Building2 size={16} className="text-eco-primary" />
              GSTIN: 09BZQPA8675R1Z5
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-eco-light/80 hover:text-eco-primary transition-colors">Home</Link></li>
              <li><Link to="/shop" className="text-eco-light/80 hover:text-eco-primary transition-colors">Our Products</Link></li>
              <li><Link to="/cart" className="text-eco-light/80 hover:text-eco-primary transition-colors">Shopping Cart</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-heading font-bold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-eco-light/80">
                <MapPin className="text-eco-primary shrink-0 mt-1" size={20} />
                <span className="leading-relaxed whitespace-pre-line">
                  {config.businessAddress}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-eco-primary shrink-0" size={20} />
                <a href={`tel:${config.contactNumber.replace(/[^0-9+]/g, '')}`} className="text-eco-light/80 hover:text-eco-primary transition-colors">
                  {config.contactNumber}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-eco-primary shrink-0" size={20} />
                <a href={`mailto:${config.emailAddress}`} className="text-eco-light/80 hover:text-eco-primary transition-colors">
                  {config.emailAddress}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-eco-light/60 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} {config.companyName}. All rights reserved.</p>
          <p className="flex items-center gap-1">Crafted with <span className="text-eco-primary">♥</span> in India</p>
        </div>
      </div>
    </footer>
  );
}
