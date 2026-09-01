import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import Features from '../components/Features';
import Products from '../components/Products';
import ContactSection from '../components/ContactSection';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Home() {
  const { products } = useShop();
  
  return (
    <>
      <Hero />
      <AboutUs />
      <Features />
      
      {/* Featured Products Preview */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-eco-slate-50/50 to-white/50 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">

            <div className="max-w-2xl">
              <span className="text-eco-primary font-bold tracking-widest text-xs uppercase mb-3 block">Discover Comfort</span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-eco-slate-900 mb-6 tracking-tight">Our Best Sellers</h2>
              <p className="text-lg text-eco-slate-900/60 leading-relaxed">Experience unparalleled comfort and superior support with our most popular premium mattresses, crafted for your ultimate rest.</p>
            </div>
            
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-eco-primary font-semibold hover:text-eco-dark transition-colors group">
              View All Collection <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.slice(0, 3).map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="group flex flex-col bg-white rounded-3xl border border-eco-light/60 overflow-hidden hover:shadow-2xl hover:shadow-eco-primary/10 transition-all duration-500 hover:-translate-y-1">
                <div className="aspect-[4/3] overflow-hidden bg-eco-slate-50 relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur text-eco-slate-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                      {product.type}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < Math.floor(product.rating || 5) ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-200 text-slate-200'} />
                    ))}
                    <span className="text-xs font-semibold text-eco-slate-900/50 ml-2">({product.reviews || 0})</span>
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-eco-slate-900 mb-3 group-hover:text-eco-primary transition-colors">{product.name}</h3>
                  <p className="text-eco-slate-900/60 mb-8 line-clamp-2 leading-relaxed flex-grow">{product.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-eco-light/50">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-eco-slate-900/40 tracking-wider mb-1">Starting from</span>
                      <span className="font-heading font-bold text-xl text-eco-slate-900">₹{product.basePrice.toLocaleString('en-IN')}</span>
                    </div>
                    <span className="btn-premium px-5 py-2 hover:-translate-y-0 shadow-none hover:shadow-eco-primary/20">View Details</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/shop" className="inline-flex items-center justify-center w-full px-6 py-4 rounded-full bg-eco-light text-eco-dark font-semibold hover:bg-eco-primary hover:text-white transition-colors">
              View All Collection
            </Link>
          </div>
        </div>
      </section>
      <Products />
      <ContactSection />
    </>
  );
}
