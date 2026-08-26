import { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data';
import { useShop } from '../context/ShopContext';
import { Search, Filter, ChevronRight, Heart, Star } from 'lucide-react';
import premiumImage from '../assets/images/premium_mattress_hero_1784105146436.jpg';

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const { wishlist, toggleWishlist, products } = useShop();
  
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.type === activeCategory || p.name.includes(activeCategory));

  return (
    <div className="bg-eco-slate-50 min-h-screen pb-24">
      {/* Page Header */}
      <div className="bg-eco-slate-900 text-white py-24 relative overflow-hidden mt-20">
        <div className="absolute inset-0 z-0 opacity-30">
          <img src={premiumImage} alt="Premium Mattress background" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-eco-slate-900 via-eco-slate-900/90 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-eco-primary font-bold text-xs uppercase tracking-widest mb-6">
            <Link to="/" className="hover:text-eco-light transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span>Shop</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">Premium Mattresses</h1>
          <p className="text-eco-light/80 max-w-2xl text-lg leading-relaxed">
            Discover our complete range of high-quality, orthopedic, and memory foam mattresses tailored for your perfect sleep.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar / Filters */}
          <div className="w-full lg:w-72 shrink-0 space-y-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-eco-light/60">
              <h3 className="font-heading font-bold text-eco-slate-900 mb-6 flex items-center gap-2 text-lg">
                <Filter size={18} className="text-eco-primary" /> Categories
              </h3>
              <div className="space-y-1">
                <button 
                  onClick={() => setActiveCategory("All")}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${activeCategory === "All" ? 'bg-eco-primary text-white shadow-md shadow-eco-primary/20' : 'text-eco-slate-900/70 hover:bg-eco-light hover:text-eco-slate-900'}`}
                >
                  All Products
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${activeCategory === cat ? 'bg-eco-primary text-white shadow-md shadow-eco-primary/20' : 'text-eco-slate-900/70 hover:bg-eco-light hover:text-eco-slate-900'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-eco-slate-900 to-eco-dark p-8 rounded-3xl border border-white/10 text-center shadow-xl shadow-eco-primary/10">
              <h4 className="font-heading font-bold text-white mb-3 text-lg">Need a custom size?</h4>
              <p className="text-sm text-eco-light/80 mb-6 leading-relaxed">We manufacture mattresses tailored to your exact bed frame dimensions.</p>
              <a href="#contact" className="inline-block w-full text-center px-6 py-3 bg-white text-eco-slate-900 font-bold rounded-full hover:bg-eco-light transition-colors hover:scale-105 transform duration-300 shadow-lg shadow-black/10">
                Contact Us
              </a>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 pb-6 border-b border-eco-light/60">
              <span className="text-eco-slate-900/60 font-medium">Showing <span className="font-bold text-eco-slate-900">{filteredProducts.length}</span> premium products</span>
              
              <div className="flex items-center w-full sm:w-auto">
                <div className="relative w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-eco-slate-900/40" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search mattresses..." 
                    className="pl-12 pr-6 py-3 bg-white border border-eco-light rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-eco-primary/50 focus:border-eco-primary w-full md:w-72 shadow-sm transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id} className="group flex flex-col bg-white rounded-3xl border border-eco-light/60 overflow-hidden hover:shadow-2xl hover:shadow-eco-primary/10 transition-all duration-500 hover:-translate-y-1">
                  <div className="aspect-[4/3] overflow-hidden bg-eco-slate-50 relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur text-eco-slate-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                        {product.type}
                      </span>
                    </div>
                    <button 
                      onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
                      className={`absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur shadow-sm transition-transform hover:scale-110 duration-300 ${wishlist.includes(product.id) ? 'text-red-500' : 'text-eco-slate-900/40 hover:text-red-500'}`}
                    >
                      <Heart size={18} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < Math.floor(product.rating || 5) ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-200 text-slate-200'} />
                      ))}
                      <span className="text-xs font-semibold text-eco-slate-900/50 ml-1">({product.reviews || 0})</span>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-eco-slate-900 mb-2 leading-tight group-hover:text-eco-primary transition-colors">{product.name}</h3>
                    <p className="text-eco-slate-900/60 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">{product.description}</p>
                    
                    <div className="pt-5 border-t border-eco-light/50 flex items-center justify-between mt-auto">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-eco-slate-900/40 tracking-wider mb-1">Starting from</span>
                        <span className="font-heading font-bold text-lg text-eco-slate-900">₹{product.basePrice.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-eco-light text-eco-dark flex items-center justify-center group-hover:bg-eco-primary group-hover:text-white transition-colors duration-300">
                        <ChevronRight size={20} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-24 bg-white rounded-3xl border border-eco-light/60">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-eco-light text-eco-primary/50 mb-6">
                  <Search size={32} />
                </div>
                <h3 className="text-2xl font-heading font-bold text-eco-slate-900 mb-3">No products found</h3>
                <p className="text-eco-slate-900/60">Try adjusting your filters or search query to find what you're looking for.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
