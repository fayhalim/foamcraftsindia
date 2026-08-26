import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface SiteConfig {
  logoUrl: string | null;
  siteName: string;
  companyName: string;
  contactNumber: string;
  whatsappNumber: string;
  emailAddress: string;
  businessAddress: string;
  heroText: string;
  themeColorPrimary: string;
}

interface SiteConfigContextType {
  config: SiteConfig;
}

const defaultConfig: SiteConfig = {
  logoUrl: '/favicon.ico', // Default local logo fallback if available
  siteName: "EcoSoft",
  companyName: "Foam Crafts India",
  contactNumber: "+91 751823300",
  whatsappNumber: "+91 751823300",
  emailAddress: "foamcraftsindia01@gmail.com",
  businessAddress: "Nawrang Plot No. 416 NH-56\nAirport Road (Near K J Hotel)\nBabatpur Bazar\nVaranasi, Uttar Pradesh – 221006\nIndia",
  heroText: "Quality Mattresses. Better Sleep. Better Life.",
  themeColorPrimary: "#059669"
};

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'site'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setConfig(prev => ({
          ...prev,
          // Fixed local values for logo, brand name, and company name (ignoring Firebase)
          contactNumber: data.contactNumber || prev.contactNumber,
          whatsappNumber: data.whatsappNumber || prev.whatsappNumber,
          emailAddress: data.emailAddress || prev.emailAddress,
          businessAddress: data.businessAddress || prev.businessAddress,
          heroText: data.heroText || prev.heroText,
          themeColorPrimary: data.themeColorPrimary || prev.themeColorPrimary,
        }));
        
        if (data.seoTitle) {
          document.title = data.seoTitle;
        }
      }
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    // Apply primary theme color to a CSS variable
    document.documentElement.style.setProperty('--theme-color-primary', config.themeColorPrimary);
  }, [config]);

  return (
    <SiteConfigContext.Provider value={{ config }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (context === undefined) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
}
