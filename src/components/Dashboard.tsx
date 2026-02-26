import React, { useState, useEffect } from 'react';
import { useSite, SiteSettings } from '../context/SiteContext';
import { Save, Upload, Image as ImageIcon, Layout, Phone, Info, Home, Users, Plus, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import SafeImage from './common/SafeImage';

interface TeamMember {
  name: string;
  role: string;
  expertise: string;
  image: string;
}

export default function Dashboard() {
  const { settings, updateSettings, loading } = useSite();
  const [localSettings, setLocalSettings] = useState<SiteSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'hero' | 'about' | 'contact' | 'team'>('general');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
      try {
        setTeamMembers(JSON.parse(settings.team_members || '[]'));
      } catch (e) {
        setTeamMembers([]);
      }
    }
  }, [settings]);

  if (loading || !localSettings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocalSettings(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: keyof SiteSettings) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalSettings(prev => prev ? { ...prev, [field]: reader.result as string } : null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTeamMemberImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updated = [...teamMembers];
        updated[index].image = reader.result as string;
        setTeamMembers(updated);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTeamMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const updated = [...teamMembers];
    updated[index] = { ...updated[index], [field]: value };
    setTeamMembers(updated);
  };

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: '', role: '', expertise: '', image: 'https://picsum.photos/seed/new/400/500' }]);
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!localSettings) return;
    setIsSaving(true);
    const updatedSettings = {
      ...localSettings,
      team_members: JSON.stringify(teamMembers)
    };
    await updateSettings(updatedSettings);
    setIsSaving(false);
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'general', label: 'Logo & General', icon: Layout },
    { id: 'hero', label: 'Hero Section', icon: Home },
    { id: 'about', label: 'About Section', icon: Info },
    { id: 'team', label: 'Medical Team', icon: Users },
    { id: 'contact', label: 'Contact Info', icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-display font-bold text-primary">Site Admin</h1>
          <p className="text-xs text-slate-400 mt-1">Manage your website content</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <tab.icon size={20} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <a href="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            <Layout size={16} />
            Back to Website
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-bold text-slate-800">{tabs.find(t => t.id === activeTab)?.label}</h2>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="btn-primary flex items-center gap-2 py-2"
          >
            {isSaving ? <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" /> : <Save size={18} />}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </header>

        <main className="p-8 max-w-4xl">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8"
          >
            {activeTab === 'general' && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Site Name</label>
                    <input
                      type="text"
                      name="site_name"
                      value={localSettings.site_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Logo Text (Initial)</label>
                    <input
                      type="text"
                      name="logo_text"
                      value={localSettings.logo_text}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Logo Image (Optional)</label>
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
                      {localSettings.logo_url ? (
                        <SafeImage src={localSettings.logo_url} alt="Logo" className="w-full h-full object-contain" />
                      ) : (
                        <ImageIcon className="text-slate-400" size={32} />
                      )}
                    </div>
                    <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                      <Upload size={18} />
                      Upload Logo
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'logo_url')} />
                    </label>
                    {localSettings.logo_url && (
                      <button 
                        onClick={() => setLocalSettings(prev => prev ? { ...prev, logo_url: '' } : null)}
                        className="text-red-500 text-sm font-medium hover:underline"
                      >
                        Remove Image
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'hero' && (
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Hero Title</label>
                  <textarea
                    name="hero_title"
                    value={localSettings.hero_title}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Hero Subtitle</label>
                  <textarea
                    name="hero_subtitle"
                    value={localSettings.hero_subtitle}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Hero Background Image</label>
                  <div className="space-y-4">
                    <div className="w-full h-48 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
                      <SafeImage src={localSettings.hero_image} alt="Hero Preview" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="text"
                        name="hero_image"
                        value={localSettings.hero_image}
                        onChange={handleInputChange}
                        placeholder="Image URL"
                        className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      />
                      <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-xl font-medium transition-colors flex items-center gap-2">
                        <Upload size={18} />
                        Upload
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'hero_image')} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">About Title</label>
                  <input
                    type="text"
                    name="about_title"
                    value={localSettings.about_title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">About Description</label>
                  <textarea
                    name="about_description"
                    value={localSettings.about_description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">About Section Image</label>
                    <div className="space-y-4">
                      <div className="w-full h-40 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
                        <SafeImage src={localSettings.about_image} alt="About Preview" className="w-full h-full object-cover" />
                      </div>
                      <label className="w-full cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                        <Upload size={18} />
                        Upload
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'about_image')} />
                      </label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">CEO Name</label>
                      <input
                        type="text"
                        name="ceo_name"
                        value={localSettings.ceo_name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">CEO Role</label>
                      <input
                        type="text"
                        name="ceo_role"
                        value={localSettings.ceo_role}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">CEO Image</label>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200">
                          <SafeImage src={localSettings.ceo_image} alt="CEO" className="w-full h-full object-cover" />
                        </div>
                        <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                          <Upload size={16} />
                          Change
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'ceo_image')} />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-slate-800">Team Members</h3>
                  <button
                    onClick={addTeamMember}
                    className="flex items-center gap-2 text-sm bg-primary/10 text-primary px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition-all"
                  >
                    <Plus size={18} />
                    Add Member
                  </button>
                </div>
                <div className="grid gap-6">
                  {teamMembers.map((member, idx) => (
                    <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 relative group">
                      <button
                        onClick={() => removeTeamMember(idx)}
                        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                      <div className="grid md:grid-cols-[120px_1fr] gap-6">
                        <div className="space-y-3">
                          <div className="w-full aspect-[4/5] bg-slate-200 rounded-xl overflow-hidden">
                            <SafeImage src={member.image} alt={member.name} className="w-full h-full object-cover" />
                          </div>
                          <label className="w-full cursor-pointer bg-white border border-slate-200 text-slate-600 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1">
                            <Upload size={14} />
                            Replace
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleTeamMemberImageUpload(e, idx)} />
                          </label>
                        </div>
                        <div className="grid gap-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Name</label>
                              <input
                                type="text"
                                value={member.name}
                                onChange={(e) => handleTeamMemberChange(idx, 'name', e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-primary"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Role</label>
                              <input
                                type="text"
                                value={member.role}
                                onChange={(e) => handleTeamMemberChange(idx, 'role', e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-primary"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Expertise / Bio</label>
                            <input
                              type="text"
                              value={member.expertise}
                              onChange={(e) => handleTeamMemberChange(idx, 'expertise', e.target.value)}
                              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                  <input
                    type="text"
                    name="contact_phone"
                    value={localSettings.contact_phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="contact_email"
                    value={localSettings.contact_email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Physical Address</label>
                  <textarea
                    name="contact_address"
                    value={localSettings.contact_address}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
