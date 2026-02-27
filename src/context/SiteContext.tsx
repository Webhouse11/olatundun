import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SiteSettings {
  site_name: string;
  logo_text: string;
  logo_url: string;
  hero_title: string;
  hero_subtitle: string;
  hero_image: string;
  about_title: string;
  about_description: string;
  about_image: string;
  ceo_name: string;
  ceo_role: string;
  ceo_image: string;
  contact_phone: string;
  contact_email: string;
  contact_address: string;
  team_members: string; // JSON string
}

interface SiteContextType {
  settings: SiteSettings | null;
  loading: boolean;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
  refreshSettings: () => Promise<void>;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

const DEFAULT_SETTINGS: SiteSettings = {
  "site_name": "Olatundun Nursing Home and Geriatric Center",
  "logo_text": "O",
  "logo_url": "https://res.cloudinary.com/dhzouslh1/image/upload/v1772182746/1000097630_hultaz.jpg",
  "hero_title": "Compassionate Care for Every Stage of Life",
  "hero_subtitle": "Holistic healthcare for the elderly, mothers, and families — at our facility or in the comfort of your home.",
  "hero_image": "https://res.cloudinary.com/dhzouslh1/image/upload/c_fill,w_auto,f_auto,q_auto/v1772182745/1000097638_rczupj.jpg",
  "about_title": "A Professional Healthcare Facility Committed to Compassionate Care",
  "about_description": "Olatundun Nursing Home and Geriatric Center LTD is a professional healthcare facility committed to compassionate care for the elderly, mothers, and families.",
  "about_image": "/images/about_image.png",
  "ceo_name": "Adio Lateefat Oluwakemi",
  "ceo_role": "Founder & Lead Nurse",
  "ceo_image": "https://res.cloudinary.com/dhzouslh1/image/upload/c_scale,w_300,f_auto,q_auto/v1772182747/1000097622_ucji4x.png",
  "contact_phone": "08078175508",
  "contact_email": "olatundungeriatric25@gmail.com",
  "contact_address": "123 Healthcare Avenue, Osogbo, Osun State, Nigeria",
  "team_members": "[{\"name\":\"Adio Lateefat Oluwakemi\",\"role\":\"CEO & Founder\",\"expertise\":\"Geriatric & Maternity Specialist\",\"image\":\"/images/team_0.jpg\"},{\"name\":\"Dr. Samuel Okoro\",\"role\":\"Lead Geriatrician\",\"expertise\":\"Elderly Chronic Disease Management\",\"image\":\"/images/team_1.jpg\"},{\"name\":\"Nurse Blessing Adeyemi\",\"role\":\"Maternity Lead\",\"expertise\":\"Obstetric & Fertility Support\",\"image\":\"/images/team_2.jpg\"},{\"name\":\"Dr. Fatima Ibrahim\",\"role\":\"Reproductive Health Expert\",\"expertise\":\"Fertility & Family Planning\",\"image\":\"/images/team_3.jpg\"}]"
};

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error('Failed to fetch settings, using defaults:', error);
      setSettings(DEFAULT_SETTINGS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    if (!settings) return;
    const updated = { ...settings, ...newSettings };
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (response.ok) {
        setSettings(updated);
      }
    } catch (error) {
      console.error('Failed to update settings:', error);
    }
  };

  return (
    <SiteContext.Provider value={{ settings, loading, updateSettings, refreshSettings: fetchSettings }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
}
