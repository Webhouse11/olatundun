import { motion } from 'motion/react';
import { CheckCircle2, Heart, Shield, Award } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function About() {
  const { settings } = useSite();
  
  const values = [
    { icon: <Heart className="text-primary" />, title: 'Compassion', desc: 'Empathy at the core of every interaction.' },
    { icon: <Award className="text-primary" />, title: 'Excellence', desc: 'Highest standards in medical and personal care.' },
    { icon: <Shield className="text-primary" />, title: 'Integrity', desc: 'Honesty and transparency in all we do.' },
    { icon: <CheckCircle2 className="text-primary" />, title: 'Holistic Care', desc: 'Treating the whole person, not just symptoms.' },
  ];

  if (!settings) return null;

  return (
    <section id="about" className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={settings.about_image}
                alt="Healthcare Facility"
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-10 -right-10 bg-primary text-white p-8 rounded-3xl shadow-xl z-20 hidden md:block">
              <div className="text-4xl font-bold mb-1">10+</div>
              <div className="text-sm font-medium opacity-90 uppercase tracking-wider">Years of Dedicated<br />Healthcare Service</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-6 block">About the Center</span>
            <h2 className="text-5xl md:text-6xl font-display font-black mb-8 leading-[1.1] tracking-tight">
              {settings.about_title}
            </h2>
            <p className="text-slate-500 text-xl mb-10 leading-relaxed font-light">
              {settings.about_description}
            </p>

            <div className="grid sm:grid-cols-2 gap-8 mb-12">
              {['24/7 Professional Nursing', 'Personalized Care Plans', 'Home Health Services', 'Modern Medical Equipment'].map((item) => (
                <div key={item} className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="font-bold text-slate-800 tracking-tight">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                <div className="w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 border-4 border-primary/10 shadow-lg">
                  <img
                    src={settings.ceo_image}
                    alt="CEO Portrait"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="text-2xl font-black mb-1">{settings.ceo_name}</h4>
                  <p className="text-primary font-bold text-sm mb-4 uppercase tracking-widest">{settings.ceo_role}</p>
                  <p className="text-slate-500 text-base italic leading-relaxed font-light">
                    "Our mission is to provide holistic healthcare that honors the dignity of every individual we serve."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mission & Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, idx) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{value.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
