import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { AQarLogoSVG } from './SplashScreen';
import { Project, Unit, Developer, Area } from '../types';
import { 
  Search, SlidersHorizontal, MapPin, TrendingUp, Heart, 
  ChevronRight, MessageSquare, Sparkles, Home, Layers, 
  Users, Settings, Briefcase, Award, ArrowRightLeft, 
  ChevronLeft, Bell, Headphones, Globe, BadgeAlert, 
  CheckCircle2, Plus, Calendar, MoreVertical, LogOut,
  TrendingDown, Check, Activity
} from 'lucide-react';

interface HomeDashboardProperties {
  projects: Project[];
  units: Unit[];
  developers: Developer[];
  areas: Area[];
  favorites: string[];
  onSelectProject: (project: Project) => void;
  onToggleFavorite: (projectId: string) => void;
  activeTab?: string;
  onNavigate?: (tab: string) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProperties> = ({
  projects,
  units,
  developers,
  areas,
  favorites,
  onSelectProject,
  onToggleFavorite,
  activeTab = 'home',
  onNavigate
}) => {
  const { t, language, isRtl, toggleLanguage } = useLanguage();
  
  // Dashboard states: 'board' is the premium Executive Board, 'explorer' is the Listings Portfolio
  const [dashboardView, setDashboardView] = useState<'board' | 'explorer'>('board');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const [selectedDeveloperId, setSelectedDeveloperId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSegment, setActiveSegment] = useState<'projects' | 'units'>('projects');

  // Interactive Revenue Chart State
  const [hoveredMonth, setHoveredMonth] = useState<string>('may');

  // Support helper overlay
  const [showSupportOverlay, setShowSupportOverlay] = useState(false);

  // Pricing budget limit filter state
  const [priceRange, setPriceRange] = useState<number>(35000000);

  // Months data for interactive bezier graph
  const monthsData = [
    { id: 'jan', label: 'يناير', labelEn: 'Jan', revenue: '3,800,000 EGP', rate: '+8%', x: 50, y: 110, activeColor: 'bg-[#0b53c7]' },
    { id: 'feb', label: 'فبراير', labelEn: 'Feb', revenue: '4,500,000 EGP', rate: '+12%', x: 110, y: 80, activeColor: 'bg-[#a55fea]' },
    { id: 'mar', label: 'مارس', labelEn: 'Mar', revenue: '3,200,000 EGP', rate: '-5%', x: 170, y: 100, activeColor: 'bg-emerald-500' },
    { id: 'apr', label: 'أبريل', labelEn: 'Apr', revenue: '4,800,000 EGP', rate: '+14%', x: 230, y: 65, activeColor: 'bg-[#14b8a6]' },
    { id: 'may', label: 'مايو', labelEn: 'May', revenue: '5,400,000 EGP', rate: '+12.5%', x: 290, y: 50, activeColor: 'bg-amber-500' },
    { id: 'jun', label: 'يونيو', labelEn: 'Jun', revenue: '6,200,000 EGP', rate: '+18.8%', x: 350, y: 35, activeColor: 'bg-[#0b53c7]' },
  ];

  const categories = [
    { key: 'All', label: t.all },
    { key: 'Villa', label: t.villas },
    { key: 'Apartment', label: t.apartments },
    { key: 'Penthouse', label: t.penthouses },
    { key: 'Commercial', label: t.commercial }
  ];

  // Filtering Logic
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesArea = !selectedAreaId || project.areaId === selectedAreaId;
    const matchesDeveloper = !selectedDeveloperId || project.developerId === selectedDeveloperId;
    const matchesPrice = project.priceStart <= priceRange;
    
    const term = searchQuery.toLowerCase();
    const matchesSearch = 
      project.title.toLowerCase().includes(term) ||
      project.titleAr.toLowerCase().includes(term) ||
      project.developerName.toLowerCase().includes(term) ||
      project.areaName.toLowerCase().includes(term);

    return matchesCategory && matchesArea && matchesDeveloper && matchesSearch && matchesPrice;
  });

  const filteredUnits = units.filter((unit) => {
    const term = searchQuery.toLowerCase();
    const matchesPrice = unit.price <= priceRange;
    const matchesSearch = unit.projectName.toLowerCase().includes(term) || unit.type.toLowerCase().includes(term);
    return matchesPrice && matchesSearch;
  });

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedAreaId(null);
    setSelectedDeveloperId(null);
    setSearchQuery('');
    setPriceRange(35000000);
  };

  const getActiveMonthInfo = () => {
    return monthsData.find(mo => mo.id === hoveredMonth) || monthsData[4];
  };

  const activeMonth = getActiveMonthInfo();

  // Sidebar link handlers with direct dynamic routing to simulate rich SaaS
  const sidebarLinks = [
    { key: 'home', label: 'الرئيسية', labelEn: 'Feed Hub', icon: <Home className="w-4.5 h-4.5" />, view: 'explorer' },
    { key: 'dashboard', label: 'لوحة التحكم', labelEn: 'Dashboard Board', icon: <SlidersHorizontal className="w-4.5 h-4.5" />, view: 'board', isDashboard: true },
    { key: 'projects', label: 'الملف العقاري', labelEn: 'Properties Catalog', icon: <Layers className="w-4.5 h-4.5" />, route: 'projects' },
    { key: 'crm', label: 'العملاء والصفقات', labelEn: 'CRM Suite', icon: <Users className="w-4.5 h-4.5" />, route: 'crm' },
    { key: 'favorites', label: 'العقارات المفضلة', labelEn: 'Favorites Spec List', icon: <Heart className="w-4.5 h-4.5" />, route: 'favorites' },
    { key: 'admin', label: 'الإعدادات العامة', labelEn: 'Admin Panel Settings', icon: <Settings className="w-4.5 h-4.5" />, route: 'admin' },
  ];

  return (
    <div className="flex h-full w-full bg-[#f4f7fe] overflow-hidden select-none font-sans">
      
      {/* 1. BLUE PREMIUM SIDEBAR - Left Side (Visible on Tablet/Fluid Desktop viewpoints) */}
      <aside className="hidden lg:flex flex-col w-68 bg-gradient-to-b from-[#0b53c7] to-[#04286d] text-white p-5 shrink-0 justify-between h-full shadow-2xl relative z-40">
        
        {/* Absolute Mesh Decorative Layout glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,144,255,0.15),transparent)] pointer-events-none"></div>

        <div className="space-y-7 relative z-10">
          
          {/* Logo Brand Header */}
          <div className="flex items-center gap-2 px-1">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md p-1.5">
              <AQarLogoSVG size={26} />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight font-sans leading-none text-white">عقار</h2>
              <span className="text-[8px] tracking-[0.2em] font-mono text-blue-100 font-bold block mt-1 uppercase">AQar Corporate</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {sidebarLinks.map((link) => {
              // Determine if link is active
              const isSelected = link.isDashboard 
                ? (dashboardView === 'board')
                : (link.view === 'explorer' ? (dashboardView === 'explorer') : false);

              return (
                <button
                  key={link.key}
                  onClick={() => {
                    if (link.isDashboard) {
                      setDashboardView('board');
                    } else if (link.view === 'explorer') {
                      setDashboardView('explorer');
                    } else if (link.route && onNavigate) {
                      onNavigate(link.route);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isSelected 
                      ? 'bg-white/12 text-white shadow-inner border border-white/5 font-black scale-102' 
                      : 'text-blue-100/75 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isSelected ? 'text-white' : 'text-blue-200/60'}>
                      {link.icon}
                    </span>
                    <span>{language === 'ar' ? link.label : link.labelEn}</span>
                  </div>
                  {link.key === 'favorites' && favorites.length > 0 && (
                    <span className="bg-amber-500 text-slate-900 text-[9px] font-black px-1.5 py-0.5 rounded-md leading-none">
                      {favorites.length}
                    </span>
                  )}
                  {link.key === 'crm' && (
                    <span className="bg-white/20 text-white text-[8px] tracking-wider uppercase font-mono px-1.5 py-0.5 rounded font-black scale-95">
                      Pro
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer User Widget */}
        <div className="space-y-4 pt-4 border-t border-white/10 relative z-10 select-none">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                alt="Ahmad" 
                className="w-10 h-10 rounded-xl object-cover border-2 border-white/10"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#092a5e]"></span>
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-black truncate text-white leading-tight">أحمد محمد</h4>
              <p className="text-[10px] text-blue-200/60 truncate font-semibold block mt-0.5">مدير المبيعات العليا</p>
            </div>
          </div>

          {/* Technical Support Action Button */}
          <button 
            onClick={() => setShowSupportOverlay(true)}
            className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 text-[10px] font-black tracking-normal uppercase flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <Headphones className="w-3.5 h-3.5 text-blue-200" />
            <span>{language === 'ar' ? 'طلب الدعم الفني' : 'Submit Support help'}</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN WEB CONTENT AREA (White Luxury Background) */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f4f7fe] h-full overflow-hidden select-none">
        
        {/* TOP COCKPIT NAVIGATION DEPARTURE (Search & Date & Greeting Panel) */}
        <header className="bg-white px-5 py-3 border-b border-slate-100 flex items-center justify-between shrink-0 shadow-sm z-30 select-none">
          
          {/* Greeting Information (Arabic localized) */}
          <div className="flex items-center gap-3">
            <div className="lg:hidden w-8 h-8 rounded-lg bg-gradient-to-br from-[#1252d6] to-[#0b53c7] flex items-center justify-center font-bold text-white font-mono text-xs">
              AQ
            </div>
            <div>
              <h1 className="text-sm lg:text-base font-black text-[#092a5e] leading-tight">
                {language === 'ar' ? 'لوحة التحكم القيادية' : 'Enterprise Executive Cabinet'}
              </h1>
              <p className="text-[9px] lg:text-[11px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                AQar Enterprise Partner Space
              </p>
            </div>
          </div>

          {/* Quick Dual Tab Segments inside Dashboard viewport (Board vs Explorer) */}
          <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-150">
            <button
              onClick={() => setDashboardView('board')}
              className={`px-3 py-1.5 text-[10px] lg:text-xs font-bold rounded-lg transition-all cursor-pointer ${
                dashboardView === 'board' 
                  ? 'bg-[#0b53c7] text-white shadow font-sans' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              📊 {language === 'ar' ? 'لوحة القيادة والمؤشرات' : 'Executive Dashboard'}
            </button>
            <button
              onClick={() => setDashboardView('explorer')}
              className={`px-3 py-1.5 text-[10px] lg:text-xs font-bold rounded-lg transition-all cursor-pointer ${
                dashboardView === 'explorer' 
                  ? 'bg-[#0b53c7] text-white shadow font-sans' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              🏢 {language === 'ar' ? 'الملفات العقارية' : 'Listing browser'}
            </button>
          </div>
        </header>

        {/* CONTAINER SCROLLABLE WRAPPER */}
        <div className="flex-1 overflow-y-auto pb-24 lg:pb-8 scrollbar-none select-none">
          
          {/* VIEWPORT CONTROLLER: COGNITIVE REDISTRIBUTION MODULES (BOARD VIEW vs PORTFOLIO EXPLORER INDEX) */}
          {dashboardView === 'board' ? (
            
            /* ================= BOARD EXECUTIVE PANEL (Redesigned exactly as Mock) ================= */
            <div className="p-4 lg:p-6 space-y-6">

              {/* WELCOME BAR + INTERACTIVE DATE FILTER HEADLINE */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3.5 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
                <div>
                  <h2 className="text-base lg:text-lg font-black text-slate-800 flex items-center gap-2">
                    {language === 'ar' ? 'لوحة القيادة والتحكم' : 'Executive Governance'}
                    <span className="text-[10px] font-mono tracking-widest bg-blue-50 text-[#0b53c7] px-2 py-0.5 rounded-full border border-blue-100 uppercase font-black">LIVE</span>
                  </h2>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                    {language === 'ar' ? 'سجل تحليلات المبيعات وعوائد الأصول الاستثمارية' : 'Comprehensive sales analytics and ROI indices tracker'}
                  </p>
                </div>
                
                {/* Modern Date Pickers inspired by Mockup */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <div className="relative">
                    <select className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3.5 py-1.5 pr-8 rounded-xl text-[11px] font-black text-[#042a5e] focus:outline-none transition-colors cursor-pointer">
                      <option>{language === 'ar' ? 'هذا الشهر' : 'This Month'}</option>
                      <option>{language === 'ar' ? 'الربع السنوي الأخير' : 'Last Quarter'}</option>
                      <option>{language === 'ar' ? 'العام الحالي' : 'Year to Date'}</option>
                    </select>
                    <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-xl text-[11px] font-black text-[#0b53c7] font-mono shadow-xs">
                      <Calendar className="w-3.5 h-3.5 text-[#0b53c7]" />
                      <span>{language === 'ar' ? '١٣ مايو ٢٠٢٦' : '13 May 2026'}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* KPI CARDS GRID (Match colors and EGP labels in Mockup image 1:1) */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* KPI Card 1: Revenue (إجمالي الإيرادات) */}
                <div className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm space-y-3 hover:translate-y-[-2px] transition-all duration-200 relative group">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] lg:text-[11px] text-slate-400 font-bold font-sans uppercase">
                      {language === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenues Sales'}
                    </span>
                    <div className="w-8.5 h-8.5 rounded-xl bg-blue-50 text-[#0b53c7] flex items-center justify-center font-bold">
                      <TrendingUp className="w-4.5 h-4.5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base lg:text-2xl font-black text-slate-800 font-mono tracking-tight leading-none">
                      5,400,000 <span className="text-xs text-[#0b53c7] font-sans font-black uppercase">EGP</span>
                    </h3>
                    <div className="flex items-center gap-1 mt-1.5 text-[9px] lg:text-[10px] font-bold text-center">
                      <span className="text-xs text-emerald-600 font-mono font-black">+12.5%</span>
                      <span className="text-slate-400 block font-sans">
                        {language === 'ar' ? 'من الشهر الماضي' : 'from last month'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* KPI Card 2: Closed Deals (الصفقات المغلقة) */}
                <div className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm space-y-3 hover:translate-y-[-2px] transition-all duration-200 relative group">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] lg:text-[11px] text-slate-400 font-bold font-sans uppercase">
                      {language === 'ar' ? 'الصفقات المغلقة' : 'Closed System Deals'}
                    </span>
                    <div className="w-8.5 h-8.5 rounded-xl bg-[#a55fea]/8 text-[#a55fea] flex items-center justify-center font-bold">
                      <Briefcase className="w-4.25 h-4.25" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base lg:text-2xl font-black text-slate-800 font-mono tracking-tight leading-none">
                      52 <span className="text-xs text-slate-400 font-sans font-black uppercase">Deals</span>
                    </h3>
                    <div className="flex items-center gap-1 mt-1.5 text-[9px] lg:text-[10px] font-bold">
                      <span className="text-xs text-emerald-600 font-mono font-black">+18.8%</span>
                      <span className="text-slate-400 block font-sans">
                        {language === 'ar' ? 'من الشهر الماضي' : 'from last month'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* KPI Card 3: New Clients (العملاء الجدد) */}
                <div className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm space-y-3 hover:translate-y-[-2px] transition-all duration-200 relative group">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] lg:text-[11px] text-slate-400 font-bold font-sans uppercase">
                      {language === 'ar' ? 'العملاء الجدد' : 'New Inbound Leads'}
                    </span>
                    <div className="w-8.5 h-8.5 rounded-xl bg-emerald-50 text-emerald-650 flex items-center justify-center font-bold">
                      <Users className="w-4.5 h-4.5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base lg:text-2xl font-black text-slate-800 font-mono tracking-tight leading-none">
                      68 <span className="text-xs text-slate-400 font-sans font-black uppercase">Clients</span>
                    </h3>
                    <div className="flex items-center gap-1 mt-1.5 text-[9px] lg:text-[10px] font-bold font-sans">
                      <span className="text-xs text-emerald-600 font-mono font-black">+24.6%</span>
                      <span className="text-slate-400 block">
                        {language === 'ar' ? 'من الشهر الماضي' : 'from last month'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* KPI Card 4: Active Listings (العقارات النشطة) */}
                <div className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm space-y-3 hover:translate-y-[-2px] transition-all duration-200 relative group">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] lg:text-[11px] text-slate-400 font-bold font-sans uppercase">
                      {language === 'ar' ? 'العقارات النشطة' : 'Active Listed Homes'}
                    </span>
                    <div className="w-8.5 h-8.5 rounded-xl bg-amber-50 text-amber-500 fill-amber-500 flex items-center justify-center font-bold">
                      <Home className="w-4.25 h-4.25 fill-current" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base lg:text-2xl font-black text-slate-800 font-mono tracking-tight leading-none">
                      320 <span className="text-xs text-slate-400 font-sans font-black uppercase">Units</span>
                    </h3>
                    <div className="flex items-center gap-1 mt-1.5 text-[9px] lg:text-[10px] font-bold">
                      <span className="text-xs text-emerald-600 font-mono font-black">+8.2%</span>
                      <span className="text-slate-400 block font-sans">
                        {language === 'ar' ? 'من الشهر الماضي' : 'from last month'}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* ANALYTICS CHARTS SPLIT ROW (Revenue Line Chart vs Property Distribution Donut Chart) */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                
                {/* SVG Revenue Graph Spline Frame (Left / Main widget) */}
                <div className="xl:col-span-2 bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm space-y-5 flex flex-col justify-between">
                  
                  {/* Header labels */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-xs lg:text-sm font-black text-[#042a5e]">
                        {language === 'ar' ? 'نظرة عامة على الإيرادات' : 'Revenue Performance Growth curve'}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                        Monthly growth of broker net capitalization and closed volume
                      </p>
                    </div>

                    <div className="flex items-center gap-5">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#0b53c7] inline-block"></span>
                        <span>{language === 'ar' ? 'الإيرادات الشهرية' : 'Monthly Performance'}</span>
                      </div>
                      
                      {/* Interval Select toggle box */}
                      <span className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-black text-[#042a5e] font-mono">
                        {language === 'ar' ? 'شهرياً' : 'Monthly'}
                      </span>
                    </div>
                  </div>

                  {/* Bezier Vector Grid Panel */}
                  <div className="h-[210px] relative w-full pt-4">
                    
                    {/* Background Grid Lines standard Y axis */}
                    <div className="absolute inset-x-0 top-0 h-full flex flex-col justify-between pointer-events-none select-none text-[8px] text-slate-300 font-mono">
                      <div className="w-full border-t border-dashed border-slate-100 flex justify-between pr-2">
                        <span>800k</span>
                      </div>
                      <div className="w-full border-t border-dashed border-slate-100 flex justify-between pr-2">
                        <span>600k</span>
                      </div>
                      <div className="w-full border-t border-dashed border-slate-100 flex justify-between pr-2">
                        <span>400k</span>
                      </div>
                      <div className="w-full border-t border-dashed border-slate-100 flex justify-between pr-2">
                        <span>200k</span>
                      </div>
                      <div className="w-full border-t border-dashed border-slate-100 flex justify-between pr-2 pt-1 pb-1">
                        <span>EGP 0</span>
                      </div>
                    </div>

                    {/* Vector Plot Area Container SVG */}
                    <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                      <defs>
                        {/* Glowing Curve Gradient fill */}
                        <linearGradient id="chart-under-glow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0b53c7" stopOpacity="0.22" />
                          <stop offset="100%" stopColor="#0b53c7" stopOpacity="0.00" />
                        </linearGradient>
                      </defs>

                      {/* Area beneath spline path */}
                      <path 
                        d="M 40 120 C 70 80, 80 60, 110 70 C 140 80, 150 110, 180 95 C 210 80, 220 40, 250 55 C 280 70, 280 45, 310 40 C 330 35, 340 20, 365 25 L 365 180 L 40 180 Z" 
                        fill="url(#chart-under-glow)"
                      />

                      {/* Main Spline Bezier Curve outline */}
                      <path 
                        d="M 40 120 C 70 80, 80 60, 110 70 C 140 80, 150 110, 180 95 C 210 80, 220 40, 250 55 C 280 70, 280 45, 310 40 C 330 35, 340 20, 365 25" 
                        fill="none" 
                        stroke="#0b53c7" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />

                      {/* Grid Rulers alignments */}
                      {monthsData.map((mo) => (
                        <line 
                          key={mo.id} 
                          x1={mo.x} 
                          y1="25" 
                          x2={mo.x} 
                          y2="180" 
                          stroke={mo.id === hoveredMonth ? '#0b53c7' : 'transparent'} 
                          strokeWidth="1.2" 
                          strokeDasharray="4 2"
                        />
                      ))}

                      {/* Highlight interactive Point Circles */}
                      {monthsData.map((mo) => (
                        <circle
                          key={mo.id}
                          cx={mo.x}
                          cy={mo.y}
                          r={mo.id === hoveredMonth ? "7.5" : "4.5"}
                          fill={mo.id === hoveredMonth ? "#0b53c7" : "#ffffff"}
                          stroke="#0b53c7"
                          strokeWidth="2.5"
                          className="cursor-pointer transition-all duration-200 hover:scale-130"
                          onClick={() => setHoveredMonth(mo.id)}
                          onMouseEnter={() => setHoveredMonth(mo.id)}
                        />
                      ))}
                    </svg>

                    {/* Interactive Glowing Tooltip Popover (Floating dynamically near May coordinate) */}
                    <div 
                      className="absolute z-30 transition-all duration-300 pointer-events-none select-none shadow-xl border border-blue-100 rounded-xl px-2.5 py-1.5 bg-[#0b53c7] text-white flex flex-col items-center"
                      style={{ 
                        left: `${activeMonth.x - 55}px`, 
                        top: `${activeMonth.y - 48}px` 
                      }}
                    >
                      <span className="text-[9px] font-sans font-black text-blue-100/90 tracking-wide uppercase leading-none block">
                        {language === 'ar' ? activeMonth.label : activeMonth.labelEn} Total Revenue
                      </span>
                      <span className="text-xs font-black font-mono leading-none block mt-1 tracking-tight">
                        {activeMonth.revenue}
                      </span>
                      <span className="text-[8px] bg-white/15 text-white font-mono font-bold px-1 rounded-sm mt-0.5 leading-none">
                        {activeMonth.rate} Growth
                      </span>
                      {/* Anchor arrow indicator */}
                      <div className="w-1.5 h-1.5 bg-[#0b53c7] rotate-45 mt-0.5 absolute -bottom-1 left-12"></div>
                    </div>
                  </div>

                  {/* Horizontal Labels X-Axis */}
                  <div className="flex justify-between px-6 text-[11px] font-black text-slate-500 select-none pb-1 pt-3">
                    {monthsData.map((mo) => (
                      <button 
                        key={mo.id} 
                        onClick={() => setHoveredMonth(mo.id)}
                        className={`transition-colors py-0.5 px-2 rounded-md ${
                          mo.id === hoveredMonth 
                            ? 'text-white bg-[#0b53c7] font-black scale-102 shadow-sm' 
                            : 'hover:text-slate-800'
                        }`}
                      >
                        {language === 'ar' ? mo.label : mo.labelEn}
                      </button>
                    ))}
                  </div>

                </div>

                {/* Donut Properties Distribution Chart (Right / Secondary widget) */}
                <div className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs lg:text-sm font-black text-[#042a5e]">
                      {language === 'ar' ? 'توزيع العقارات' : 'Properties Sector Allocation'}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                      Categorization split of the 320 active units
                    </p>
                  </div>

                  {/* SVG Donut plot with absolute center indices */}
                  <div className="flex items-center justify-center py-5 relative">
                    
                    <div className="w-36 h-36 relative">
                      {/* Absolute center layout data */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 select-none leading-none">
                        <span className="text-2xl font-black font-mono tracking-tight text-[#042a5e]">320</span>
                        <span className="text-[9px] font-sans text-slate-400 font-bold uppercase block mt-1">
                          {language === 'ar' ? 'وحدة نشطة' : 'Total Units'}
                        </span>
                      </div>

                      <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
                        {/* Circular grid backdrop */}
                        <circle cx="50" cy="50" r="32" fill="none" stroke="#f1f5f9" strokeWidth="11" />
                        
                        {/* Segment 1: Residential 45% (Blue) */}
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="32" 
                          fill="none" 
                          stroke="#0b53c7" 
                          strokeWidth="11" 
                          strokeDasharray="201" 
                          strokeDashoffset="110.55" // = 201 * (1 - 0.45)
                          strokeLinecap="round"
                        />

                        {/* Segment 2: Commercial 30% (Purple) */}
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="32" 
                          fill="none" 
                          stroke="#a855f7" 
                          strokeWidth="11" 
                          strokeDasharray="201" 
                          strokeDashoffset="140.7" // = 201 * (1 - 0.30)
                          transform="rotate(162, 50, 50)" // 360 * 0.45 = 162
                          strokeLinecap="round"
                        />
                        
                        {/* Segment 3: Office Admin 15% (Teal / Emerald) */}
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="32" 
                          fill="none" 
                          stroke="#14b8a6" 
                          strokeWidth="11" 
                          strokeDasharray="201" 
                          strokeDashoffset="170.85" // = 201 * (1 - 0.15)
                          transform="rotate(270, 50, 50)" // 162 + (360 * 0.3) = 270
                          strokeLinecap="round"
                        />

                        {/* Segment 4: Land 10% (Amber) */}
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="32" 
                          fill="none" 
                          stroke="#f59e0b" 
                          strokeWidth="11" 
                          strokeDasharray="201" 
                          strokeDashoffset="180.9" // = 201 * (1 - 0.10)
                          transform="rotate(324, 50, 50)" // 270 + (360 * 0.15) = 324
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                  </div>

                  {/* Color coded list tags */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-sans font-bold text-slate-600 border-t border-slate-100 pt-3">
                    <div className="flex items-center gap-1.5 justify-start">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0b53c7] shrink-0"></span>
                      <span>{language === 'ar' ? 'سكني (٤٥٪)' : 'Residential (45%)'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 justify-start">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#a855f7] shrink-0"></span>
                      <span>{language === 'ar' ? 'تجاري (٣٠٪)' : 'Commercial (30%)'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 justify-start">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#14b8a6] shrink-0"></span>
                      <span>{language === 'ar' ? 'إداري (١٥٪)' : 'Administrative (15%)'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 justify-start">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] shrink-0"></span>
                      <span>{language === 'ar' ? 'أراضي (١٠٪)' : 'Land plots (10%)'}</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* THREE COLUMN DETAILS AND FEED ROW (Widget 1: Team Members | Widget 2: Deals closed | Widget 3: Activities) */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 select-none">
                
                {/* COLUMN 1: TEAM PERFORMANCE (أداء الفريق) */}
                <div className="bg-white p-4.5 rounded-[28px] border border-slate-100 shadow-sm flex flex-col justify-between space-y-4">
                  
                  {/* Headline Title */}
                  <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                    <div>
                      <h4 className="text-xs lg:text-sm font-black text-[#042a5e]">
                        {language === 'ar' ? 'أداء فريق المبيعات' : 'Leaderboard Sales performance'}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                        Top corporate brokers revenue conversion rankings
                      </p>
                    </div>
                    <Award className="w-5 h-5 text-amber-500 fill-amber-500/10" />
                  </div>

                  {/* List of members */}
                  <div className="space-y-3 px-1 my-1.5">
                    
                    {/* Ahmad Al-Ghamdi */}
                    <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 transition-all">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0b53c7] font-black flex items-center justify-center shadow-xs">
                          AM
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-black truncate text-slate-850">أحمد محمد</h5>
                          <span className="text-[9px] text-[#0b53c7] font-mono font-bold uppercase tracking-widest leading-none block">Sales Lead</span>
                        </div>
                      </div>
                      
                      <div className="text-right flex items-center gap-2">
                        <div>
                          <p className="text-xs font-black font-mono text-slate-800">1,250,005 <span className="text-[8px] font-sans font-black text-slate-450 uppercase">EGP</span></p>
                          <p className="text-[8px] font-bold text-slate-400 tracking-wider">Converted</p>
                        </div>
                        <span className="bg-blue-50 text-[#0b53c7] text-[10px] font-black px-2.5 py-1 rounded-lg border border-blue-100 font-mono">
                          {language === 'ar' ? 'الأول' : '1st'}
                        </span>
                      </div>
                    </div>

                    {/* Sarah Ali */}
                    <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 transition-all">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 font-black flex items-center justify-center shadow-xs">
                          SA
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-black truncate text-slate-850">سارة علي</h5>
                          <span className="text-[9px] text-purple-700 font-mono font-bold uppercase tracking-widest leading-none block">Broker Spec</span>
                        </div>
                      </div>

                      <div className="text-right flex items-center gap-2">
                        <div>
                          <p className="text-xs font-black font-mono text-slate-800">980,000 <span className="text-[8px] font-sans font-black text-slate-450 uppercase">EGP</span></p>
                          <p className="text-[8px] font-bold text-slate-400 tracking-wider">Converted</p>
                        </div>
                        <span className="bg-purple-50 text-purple-700 text-[10px] font-black px-2.5 py-1 rounded-lg border border-purple-100 font-mono">
                          {language === 'ar' ? 'الثاني' : '2nd'}
                        </span>
                      </div>
                    </div>

                    {/* Mohammed Jamal */}
                    <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 transition-all">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 font-black flex items-center justify-center shadow-xs">
                          MJ
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-black truncate text-slate-850">محمد جمال</h5>
                          <span className="text-[9px] text-teal-700 font-mono font-bold uppercase tracking-widest leading-none block">Agent</span>
                        </div>
                      </div>

                      <div className="text-right flex items-center gap-2">
                        <div>
                          <p className="text-xs font-black font-mono text-slate-800">780,000 <span className="text-[8px] font-sans font-black text-slate-450 uppercase">EGP</span></p>
                          <p className="text-[8px] font-bold text-slate-400 tracking-wider">Converted</p>
                        </div>
                        <span className="bg-teal-50 text-teal-750 text-[10px] font-black px-2.5 py-1 rounded-lg border border-teal-100 font-mono">
                          {language === 'ar' ? 'الثالث' : '3rd'}
                        </span>
                      </div>
                    </div>

                    {/* Nour Ahmed */}
                    <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 transition-all">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 font-black flex items-center justify-center shadow-xs">
                          NA
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-black truncate text-slate-850">نور أحمد</h5>
                          <span className="text-[9px] text-slate-600 font-mono font-bold uppercase tracking-widest leading-none block">Junior Broker</span>
                        </div>
                      </div>

                      <div className="text-right flex items-center gap-2">
                        <div>
                          <p className="text-xs font-black font-mono text-slate-800">650,050 <span className="text-[8px] font-sans font-black text-slate-450 uppercase">EGP</span></p>
                          <p className="text-[8px] font-bold text-slate-400 tracking-wider">Converted</p>
                        </div>
                        <span className="bg-slate-100 text-slate-750 text-[10px] font-black px-2.5 py-1 rounded-lg border border-slate-150 font-mono">
                          {language === 'ar' ? 'الرابع' : '4th'}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Primary CTA line */}
                  <button 
                    onClick={() => {
                      if (onNavigate) onNavigate('crm');
                    }}
                    className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-[#0b53c7] font-black text-[10px] tracking-normal uppercase rounded-xl transition-colors border border-slate-100 text-center cursor-pointer block"
                  >
                    {language === 'ar' ? 'عرض جميع أعضاء الفريق' : 'Explore full brokerage performance'}
                  </button>

                </div>

                {/* COLUMN 2: LATEST CLOSED DEALS (أحدث الصفقات) */}
                <div className="bg-white p-4.5 rounded-[28px] border border-slate-100 shadow-sm flex flex-col justify-between space-y-4">
                  
                  <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                    <div>
                      <h4 className="text-xs lg:text-sm font-black text-[#042a5e]">
                        {language === 'ar' ? 'أحدث الصفقات المبرمة' : 'Latest Registered Escrows'}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                        Real-time contract closures and status verification
                      </p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </div>

                  {/* List of custom deal listings directly using images from config */}
                  <div className="space-y-3 my-1">
                    
                    {/* Deal 1 */}
                    <div 
                      onClick={() => onSelectProject(projects[1])}
                      className="flex items-center gap-3 p-1.5 hover:bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 transition-all cursor-pointer"
                    >
                      <img 
                        src={projects[1].images[0]} 
                        alt="Villa" 
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-black truncate hover:text-[#0b53c7] transition-colors leading-tight">
                          {language === 'ar' ? 'فيلا في الساحل الشمالي' : 'North Coast Riviera Villa'}
                        </h5>
                        <p className="text-[10px] font-black font-mono text-[#0b53c7] mt-0.5">24,000,000 EGP</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-emerald-50 text-emerald-700 text-[9px] font-black px-2 py-1 rounded-lg border border-emerald-100">
                          {language === 'ar' ? 'مغلقة' : 'Closed'}
                        </span>
                      </div>
                    </div>

                    {/* Deal 2 */}
                    <div 
                      onClick={() => onSelectProject(projects[0])}
                      className="flex items-center gap-3 p-1.5 hover:bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 transition-all cursor-pointer"
                    >
                      <img 
                        src={projects[0].images[0]} 
                        alt="Apt" 
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-black truncate hover:text-[#0b53c7] transition-colors leading-tight">
                          {language === 'ar' ? 'شقة في وسط دبي' : 'Burj Crown Residences Tower'}
                        </h5>
                        <p className="text-[10px] font-black font-mono text-[#0b53c7] mt-0.5">1,850,000 AED</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-emerald-50 text-emerald-700 text-[9px] font-black px-2 py-1 rounded-lg border border-emerald-100">
                          {language === 'ar' ? 'مغلقة' : 'Closed'}
                        </span>
                      </div>
                    </div>

                    {/* Deal 3 */}
                    <div 
                      onClick={() => onSelectProject(projects[2])}
                      className="flex items-center gap-3 p-1.5 hover:bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 transition-all cursor-pointer"
                    >
                      <img 
                        src={projects[2].images[0]} 
                        alt="Pent" 
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-black truncate hover:text-[#0b53c7] transition-colors leading-tight">
                          {language === 'ar' ? 'بنتهاوس دبليو ريزيدنسز' : 'W Residences Penthouse Riyadh'}
                        </h5>
                        <p className="text-[10px] font-black font-mono text-[#0b53c7] mt-0.5">4,200,000 SAR</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-amber-50 text-amber-600 text-[9px] font-black px-2 py-1 rounded-lg border border-amber-100">
                          {language === 'ar' ? 'قيد التفاوض' : 'Negotiating'}
                        </span>
                      </div>
                    </div>

                    {/* Deal 4 */}
                    <div 
                      onClick={() => onSelectProject(projects[3] || projects[0])}
                      className="flex items-center gap-3 p-1.5 hover:bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 transition-all cursor-pointer"
                    >
                      <img 
                        src={projects[3] ? projects[3].images[0] : projects[0].images[0]} 
                        alt="Comm" 
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-black truncate hover:text-[#0b53c7] transition-colors leading-tight">
                          {language === 'ar' ? 'أجنحة فيليت المتميزة' : 'Villette Offices Complex'}
                        </h5>
                        <p className="text-[10px] font-black font-mono text-[#0b53c7] mt-0.5">12,000,000 EGP</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-emerald-50 text-emerald-700 text-[9px] font-black px-2 py-1 rounded-lg border border-emerald-100">
                          {language === 'ar' ? 'مغلقة' : 'Closed'}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Complete history toggle */}
                  <button 
                    onClick={() => setDashboardView('explorer')}
                    className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-[#0b53c7] font-black text-[10px] tracking-normal uppercase rounded-xl transition-colors border border-slate-100 text-center cursor-pointer block"
                  >
                    {language === 'ar' ? 'تصفح جميع العقارات والمطورين' : 'Explore properties catalogs'}
                  </button>

                </div>

                {/* COLUMN 3: RECENT CORE ACTIVITIES (النشاطات الأخيرة - Timeline Widget) */}
                <div className="bg-white p-4.5 rounded-[28px] border border-slate-100 shadow-sm flex flex-col justify-between space-y-4">
                  
                  <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                    <div>
                      <h4 className="text-xs lg:text-sm font-black text-[#042a5e]">
                        {language === 'ar' ? 'النشاطات والعمليات الأخيرة' : 'SaaS Event Stream Feed'}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                        Live system activities and automated updates register
                      </p>
                    </div>
                    <Activity className="w-5 h-5 text-[#0b53c7] animate-pulse" />
                  </div>

                  {/* Bullet timeline inspired exactly by mockup layout */}
                  <div className="relative border-l border-slate-100/80 pl-4 py-1 space-y-3.5 my-1 ml-2">
                    
                    {/* Event 1 */}
                    <div className="relative">
                      {/* Interactive indicator bubble */}
                      <span className="absolute -left-[23.5px] top-1.5 w-4.5 h-4.5 rounded-full bg-blue-50 border-2 border-[#0b53c7] flex items-center justify-center text-[8px] text-[#0b53c7] font-black">
                        1
                      </span>
                      <div>
                        <h5 className="text-xs font-bold text-slate-800 leading-tight">
                          {language === 'ar' ? 'تمت إضافة عميل جديد' : 'New organic lead assigned'}
                        </h5>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">منذ ١٠ دقائق • Abdulrahman Al-Sudairy</p>
                      </div>
                    </div>

                    {/* Event 2 */}
                    <div className="relative">
                      <span className="absolute -left-[23.5px] top-1.5 w-4.5 h-4.5 rounded-full bg-purple-50 border-2 border-purple-500 flex items-center justify-center text-[8px] text-purple-600 font-black">
                        2
                      </span>
                      <div>
                        <h5 className="text-xs font-bold text-slate-800 leading-tight">
                          {language === 'ar' ? 'تم تحديث حالة صفقة' : 'Negotiation status updated'}
                        </h5>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">منذ ٣٠ دقيقة • Marassi Beach Villa #104</p>
                      </div>
                    </div>

                    {/* Event 3 */}
                    <div className="relative">
                      <span className="absolute -left-[23.5px] top-1.5 w-4.5 h-4.5 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center text-[8px] text-emerald-600 font-black">
                        3
                      </span>
                      <div>
                        <h5 className="text-xs font-bold text-slate-800 leading-tight">
                          {language === 'ar' ? 'تمت إضافة عقار جديد' : 'New master listing published'}
                        </h5>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">منذ ساعة • Emaar Residences Tower 2</p>
                      </div>
                    </div>

                    {/* Event 4 */}
                    <div className="relative">
                      <span className="absolute -left-[23.5px] top-1.5 w-4.5 h-4.5 rounded-full bg-amber-50 border-2 border-amber-500 flex items-center justify-center text-[8px] text-amber-600 font-black">
                        4
                      </span>
                      <div>
                        <h5 className="text-xs font-bold text-slate-800 leading-tight">
                          {language === 'ar' ? 'تم إيداع دفعة حجز' : 'Downpayment transaction verified'}
                        </h5>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">منذ ساعتين • Al Rehab Penthouse</p>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          ) : (
            
            /* ================= EXPLORER VIEW (RECONFIGURED IN ULTRA LUXURY REAL ESTATE SAAS THEME) ================= */
            <div className="p-4 lg:p-8 space-y-8 bg-slate-50/50 min-h-screen">

              {/* SECTION HEADER & PRIMARY SAAS CONTROLS */}
              <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
                
                {/* Visual Title */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] text-[#0b53c7] font-black tracking-widest font-sans uppercase">
                      <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500/10" />
                      <span>{t.luxuryLiving}</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-black text-[#042a5e] tracking-tight">
                      {t.discoverProperties}
                    </h2>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider font-mono">
                      {t.dubaiEgyptStyle}
                    </p>
                  </div>

                  {/* Dual Mode Tab Selector */}
                  <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-150 max-w-sm md:w-[350px]">
                    <button
                      onClick={() => setActiveSegment('projects')}
                      className={`flex-1 py-2 text-center text-xs font-black rounded-xl transition-all cursor-pointer ${
                        activeSegment === 'projects' ? 'bg-[#0b53c7] text-white shadow font-sans' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      🏢 {language === 'ar' ? 'المشاريع الكبرى' : 'Signature Assets'}
                    </button>
                    <button
                      onClick={() => setActiveSegment('units')}
                      className={`flex-1 py-2 text-center text-xs font-black rounded-xl transition-all cursor-pointer ${
                        activeSegment === 'units' ? 'bg-[#0b53c7] text-white shadow font-sans' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      🔑 {language === 'ar' ? 'الوحدات الفورية' : 'Immediate Units'}
                    </button>
                  </div>
                </div>

                {/* Primary Search bar and Luxury Price Range Slider */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1">
                  
                  {/* Search Input Box */}
                  <div className="lg:col-span-6 relative flex items-center">
                    <Search className={`absolute ${isRtl ? 'right-4' : 'left-4'} w-4.5 h-4.5 text-[#0b53c7]`} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full py-3.5 ${isRtl ? 'pr-11 pl-4 text-right' : 'pl-11 pr-4'} bg-slate-50 border border-slate-200/80 rounded-2xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0b53c7]/20 focus:bg-white transition-all`}
                      placeholder={t.searchPlaceholder}
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className={`absolute ${isRtl ? 'left-4' : 'right-4'} text-slate-400 hover:text-slate-800 text-xs font-black`}
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Beautiful Dynamic Price Range Filter Slider */}
                  <div className="lg:col-span-4 bg-slate-50 p-3 rounded-2xl border border-slate-150 flex flex-col justify-center space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase font-mono">
                      <span>{language === 'ar' ? 'الحد الأقصى للميزانية' : 'Max Budget Match'}</span>
                      <span className="text-[#0b53c7] text-xs font-black">
                        {(priceRange / 1000000).toFixed(1)}M {language === 'ar' ? 'جنيه' : 'EGP'}
                      </span>
                    </div>
                    <input 
                      type="range"
                      min="1000000"
                      max="35000000"
                      step="500000"
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full accent-[#0b53c7] h-1.5 bg-slate-200 rounded-lg cursor-pointer transition-all"
                    />
                  </div>

                  {/* Reset Actions */}
                  <div className="lg:col-span-2 flex items-center justify-end">
                    <button 
                      onClick={handleResetFilters}
                      className="w-full py-3.5 px-4 rounded-2xl bg-slate-100 text-[#0b53c7] hover:bg-[#0b53c7] hover:text-white border border-slate-200/60 text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                      <span>{language === 'ar' ? 'إعادة تعيين' : 'Clear Filter'}</span>
                    </button>
                  </div>

                </div>

              </div>

              {/* SEGMENTED LUXURY FILTER BY PREMIUM AREAS */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-4 bg-[#0b53c7] rounded-full"></div>
                    <h4 className="text-slate-900 tracking-wider uppercase text-xs lg:text-[13px] font-black font-sans leading-none">
                      {t.exploreByArea}
                    </h4>
                  </div>
                  {selectedAreaId && (
                    <button 
                      onClick={() => setSelectedAreaId(null)} 
                      className="text-[10px] bg-blue-50 hover:bg-blue-100 text-[#0b53c7] px-3 py-1 rounded-full font-bold tracking-wide transition-colors"
                    >
                      {language === 'ar' ? 'عرض الكل (×)' : 'Reset Options (×)'}
                    </button>
                  )}
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
                  {areas.map((area) => {
                    const isSelected = selectedAreaId === area.id;
                    return (
                      <div
                        key={area.id}
                        onClick={() => setSelectedAreaId(isSelected ? null : area.id)}
                        className={`relative w-44 h-28 rounded-3xl overflow-hidden cursor-pointer flex-shrink-0 border transition-all duration-300 snap-start select-none ${
                          isSelected 
                            ? 'border-[#0b53c7] ring-2 ring-[#0b53c7]/40 scale-95 shadow-md shadow-blue-500/10' 
                            : 'border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-md'
                        }`}
                      >
                        <img src={area.image} alt={area.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950/90 via-slate-900/45 to-transparent"></div>
                        
                        {/* Area details */}
                        <div className="absolute bottom-3 inset-x-3 text-[10px] space-y-0.5">
                          <p className="font-extrabold text-white truncate text-xs">
                            {language === 'ar' ? area.nameAr : area.name}
                          </p>
                          <div className="flex justify-between text-[8px] text-slate-300 font-mono">
                            <span>Avg: {area.averagePriceSqft}/sqft</span>
                          </div>
                        </div>

                        {isSelected && (
                          <span className="absolute top-2 right-2 bg-[#0b53c7] text-white p-1 rounded-full text-xs shadow">
                            ✓
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* QUICK CATEGORY HORIZONTAL TAB CONTROLS */}
              {activeSegment === 'projects' && (
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {categories.map((cat) => {
                    const active = selectedCategory === cat.key;
                    return (
                      <button
                        key={cat.key}
                        onClick={() => setSelectedCategory(cat.key)}
                        className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all border cursor-pointer ${
                          active 
                            ? 'bg-[#0b53c7] text-white border-transparent shadow-lg shadow-blue-500/15 scale-98' 
                            : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* CORE DISPLAY (SIGNATURE PROJECTS vs AVAILABLE READY UNITS) */}
              {activeSegment === 'projects' ? (
                
                /* ================= LUXURY SIGNATURE PROJECTS PANEL ================= */
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-4 bg-[#0b53c7] rounded-full"></div>
                      <h4 className="text-[#042a5e] tracking-wider uppercase text-xs lg:text-[13px] font-black font-sans leading-none">
                        {t.featuredProjects} ({filteredProjects.length})
                      </h4>
                    </div>
                    <span className="text-[9px] text-[#0b53c7] font-mono font-bold tracking-wider bg-blue-50 px-3 py-1.5 rounded-full border border-blue-105">
                      {language === 'ar' ? 'إطلاق حصري' : 'EXCLUSIVE LAUNCH'}
                    </span>
                  </div>

                  {filteredProjects.length === 0 ? (
                    <div className="p-12 text-center bg-white rounded-3xl border border-slate-100 space-y-4 shadow-sm">
                      <p className="text-xs text-slate-400 italic">No luxury signature projects found matching your budget limits or filters.</p>
                      <button 
                        onClick={handleResetFilters}
                        className="px-6 py-2.5 bg-[#0b53c7] text-white rounded-xl text-xs font-black shadow-lg shadow-blue-500/15 hover:brightness-105 transition-all cursor-pointer"
                      >
                        {language === 'ar' ? 'مسح التصفية والبدء من جديد' : 'Clear All Filter Criteria'}
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {filteredProjects.map((project) => {
                        const isFav = favorites.includes(project.id);
                        
                        // Select investment badges dynamically to look incredibly premier
                        let investmentBadge = language === 'ar' ? 'عائد استثماري متوقع ٩.٤٪' : 'Expected Yield: 9.4% Expected ROI';
                        if (project.priceStart > 12000000) {
                          investmentBadge = language === 'ar' ? 'مؤهل للحصول على الإقامة الذهبية' : 'Golden Visa Eligible Project';
                        } else if (project.paymentPlan.years >= 7) {
                          investmentBadge = language === 'ar' ? 'خطة سداد ممتدة فائقة المرونة' : 'Elite Post-Handover 7-Year Plan';
                        } else if (project.category === 'Villa') {
                          investmentBadge = language === 'ar' ? 'مساحات خضراء خاصة وحمامات سباحة' : 'Private Resort-Style Swimming Pools';
                        }

                        return (
                          <div
                            key={project.id}
                            className="group bg-white border border-slate-100/90 rounded-[32px] overflow-hidden hover:border-blue-200/50 hover:shadow-[0_28px_65px_rgba(4,42,94,0.08)] transition-all duration-300 relative flex flex-col p-4.5 select-none"
                          >
                            {/* Favorite bookmark button */}
                            <button
                              onClick={(e) => { e.stopPropagation(); onToggleFavorite(project.id); }}
                              className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/80 backdrop-blur-md text-slate-400 hover:text-rose-500 shadow-sm border border-white/40 transition-all duration-200 hover:scale-110 active:scale-90"
                            >
                              <Heart className={`w-4 h-4 ${isFav ? 'fill-current text-rose-500' : ''}`} />
                            </button>

                            <div 
                              onClick={() => onSelectProject(project)}
                              className="cursor-pointer space-y-4"
                            >
                              {/* Large property visual container */}
                              <div className="relative h-[220px] md:h-[260px] rounded-[24px] overflow-hidden bg-slate-100 shrink-0">
                                <img
                                  src={project.images[0]}
                                  alt={project.title}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover group-hover:scale-105 duration-[750ms] transition-transform"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                                
                                {/* Dynamic Category Badge */}
                                <div className={`absolute bottom-4 ${isRtl ? 'right-4' : 'left-4'} bg-[#0b53c7] px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider font-sans text-white shadow-lg shadow-blue-500/10`}>
                                  {project.category}
                                </div>

                                {/* Premium Top-Left Investment Badge */}
                                <div className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-bold text-[#0b53c7] flex items-center gap-1 shadow-sm border border-white/40`}>
                                  <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500/20" />
                                  <span>{investmentBadge}</span>
                                </div>
                              </div>

                              {/* Text details region */}
                              <div className="space-y-4">
                                <div className="space-y-1">
                                  <span className="text-[9px] text-[#0b53c7] font-black uppercase tracking-[0.16em] block font-mono">
                                    {project.developerName} • CORPORATE DEVELOPER
                                  </span>
                                  <h3 className="text-base md:text-lg font-black text-slate-900 leading-snug tracking-tight group-hover:text-[#0b53c7] transition-colors mt-0.5">
                                    {language === 'ar' ? project.titleAr : project.title}
                                  </h3>
                                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
                                    <MapPin className="w-3.5 h-3.5 text-[#0b53c7] shrink-0" />
                                    <span className="truncate">{language === 'ar' ? project.areaNameAr : project.areaName}</span>
                                  </div>
                                </div>

                                {/* Mini Divider */}
                                <div className="h-px bg-slate-100"></div>

                                {/* Metadata fields */}
                                <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">
                                  <span>🕒 {language === 'ar' ? `الاستلام: ${project.deliveryDateAr}` : `Delivery: ${project.deliveryDate}`}</span>
                                  <span className="text-[#0b53c7] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                                    ★ {project.rating} Rating
                                  </span>
                                </div>

                                {/* Price Emphasis Section */}
                                <div className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center border border-slate-150">
                                  <div>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{language === 'ar' ? 'سعر البدء الحصري' : 'Exclusive Starting Price'}</p>
                                    <p className="font-extrabold text-[#0b53c7] font-mono text-[16px] md:text-[18px] lg:text-[20px] tracking-tight leading-none mt-1">
                                      {project.priceStart.toLocaleString()} <span className="text-xs font-black text-slate-800 uppercase">{project.currency}</span>
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{language === 'ar' ? 'خطة السداد' : 'Payment Framework'}</p>
                                    <p className="font-black text-slate-800 text-[11px] md:text-xs mt-1 bg-white px-2.5 py-1 rounded-lg border border-slate-150">
                                      {project.paymentPlan.downPayment}% {language === 'ar' ? 'مقدم' : 'DP'} • {project.paymentPlan.years} {language === 'ar' ? 'سنوات' : 'Yrs'}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                
                /* ================= LUXURY AVAILABLE READY UNITS PANEL ================= */
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-4 bg-emerald-500 rounded-full"></div>
                      <h4 className="text-slate-900 tracking-wider uppercase text-xs lg:text-[13px] font-black font-sans leading-none">
                        {t.featuredUnits} ({filteredUnits.length})
                      </h4>
                    </div>
                    <span className="text-[9px] text-emerald-700 font-mono font-bold tracking-wider bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-110">
                      {language === 'ar' ? 'جاهز للسكن الفوري' : 'IMMEDIATE READY TO KEY'}
                    </span>
                  </div>

                  {filteredUnits.length === 0 ? (
                    <div className="p-12 text-center bg-white rounded-3xl border border-slate-100 space-y-4 shadow-sm">
                      <p className="text-xs text-slate-400 italic">No available individual units found matching your active filter criteria.</p>
                      <button 
                        onClick={handleResetFilters}
                        className="px-6 py-2.5 bg-[#0b53c7] text-white rounded-xl text-xs font-black shadow-lg"
                      >
                        Reset Search
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredUnits.map((unit) => (
                        <div
                          key={unit.id}
                          className="group bg-white p-4 rounded-3xl border border-slate-100/90 hover:border-emerald-250 hover:shadow-[0_20px_45px_rgba(16,185,129,0.08)] transition-all duration-300 flex flex-col justify-between space-y-4"
                        >
                          <div className="space-y-4">
                            {/* Photo and type tag */}
                            <div className="relative h-[180px] rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                              <img src={unit.image} alt={unit.type} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                              <span className="absolute bottom-3 left-3 bg-slate-950/85 text-white text-[9px] px-2.5 py-1 rounded-lg font-black tracking-widest font-mono uppercase">
                                {unit.type} Space Area
                              </span>
                              <div className="absolute top-3 right-3 bg-emerald-500 text-white text-[8px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest font-mono">
                                READY
                              </div>
                            </div>
                            
                            {/* Project description indicators */}
                            <div className="space-y-1">
                              <span className="text-[8px] text-[#0b53c7] font-black uppercase font-mono tracking-widest block">
                                AVAILABLE PREMIUM RESIDENCE UNIT
                              </span>
                              <h4 className="text-sm font-black text-slate-900 truncate">
                                {language === 'ar' ? unit.projectNameAr : unit.projectName}
                              </h4>
                              
                              {/* Layout indicators */}
                              <div className="grid grid-cols-3 gap-1 text-[10px] text-slate-500 font-mono font-bold bg-slate-50 p-2 rounded-xl border border-slate-100 mt-2 text-center">
                                <div className="border-r border-slate-150/40 last:border-0">
                                  <span className="block text-slate-300 text-[8px] uppercase">Beds</span>
                                  <span className="text-slate-800 font-black">{unit.beds} Bds</span>
                                </div>
                                <div className="border-r border-slate-150/40 last:border-0">
                                  <span className="block text-slate-300 text-[8px] uppercase">Baths</span>
                                  <span className="text-slate-800 font-black">{unit.baths} Bth</span>
                                </div>
                                <div className="last:border-r-0">
                                  <span className="block text-slate-300 text-[8px] uppercase">Space</span>
                                  <span className="text-slate-800 font-black">{unit.areaSqft.toLocaleString()} Sqft</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Price emphasis call-to-actions */}
                          <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                            <div>
                              <p className="text-[8px] text-slate-400 font-bold uppercase font-mono">Ready Price</p>
                              <p className="text-sm md:text-base font-extrabold text-emerald-600 font-mono">
                                ${unit.price.toLocaleString()}
                              </p>
                            </div>
                            
                            {/* WhatsApp instant chat */}
                            <a
                              href={`https://wa.me/${unit.agentWhatsApp}?text=Hello,%20regarding%20${encodeURIComponent(unit.projectName)}...`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-500 hover:text-white text-emerald-800 text-[10px] font-black border border-emerald-100 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>{language === 'ar' ? 'تواصل واتساب' : 'WhatsApp'}</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* HIGH LEVEL AUTHORIZED BUILDERS PORTFOLIOS */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-[#0b53c7] rounded-full"></div>
                  <h4 className="text-slate-900 tracking-wider uppercase text-xs lg:text-[13px] font-black font-sans leading-none">
                    {t.topDevelopers}
                  </h4>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
                  {developers.map((dev) => {
                    const active = selectedDeveloperId === dev.id;
                    return (
                      <div
                        key={dev.id}
                        onClick={() => setSelectedDeveloperId(active ? null : dev.id)}
                        className={`p-4 rounded-[24px] bg-white border cursor-pointer select-none flex-shrink-0 w-40 space-y-2.5 transition-all duration-300 snap-start text-center border-slate-100 hover:border-slate-300 shadow-sm ${
                          active ? 'border-[#0b53c7] ring-2 ring-[#0b53c7]/20 scale-98 shadow-md' : 'hover:shadow-md'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-150 mx-auto flex items-center justify-center text-xl shadow-inner font-black">
                          {dev.logoUrl}
                        </div>
                        <div className="space-y-0.5">
                          <h5 className="text-[11px] font-extrabold text-slate-800 truncate leading-tight">{dev.name}</h5>
                          <span className="text-[8px] text-[#0b53c7] font-mono uppercase font-black block">★ {dev.rating} Global Rating</span>
                          <span className="text-[7.5px] text-slate-400 font-bold uppercase tracking-widest block leading-none">{dev.projectsCount} Active Launches</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* 3. TECHNICAL SUPPORT ASSISTANT DRAWER OVERLAY */}
      {showSupportOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4 select-none">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 border border-slate-100 shadow-2xl relative space-y-4">
            
            <button 
              onClick={() => setShowSupportOverlay(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-xs font-mono font-bold cursor-pointer bg-slate-50 p-1.5 rounded-lg"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0b53c7] flex items-center justify-center font-bold">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#042a5e]">
                  {language === 'ar' ? 'الدعم الفني والخدمات الشريكة' : 'AQar Developer Support Hub'}
                </h3>
                <span className="text-[10px] text-slate-400 block font-mono font-bold uppercase tracking-wider">Enterprise Helpdesk System</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              {language === 'ar' 
                ? 'مرحباً أحمد! بصفتك شريك مبيعات معتمد، يمكنك التواصل مباشرة مع مهندسي النظام لإدارة خطوط الإطلاق وإضافة الوحدات الكبرى وتعديل خطط السداد الفورية.' 
                : 'Welcome Ahmad! As an authorized sales representative, you have priority hotline access to system engineers for listings launches and immediate price corrections.'}
            </p>

            <div className="space-y-2">
              <a
                href="https://wa.me/971501234567?text=Hi%20AQar%2520Engineering!%20Req%20support%20assistance."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 cursor-pointer shadow hover:brightness-105"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{language === 'ar' ? 'تحدث مباشرة مع مهندس الدعم' : 'Direct Support Hotline'}</span>
              </a>

              <button
                onClick={() => setShowSupportOverlay(false)}
                className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-705 text-xs font-bold rounded-xl transition-colors text-center cursor-pointer block"
              >
                {language === 'ar' ? 'عودة للوحة القيادة' : 'Back to executive dashboard'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
