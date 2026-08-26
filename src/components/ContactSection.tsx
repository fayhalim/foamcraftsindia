import React from "react";
import { MapPin, Phone, Mail, Send, MessageCircle } from "lucide-react";
import { useSiteConfig } from "../context/SiteConfigContext";
import { Button } from "./ui/Button";

export default function ContactSection() {
  const { config } = useSiteConfig();
  const whatsappLink = `https://wa.me/917518233001?text=${encodeURIComponent("Hello EcoSoft Foam Crafts India, I need help with an order.")}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      "Thank you! We have received your request and will call you back shortly.",
    );
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-eco-primary font-bold tracking-widest text-xs uppercase mb-3 block">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-eco-slate-900 mb-6 tracking-tight">
            Contact Us
          </h2>
          <p className="text-lg text-eco-slate-900/60 leading-relaxed">
            Have questions about our mattresses? Need help with an order? Our
            sleep experts are here to help you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-eco-slate-50 p-6 rounded-3xl border border-eco-light/50 shadow-sm">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-eco-light/60 flex items-center justify-center text-eco-primary mb-4">
                  <Phone size={24} />
                </div>
                <h4 className="font-bold text-eco-slate-900 mb-1">Call Us</h4>
                <a
                  href={`tel:${config.contactNumber.replace(/[^0-9+]/g, "")}`}
                  className="text-eco-slate-900/70 hover:text-eco-primary block mb-3"
                >
                  {config.contactNumber}
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#25D366] hover:text-[#128C7E] transition-colors"
                >
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
              </div>

              <div className="bg-eco-slate-50 p-6 rounded-3xl border border-eco-light/50 shadow-sm">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-eco-light/60 flex items-center justify-center text-eco-primary mb-4">
                  <Mail size={24} />
                </div>
                <h4 className="font-bold text-eco-slate-900 mb-1">Email Us</h4>
                <a
                  href={`mailto:${config.emailAddress}`}
                  className="text-eco-slate-900/70 hover:text-eco-primary block"
                >
                  {config.emailAddress}
                </a>
              </div>
            </div>

            <div className="bg-eco-slate-50 p-6 rounded-3xl border border-eco-light/50 shadow-sm flex gap-4 items-start">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-eco-light/60 flex items-center justify-center text-eco-primary shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-eco-slate-900 mb-1">
                  Visit Factory
                </h4>
                <p className="text-eco-slate-900/70 whitespace-pre-line mb-4">
                  {config.businessAddress}
                </p>
                <div className="w-full h-48 rounded-2xl overflow-hidden border border-eco-light/60 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.3095095011768!2d82.8614913733281!3d25.427913922320997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398fd568bdc1e949%3A0x332470460f85957!2sFoam%20Crafts%20India!5e0!3m2!1sen!2sin!4v1787769087786!5m2!1sen!2sin"
                    
                    style={{border:0, width: '100%', height:"100%"}}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Callback Form */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-eco-light/60 shadow-xl shadow-eco-primary/5">
            <h3 className="text-2xl font-heading font-bold text-eco-slate-900 mb-2 tracking-tight">
              Request a Callback
            </h3>
            <p className="text-eco-slate-900/60 mb-8">
              Leave your details and our team will get back to you.
            </p>

            <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6">
              <input type="hidden" name="access_key" value="6324162c-3cb0-42a4-8a80-f107cc40ae0c"></input>
              <div className="space-y-2">
                <label className="text-sm font-bold text-eco-slate-900">
                  Your Name
                </label>
                <input
                  required
                  name="full_name"
                  type="text"
                  className="w-full px-4 py-3.5 rounded-2xl border border-eco-light/60 focus:outline-none focus:ring-2 focus:ring-eco-primary/50 focus:border-eco-primary bg-eco-slate-50 transition-all"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-eco-slate-900">
                  Phone Number
                </label>
                <input
                  name="phone"
                  required
                  type="tel"
                  className="w-full px-4 py-3.5 rounded-2xl border border-eco-light/60 focus:outline-none focus:ring-2 focus:ring-eco-primary/50 focus:border-eco-primary bg-eco-slate-50 transition-all"
                  placeholder="+91"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-eco-slate-900">
                  How can we help?
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3.5 rounded-2xl border border-eco-light/60 focus:outline-none focus:ring-2 focus:ring-eco-primary/50 focus:border-eco-primary bg-eco-slate-50 transition-all"
                  placeholder="E.g. I want to know about custom sizes..."
                ></textarea>
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full h-14 rounded-full text-base shadow-lg shadow-eco-primary/20 gap-2"
              >
                <Send size={18} /> Submit Request
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
