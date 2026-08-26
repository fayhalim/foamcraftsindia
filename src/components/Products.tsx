import { products, clients } from '../data';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Products() {
  return (
    <section id="products" className="py-24 bg-eco-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-48 -mt-48 w-96 h-96 rounded-full bg-eco-primary/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-48 -mb-48 w-96 h-96 rounded-full bg-eco-accent/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Products List */}
          <div>
            <div className="mb-10">
              <span className="text-eco-primary font-bold tracking-widest text-xs uppercase mb-3 block">Premium Selection</span>
              <h2 className="text-4xl font-heading font-bold text-eco-slate-900 mb-4 tracking-tight">Our Product Range</h2>
              <p className="text-eco-slate-900/60 leading-relaxed max-w-md">Discover our comprehensive collection of sleep solutions, engineered for every type of sleeper.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {products.map((product, idx) => (
                <div key={idx} className="group flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm shadow-eco-slate-900/5 border border-eco-light/60 hover:border-eco-primary/30 hover:shadow-md hover:shadow-eco-primary/10 transition-all duration-300">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-eco-light flex items-center justify-center text-eco-primary group-hover:scale-110 group-hover:bg-eco-primary group-hover:text-white transition-all duration-300">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="font-semibold text-eco-slate-900">{product.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Who We Serve */}
          <div>
            <div className="mb-10">
              <span className="text-eco-primary font-bold tracking-widest text-xs uppercase mb-3 block">Trusted Partners</span>
              <h2 className="text-4xl font-heading font-bold text-eco-slate-900 mb-4 tracking-tight">Who We Serve</h2>
              <p className="text-eco-slate-900/60 leading-relaxed max-w-md">Proudly supplying premium mattresses to homes and institutions across the country.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {clients.map((client, idx) => (
                <div key={idx} className="flex items-center gap-4 p-5 bg-eco-slate-900 text-white rounded-2xl shadow-sm border border-white/5 hover:bg-eco-slate-900/90 transition-colors">
                  <div className="w-2.5 h-2.5 rounded-full bg-eco-primary shadow-[0_0_8px_rgba(75,175,71,0.5)]" />
                  <span className="font-medium text-eco-light">{client}</span>
                </div>
              ))}
            </div>
            <div className="p-8 bg-white rounded-3xl border border-eco-light/60 shadow-lg shadow-eco-primary/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-eco-primary/5 rounded-bl-[100px] -mr-8 -mt-8"></div>
              <div className="flex gap-4 items-start relative z-10">
                <ShieldCheck size={32} className="text-eco-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-heading font-bold text-eco-slate-900 mb-2">Our Commitment</h4>
                  <p className="text-eco-slate-900/70 leading-relaxed text-sm">
                    "We are dedicated to providing sleep solutions that meet the highest standards of quality, using eco-friendly materials and advanced craftsmanship for your perfect rest."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
