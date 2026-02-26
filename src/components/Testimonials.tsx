import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import SafeImage from './common/SafeImage';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Mrs. Adeola Johnson',
      role: 'Daughter of Patient',
      text: 'The care my father received at Olatundun was exceptional. The staff treated him with so much dignity and love. It felt like he was with family.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100'
    },
    {
      name: 'Mr. Ibrahim Bello',
      role: 'Geriatric Care Patient',
      text: 'I was hesitant about nursing homes, but Olatundun changed my perspective. The medical attention is top-notch, and the environment is very peaceful.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'
    },
    {
      name: 'Sarah Williams',
      role: 'New Mother',
      text: 'Their maternity support was a lifesaver for me as a first-time mom. The nurses are so patient and knowledgeable. Highly recommended!',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100'
    }
  ];

  return (
    <section className="section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              What Our <span className="text-primary">Patients Say</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative group hover:shadow-xl transition-all duration-500"
            >
              <div className="absolute -top-6 left-10 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
                <Quote size={24} />
              </div>
              
              <div className="flex gap-1 mb-6 mt-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} className="fill-accent text-accent" />
                ))}
              </div>

              <p className="text-slate-600 italic mb-8 leading-relaxed">
                "{t.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                  <SafeImage
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{t.name}</h4>
                  <p className="text-primary text-xs font-medium">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
