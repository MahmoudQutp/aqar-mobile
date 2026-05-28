import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Project, Developer } from '../types';
import { 
  Building2, Layout, Database, Shield, Image, Globe, ChevronRight, 
  PlusCircle, Activity, Sparkles, TrendingUp, KeyRound, MonitorCheck 
} from 'lucide-react';

interface AdminPanelProperties {
  projects: Project[];
  developers: Developer[];
  onAddProject: (project: Omit<Project, 'id' | 'rating' | 'featured'>) => void;
}

export const AdminPanel: React.FC<AdminPanelProperties> = ({
  projects,
  developers,
  onAddProject
}) => {
  const { t, language } = useLanguage();
  const [adminTab, setAdminTab] = useState<'kpis' | 'pub-project' | 'seo-identity'>('kpis');

  // New Project State Form
  const [title, setTitle] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [devId, setDevId] = useState(developers[0]?.id || 'dev_1');
  const [areaName, setAreaName] = useState('Al-Malqa, Riyadh');
  const [areaNameAr, setAreaNameAr] = useState('حي الملقا، الرياض');
  const [priceStart, setPriceStart] = useState('1800000');
  const [currency, setCurrency] = useState('SAR');
  const [category, setCategory] = useState<'Villa' | 'Apartment' | 'Penthouse' | 'Duplex' | 'Commercial'>('Villa');
  const [imagePlaceholder, setImagePlaceholder] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80');

  // SEO configs
  const [metaTitle, setMetaTitle] = useState('AQar | Saudi & Dubai Luxury Villas');
  const [metaKeyword, setMetaKeyword] = useState('saudi villa, marassi chalet, dubai luxury, real estate crm');
  const [sitemapStatus, setSitemapStatus] = useState<'active' | 'generating'>('active');

  const [publishSuccess, setPublishSuccess] = useState(false);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const matchedDev = developers.find(d => d.id === devId);
    
    onAddProject({
      title,
      titleAr: titleAr || title,
      description,
      descriptionAr: descriptionAr || description,
      developerId: devId,
      developerName: matchedDev ? matchedDev.name : 'AQar Boutique Developer',
      areaId: 'area_3', // Riyadh Malqa ID default
      areaName,
      areaNameAr,
      priceStart: parseFloat(priceStart) || 2000000,
      currency,
      images: [imagePlaceholder, 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop&q=80'],
      deliveryDate: 'Q4 2027',
      deliveryDateAr: 'الربع الرابع ٢٠٢٧',
      paymentPlan: {
        downPayment: 10,
        years: 6,
        monthlyInstallment: '25,000 ' + currency,
        monthlyInstallmentAr: '٢٥,٠٠٠ ' + currency
      },
      amenities: ['Custom High-Speed Pool', 'Smart Home Network', 'Exclusive Garden Layout'],
      amenitiesAr: ['مسبح مائي ذكي', 'شبكة تحكم منزلية', 'حديقة خاصة خارجية'],
      coordinates: { lat: 24.8, lng: 46.6 },
      category
    });

    setPublishSuccess(true);
    // Reset forms
    setTitle('');
    setTitleAr('');
    setDescription('');
    setDescriptionAr('');

    setTimeout(() => {
      setPublishSuccess(false);
    }, 4000);
  };

  return (
    <div className="flex-1 bg-[#f4f7fe] flex flex-col h-full text-slate-800 font-sans">
      
      {/* Brand Tab control panel */}
      <div className="bg-white p-4 border-b border-slate-100 space-y-3 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-black text-[#092a5e] tracking-tight uppercase flex items-center gap-1.5 font-sans">
              <Activity className="w-4 h-4 text-[#0b53c7]" />
              <span>{language === 'ar' ? 'الإدارة والتحليلات' : 'SaaS Admin Console'}</span>
            </h3>
            <p className="text-[10px] text-slate-400 font-mono font-bold tracking-wider">AQAR SaaS EXECUTIVE MATRIX</p>
          </div>
          <span className="text-[9px] bg-blue-50 text-[#0b53c7] px-2.5 py-1 rounded-full border border-blue-100 font-mono font-semibold">
            v3.5 Live Server
          </span>
        </div>

        {/* Admin Tabs */}
        <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100 font-sans font-bold">
          <button
            onClick={() => setAdminTab('kpis')}
            className={`flex-1 py-1.5 text-center text-xs rounded-lg transition-all ${
              adminTab === 'kpis' ? 'bg-white text-[#0b53c7] shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            📈 KPIs
          </button>
          <button
            onClick={() => setAdminTab('pub-project')}
            className={`flex-1 py-1.5 text-center text-xs rounded-lg transition-all ${
              adminTab === 'pub-project' ? 'bg-white text-[#0b53c7] shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            🏗️ Publish
          </button>
          <button
            onClick={() => setAdminTab('seo-identity')}
            className={`flex-1 py-1.5 text-center text-xs rounded-lg transition-all ${
              adminTab === 'seo-identity' ? 'bg-white text-[#0b53c7] shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            🌐 SEO
          </button>
        </div>
      </div>

      {/* Dynamic Tab Panel */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none">

        {/* KPIS TAB */}
        {adminTab === 'kpis' && (
          <div className="space-y-4">
            {/* Real Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-100 flex flex-col justify-between shadow-sm">
                <span className="text-[9px] text-slate-400 font-mono font-bold tracking-wider uppercase">PUBLISHED PROJECTS</span>
                <span className="text-xl font-extrabold text-[#092a5e] font-mono mt-1">{projects.length} Projs</span>
                <p className="text-[9px] text-slate-450 mt-1 font-mono">Synced Database Grid</p>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-slate-100 flex flex-col justify-between shadow-sm">
                <span className="text-[9px] text-slate-400 font-mono font-bold tracking-wider uppercase">DEVELOPER LICENSES</span>
                <span className="text-xl font-extrabold text-[#092a5e] font-mono mt-1">{developers.length} Brands</span>
                <p className="text-[9px] text-slate-450 mt-1 font-mono">Saudi / Dubai Entities</p>
              </div>
            </div>

            {/* Media Uploads simulation Status widget */}
            <div className="p-4 rounded-2xl bg-white border border-slate-100 space-y-3 shadow-sm">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                  <Image className="w-3.5 h-3.5 text-[#0b53c7]" />
                  <span>Media Platform CDN Server</span>
                </h4>
                <span className="text-[10px] text-emerald-600 font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">● Active</span>
              </div>
              <div className="space-y-1.5 text-[11px] text-slate-500 font-medium">
                <div className="flex justify-between">
                  <span>S3 Images Optimization Engine:</span>
                  <span className="text-[#092a5e] font-mono font-bold">AVIF WebP Enabled</span>
                </div>
                <div className="flex justify-between">
                  <span>HLS Streaming Video Pipe:</span>
                  <span className="text-[#092a5e] font-mono font-bold">1080p CDN Live</span>
                </div>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[84%] h-full bg-[#0b53c7] rounded-full"></div>
              </div>
              <p className="text-[9px] text-slate-400 text-center font-mono font-bold">8.4 GB USED OF 10 GB TRIAL SERVER BANDWIDTH</p>
            </div>

            {/* Simulated Live Leads Stream Activity Log */}
            <div className="p-4 rounded-2xl bg-white border border-slate-100 space-y-3 shadow-sm">
              <h4 className="text-xs font-black text-slate-750 uppercase tracking-wider font-sans text-[11px]">
                System Core Log Timeline
              </h4>
              <div className="space-y-2 text-[10px] font-mono">
                <div className="flex justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500">[19:15] CRM REST Endpoints</span>
                  <span className="text-emerald-600 font-semibold">200 OK</span>
                </div>
                <div className="flex justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500">[18:40] XML Sitemap Cronjob</span>
                  <span className="text-[#0b53c7] font-semibold">GENERATED</span>
                </div>
                <div className="flex justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500">[16:11] WhatsApp Multi-Num Bot</span>
                  <span className="text-[#0b53c7] font-semibold">ONLINE</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PUBLISH PROJECT */}
        {adminTab === 'pub-project' && (
          <form onSubmit={handlePublish} className="space-y-4 bg-white p-4 rounded-2xl border border-slate-105 shadow-sm">
            <h4 className="text-xs font-black text-[#092a5e] uppercase tracking-wider">
              {language === 'ar' ? 'نشر مشروع عقاري جديد' : 'Publish Authorized Estate Project'}
            </h4>

            {publishSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-700 flex items-start gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 animate-bounce" />
                <div>
                  <p className="font-bold">Project Published Live!</p>
                  <p className="text-[10px] text-slate-500">Asset successfully synced with core CRM, Home screen feed & global list.</p>
                </div>
              </div>
            )}

            <div className="space-y-3.5 text-xs text-slate-600">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-slate-500 font-bold uppercase tracking-wide text-[9px]">Project Title (EN)</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Dubai Marina Vista"
                    className="luxury-input py-2.5 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-500 font-bold uppercase tracking-wide text-[9px]">Project Title (AR)</label>
                  <input
                    type="text"
                    value={titleAr}
                    onChange={(e) => setTitleAr(e.target.value)}
                    placeholder="مثال: فندق مارينا فيستا"
                    className="luxury-input py-2.5 text-right"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-500 font-bold uppercase tracking-wide text-[9px]">Developer Representative</label>
                <select
                  value={devId}
                  onChange={(e) => setDevId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-[14px] text-slate-800 text-[13px] font-semibold focus:bg-white focus:outline-none focus:border-[#0b53c7] focus:ring-4 focus:ring-[#0b53c7]/6 transition-all"
                >
                  {developers.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-slate-500 font-bold uppercase tracking-wide text-[9px]">Area Name (EN)</label>
                  <input
                    type="text"
                    value={areaName}
                    onChange={(e) => setAreaName(e.target.value)}
                    className="luxury-input py-2.5"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-500 font-bold uppercase tracking-wide text-[9px]">Area Name (AR)</label>
                  <input
                    type="text"
                    value={areaNameAr}
                    onChange={(e) => setAreaNameAr(e.target.value)}
                    className="luxury-input py-2.5 text-right"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-slate-500 font-bold uppercase tracking-wide text-[9px]">Starting Price</label>
                  <input
                    type="number"
                    value={priceStart}
                    onChange={(e) => setPriceStart(e.target.value)}
                    className="luxury-input py-2.5 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-500 font-bold uppercase tracking-wide text-[9px]">Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-[14px] text-slate-800 text-[13px] font-semibold focus:bg-white focus:outline-none focus:border-[#0b53c7] focus:ring-4 focus:ring-[#0b53c7]/6 transition-all"
                  >
                    <option value="SAR">SAR (KSA)</option>
                    <option value="AED">AED (UAE)</option>
                    <option value="EGP">EGP (Egypt)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-500 font-bold uppercase tracking-wide text-[9px]">Listing Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-[14px] text-slate-800 text-[13px] font-semibold focus:bg-white focus:outline-none focus:border-[#0b53c7] focus:ring-4 focus:ring-[#0b53c7]/6 transition-all"
                  >
                    <option value="Villa">Villa</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Duplex">Duplex</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-500 font-bold uppercase tracking-wide text-[9px]">High-Res Cover Photo Link</label>
                <input
                  type="text"
                  value={imagePlaceholder}
                  onChange={(e) => setImagePlaceholder(e.target.value)}
                  className="luxury-input py-2.5 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-500 font-bold uppercase tracking-wide text-[9px]">Project Description (EN)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-[14px] text-slate-800 text-[12px] focus:bg-white focus:outline-none focus:border-[#0b53c7] focus:ring-4 focus:ring-[#0b53c7]/6 transition-all"
                  placeholder="Insert premium description layout details..."
                />
              </div>
            </div>

            <button
              type="submit"
              className="luxury-btn-primary w-full py-4 shadow-md font-mono cursor-pointer"
            >
              🚀 PUBLISH PROJECT PIPELINE
            </button>
          </form>
        )}

        {/* SEO IDENTITY */}
        {adminTab === 'seo-identity' && (
          <div className="space-y-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="text-xs font-black text-[#092a5e] uppercase tracking-wider">
              SEO Parameters & Sitemap Schema
            </h4>

            <div className="space-y-3.5 text-xs text-slate-600">
              <div className="space-y-1">
                <label className="text-slate-500 font-bold uppercase tracking-wide text-[9px]">Global meta title template</label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="luxury-input py-2.5 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-500 font-bold uppercase tracking-wide text-[9px]">Target Organic Keywords</label>
                <input
                  type="text"
                  value={metaKeyword}
                  onChange={(e) => setMetaKeyword(e.target.value)}
                  className="luxury-input py-2.5 font-mono"
                />
              </div>

              {/* Sitemap Generator Simulation Button */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                <div>
                  <p className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#0b53c7]" />
                    <span>XML Sitemap Index</span>
                  </p>
                  <p className="text-[9px] text-slate-400 font-mono">Build with 231 absolute sitemap URLs</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSitemapStatus('generating');
                    setTimeout(() => setSitemapStatus('active'), 2000);
                  }}
                  className="px-2.5 py-1.5 bg-blue-50 text-[#0b53c7] font-bold rounded-lg hover:bg-blue-100 transition-all font-sans text-[10px]"
                >
                  {sitemapStatus === 'active' ? '🔄 Regenerate' : '⏳ Building...'}
                </button>
              </div>

              <div className="p-3 bg-blue-50/40 border border-blue-100 rounded-xl text-[10px] text-slate-500 leading-relaxed font-sans space-y-1">
                <p className="font-bold flex items-center gap-1 text-[#0b53c7]">
                  <MonitorCheck className="w-3.5 h-3.5" />
                  <span>Hostinger and Cloud Deploy Core Integration:</span>
                </p>
                <p>This panel is bound directly to our Node/Express server configured in server.ts. All published items instantly reflect in client-side JSON queries via API endpoints.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
