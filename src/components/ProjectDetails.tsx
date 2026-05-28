import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Project, Unit, Developer } from '../types';
import { 
  Heart, Share2, MapPin, Calculator, PhoneCall, MessageSquare, 
  ChevronLeft, CheckCircle, TrendingUp, Calendar, Compass, 
  Sparkles, Award, Star, ArrowRight, ShieldCheck, DollarSign,
  Maximize2, ChevronRight, Map, Clock, AlertCircle, Info, FileText,
  User, Shield, Landmark, Sparkle
} from 'lucide-react';

interface ProjectDetailsProperties {
  project: Project;
  developer?: Developer;
  units: Unit[];
  relatedProjects: Project[];
  isFavorited: boolean;
  onClose: () => void;
  onToggleFavorite: () => void;
  onSelectProject: (p: Project) => void;
}

export const ProjectDetails: React.FC<ProjectDetailsProperties> = ({
  project,
  developer,
  units,
  relatedProjects,
  isFavorited,
  onClose,
  onToggleFavorite,
  onSelectProject
}) => {
  const { t, language, isRtl } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'blueprints' | 'timeline' | 'location'>('overview');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  // Custom Requisition Calculator states
  const [calcDownpaymentPercent, setCalcDownpaymentPercent] = useState(project.paymentPlan.downPayment || 10);
  const [calcYears, setCalcYears] = useState(project.paymentPlan.years || 7);
  
  // Interactive VIP Booking form
  const [bookingDate, setBookingDate] = useState('2026-06-15');
  const [bookingTime, setBookingTime] = useState('11:00');
  const [tourType, setTourType] = useState<'yacht' | 'limo' | 'normal'>('limo');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const [copied, setCopied] = useState(false);

  // Calculations
  const totalPrice = project.priceStart;
  const downpaymentAmount = Math.round((totalPrice * calcDownpaymentPercent) / 100);
  const remainingDebt = totalPrice - downpaymentAmount;
  const yearlyPayment = Math.round(remainingDebt / calcYears);
  const monthlyPaymentAmount = Math.round(yearlyPayment / 12);

  // Elite analytics
  const expectedRoi = 9.2; 
  const appreciationRate = 14.8; 
  const occupancyRating = 95.5; 
  const sqftPrice = Math.round(totalPrice / 1950); 

  const locationsMock = [
    { name: language === 'ar' ? 'مطار القاهرة الدولي' : 'Cairo Intl Airport', time: '18 min', icon: <Compass className="w-3.5 h-3.5 text-zinc-400" /> },
    { name: language === 'ar' ? 'وسط المدينة' : 'Downtown District', time: '12 min', icon: <MapPin className="w-3.5 h-3.5 text-zinc-400" /> },
    { name: language === 'ar' ? 'الجامعة الأمريكية' : 'American Univ (AUC)', time: '5 min', icon: <Award className="w-3.5 h-3.5 text-zinc-400" /> },
    { name: language === 'ar' ? 'الممشى السياحي الفاخر' : 'Elite Luxury Walkway', time: '8 min', icon: <Sparkles className="w-3.5 h-3.5 text-zinc-400" /> },
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;
    setIsBookingSubmitting(true);
    setTimeout(() => {
      setIsBookingSubmitting(false);
      setBookingSuccess(true);
    }, 1400);
  };

  return (
    <div className="absolute inset-0 z-40 bg-[#fbfbfa] flex flex-col justify-between overflow-hidden select-none animate-slide-up font-sans text-stone-800">
      
      {/* Subtlest blur background blobs */}
      <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-blue-100/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-amber-50/20 rounded-full blur-[100px] pointer-events-none"></div>

      {/* FIXED FLOATING NAV HEADER (MINIMALIST APPLE POLISH) */}
      <div className="absolute top-5 inset-x-6 z-50 flex justify-between items-center">
        <button
          onClick={onClose}
          className="p-3 rounded-full bg-white/80 backdrop-blur-xl border border-zinc-200/40 text-stone-800 hover:bg-white hover:shadow-lg active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
        >
          <ChevronLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
        </button>

        <div className="flex gap-2">
          <button
            onClick={onToggleFavorite}
            className={`p-3 rounded-full bg-white/80 backdrop-blur-xl border border-zinc-200/40 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer shadow-xs ${
              isFavorited ? 'text-rose-500' : 'text-stone-400 hover:text-rose-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current text-rose-500' : ''}`} />
          </button>
          
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2500);
              }
            }}
            className="p-3 rounded-full bg-white/80 backdrop-blur-xl border border-zinc-200/40 text-stone-600 hover:text-stone-900 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer shadow-xs"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating State Toast */}
      {copied && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-[60] px-4 py-2.5 bg-[#090e1a]/95 text-white text-xs font-semibold rounded-full border border-white/10 shadow-xl flex items-center gap-2 animate-slide-down">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
          <span>{language === 'ar' ? 'تم نسخ الرابط الفخم بنجاح!' : 'Luxury strategy link copied to your clipboard.'}</span>
        </div>
      )}

      {/* SCROLLABLE MAIN REGION */}
      <div className="flex-1 overflow-y-auto pb-28 scrollbar-none">
        
        {/* CINEMATIC WIDESCREEN HERO GRAPHIC */}
        <div className="relative w-full h-[380px] md:h-[500px] bg-[#0c101a] overflow-hidden group">
          <img
            src={project.images[activeImageIndex]}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-[6000ms] ease-out scale-100 group-hover:scale-103"
          />
          
          {/* Refined Double Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e121d] via-transparent to-black/10"></div>
          <div className="absolute inset-0 bg-radial-at-b from-transparent via-[#010307]/5 to-[#010307]/45"></div>
          
          {/* Title & Floating Metadata */}
          <div className="absolute bottom-10 inset-x-6 md:inset-x-12 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.2em] bg-white/10 backdrop-blur-md text-white border border-white/10 px-3 py-1 rounded-full font-mono font-bold">
                  {project.category}
                </span>
                
                <span className="text-[10px] uppercase tracking-widest text-[#93c5fd] font-bold font-mono">
                  ★ LUXURY SERIES
                </span>
              </div>
              
              <h1 className="text-2xl md:text-4xl font-light text-white tracking-tight leading-tight">
                {language === 'ar' ? project.titleAr : project.title}
              </h1>

              <div className="flex items-center gap-2 text-xs text-stone-300/90 font-light">
                <MapPin className="w-3.5 h-3.5 text-[#3b82f6] shrink-0" />
                <span>{language === 'ar' ? project.areaNameAr : project.areaName}</span>
                <span className="opacity-45">•</span>
                <span>{language === 'ar' ? 'التجمع الخامس' : 'New Cairo'}</span>
              </div>
            </div>

            <button
              onClick={() => setIsLightboxOpen(true)}
              className="self-start md:self-auto p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-xl hover:scale-105 transition-all duration-300 border border-white/10 outline-none shadow-premium cursor-pointer"
              title="Expand Ultra-Res Dossier"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute top-24 right-6 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[9px] font-mono text-stone-300 tracking-wider">
            {activeImageIndex + 1} / {project.images.length}
          </div>
        </div>

        {/* THUMBNAIL TRACK - SLIGHTLY INSET AND SLEEK */}
        <div className="bg-[#0e121d] px-6 py-4 flex gap-3 items-center overflow-x-auto scrollbar-none select-none">
          <div className="flex gap-2.5 mx-auto">
            {project.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`relative rounded-lg overflow-hidden h-12 w-20 flex-shrink-0 transition-all duration-500 ease-out ${
                  activeImageIndex === index 
                  ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-[#0e121d] scale-102 opacity-100' 
                  : 'opacity-40 hover:opacity-80 border border-white/5'
                }`}
              >
                <img src={img} alt="Preview thumb" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* BREATHEABLE TWO COLUMN Apple-style ARCHITECTURE GRID */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT AREA: Main Dossier Portfolio Details */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* INSET PORTFOLIO HEADLINES - NO BORDERS, SOLID WHITESPACE */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white p-8 rounded-2xl border border-zinc-100 shadow-[0_8px_30px_rgba(0,0,0,0.012)]">
              <div className="space-y-1">
                <span className="text-[10px] text-stone-400 font-mono tracking-widest uppercase block">
                  {language === 'ar' ? 'السعر الافتتاحي وبدء الحجز' : 'STARTING REQUISITION'}
                </span>
                <p className="text-base md:text-lg font-bold text-blue-600 font-mono tracking-tight">
                  {project.priceStart.toLocaleString()} <span className="text-xs font-semibold text-stone-400">{project.currency}</span>
                </p>
              </div>

              <div className="space-y-1 border-l border-zinc-100 pl-4">
                <span className="text-[10px] text-stone-400 font-mono tracking-widest uppercase block">
                  {language === 'ar' ? 'موعد الاستلام والتحقير' : 'HANDOVER EST.'}
                </span>
                <p className="text-sm font-semibold text-stone-700 font-sans mt-0.5">
                  {language === 'ar' ? project.deliveryDateAr : project.deliveryDate}
                </p>
              </div>

              <div className="space-y-1 border-l border-zinc-100 pl-4">
                <span className="text-[10px] text-stone-400 font-mono tracking-widest uppercase block">
                  {language === 'ar' ? 'العائد الاستثماري المتوقع' : 'EST. NET ROI'}
                </span>
                <p className="text-sm font-semibold text-emerald-600 font-mono mt-0.5 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>★ {expectedRoi}%</span>
                </p>
              </div>

              <div className="space-y-1 border-l border-zinc-100 pl-4">
                <span className="text-[10px] text-stone-400 font-mono tracking-widest uppercase block">
                  {language === 'ar' ? 'سعر المتر التقديري' : 'PER SQFT REF'}
                </span>
                <p className="text-sm font-semibold text-indigo-900 font-mono mt-0.5">
                  {sqftPrice.toLocaleString()} {project.currency}
                </p>
              </div>
            </div>

            {/* MINIMALIST CONTEMPORARY HORIZONTAL TABS */}
            <div className="border-b border-zinc-150">
              <div className="flex gap-1 md:gap-6 overflow-x-auto scrollbar-none py-1">
                {[
                  { id: 'overview', label: language === 'ar' ? 'الملخص والتفاصيل' : 'Dossier Synopsis' },
                  { id: 'analytics', label: language === 'ar' ? 'المؤشرات والجدوى' : 'Investment Index' },
                  { id: 'timeline', label: language === 'ar' ? 'جدول السداد' : 'Repayment Term' },
                  { id: 'blueprints', label: language === 'ar' ? 'الوحدات المعلنة' : 'Suites Collection' },
                  { id: 'location', label: language === 'ar' ? 'الموقع والمعالم' : 'Spatial Geography' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-4 px-2 text-xs md:text-sm font-semibold tracking-tight whitespace-nowrap transition-all cursor-pointer relative ${
                      activeTab === tab.id 
                        ? 'text-blue-600' 
                        : 'text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <span className="absolute bottom-0 inset-x-0 h-[1.5px] bg-blue-600 rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* SYNOPSIS OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-10 animate-fade-in">
                {/* Description details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-3.5 bg-blue-600 rounded-full"></span>
                    <h4 className="text-[10px] font-mono tracking-widest text-[#0b53c7] font-semibold uppercase">
                      {language === 'ar' ? 'ملخص العقار والريادة' : 'ARCHITECTURAL CONCEPT & INTENT'}
                    </h4>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed font-sans text-justify font-light">
                    {language === 'ar' ? project.descriptionAr : project.description}
                  </p>
                </div>

                {/* Developer block - Hairline thin frame, soft background */}
                {developer && (
                  <div className="p-6 rounded-2xl bg-stone-50/50 border border-stone-200/30 relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 rounded-xl bg-white border border-stone-200/20 flex items-center justify-center text-xl shadow-xs font-light shrink-0">
                          {developer.logoUrl}
                        </div>
                        <div>
                          <span className="text-[8px] text-blue-600 font-mono font-bold tracking-widest uppercase block">SIGNATURE DEVELOPER</span>
                          <h5 className="text-sm font-semibold text-stone-850 tracking-tight mt-0.5">{developer.name}</h5>
                          <span className="text-[9px] text-stone-400/80 font-mono">PRESTIGE ESTABLISHED: {developer.estYear}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 py-1.5 px-3 bg-white border border-stone-100 rounded-xl shadow-2xs">
                        <div className="text-center shrink-0">
                          <p className="text-xs font-bold text-amber-500 font-mono flex items-center justify-center gap-0.5">
                            <Star className="w-3 h-3 fill-current text-amber-400" />
                            {developer.rating}
                          </p>
                          <span className="text-[7.5px] text-stone-400 tracking-wider block uppercase">{language === 'ar' ? 'التقييم' : 'INDEX'}</span>
                        </div>
                        <div className="w-px h-6 bg-stone-100"></div>
                        <div className="text-center">
                          <p className="text-xs font-bold text-stone-800 font-mono">{developer.projectsCount}</p>
                          <span className="text-[7.5px] text-stone-400 tracking-wider block uppercase">{language === 'ar' ? 'مشاريع' : 'REQUISITIONS'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-stone-500 italic mt-4 leading-relaxed font-light border-t border-stone-100 pt-4">
                      "{language === 'ar' ? developer.descriptionAr : developer.description}"
                    </p>
                  </div>
                )}

                {/* Amenities luxury list */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                    <h4 className="text-[10px] font-mono tracking-widest text-[#0b53c7] font-semibold uppercase">
                      {t.amenities}
                    </h4>
                    <span className="text-[9px] font-bold text-stone-400 tracking-widest font-mono">SELECTED PRIVILEGES</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {(language === 'ar' ? project.amenitiesAr : project.amenities).map((amenity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-zinc-100/60 hover:border-blue-100/50 hover:bg-blue-50/10 transition-all duration-300">
                        <div className="w-5 h-5 rounded-md bg-blue-50/50 flex items-center justify-center text-blue-500 shrink-0">
                          <Sparkle className="w-2.5 h-2.5" />
                        </div>
                        <span className="text-[11.5px] text-stone-700 font-normal truncate">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* INVESTMENT METRIC & VALUE RETENTION INDEX */}
            {activeTab === 'analytics' && (
              <div className="space-y-10 animate-fade-in">
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Gauge 1 */}
                  <div className="p-6 bg-white border border-zinc-100 rounded-2xl text-center space-y-4 shadow-sm">
                    <p className="text-[10px] text-stone-400 font-mono tracking-widest uppercase">PROVABLE YEARLY YIELD</p>
                    <div className="relative inline-flex items-center justify-center">
                      <svg className="w-20 h-20 transform -rotate-90">
                        <circle cx="40" cy="40" r="34" stroke="#f4f4f5" strokeWidth="4.5" fill="transparent" />
                        <circle cx="40" cy="40" r="34" stroke="#2563eb" strokeWidth="4.5" fill="transparent" strokeDasharray="213" strokeDashoffset="55" />
                      </svg>
                      <span className="absolute text-sm font-bold font-mono text-stone-850">{expectedRoi}%</span>
                    </div>
                    <h5 className="text-[11px] font-semibold text-stone-800 leading-normal">{language === 'ar' ? 'مؤشر العوائد الإيجارية' : 'Rental Yield Benchmark'}</h5>
                  </div>

                  {/* Gauge 2 */}
                  <div className="p-6 bg-white border border-zinc-100 rounded-2xl text-center space-y-4 shadow-sm">
                    <p className="text-[10px] text-stone-400 font-mono tracking-widest uppercase">ANNUAL MOMENTUM</p>
                    <div className="relative inline-flex items-center justify-center">
                      <svg className="w-20 h-20 transform -rotate-90">
                        <circle cx="40" cy="40" r="34" stroke="#f4f4f5" strokeWidth="4.5" fill="transparent" />
                        <circle cx="40" cy="40" r="34" stroke="#10b981" strokeWidth="4.5" fill="transparent" strokeDasharray="213" strokeDashoffset="75" />
                      </svg>
                      <span className="absolute text-sm font-bold font-mono text-stone-850">+{appreciationRate}%</span>
                    </div>
                    <h5 className="text-[11px] font-semibold text-stone-800 leading-normal">{language === 'ar' ? 'ارتفاع قيمة رأس المال' : 'Capital Appreciation Rate'}</h5>
                  </div>

                  {/* Gauge 3 */}
                  <div className="p-6 bg-white border border-zinc-100 rounded-2xl text-center space-y-4 shadow-sm">
                    <p className="text-[10px] text-stone-400 font-mono tracking-widest uppercase">DISTRICT STABILITY</p>
                    <div className="relative inline-flex items-center justify-center">
                      <svg className="w-20 h-20 transform -rotate-90">
                        <circle cx="40" cy="40" r="34" stroke="#f4f4f5" strokeWidth="4.5" fill="transparent" />
                        <circle cx="40" cy="40" r="34" stroke="#6366f1" strokeWidth="4.5" fill="transparent" strokeDasharray="213" strokeDashoffset="15" />
                      </svg>
                      <span className="absolute text-sm font-bold font-mono text-stone-850">{occupancyRating}%</span>
                    </div>
                    <h5 className="text-[11px] font-semibold text-stone-800 leading-normal">{language === 'ar' ? 'صمود معدل الإشغال المتوقع' : 'Estimated Post-Handover Occupancy'}</h5>
                  </div>
                </div>

                {/* Sparkline chart card with premium aesthetic gradient */}
                <div className="p-8 rounded-2xl bg-[#0b172a] text-white space-y-6 relative overflow-hidden">
                  <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[8.5px] bg-white/10 text-stone-300 font-mono tracking-widest uppercase px-2.5 py-0.5 rounded">
                        REGIONAL RATE COMPARATIVE
                      </span>
                      <h4 className="text-base font-light tracking-tight mt-2">{language === 'ar' ? 'تاريخ تطور سعر المتر (خمس سنوات لشرق الرياض والتجمع)' : 'Compounded Sqft Requisition Development'}</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-emerald-400 font-mono flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" /> +52.5% Compound
                      </p>
                    </div>
                  </div>

                  {/* Aesthetic minimalist lines spline */}
                  <div className="h-32 flex items-end w-full relative pt-6">
                    <svg className="w-full h-full text-blue-500/80" viewBox="0 0 500 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="appleChartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0 85 Q 100 70 200 45 T 400 20 T 500 5"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 0 85 Q 100 70 200 45 T 400 20 T 500 5 L 500 100 L 0 100 Z"
                        fill="url(#appleChartGrad)"
                      />
                      <circle cx="500" cy="5" r="4.5" fill="#10b981" />
                    </svg>

                    <div className="absolute inset-x-0 bottom-0 flex justify-between px-1 text-[8px] font-mono text-stone-400">
                      <span>2022 ({(sqftPrice * 0.62).toFixed(0)} {project.currency})</span>
                      <span>2024 ({(sqftPrice * 0.81).toFixed(0)})</span>
                      <span className="text-white font-bold">Current ({sqftPrice.toLocaleString()})</span>
                    </div>
                  </div>
                </div>

                {/* Exclusive benefit block */}
                <div className="p-5 bg-emerald-50/50 border border-emerald-100 rounded-2xl flex gap-4">
                  <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h5 className="text-xs font-semibold text-emerald-900">{language === 'ar' ? 'الضمان السيادي وإعفاء الضرائب' : 'Tax Shields & Sovereign Guardrails'}</h5>
                    <p className="text-[11.5px] text-emerald-700 font-light leading-relaxed">
                      {language === 'ar' 
                        ? 'مؤهل فوري للحوق ببرنامج الإقامة الذهبية، إعفاء عقاري كلي خاضع لحسابات الضمان المعتمدة بمجلس الوزراء.'
                        : 'Eligible for direct Golden Visa and investment passport registration. Complete rental and property yield security guaranteed by official Central Bank escrow mandates.'}
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* REPAYMENT AND INSTALLMENT MILESTONES */}
            {activeTab === 'timeline' && (
              <div className="space-y-8 animate-fade-in">
                
                <div className="bg-white p-6 rounded-2xl border border-zinc-150/40 space-y-6">
                  <h4 className="text-[10px] font-mono tracking-widest text-stone-400 uppercase">
                    {language === 'ar' ? 'مراحل سداد القيمة العقارية' : 'CONSTRUCTION LINKED PAYOUT PLAN'}
                  </h4>

                  <div className="relative border-l border-zinc-100 pl-8 ml-4 py-1 space-y-8">
                    {/* Step 1 */}
                    <div className="relative">
                      <span className="absolute -left-[37px] top-0.5 w-4 h-4 rounded-full bg-blue-600 border-[2.5px] border-white flex items-center justify-center shadow-xs">
                      </span>
                      <div className="space-y-1">
                        <div className="flex justify-between font-mono">
                          <span className="text-xs font-semibold text-stone-800">{calcDownpaymentPercent}% {language === 'ar' ? 'دفعة الحجز وإصدار العقد' : 'Escrow Downpayment'}</span>
                          <span className="text-xs font-bold text-blue-600">{downpaymentAmount.toLocaleString()} {project.currency}</span>
                        </div>
                        <p className="text-[10.5px] text-stone-400 leading-normal font-light">{language === 'ar' ? 'تدفع فوراً للتخصيص المباشر وإصدار صك الملكية الاستثماري' : 'Processed immediately upon initial letter of reservation to lock preferred suite unit.'}</p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative">
                      <span className="absolute -left-[37px] top-0.5 w-4 h-4 rounded-full bg-zinc-200 border-[2.5px] border-white flex items-center justify-center shadow-xs">
                      </span>
                      <div className="space-y-1">
                        <div className="flex justify-between font-mono">
                          <span className="text-xs font-semibold text-stone-800">20% {language === 'ar' ? 'موزعة طوال فترة أعمال البنية التحتية' : 'Construction Period Installments'}</span>
                          <span className="text-xs font-bold text-stone-600">{(totalPrice * 0.20).toLocaleString()} {project.currency}</span>
                        </div>
                        <p className="text-[10.5px] text-stone-400 leading-normal font-light">{language === 'ar' ? 'تقسط على دفعات ميسرة متزامنة مع تقارير التشييد الرسمية' : 'Equally divided scheduled payouts monitored strictly with independent progress audit reports.'}</p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative">
                      <span className="absolute -left-[37px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 border-[2.5px] border-white flex items-center justify-center shadow-xs animate-pulse">
                      </span>
                      <div className="space-y-1">
                        <div className="flex justify-between font-mono">
                          <span className="text-xs font-semibold text-stone-800">{(100 - calcDownpaymentPercent - 20)}% {language === 'ar' ? 'باقي القيمة عند الاستلام وتسليم المفاتيح' : 'Handover & Core Completion'}</span>
                          <span className="text-xs font-bold text-emerald-600">{(totalPrice * ((100 - calcDownpaymentPercent - 20) / 100)).toLocaleString()} {project.currency}</span>
                        </div>
                        <p className="text-[10.5px] text-stone-400 leading-normal font-light">{language === 'ar' ? 'الدفعة الختامية لتمام الترخيص واستلام صك الملكية البائن' : 'Final outstanding balances due on master keys handover and verified premium interior audit.'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-stone-50 border border-stone-200/35 rounded-xl flex gap-3 items-center">
                  <Info className="w-4 h-4 text-stone-400 shrink-0" />
                  <p className="text-[10px] text-stone-500 font-light leading-normal">
                    {language === 'ar' 
                      ? 'جميع الأقساط تودع في حساب الضمان المنظم تحت رقابة الهيئات العقارية المعنية لحماية أموال الحاجزين.'
                      : 'All client funds are placed into sovereign escrow trust structure accounts strictly regulated to ensure construction compliance.'}
                  </p>
                </div>

              </div>
            )}

            {/* SUITES SELECTION DIRECT DRAFT */}
            {activeTab === 'blueprints' && (
              <div className="space-y-6 animate-fade-in">
                {units.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {units.map((unit) => (
                      <div 
                        key={unit.id} 
                        className="p-5 bg-white border border-zinc-100 rounded-2xl flex flex-col justify-between transition hover:shadow-md hover:border-blue-100 duration-300"
                      >
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <h5 className="text-xs font-bold text-stone-850 tracking-tight">{unit.type}</h5>
                            <span className="text-[8px] tracking-widest font-mono uppercase bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded">
                              VIP RESERVABLE
                            </span>
                          </div>
                          
                          <p className="text-[11px] text-stone-400 font-mono">
                            {unit.beds} {language === 'ar' ? 'غرف' : 'Beds'} • {unit.baths} {language === 'ar' ? 'حمامات' : 'Baths'} • {unit.areaSqft.toLocaleString()} Sqft
                          </p>

                          <div className="flex gap-1.5 flex-wrap pt-2">
                            {(language === 'ar' ? unit.featuresAr : unit.features).slice(0, 3).map((feat, idx) => (
                              <span key={idx} className="text-[8.5px] bg-stone-50 text-stone-500 px-2.5 py-0.5 rounded border border-stone-100 font-light">
                                {feat}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-stone-50 flex justify-between items-end">
                          <div>
                            <span className="text-[7.5px] text-stone-400 tracking-wider font-mono block">SUITE INVESTMENT</span>
                            <p className="text-xs font-black text-blue-600 font-mono">
                              {unit.price.toLocaleString()} {project.currency}
                            </p>
                          </div>
                          
                          <a 
                            href={`https://wa.me/${unit.agentWhatsApp}?text=${encodeURIComponent(
                              `Hello VIP Rep, I am registered in Cairo luxury portal and would like details for Suite Type: ${unit.type} in Project: ${project.title}. Starting price: ${unit.price.toLocaleString()} ${project.currency}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 bg-zinc-900 hover:bg-black text-white rounded-lg text-[9px] font-bold transition-all"
                          >
                            {language === 'ar' ? 'طلب المخطط' : 'Get Floorplan SVG'}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-stone-50/50 border border-stone-200/20 rounded-2xl">
                    <FileText className="w-8 h-8 text-stone-300 mx-auto opacity-75 mb-2.5" />
                    <p className="text-xs text-stone-400 font-semibold">{language === 'ar' ? 'مخططات الوحدات تقدم بطلب ترخيص خاص' : 'Layout documents are classified under private registration keys.'}</p>
                  </div>
                )}
              </div>
            )}

            {/* HIGH FIDELITY GEOGRAPHIC PLACES MAP */}
            {activeTab === 'location' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Embedded Stylized Real Estate Vector Map Canvas */}
                <div className="relative h-[260px] rounded-2xl overflow-hidden border border-zinc-150/50 shadow-xs bg-[#f4f4f5]">
                  <div className="absolute inset-0 bg-[#f4f4f5] flex items-center justify-center opacity-95 overflow-hidden">
                    
                    {/* Minimalist vector streets graph drawing */}
                    <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 opacity-30 pointer-events-none">
                      {[...Array(48)].map((_, i) => (
                        <div key={i} className="border border-stone-300/60"></div>
                      ))}
                    </div>
                    
                    <div className="absolute w-[800px] h-[20px] bg-white rotate-20 -left-10 shadow-3xs"></div>
                    <div className="absolute w-[400px] h-[30px] bg-white -rotate-60 right-20 shadow-3xs"></div>
                    <div className="absolute w-[12px] h-[500px] bg-sky-200/40 -rotate-45 right-36"></div>

                    {/* Landmarks overlay pins */}
                    <div className="absolute top-10 left-16 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full border border-zinc-200/50 text-[9px] font-semibold text-stone-700 shadow-2xs flex items-center gap-1.5">
                      <Compass className="w-3 h-3 text-zinc-400" />
                      <span>Al Marasem District</span>
                    </div>

                    <div className="absolute bottom-12 right-24 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full border border-zinc-200/50 text-[9px] font-semibold text-stone-700 shadow-2xs flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>The Waterway Point</span>
                    </div>

                    {/* Highly polished target pin */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                      <div className="relative">
                        <div className="absolute -inset-3 bg-blue-500/20 rounded-full animate-ping"></div>
                        <div className="w-12 h-12 rounded-full bg-blue-600 border-[3px] border-white flex items-center justify-center text-white shadow-xl relative transition-transform hover:scale-105 duration-350 cursor-pointer">
                          <MapPin className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="mt-2 bg-stone-900 border border-white/10 text-white text-[9.5px] font-mono tracking-widest font-extrabold px-3 py-1 rounded-lg shadow-md whitespace-nowrap">
                        {language === 'ar' ? project.titleAr : project.title}
                      </div>
                    </div>
                  </div>

                  {/* Lat Lng corner coordinates info badge */}
                  <div className="absolute bottom-3 left-3 bg-stone-950/80 text-white backdrop-blur-md px-3 py-1 rounded-lg text-[8.5px] font-mono border border-white/5 tracking-widest">
                    LAT: {project.coordinates.lat.toFixed(4)} • LNG: {project.coordinates.lng.toFixed(4)}
                  </div>
                </div>

                {/* Driving distance list */}
                <div className="grid grid-cols-2 gap-4">
                  {locationsMock.map((landmark, index) => (
                    <div 
                      key={index} 
                      className="p-4 rounded-xl bg-white border border-zinc-100 flex items-center justify-between transition hover:border-blue-600/30 group shadow-3xs"
                    >
                      <div className="flex gap-3 items-center min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-stone-50 flex items-center justify-center shrink-0">
                          {landmark.icon}
                        </div>
                        <span className="text-[11px] font-semibold text-stone-700 truncate">{landmark.name}</span>
                      </div>
                      <span className="text-xs font-bold text-blue-600 font-mono">{landmark.time}</span>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* RECOMMENDED PROJECTS */}
            {relatedProjects.length > 0 && (
              <div className="space-y-6 pt-4">
                <h4 className="text-[10px] font-mono tracking-widest text-[#0b53c7] font-semibold uppercase">
                  {language === 'ar' ? 'توسيع محفظتك الاستثمارية' : 'PORTFOLIO DEVELOPMENT SUITES'}
                </h4>
                
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none select-none">
                  {relatedProjects.map((rp) => (
                    <div
                      key={rp.id}
                      onClick={() => { onSelectProject(rp); setActiveImageIndex(0); }}
                      className="w-64 bg-white rounded-2xl border border-zinc-100 hover:border-zinc-200 overflow-hidden cursor-pointer flex-shrink-0 transition-all duration-300 hover:shadow-md group"
                    >
                      <div className="relative h-32 overflow-hidden bg-stone-950">
                        <img 
                          src={rp.images[0]} 
                          alt={rp.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition duration-[4000ms] scale-100 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <span className="absolute bottom-2.5 left-3 text-[8.5px] bg-blue-600 text-white px-2.5 py-0.5 rounded font-mono font-bold tracking-widest">
                          {rp.category}
                        </span>
                      </div>
                      
                      <div className="p-4 space-y-1.5">
                        <p className="text-xs font-bold text-stone-850 truncate transition group-hover:text-blue-600">
                          {language === 'ar' ? rp.titleAr : rp.title}
                        </p>
                        
                        <div className="flex justify-between items-center pt-2 border-t border-stone-50">
                          <p className="text-xs font-bold text-stone-700 font-mono">
                            {rp.priceStart.toLocaleString()} <span className="text-[9px] text-[#0b53c7]">{rp.currency}</span>
                          </p>
                          <span className="text-[9px] text-stone-400 flex items-center gap-0.5">
                            <MapPin className="w-2.5 h-2.5 text-blue-500" />
                            {language === 'ar' ? rp.areaNameAr : rp.areaName}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT AREA: STICKY FLOATING RESERVATION CARD (iOS COCONUT SHINE) */}
          <div className="lg:col-span-1">
            
            <div className="sticky top-24 bg-white p-6 rounded-2xl border border-zinc-150/50 shadow-[0_12px_40px_rgba(0,0,0,0.015)] space-y-6">
              
              {/* Card Header information */}
              <div className="space-y-2 border-b border-stone-100 pb-4">
                <span className="text-[8px] bg-blue-50/70 text-blue-600 px-3 py-1 rounded-md font-bold tracking-[0.15em] font-mono uppercase inline-block">
                  {language === 'ar' ? 'معاينة وجولة خاصة لموقع المشروع' : 'EXCLUSIVE VISITING CORPS'}
                </span>
                <h3 className="text-base font-bold text-indigo-950 tracking-tight mt-1">
                  {language === 'ar' ? 'جدولة رغبة المعاينة الخاصة' : 'Private Viewing Request'}
                </h3>
                <p className="text-[11px] text-stone-400 leading-normal font-light">
                  {language === 'ar' ? 'اختر تاريخ وسيلة الانتقال لمعاينة موقع العقار الحقيقي بصحبة منسق كبار الملاك' : 'Establish luxury high-profile logistics coordinate loops to survey suites.'}
                </p>
              </div>

              {!bookingSuccess ? (
                <form onSubmit={handleBookingSubmit} className="space-y-5">
                  
                  {/* Calendar details */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] text-stone-400 uppercase font-mono tracking-widest block font-bold">
                      {language === 'ar' ? 'تاريخ المعاينة الفضل' : 'Preferred Requisition date'}
                    </label>
                    <input 
                      type="date" 
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full text-xs bg-stone-50 border border-zinc-200/55 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-600 font-mono text-stone-700"
                      required
                    />
                  </div>

                  {/* Logistics type selection with beautiful premium active styles and high-end options */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] text-stone-400 uppercase font-mono tracking-widest block font-bold">
                      {language === 'ar' ? 'خدمة اللوجستيات والنقل' : 'Logistics Escort Service'}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setTourType('limo')}
                        className={`py-2 rounded-xl text-[9px] font-bold border transition-all duration-300 cursor-pointer ${
                          tourType === 'limo' 
                          ? 'border-blue-600 bg-blue-50/40 text-blue-600 font-extrabold' 
                          : 'border-zinc-250 bg-stone-50 text-stone-500 hover:bg-stone-100'
                        }`}
                      >
                        {language === 'ar' ? 'سيارة فارهة' : 'Limo Escort'}
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setTourType('yacht')}
                        className={`py-2 rounded-xl text-[9px] font-bold border transition-all duration-300 cursor-pointer ${
                          tourType === 'yacht' 
                          ? 'border-blue-600 bg-blue-50/40 text-blue-600 font-extrabold' 
                          : 'border-zinc-250 bg-stone-50 text-stone-500 hover:bg-stone-100'
                        }`}
                      >
                        {language === 'ar' ? 'يخت بحري' : 'Yacht Tour'}
                      </button>

                      <button
                        type="button"
                        onClick={() => setTourType('normal')}
                        className={`py-2 rounded-xl text-[9px] font-bold border transition-all duration-300 cursor-pointer ${
                          tourType === 'normal' 
                          ? 'border-blue-600 bg-blue-50/40 text-blue-600 font-extrabold' 
                          : 'border-zinc-250 bg-stone-50 text-stone-500 hover:bg-stone-100'
                        }`}
                      >
                        {language === 'ar' ? 'لقاء الموقع' : 'Standard Meet'}
                      </button>
                    </div>
                  </div>

                  {/* Client name and cell phone inputs */}
                  <div className="space-y-2.5">
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 w-4 h-4 text-stone-300" />
                      <input 
                        type="text" 
                        placeholder={language === 'ar' ? 'الاسم الثلاثي المعتمد' : 'Your Professional Name'}
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full text-xs bg-stone-50 border border-zinc-200/55 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-blue-600 text-stone-700"
                        required
                      />
                    </div>

                    <div className="relative">
                      <PhoneCall className="absolute left-3.5 top-3 w-4 h-4 text-stone-300" />
                      <input 
                        type="tel" 
                        placeholder={language === 'ar' ? 'رقم الهاتف للتواصل المباشر' : 'Mobile Phone (with country code)'}
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full text-xs bg-stone-50 border border-zinc-200/55 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-blue-600 text-stone-700 font-mono"
                        required
                      />
                    </div>
                  </div>

                  {/* Built-in Installment Calculator Widget for real-time customer personalization */}
                  <div className="p-4 rounded-xl bg-stone-50/85 border border-stone-200/20 space-y-4">
                    <h5 className="text-[9px] font-mono tracking-widest text-blue-600 uppercase flex items-center gap-1.5 font-bold">
                      <Calculator className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'حاسبة خطط الدفع المخصصة' : 'Installment Customizer'}</span>
                    </h5>

                    <div className="space-y-3.5 text-xs text-stone-600">
                      <div className="space-y-1">
                        <div className="flex justify-between font-mono text-[8.5px]">
                          <span>DOWNPAYMENT PERCENT:</span>
                          <span className="text-blue-600 font-bold">{calcDownpaymentPercent}%</span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="40"
                          step="5"
                          value={calcDownpaymentPercent}
                          onChange={(e) => setCalcDownpaymentPercent(parseInt(e.target.value))}
                          className="w-full accent-blue-600 bg-stone-200/60 h-1 rounded-lg cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between font-mono text-[8.5px]">
                          <span>REPAYMENT TIMELINE:</span>
                          <span className="text-blue-600 font-bold">{calcYears} Years</span>
                        </div>
                        <input
                          type="range"
                          min="3"
                          max="10"
                          step="1"
                          value={calcYears}
                          onChange={(e) => setCalcYears(parseInt(e.target.value))}
                          className="w-full accent-blue-600 bg-stone-200/60 h-1 rounded-lg cursor-pointer"
                        />
                      </div>

                      <div className="pt-2.5 border-t border-stone-200/40 flex justify-between font-mono text-[9px] items-end">
                        <span className="text-stone-400">ESTIMATED INST. / MONTH:</span>
                        <span className="text-stone-850 font-bold text-xs text-blue-600">
                          {monthlyPaymentAmount.toLocaleString()} {project.currency}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Submission Button */}
                  <button
                    type="submit"
                    disabled={isBookingSubmitting}
                    className="w-full py-3 bg-gradient-to-r from-blue-700 to-indigo-700 hover:brightness-105 rounded-xl text-white font-bold text-xs active:scale-97 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    {isBookingSubmitting ? (
                      <span className="w-4.5 h-4.5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4 text-white" />
                        <span>{language === 'ar' ? 'تأكيد وحجز المعاينة الفخمة' : 'Request Exclusive Site Escort'}</span>
                      </>
                    )}
                  </button>

                </form>
              ) : (
                <div className="text-center py-6 px-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl space-y-3.5 animate-fade-in">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-lg shadow-sm">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-emerald-950">{language === 'ar' ? 'تمت الجدولة بنجاح!' : 'Escort Coordinated'}</h4>
                    <p className="text-[11px] text-emerald-700 leading-relaxed font-light">
                      {language === 'ar' 
                      ? 'تم تسجيل رغبتك بالكامل. سيتصل بك منسق كبار الشركاء لتأكيد موعد الليموزين والترتيبات.' 
                      : 'Logistics parameters locked. A corporate senior advisor will review your requested term allocation and confirm transit.'}
                    </p>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* FOOTER OPTIMIZED MOBILE CONTROLS FOR BOTH WORLDS (Apple-style pill buttons) */}
      <div className="absolute bottom-0 inset-x-0 p-4 bg-white/90 border-t border-stone-100/60 backdrop-blur-md flex gap-3.5 z-45 justify-between">
        
        <a
          href={`tel:${developer?.estYear ? '971501234567' : '201004567890'}`}
          className="flex-1 py-3.5 bg-stone-50 hover:bg-stone-100 border border-stone-200/30 transition-all rounded-xl flex items-center justify-center gap-2 text-stone-700 font-bold text-xs active:scale-95 text-center leading-none"
        >
          <PhoneCall className="w-4 h-4 text-stone-500" />
          <span>{t.callAgent}</span>
        </a>

        <a
          href={`https://wa.me/${developer?.estYear ? '971501234567' : '201004567890'}?text=${encodeURIComponent(
            `I have selected a VIP requisition dossier item for: ${project.title} (${project.category}). Requisition price point start: ${project.priceStart.toLocaleString()} ${project.currency}. Please provide floorplan SVG.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center gap-2 text-white font-bold text-xs active:scale-95 transition-all shadow-md shadow-blue-500/10 text-center leading-none"
        >
          <MessageSquare className="w-4 h-4 text-white" />
          <span>{t.whatsappChat}</span>
        </a>
      </div>

      {/* ULTRA PRESTIGE DETAILED DOSSIER HIGH-RES LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <div className="absolute inset-0 z-50 bg-black/98 flex flex-col justify-between p-6 animate-fade-in select-none">
          
          <div className="flex justify-between items-center text-white">
            <div>
              <p className="text-[9px] text-stone-400 font-mono tracking-widest uppercase">HD STRATEGY GRAPHIC CANVAS</p>
              <h4 className="text-xs font-bold font-light text-stone-150">{language === 'ar' ? project.titleAr : project.title}</h4>
            </div>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-stone-200 text-[10px] font-bold transition-all outline-none cursor-pointer"
            >
              {language === 'ar' ? 'إغلاق المعاينة' : 'Close HD Viewer'}
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center max-h-[70%]">
            <img 
              src={project.images[activeImageIndex]} 
              alt="High-Res" 
              referrerPolicy="no-referrer"
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl" 
            />
          </div>

          <div className="space-y-4">
            <div className="flex gap-2.5 overflow-x-auto py-2 scrollbar-none items-center justify-center">
              {project.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative rounded-lg overflow-hidden h-10 w-16 flex-shrink-0 transition-all duration-300 ${
                    activeImageIndex === index 
                    ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-black scale-102 border-transparent' 
                    : 'opacity-40 hover:opacity-100 border border-white/10'
                  }`}
                >
                  <img src={img} alt="Thumb" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <p className="text-center text-[10px] text-stone-500 font-mono">
              {activeImageIndex + 1} / {project.images.length} • {language === 'ar' ? 'استخدم شريط التنقل لمعاينة كامل التصميم' : 'Navigate full high-resolution strategic architecture blueprint renders'}
            </p>
          </div>

        </div>
      )}

    </div>
  );
};
