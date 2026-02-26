import { motion } from 'motion/react';
import { 
  Users, 
  Home, 
  Baby, 
  Stethoscope, 
  Activity, 
  HeartPulse,
  ArrowRight
} from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <Users className="text-primary" size={32} />,
      title: 'Elderly & Geriatric Care',
      desc: 'Comprehensive medical and emotional support tailored for the elderly, ensuring a dignified and comfortable life.',
      color: 'bg-teal-50'
    },
    {
      icon: <Home className="text-secondary" size={32} />,
      title: 'Home Health Care',
      desc: 'Bringing professional medical services to your doorstep, providing care in the familiarity of your own home.',
      color: 'bg-blue-50'
    },
    {
      icon: <Baby className="text-pink-500" size={32} />,
      title: 'Maternity & Obstetric',
      desc: 'Expert care for expectant mothers, from prenatal support to postnatal recovery and newborn guidance.',
      color: 'bg-pink-50'
    },
    {
      icon: <HeartPulse className="text-accent" size={32} />,
      title: 'Fertility & Reproductive',
      desc: 'Specialized services and counseling for fertility challenges and reproductive health management.',
      color: 'bg-amber-50'
    },
    {
      icon: <Stethoscope className="text-indigo-500" size={32} />,
      title: 'General Health Services',
      desc: 'Routine check-ups, diagnostic tests, and treatment for common ailments for all family members.',
      color: 'bg-indigo-50'
    },
    {
      icon: <Activity className="text-emerald-500" size={32} />,
      title: 'Additional Support',
      desc: 'Physical therapy, nutritional counseling, and mental health support to ensure holistic well-being.',
      color: 'bg-emerald-50'
    }
  ];

  return (
    <section id="services" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-6 block">Our Expertise</span>
            <h2 className="text-5xl md:text-6xl font-display font-black mb-8 leading-tight tracking-tight">
              Comprehensive <span className="text-gradient">Healthcare Services</span>
            </h2>
            <p className="text-slate-500 text-xl font-light leading-relaxed">
              We offer a wide range of specialized medical services designed to meet the diverse needs of our community, from infancy to the golden years.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`group p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 card-hover relative overflow-hidden ${service.color}`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white rounded-[1.5rem] flex items-center justify-center mb-10 shadow-xl shadow-slate-200/50 group-hover:rotate-6 transition-transform duration-500">
                  {service.icon}
                </div>
                <h3 className="text-3xl font-black mb-6 group-hover:text-primary transition-colors tracking-tighter">{service.title}</h3>
                <p className="text-slate-500 text-lg mb-10 leading-relaxed font-light">
                  {service.desc}
                </p>
                <a 
                  href="#appointment" 
                  className="inline-flex items-center gap-3 text-primary font-black group-hover:gap-5 transition-all uppercase text-xs tracking-widest"
                >
                  Learn More <ArrowRight size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features / Benefits Section (Integrated) */}
        <div className="mt-32 grid lg:grid-cols-2 gap-16 items-center bg-slate-900 rounded-[3rem] p-12 md:p-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -mr-48 -mt-48"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-12">
              Why Choose Olatundun Nursing Home?
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {[
                { title: '24/7 Support', desc: 'Round-the-clock emergency medical assistance.' },
                { title: 'Telehealth', desc: 'Virtual consultations from the comfort of your home.' },
                { title: 'Personalized Plans', desc: 'Treatment strategies tailored to your unique needs.' },
                { title: 'Qualified Staff', desc: 'Experienced nurses and medical specialists.' },
              ].map((feature) => (
                <div key={feature.title}>
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white mb-4">
                    <CheckCircleIcon size={20} />
                  </div>
                  <h4 className="text-white font-bold mb-2">{feature.title}</h4>
                  <p className="text-slate-400 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600"
              alt="Professional Medical Care"
              className="rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckCircleIcon({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
