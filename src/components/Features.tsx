import { Sparkles, Maximize, Tag, Truck, Boxes, MapPin, Heart, Shield, Wind, Banknote, Clock, HeadphonesIcon, Leaf, Settings } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

const features = [
  { icon: Sparkles, title: 'Premium Quality', desc: 'Crafted with absolute precision using only the finest high-grade comfort materials.' },
  { icon: Boxes, title: 'High-Density Foam', desc: 'Providing optimal structural support and effectively preventing sagging over time.' },
  { icon: Heart, title: 'Orthopedic Support', desc: 'Expertly designed to align your spine and eliminate painful pressure points.' },
  { icon: Shield, title: 'Lasting Durability', desc: 'Intentionally built to withstand regular daily use while maintaining perfect shape.' },
  { icon: Wind, title: 'Breathable Fabrics', desc: 'Actively promoting cooling airflow to keep you refreshed all night long.' },
  { icon: Banknote, title: 'Affordable Rates', desc: 'Delivering a premium sleep experience at rates that fit your budget.' },
  { icon: Maximize, title: 'Custom Sizes', desc: 'Tailored perfectly to match any specific bed frame dimensions you require.' },
  { icon: Factory, title: 'Direct Manufacturer', desc: 'Eliminating expensive middleman costs to pass massive savings.' },
  { icon: Truck, title: 'Fast Delivery', desc: 'Ensuring your brand new mattress reaches your doorstep safely and quickly.' },
  { icon: HeadphonesIcon, title: 'Customer Support', desc: 'Our dedicated team provides complete guidance before and after your purchase.' },
  { icon: Leaf, title: 'Eco Friendly', desc: 'Using safe, non-toxic, and environmentally friendly components for healthy sleep.' },
  { icon: Settings, title: 'Elite Manufacturing', desc: 'Using modern machinery and strict quality control for consistent daily performance.' },
];

import { Factory } from 'lucide-react';

export default function Features() {
  const { config } = useSiteConfig();
  
  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-eco-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          
          {/* 1. WHY CHOOSE US: Change "14px" up or down to adjust font size */}
          <span 
            style={{ fontSize: "14px" }} 
            className="text-eco-primary font-bold tracking-widest uppercase mb-3 block"
          >
            Why Choose Us?
          </span>
          
          {/* 2. MAIN HEADING: Change "48px" up or down to adjust font size */}
          <h2 
            style={{ fontSize: "48px" }} 
            className="font-heading font-bold text-eco-slate-900 mb-6 tracking-tight"
          >
            The Ecosoft Difference
          </h2>
          
          {/* 3. DESCRIPTION PARAGRAPH: Change "18px" up or down to adjust font size */}
          <p 
            style={{ fontSize: "18px" }} 
            className="text-eco-slate-900/60 leading-relaxed"
          >
            Every mattress is crafted with precision and undergoes strict quality checks to ensure lasting comfort, durability, and excellent value.
          </p>

        </div>


        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="p-8 rounded-3xl bg-eco-slate-50 border border-eco-light/50 hover:border-eco-primary/30 hover:bg-white hover:shadow-2xl hover:shadow-eco-primary/5 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-eco-light/60 text-eco-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-eco-primary group-hover:text-white transition-all duration-300">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-heading font-bold text-eco-slate-900 mb-3">{feature.title}</h3>
                <p className="text-eco-slate-900/60 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
