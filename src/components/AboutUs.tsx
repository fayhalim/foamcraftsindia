import { CheckCircle2, ShieldCheck, Factory, ThumbsUp, Users, Award } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import premiumLifestyleImage from '../assets/images/premium_mattress_lifestyle_1787765998258.jpg';

export default function AboutUs() {
  const { config } = useSiteConfig();

  return (
    <section id="about" className="py-24 bg-eco-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Images & Experience */}
          <div className="relative group">
            <div className="absolute inset-0 bg-eco-primary/10 rounded-3xl transform -rotate-3 scale-105 transition-transform duration-500 group-hover:rotate-0"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white">
              <img 
                src={premiumLifestyleImage}
                alt="Premium Mattress Lifestyle"
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-xl border border-eco-light/50 max-w-[200px] animate-bounce-slow">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-eco-primary/10 rounded-2xl flex items-center justify-center text-eco-primary">
                  <Factory size={24} />
                </div>
                <div className="text-3xl font-heading font-bold text-eco-slate-900">8+</div>
              </div>
              <p className="text-sm font-semibold text-eco-slate-900/60 leading-tight">Years of Manufacturing Excellence</p>
            </div>
          </div>

          {/* Right Side: Content */}
          <div>
            <span className="text-eco-primary font-bold tracking-widest text-xs uppercase mb-3 block">About Us</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-eco-slate-900 mb-6 tracking-tight">
              We Craft Better Sleep for a Better Life
            </h2>
            
            <p className="text-lg text-eco-slate-900/60 leading-relaxed mb-8">
              At {config.companyName || 'Foam Crafts India'}, we believe that quality sleep is the foundation of a healthy life. We are a premier manufacturer of orthopedic and memory foam mattresses, dedicated to delivering superior comfort directly to your doorstep. Our mission is to provide premium sleep solutions without the premium price tag.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-eco-light/40 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-eco-primary/10 text-eco-primary flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-eco-slate-900 mb-1">Our Vision</h4>
                  <p className="text-sm text-eco-slate-900/60">To be India's most trusted sleep solution brand.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-eco-light/40 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-eco-primary/10 text-eco-primary flex items-center justify-center flex-shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-eco-slate-900 mb-1">Our Values</h4>
                  <p className="text-sm text-eco-slate-900/60">Quality, Transparency, and Customer Satisfaction.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-10">
              {[
                { icon: CheckCircle2, text: 'Premium Quality Materials' },
                { icon: CheckCircle2, text: 'Comfortable Sleep Solutions' },
                { icon: CheckCircle2, text: 'Durable & Long-lasting' },
                { icon: Users, text: 'Trusted by Thousands of Customers' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <item.icon size={20} className="text-eco-primary" />
                  <span className="font-medium text-eco-slate-900/80">{item.text}</span>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn-premium inline-flex px-8 py-4 text-lg">
              Contact Us Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
