import { Sparkles, Maximize, Tag, Truck, Boxes, MapPin, Heart, Shield, Wind, Banknote, Clock, HeadphonesIcon, Leaf, Settings } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

const features = [
  { icon: Sparkles, title: 'Premium Foam Quality', desc: 'Crafted with precision using the finest materials.' },
  { icon: Boxes, title: 'High-Density Foam', desc: 'Providing optimal support and preventing sagging over time.' },
  { icon: Heart, title: 'Orthopedic Support', desc: 'Designed to align your spine and relieve pressure points.' },
  { icon: Shield, title: 'Long-lasting Durability', desc: 'Built to withstand years of regular use without losing shape.' },
  { icon: Wind, title: 'Breathable Materials', desc: 'Promoting airflow to keep you cool and comfortable all night.' },
  { icon: Banknote, title: 'Affordable Pricing', desc: 'Premium sleep experience at a price that fits your budget.' },
  { icon: Maximize, title: 'Custom Mattress Sizes', desc: 'Tailored perfectly to fit any bed frame dimensions.' },
  { icon: Factory, title: 'Direct Manufacturer', desc: 'Eliminating middlemen to give you the best value directly from our factory.' },
  { icon: Truck, title: 'Fast Delivery', desc: 'Ensuring your new mattress reaches you safely and promptly.' },
  { icon: HeadphonesIcon, title: 'Excellent Customer Support', desc: 'Dedicated team to help you choose the right mattress and assist after purchase.' },
  { icon: Leaf, title: 'Eco-Friendly Materials', desc: 'We use safe, durable, and environmentally responsible materials that provide a healthier and more comfortable sleeping experience.' },
  { icon: Settings, title: 'Advanced Manufacturing', desc: 'Every mattress is manufactured using modern machinery, precision engineering, and strict quality control to ensure consistent comfort, durability, and performance.' },
];

import { Factory } from 'lucide-react';

export default function Features() {
  const { config } = useSiteConfig();
  
  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-eco-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-eco-primary font-bold tracking-widest text-xs uppercase mb-3 block">Why Choose Us</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-eco-slate-900 mb-6 tracking-tight">The {config.brandName || 'EcoSoft'} Difference</h2>
          <p className="text-lg text-eco-slate-900/60 leading-relaxed">
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
