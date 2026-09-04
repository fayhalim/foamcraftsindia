import { motion } from 'motion/react';
import { ChevronRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import premiumImage from '../assets/images/premium_mattress_hero_1784105146436.jpg';

export default function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-eco-slate-900 text-white min-h-[90vh] flex items-center">
      {/* Background image overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={premiumImage}
          alt="Premium Comfortable mattress"
          className="w-full h-full object-cover opacity-30 object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-eco-slate-900 via-eco-slate-900/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-eco-slate-900/50 to-transparent"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          {/* Centered Badge Layout */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center justify-center gap-2 mx-auto sm:mx-0 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-eco-primary shadow-[0_0_8px_rgba(75,175,71,0.8)] animate-pulse shrink-0"></span>
            <span 
              style={{ fontSize: "11.9px" }} 
              className="font-semibold text-eco-light/80 tracking-wide text-center"
            >
              Premium Mattress Manufacturer in Varanasi
            </span>
          </motion.div>


        {/* 1. Main Heading (Clean & Punchy Brand Identity) */}
        <h1 className="font-heading font-bold tracking-tight mb-3 leading-[1.2]">
          
          {/* CONTROL ECOSOFT SIZE HERE: Change "36px" up or down */}
          <span 
            style={{ fontSize: "34.5px" }} 
            className="text-white block"
          >
            Foam Crafts India
          </span>
          
          {/* CONTROL FOAM CRAFTS SIZE HERE: Change "32px" up or down */}
          <span 
            style={{ fontSize: "30px" }} 
            className="text-transparent bg-clip-text bg-gradient-to-r from-eco-primary to-eco-light block mt-1"
          >
            Crafting Comfort With Ecosoft
          </span>

        </h1>

        {/* 2. Slogan (Moved outside h1, given its own clean typography layout) */}
        <p className="text-xl lg:text-1.4xl font-semibold text-eco-light tracking-wide mb-6 italic opacity-90">
          Better Sleep. Better Life.
        </p>


        {/* 3. Description Paragraph (Your rich local SEO keywords from your exact text) */}
        <p className="text-base lg:text-lg text-eco-light/80 mb-10 leading-relaxed max-w-2xl font-medium">
          Foam Crafts India is a premier mattress manufacturer in Varanasi, producing high-quality ecosoft mattresses. We specialize in custom-sized orthopedic foam, body-contouring memory foam, and premium mattress manufacture for residential homes, hotels, and hospitals across India.
        </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <Link to="/shop" className="btn-premium px-8 py-4 text-base shadow-eco-primary/20 gap-3 group">
              View Our Products
              <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="tel:+917518233001" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/5 text-white font-semibold hover:bg-white/10 backdrop-blur-md transition-all duration-300 border border-white/10 hover:border-white/30 text-base gap-2">
              <Phone size={20} />
              Call Now
            </a>
            <a href="https://wa.me/917518233001?text=Hello%20EcoSoft%20Foam%20Crafts%20India,%20I%20would%20like%20to%20know%20more%20about%20your%20mattresses." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#128C7E] transition-all duration-300 shadow-lg shadow-[#25D366]/30 text-base gap-2">
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
