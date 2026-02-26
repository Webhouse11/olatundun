import { motion } from 'motion/react';
import { Calendar, MessageCircle, ArrowRight } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function Hero() {
  const { settings } = useSite();

  if (!settings) return null;

  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={settings.hero_image}
          alt="Nursing Home Background"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-bold mb-8 backdrop-blur-md uppercase tracking-widest">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                Welcome to {settings.site_name}
              </span>
              <h1 className="text-6xl md:text-8xl font-display font-black text-white leading-[0.95] mb-8 tracking-tighter">
                {settings.hero_title.split(' ').map((word, i) => (
                  <span key={i} className="inline-block mr-4">{word}</span>
                ))}
              </h1>
              <p className="text-xl md:text-2xl text-slate-200 mb-12 leading-relaxed max-w-xl font-light">
                {settings.hero_subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <a href="#appointment" className="btn-primary group">
                  <Calendar size={22} />
                  Book Appointment
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </a>
                <a 
                  href={`https://wa.me/${settings.contact_phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-xl border border-white/20 px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  <MessageCircle size={22} className="group-hover:scale-110 transition-transform" />
                  WhatsApp Us
                </a>
              </div>
            </motion.div>
        </div>
      </div>

      {/* Stats Overlay (Bottom Desktop) */}
      <div className="absolute bottom-0 left-0 right-0 hidden md:block">
        <div className="max-w-7xl mx-auto px-12 pb-12">
          <div className="grid grid-cols-3 gap-8 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                <span className="font-bold text-xl">24/7</span>
              </div>
              <div>
                <h4 className="text-white font-semibold">Emergency Support</h4>
                <p className="text-slate-400 text-sm">Always here when you need us</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-x border-white/10 px-8">
              <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary">
                <span className="font-bold text-xl">15+</span>
              </div>
              <div>
                <h4 className="text-white font-semibold">Expert Specialists</h4>
                <p className="text-slate-400 text-sm">Qualified medical professionals</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-accent">
                <span className="font-bold text-xl">500+</span>
              </div>
              <div>
                <h4 className="text-white font-semibold">Happy Families</h4>
                <p className="text-slate-400 text-sm">Trusted by the community</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
