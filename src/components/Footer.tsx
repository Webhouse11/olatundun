import { Facebook, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { settings } = useSite();

  if (!settings) return null;

  return (
    <footer className="bg-slate-950 text-slate-400 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-8 group cursor-pointer">
              {settings.logo_url ? (
                <img src={settings.logo_url} alt="Logo" className="h-12 w-auto object-contain" />
              ) : (
                <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
                  {settings.logo_text}
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-display font-black text-xl md:text-2xl tracking-tighter leading-none text-white">
                  Olatundun <span className="text-primary">Nursing Home</span>
                </span>
                <span className="text-[10px] md:text-[11px] font-bold mt-0.5 uppercase tracking-[0.2em] text-white/50">
                  Geriatric Center
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-8">
              Professional healthcare facility committed to compassionate care for the elderly, mothers, and families. Your health and dignity are our top priorities.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Facebook, href: "https://web.facebook.com/p/Olatundun-Geriatric-Home-61567856693568/?_rdc=1&_rdr#" },
                { Icon: Instagram, href: "https://www.instagram.com/p/DMLivtQNCKL/" }
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <social.Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              {['Home', 'About Us', 'Our Services', 'Meet the Team', 'FAQ', 'Contact Us'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '')}`} className="hover:text-primary transition-colors flex items-center gap-2 group">
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Our Services</h4>
            <ul className="space-y-4 text-sm">
              {[
                'Geriatric Care',
                'Home Nursing',
                'Maternity Services',
                'Fertility Support',
                'General Checkups',
                'Physical Therapy'
              ].map((service) => (
                <li key={service}>
                  <a href="#services" className="hover:text-primary transition-colors flex items-center gap-2 group">
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Info</h4>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="text-primary flex-shrink-0" />
                <span>{settings.contact_address}</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={20} className="text-primary flex-shrink-0" />
                <span>{settings.contact_phone}</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={20} className="text-primary flex-shrink-0" />
                <span>{settings.contact_email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs uppercase tracking-widest">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <p>© {currentYear} Olatundun Nursing Home. All Rights Reserved.</p>
            <span className="hidden md:block w-1 h-1 bg-slate-700 rounded-full"></span>
            <p>DEVELOP BY <a href="https://webhousemedia.vercel.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-white transition-colors font-bold">WEBHOUSE STUDIO</a></p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
