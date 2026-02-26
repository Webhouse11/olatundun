import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import SafeImage from './common/SafeImage';

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
            <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">Our Experts</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Meet Our Dedicated <span className="text-primary">Medical Team</span>
            </h2>
            <p className="text-slate-500 text-lg">
              Our team consists of highly qualified and compassionate professionals dedicated to providing the best healthcare experience for you and your loved ones.
            </p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, idx) => (
            <motion.div
              key={member.name + idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] mb-6 aspect-[4/5] shadow-lg">
                <SafeImage
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Social Overlay */}
                <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                  <a href={`mailto:${settings.contact_email}`} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                    <Mail size={20} />
                  </a>
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{member.name}</h4>
                <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
                <p className="text-slate-500 text-xs px-4">{member.expertise}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
