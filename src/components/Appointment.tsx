import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Phone, Mail, Clock, CheckCircle, MessageSquare } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function Appointment() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { settings } = useSite();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    datetime: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp message
    const message = `*New Appointment Request*%0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Phone:* ${formData.phone}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Service:* ${formData.service}%0A` +
      `*Preferred Date/Time:* ${formData.datetime}`;
    
    const whatsappUrl = `https://wa.me/${settings?.contact_phone.replace(/\D/g, '').replace(/^0/, '234')}?text=${message}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  if (!settings) return null;

  return (
    <section id="appointment" className="section-padding bg-slate-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 transform translate-x-1/4"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-6 block">Get in Touch</span>
            <h2 className="text-5xl md:text-6xl font-display font-black mb-10 leading-[1.1] tracking-tight">
              Book an <span className="text-gradient">Appointment</span> with Our Specialists
            </h2>
            <p className="text-slate-500 text-xl mb-12 leading-relaxed font-light">
              Take the first step towards better health. Whether you need geriatric care, maternity support, or a general check-up, our team is ready to assist you.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-xl shadow-slate-200/50 flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 mb-1">Call Us Directly</h4>
                  <p className="text-slate-500 text-lg font-light">{settings.contact_phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-xl shadow-slate-200/50 flex items-center justify-center text-secondary flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 mb-1">Email Support</h4>
                  <p className="text-slate-500 text-lg font-light">{settings.contact_email}</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-xl shadow-slate-200/50 flex items-center justify-center text-accent flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <Clock size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 mb-1">Working Hours</h4>
                  <p className="text-slate-500 text-lg font-light">Mon - Sat: 8:00 AM - 6:00 PM <span className="block text-sm font-bold text-primary uppercase tracking-widest mt-1">Emergency 24/7</span></p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-12 md:p-16 rounded-[4rem] shadow-2xl shadow-slate-200/60 border border-slate-100 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-1000"></div>
            
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary/5 border border-primary/10 p-12 rounded-[3rem] text-center relative z-10"
              >
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-primary/40">
                  <CheckCircle size={48} />
                </div>
                <h3 className="text-3xl font-display font-black text-slate-900 mb-6">Request Sent!</h3>
                <p className="text-slate-500 text-lg font-light leading-relaxed">Your appointment request has been sent via WhatsApp. Our medical team will review it and get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Patient Name</label>
                    <input 
                      required
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Phone / WhatsApp</label>
                    <input 
                      required
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+234..."
                      className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all font-medium"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Email Address</label>
                  <input 
                    required
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Service Interested In</label>
                  <div className="relative">
                    <select 
                      required 
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer font-medium"
                    >
                      <option value="">Select a service</option>
                      <option>Elderly & Geriatric Care</option>
                      <option>Home Health Care</option>
                      <option>Maternity & Obstetric Services</option>
                      <option>Fertility & Reproductive Health</option>
                      <option>General Health Services</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <Calendar size={20} />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Preferred Date & Time</label>
                  <input 
                    required
                    type="datetime-local" 
                    name="datetime"
                    value={formData.datetime}
                    onChange={handleInputChange}
                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all cursor-pointer font-medium"
                  />
                </div>
                <button type="submit" className="w-full btn-primary py-6 text-xl">
                  <MessageSquare size={24} />
                  Book via WhatsApp
                </button>
                <p className="text-center text-slate-400 text-xs font-medium uppercase tracking-widest">
                  Direct connection to our medical team
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
