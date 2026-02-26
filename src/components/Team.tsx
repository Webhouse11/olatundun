import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface TeamMember {
  name: string;
  role: string;
  expertise: string;
  image: string;
}

export default function Team() {
  const { settings } = useSite();
  
  let members: TeamMember[] = [];
  if (settings?.team_members) {
    try {
      members = JSON.parse(settings.team_members);
    } catch (e) {
      members = [];
    }
  }

  if (!settings || members.length === 0) return null;

  return (
    <section id="team" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-6 block">Our Experts</span>
            <h2 className="text-5xl md:text-6xl font-display font-black mb-8 leading-tight tracking-tight">
              Meet Our Dedicated <span className="text-gradient">Medical Team</span>
            </h2>
            <p className="text-slate-500 text-xl font-light leading-relaxed">
              Our team consists of highly qualified and compassionate professionals dedicated to providing the best healthcare experience for you and your loved ones.
            </p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {members.map((member, idx) => (
            <motion.div
              key={member.name + idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-[3rem] mb-8 aspect-[4/5] shadow-xl shadow-slate-200/50 border border-slate-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                {/* Social Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-white/90 backdrop-blur-xl p-4 rounded-2xl flex items-center justify-center shadow-xl">
                    <a href={`mailto:${settings.contact_email}`} className="flex items-center gap-2 text-primary font-bold text-sm hover:scale-105 transition-transform">
                      <Mail size={18} />
                      Contact Expert
                    </a>
                  </div>
                </div>
              </div>
              <div className="text-center px-4">
                <h4 className="text-2xl font-black mb-1 group-hover:text-primary transition-colors tracking-tighter">{member.name}</h4>
                <p className="text-primary font-bold text-xs mb-4 uppercase tracking-widest">{member.role}</p>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{member.expertise}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
