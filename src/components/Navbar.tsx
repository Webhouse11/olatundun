import { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSite } from '../context/SiteContext';
import SafeImage from './common/SafeImage';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { settings } = useSite();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Team', href: '#team' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  if (!settings) return null;

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {settings.logo_url ? (
              <SafeImage src={settings.logo_url} alt="Olatundun Nursing Home Logo" className="h-[50px] w-auto object-contain" />
            ) : (
              <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                {settings.logo_text}
              </div>
            )}
            <span className={`font-display font-black text-lg md:text-xl tracking-tighter leading-none ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
              Olatundun <span className="text-primary">Nursing Home</span>
              <span className="block text-[10px] md:text-xs font-medium opacity-80 mt-0.5 uppercase tracking-widest">Geriatric Center</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${isScrolled ? 'text-slate-600' : 'text-white/90'}`}
              >
                {link.name}
              </a>
            ))}
            <a href="/admin" className={`p-2 rounded-full transition-colors ${isScrolled ? 'text-slate-400 hover:text-primary' : 'text-white/50 hover:text-white'}`} title="Admin Dashboard">
              <Settings size={20} />
            </a>
            <a href="#appointment" className="btn-primary py-2 px-6 text-sm">
              Book Appointment
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={`lg:hidden p-2 rounded-md ${isScrolled ? 'text-slate-900' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-slate-100 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-slate-600 font-medium hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <a href="/admin" className="text-slate-400 flex items-center gap-2 text-sm">
                    <Settings size={16} /> Admin Dashboard
                  </a>
                  <a 
                    href="#appointment" 
                    className="btn-primary text-center px-6 py-2 text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Book Appointment
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${settings.contact_phone.replace(/\D/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center"
        title="Contact on WhatsApp"
      >
        <MessageCircle size={32} fill="currentColor" />
      </a>
    </>
  );
}
