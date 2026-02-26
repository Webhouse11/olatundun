import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Do you offer home care services?',
      answer: 'Yes, we provide comprehensive home health care services. Our professional nurses and caregivers can visit your home to provide medical support, personal care, and companionship tailored to your specific needs.'
    },
    {
      question: 'Can my elderly relative live at the facility?',
      answer: 'Absolutely. We offer residential geriatric care with 24/7 supervision, medical monitoring, and a supportive community environment designed specifically for the comfort and safety of the elderly.'
    },
    {
      question: 'What are your operating hours?',
      answer: 'Our administrative offices are open Monday through Saturday from 8:00 AM to 6:00 PM. However, our nursing care and emergency services operate 24 hours a day, 7 days a week.'
    },
    {
      question: 'Do you provide maternity support for first-time mothers?',
      answer: 'Yes, we have specialized programs for first-time mothers, including prenatal education, postnatal recovery support, and newborn care guidance to ensure a smooth transition into motherhood.'
    },
    {
      question: 'How do I book an appointment?',
      answer: 'You can book an appointment through our website form, call us directly at our contact numbers, or message us on WhatsApp. We recommend booking at least 24 hours in advance for non-emergencies.'
    }
  ];

  return (
    <section id="faq" className="section-padding bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-6 block">Got Questions?</span>
            <h2 className="text-5xl md:text-6xl font-display font-black mb-8 leading-tight tracking-tight">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-slate-500 text-xl font-light leading-relaxed max-w-2xl mx-auto">
              Find answers to common inquiries about our services, facility, and care approach.
            </p>
          </motion.div>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className={`bg-white rounded-[2rem] border transition-all duration-500 overflow-hidden ${activeIndex === idx ? 'border-primary shadow-2xl shadow-primary/10' : 'border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50'}`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full px-10 py-8 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${activeIndex === idx ? 'bg-primary text-white shadow-lg shadow-primary/30 rotate-6' : 'bg-primary/5 text-primary group-hover:bg-primary/10'}`}>
                    <HelpCircle size={24} />
                  </div>
                  <span className={`font-black text-xl tracking-tight transition-colors duration-300 ${activeIndex === idx ? 'text-primary' : 'text-slate-900'}`}>{faq.question}</span>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${activeIndex === idx ? 'bg-primary/10 text-primary rotate-180' : 'bg-slate-50 text-slate-400'}`}>
                  <ChevronDown size={20} />
                </div>
              </button>
              
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="px-10 pb-10 pt-0 text-slate-500 text-lg leading-relaxed font-light border-t border-slate-50 mt-2 pt-8 ml-16">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
