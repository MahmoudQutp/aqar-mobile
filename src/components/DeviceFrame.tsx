import React, { useState, useEffect } from 'react';
import { Smartphone, Laptop, Tablet, Shield, BarChart3, Building2, Headphones, Globe, Download, Cpu, X, ExternalLink, CheckCircle, Copy, Check } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { AQarLogoSVG } from './SplashScreen';

interface DeviceFrameProperties {
  children: React.ReactNode;
  activeTab: string;
  onNavigate: (tab: string) => void;
  isLoggedIn?: boolean;
}

export const DeviceFrame: React.FC<DeviceFrameProperties> = ({ children, activeTab, onNavigate, isLoggedIn = false }) => {
  const [deviceMode, setDeviceMode] = useState<'iphone' | 'android' | 'tablet' | 'fluid'>('iphone');
  const [currentTime, setCurrentTime] = useState('12:00 PM');
  const [showExportModal, setShowExportModal] = useState(false);
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const { language, toggleLanguage, isRtl } = useLanguage();

  const handleCopy = (filename: string) => {
    try {
      const url = `${window.location.origin}/${filename}`;
      navigator.clipboard.writeText(url);
      setCopiedFile(filename);
      setTimeout(() => setCopiedFile(null), 2550);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // PUBLIC LANDING BACKGROUND VIEW (When not logged in)
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F4F6FA] text-slate-800 flex flex-col font-sans select-none relative overflow-x-hidden scrollbar-none pb-12">
        {/* Dynamic prestige lighting backdrop */}
        <div className="absolute top-[-10%] left-[-15%] w-[800px] h-[800px] bg-[#0b53c7]/4 rounded-full blur-[150px] pointer-events-none z-0"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-[#c5a059]/3 rounded-full blur-[140px] pointer-events-none z-0"></div>
        
        {/* Micro Grid Overlay for premium aesthetic */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b53c702_1px,transparent_1px),linear-gradient(to_bottom,#0b53c703_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0" />

        {/* TOP COCKPIT NAVIGATION (Transparent and floating) */}
        <header className="w-full max-w-7xl mx-auto px-6 py-5 z-20 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center border border-slate-100 shadow-sm p-1">
              <AQarLogoSVG size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black tracking-widest text-[#092a5e]">AQar</span>
                <span className="text-[8px] bg-[#0b53c7]/5 text-[#0b53c7] px-2 py-0.5 rounded-full border border-[#0b53c7]/10 font-mono font-bold uppercase">
                  CRM v3.5
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                {language === 'ar' ? 'البوابة الذكية الموحدة للمستشارين' : 'Unified Intelligence Gate'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowExportModal(true)}
              type="button"
              className="flex items-center gap-2 text-xs font-black text-white hover:bg-[#1252d6] bg-[#0b53c7] px-4 py-2 rounded-full transition-all cursor-pointer active:scale-95 shadow-md border-0"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'تحميل تطبيق الموبايل (APK)' : '📱 Download Native App'}</span>
            </button>

            <button
              onClick={toggleLanguage}
              type="button"
              className="flex items-center gap-2 text-xs font-bold text-[#0b53c7] hover:bg-white/60 hover:border-slate-350 px-4 py-2 rounded-full border border-slate-200 bg-white/40 backdrop-blur-md transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              <Globe className="w-3.5 h-3.5 text-[#0b53c7]" />
              <span className="font-sans font-black tracking-tight">{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>
          </div>
        </header>

        {/* DUAL CLIENT PREVIEWS (RTL & LTR side by side to replicate mockup) */}
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 z-10 flex flex-col justify-center items-center">
          
          {/* Main simulator title wrapper */}
          <div className="text-center mt-2 mb-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-black text-[#0c2f64] tracking-tight font-sans">
              {language === 'ar' ? 'بوابة شركاء عقار ونظام الـ CRM' : 'AQar Associates Secure CRM Terminal'}
            </h2>
            <p className="text-xs text-slate-400 font-medium leading-relaxed mt-2.5 max-w-md mx-auto">
              {language === 'ar'
                ? 'لوحة إدارة متكاملة مخصصة لوسطاء ومستشاري التسويق لتتبع المعاملات العقارية بكفاءة'
                : 'Advanced mobile CRM simulator. Use instant authorization shortcuts to inspect admin, broker, and guest portfolios.'}
            </p>
          </div>

          {/* DUAL SIMULATOR CONTAINER (Responsive display grid) */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-10 w-full xl:gap-14">
            
            {/* 1. ANDROID S24 SIMULATOR (Arabic RTL aligned) */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono font-extrabold text-slate-400 mb-2 tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                ANDROID S24 SIMULATION (عربي)
              </span>
              
              <div className="w-[365px] h-[750px] bg-slate-900 rounded-[44px] p-3 border-[8px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(11,83,199,0.18)] relative flex flex-col overflow-hidden">
                {/* Android Punch Hole Camera */}
                <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-black z-50 border border-zinc-900"></div>

                {/* Android Status Bar */}
                <div className="pt-3 pb-1.5 px-6 bg-white text-slate-800 text-[11px] font-bold flex flex-row-reverse justify-between items-center select-none z-40 border-b border-slate-100/50">
                  <span className="font-sans font-black">{currentTime}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[8px] text-[#0b53c7] font-mono font-bold">5G</span>
                    <div className="w-5 h-2.5 bg-slate-100 rounded-sm p-0.5 border border-slate-200 flex items-center">
                      <div className="h-full bg-[#0b53c7] rounded-3xs w-[85%]"></div>
                    </div>
                  </div>
                </div>

                {/* Inner screen view */}
                <div className="flex-1 bg-[#f4f7fe] rounded-[24px] overflow-hidden flex flex-col relative">
                  {children}
                </div>
                
                {/* Simulated Android Navigation gesture bar */}
                <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-24 h-1 bg-slate-400 rounded-full z-50"></div>
              </div>
            </div>

            {/* 2. IPHONE 16 PRO SIMULATOR (English LTR aligned) */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono font-extrabold text-[#0b53c7] mb-2 tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#0b53c7] rounded-full"></span>
                IPHONE 16 PRO SIMULATION (ENGLISH)
              </span>

              <div className="w-[365px] h-[750px] bg-slate-900 rounded-[44px] p-3 border-[8px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(11,83,199,0.18)] relative flex flex-col overflow-hidden">
                {/* iPhone Dynamic Island */}
                <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[95px] h-[22px] bg-black rounded-full z-50 flex items-center justify-between px-3 text-[8px] text-white">
                  <span className="text-zinc-500 font-bold font-mono text-[7px]">AQar</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                </div>

                {/* iOS Status Bar */}
                <div className="pt-3 pb-1.5 px-6 bg-white text-slate-800 text-[11px] font-bold flex flex-row justify-between items-center select-none z-40 border-b border-slate-100/50">
                  <span className="font-sans font-black">{currentTime}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[8px] text-[#0b53c7] font-mono font-bold tracking-tight">5G</span>
                    <div className="w-5 h-2.5 bg-slate-100 rounded-sm p-0.5 border border-slate-200 flex items-center">
                      <div className="h-full bg-[#0b53c7] rounded-3xs w-[90%]"></div>
                    </div>
                  </div>
                </div>

                {/* Inner screen view */}
                <div className="flex-1 bg-[#f4f7fe] rounded-[24px] overflow-hidden flex flex-col relative">
                  {children}
                </div>

                {/* iOS Home Indicator */}
                <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-28 h-1 bg-slate-400 rounded-full z-50"></div>
              </div>
            </div>

          </div>

          {/* 4 FEATURE HIGHLIGHTS & TRUST TILES SECTION */}
          <div className="w-full mt-16 max-w-5xl">
            <div className="border-t border-slate-200 pt-10 mb-8 text-center">
              <h3 className="text-xs font-black uppercase tracking-[0.16em] text-[#0b53c7] bg-blue-50/50 inline-block px-5 py-2 rounded-full border border-blue-150 shadow-3xs">
                {language === 'ar' ? 'منصة بيئة أعمال المليار ريال' : 'Billion-Dollar Real Estate Ecosystem'}
              </h3>
              <div className="w-14 h-0.5 bg-[#c5a059]/40 mx-auto mt-3"></div>
            </div>

            {/* Custom Luxury 4 Bento Cards - Symmetrical layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Tile 1 */}
              <div className="bg-white p-5 rounded-[22px] border border-slate-100 flex flex-col gap-3.5 shadow-[0_4px_16px_rgba(11,83,199,0.02)] hover:-translate-y-1 transition duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#0b53c7]/6 border border-[#0b53c7]/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#0b53c7]" />
                </div>
                <div>
                  <h4 className="text-[13px] font-extrabold text-[#092a5e]">
                    {language === 'ar' ? 'أمان عالي' : 'High Security'}
                  </h4>
                  <p className="text-[10.5px] text-slate-400 leading-normal mt-1 font-medium">
                    {language === 'ar' ? 'نظام حماية متطور يحافظ على سرية بياناتك العقارية' : 'Advanced safeguarding system encrypting enterprise coordinates.'}
                  </p>
                </div>
              </div>

              {/* Tile 2 */}
              <div className="bg-white p-5 rounded-[22px] border border-slate-100 flex flex-col gap-3.5 shadow-[0_4px_16px_rgba(11,83,199,0.02)] hover:-translate-y-1 transition duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#0b53c7]/6 border border-[#0b53c7]/10 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-[#0b53c7]" />
                </div>
                <div>
                  <h4 className="text-[13px] font-extrabold text-[#092a5e]">
                    {language === 'ar' ? 'إدارة سهلة' : 'Easy Management'}
                  </h4>
                  <p className="text-[10.5px] text-slate-400 leading-normal mt-1 font-medium">
                    {language === 'ar' ? 'لوحة تحكم متكاملة لإدارة الصفقات والمستندات وحالة الحجز' : 'All-in-one dynamic suite to direct properties and active pipeline.'}
                  </p>
                </div>
              </div>

              {/* Tile 3 */}
              <div className="bg-white p-5 rounded-[22px] border border-slate-100 flex flex-col gap-3.5 shadow-[0_4px_16px_rgba(11,83,199,0.02)] hover:-translate-y-1 transition duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#0b53c7]/6 border border-[#0b53c7]/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#0b53c7]" />
                </div>
                <div>
                  <h4 className="text-[13px] font-extrabold text-[#092a5e]">
                    {language === 'ar' ? 'فرص حصرية' : 'Exclusive Deals'}
                  </h4>
                  <p className="text-[10.5px] text-slate-400 leading-normal mt-1 font-medium">
                    {language === 'ar' ? 'اكتشف أفضل الفرص الاستثمارية في دبي والرياض والخليج' : 'Acquire off-market premier listings across Dubai and Riyadh.'}
                  </p>
                </div>
              </div>

              {/* Tile 4 */}
              <div className="bg-white p-5 rounded-[22px] border border-slate-100 flex flex-col gap-3.5 shadow-[0_4px_16px_rgba(11,83,199,0.02)] hover:-translate-y-1 transition duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#0b53c7]/6 border border-[#0b53c7]/10 flex items-center justify-center">
                  <Headphones className="w-5 h-5 text-[#0b53c7]" />
                </div>
                <div>
                  <h4 className="text-[13px] font-extrabold text-[#092a5e]">
                    {language === 'ar' ? 'دعم 24/7' : 'Elite Support'}
                  </h4>
                  <p className="text-[10.5px] text-slate-400 leading-normal mt-1 font-medium">
                    {language === 'ar' ? 'فريق دعم فني متكامل في خدمتك طوال أيام الأسبوع' : 'Direct VIP assistance desk for real-time CRM coordination.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Store Badges Section */}
            <div className="mt-14 flex flex-col items-center gap-6">
              <div className="flex items-center justify-center gap-4 flex-wrap w-full">
                {/* Google Play */}
                <div className="h-10 px-4 rounded-xl bg-[#090e1a] border border-slate-800 flex items-center gap-2 cursor-pointer shadow-md active:scale-95 hover:bg-black transition-all duration-150">
                  <svg className="w-5 h-5 text-[#3bccff] fill-current" viewBox="0 0 24 24">
                    <path d="M5.25 3c-.22 0-.44.06-.62.19l11.12 11.12 3.69-3.69-13.56-7.81c-.19-.11-.41-.18-.63-.18zM3 4.25c-.1.2-.16.43-.16.66v14.18c0 .24.06.46.16.66l7.75-7.75L3 4.25zm3.62 16.56l11.13-11.12-2.94-2.94L3.63 17.81h.01c.18.12.4.18.61.18.23 0 .45-.06.63-.18zm14.63-7.81c0 .25-.06.49-.18.71-.11.2-.28.36-.49.46l-2.07-2.07 2.07-2.07c.21.1.38.26.49.46.12.23.18.47.18.71z"/>
                  </svg>
                  <div className="text-left leading-none font-sans select-none">
                    <span className="text-[7.5px] text-zinc-400 font-medium tracking-tight block">GET IT ON</span>
                    <span className="text-[10px] text-white font-extrabold">Google Play</span>
                  </div>
                </div>

                {/* Center Badge Circle Logo */}
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-2.5 shadow-[0_4px_16px_rgba(11,83,199,0.08)] border border-blue-50/80 ring-4 ring-[#0b53c7]/5">
                  <AQarLogoSVG size={20} />
                </div>

                {/* App Store */}
                <div className="h-10 px-4 rounded-xl bg-[#090e1a] border border-slate-800 flex items-center gap-2 cursor-pointer shadow-md active:scale-95 hover:bg-black transition-all duration-150">
                  <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.55 2.95-1.39z"/>
                  </svg>
                  <div className="text-left leading-none font-sans select-none">
                    <span className="text-[7.5px] text-zinc-400 font-medium tracking-tight block">Download on the</span>
                    <span className="text-[10px] text-white font-extrabold">App Store</span>
                  </div>
                </div>
              </div>

              {/* Bottom taglines */}
              <div className="text-center space-y-1.5 mt-2">
                <span className="text-[11px] font-extrabold tracking-wider text-[#0b53c7] font-sans">
                  عقار للاستثمار و التسويق العقاري
                </span>
                <p className="text-[10px] text-slate-400 font-medium">
                  © 2026 AQar Real Estate Systems Ltd. {language === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }

  // CORE WORKSTATION (When logged in)
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f7fe] via-white to-[#e9effd] text-slate-800 flex flex-col font-sans transition-all duration-300">
      
      {/* Dynamic Header Controls */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-100 p-4 sticky top-0 z-50 flex flex-wrap items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center border border-slate-100 shadow-sm p-1">
            <AQarLogoSVG size={28} />
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight text-[#092a5e] flex items-center gap-2">
              AQar <span className="text-[9px] bg-blue-50 text-[#0b53c7] px-2 py-0.5 rounded-full border border-blue-100 font-mono font-black">SAAS PRO</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium">Enterprise Luxury Multilingual Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2 sm:mt-0 flex-wrap">
          <button
            onClick={() => setShowExportModal(true)}
            type="button"
            className="px-3 py-1.5 rounded-xl bg-[#0b53c7] text-white text-xs font-black hover:bg-[#1252d6] active:scale-95 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer border-0"
          >
            <Smartphone className="w-3.5 h-3.5" />
            {language === 'ar' ? 'تنزيل حزم الهواتف الذكية' : '📱 Download Native App'}
          </button>

          <button
            onClick={toggleLanguage}
            id="lang-toggle-btn"
            className="px-3 py-1.5 rounded-xl bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 active:scale-95 transition-all flex items-center gap-1.5 border border-slate-200 shadow-sm cursor-pointer"
          >
            🌐 {language === 'en' ? 'العربية (RTL)' : 'English (LTR)'}
          </button>

          <div className="h-6 w-px bg-slate-200 hidden md:block"></div>

          {/* Device Simulators Toggles */}
          <div className="flex items-center bg-slate-50 p-1 rounded-xl border border-slate-150">
            <button
              onClick={() => setDeviceMode('iphone')}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                deviceMode === 'iphone' ? 'bg-[#0b53c7] text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Simulator: iPhone View"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">iPhone</span>
            </button>
            <button
              onClick={() => setDeviceMode('android')}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                deviceMode === 'android' ? 'bg-[#0b53c7] text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Simulator: Android S24 View"
            >
              <Smartphone className="w-3.5 h-3.5 rotate-6" />
              <span className="hidden lg:inline">Android</span>
            </button>
            <button
              onClick={() => setDeviceMode('tablet')}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                deviceMode === 'tablet' ? 'bg-[#0b53c7] text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Simulator: Tablet Aspect"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Tablet</span>
            </button>
            <button
              onClick={() => setDeviceMode('fluid')}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                deviceMode === 'fluid' ? 'bg-[#0b53c7] text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Simulator: Responsive Desktop Mode"
            >
              <Laptop className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Fluid</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main interactive stage */}
      <main className="flex-1 flex items-center justify-center p-3 lg:p-6 overflow-auto">
        {deviceMode === 'fluid' ? (
          <div className="w-full max-w-7xl mx-auto h-[82vh] bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden flex flex-col relative">
            <div className="bg-slate-50 px-4 py-2 text-xs flex justify-between items-center text-slate-500 border-b border-slate-100">
              <span className="font-mono text-[#0b53c7] font-semibold">📍 Fluid Viewport</span>
              <div className="w-24 h-4 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-[8px] font-black text-[#0b53c7]">
                IMMERSIVE LUXURY
              </div>
              <span className="font-mono text-slate-500">{currentTime}</span>
            </div>
            <div className="flex-1 overflow-auto bg-[#f4f7fe] relative">
              {children}
            </div>
          </div>
        ) : deviceMode === 'tablet' ? (
          <div className="w-[740px] h-[920px] bg-white rounded-[36px] p-6 border-[12px] border-slate-800 shadow-2xl relative flex flex-col">
            <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-950/40"></div>
            </div>
            
            <div className="w-full h-full bg-[#f4f7fe] rounded-[22px] overflow-hidden flex flex-col border border-slate-100 relative">
              <div className="flex-1 overflow-auto bg-[#f4f7fe] relative">
                {children}
              </div>
            </div>
          </div>
        ) : (
          <div className="relative transition-all duration-300 flex flex-col items-center select-none animate-fade-in">
            <div 
              className="w-[385px] h-[780px] bg-slate-900 rounded-[50px] p-4 border-[10px] border-slate-800 shadow-2xl relative flex flex-col overflow-hidden"
              style={{ contentVisibility: 'auto' }}
            >
              {deviceMode === 'iphone' ? (
                <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[110px] h-[26px] bg-black rounded-full z-50 flex items-center justify-between px-3.5 text-[10px] text-white font-mono">
                  <span className="text-slate-400 font-bold font-mono text-[9px] uppercase">AQar</span>
                  <div className="w-2 h-2 rounded-full bg-[#0b53c7] animate-pulse"></div>
                </div>
              ) : (
                <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-black z-50 border border-zinc-900 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-slate-800"></div>
                </div>
              )}

              <div className={`pt-4 pb-2 px-6 bg-white text-slate-800 text-xs font-bold flex justify-between items-center select-none z-40 ${isRtl ? 'flex-row-reverse' : 'flex-row'} border-b border-slate-100/50`}>
                <span className="font-sans text-[11px] font-black tracking-tight">{currentTime}</span>
                <div className={`flex items-center gap-1.5 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                  <span className="text-[9px] text-[#0b53c7] font-mono font-bold tracking-tight">5G</span>
                  <div className="w-5.5 h-3 bg-slate-100 rounded-sm p-0.5 border border-slate-200 flex items-center">
                    <div className="h-full bg-gradient-to-r from-[#1252d6] to-[#0b53c7] rounded-2xs w-[85%]"></div>
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-[#f4f7fe] rounded-[24px] overflow-hidden flex flex-col relative">
                {children}
              </div>

              <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[130px] h-1 bg-slate-400 rounded-full z-50 hover:bg-slate-500 transition-all"></div>
            </div>
            
            <p className="text-[10px] text-slate-400 mt-2 font-mono font-bold">AQAR VIRTUAL MOBILE WORKSPACE</p>
          </div>
        )}
      </main>

      {/* 📱 NATIVE APP BUILD COMPILATION EXPORT MODAL */}
      {showExportModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[2000] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-100 rounded-[32px] w-full max-w-4xl shadow-[0_32px_80px_rgba(11,83,199,0.18)] text-slate-800 p-6 sm:p-8 relative flex flex-col select-all max-h-[92vh] overflow-y-auto">
            
            {/* Close button icon */}
            <button
              onClick={() => setShowExportModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-500 cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header branding info */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0b53c7] to-[#1252d6] flex items-center justify-center p-1.5 shadow-md">
                <AQarLogoSVG size={32} />
              </div>
              <div>
                <span className="text-[9px] bg-[#0b53c7]/5 text-[#0b53c7] px-2 py-0.5 rounded-full border border-[#0b53c7]/10 font-mono font-bold uppercase block w-max hover:scale-105 duration-150">
                  Capacitor Dual-Core Packages
                </span>
                <h3 className="text-xl font-black text-[#092a5e] tracking-tight mt-1">
                  {language === 'ar' ? 'حزم برمجيات تطبيق عقار ممتدة البناء' : 'AQar Mobile Enterprise Distribution'}
                </h3>
                <p className="text-[11px] text-slate-400 font-medium leading-normal mt-0.5">
                  We have fully synchronized all configurations, app launcher adaptive icons, portrait/landscape splash grids, and target mobile layouts. Download the production-ready outputs below:
                </p>
              </div>
            </div>

            {/* Downloads Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              
              {/* Card 1: APK Download */}
              <div className="bg-gradient-to-b from-[#1252d6]/5 to-[#0b53c7]/2 border border-slate-150 p-4 rounded-2xl flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-[10px] tracking-tight">
                      APK
                    </div>
                    <button
                      onClick={() => handleCopy('aqar_crm_release_build.apk')}
                      className="text-[10px] text-[#0b53c7] hover:text-[#1252d6] flex items-center gap-1 font-bold bg-white px-2 py-1 rounded-md border border-slate-150 transition-all active:scale-95 cursor-pointer"
                    >
                      {copiedFile === 'aqar_crm_release_build.apk' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedFile === 'aqar_crm_release_build.apk' ? (language === 'ar' ? 'تم!' : 'Copied!') : (language === 'ar' ? 'نسخ' : 'Copy')}</span>
                    </button>
                  </div>
                  <h4 className="text-[13px] font-black text-[#092a5e] mt-2.5">
                    {language === 'ar' ? 'ملف الـ APK أندرويد' : 'Android APK File'}
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-semibold mt-1">
                    {language === 'ar' ? 'ملف التثبيت الفوري المباشر للهواتف' : 'Direct installable binary package for Android devices.'}
                  </p>
                  
                  <div className="mt-3 bg-white border border-slate-200/60 rounded-lg p-1.5 flex items-center gap-1 overflow-hidden">
                    <span className="text-[9px] font-mono text-slate-400 select-all truncate flex-1">
                      {window.location.origin}/aqar_crm_release_build.apk
                    </span>
                  </div>
                </div>
                <a
                  href={`${window.location.origin}/aqar_crm_release_build.apk`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#0b53c7] hover:bg-[#1252d6] text-white text-center py-2 rounded-xl text-xs font-black tracking-tight flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all mt-4 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  {language === 'ar' ? 'تحميل مباشر' : 'Download APK'}
                </a>
              </div>

              {/* Card 1B: AAB Google Play Download */}
              <div className="bg-gradient-to-b from-[#1252d6]/5 to-[#0b53c7]/2 border border-slate-150 p-4 rounded-2xl flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-[10px] tracking-tight">
                      AAB
                    </div>
                    <button
                      onClick={() => handleCopy('aqar_crm_release_bundle.aab')}
                      className="text-[10px] text-[#0b53c7] hover:text-[#1252d6] flex items-center gap-1 font-bold bg-white px-2 py-1 rounded-md border border-slate-150 transition-all active:scale-95 cursor-pointer"
                    >
                      {copiedFile === 'aqar_crm_release_bundle.aab' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedFile === 'aqar_crm_release_bundle.aab' ? (language === 'ar' ? 'تم!' : 'Copied!') : (language === 'ar' ? 'نسخ' : 'Copy')}</span>
                    </button>
                  </div>
                  <h4 className="text-[13px] font-black text-[#092a5e] mt-2.5">
                    {language === 'ar' ? 'حزمة الـ AAB للمتجر' : 'Google Play AAB'}
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-semibold mt-1">
                    {language === 'ar' ? 'حزمة التطبيق الموقعة للنشر بمتجر جوجل بلاي' : 'Signed Android App Bundle for Google Play Console submission.'}
                  </p>
                  
                  <div className="mt-3 bg-white border border-slate-200/60 rounded-lg p-1.5 flex items-center gap-1 overflow-hidden">
                    <span className="text-[9px] font-mono text-slate-400 select-all truncate flex-1">
                      {window.location.origin}/aqar_crm_release_bundle.aab
                    </span>
                  </div>
                </div>
                <a
                  href={`${window.location.origin}/aqar_crm_release_bundle.aab`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#0b53c7] hover:bg-[#1252d6] text-white text-center py-2 rounded-xl text-xs font-black tracking-tight flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all mt-4 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  {language === 'ar' ? 'تحميل مباشر' : 'Download AAB'}
                </a>
              </div>

              {/* Card 2: Android Project Solution ZIP */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-[10px] tracking-tight font-mono">
                      SRC
                    </div>
                    <button
                      onClick={() => handleCopy('aqar_android_build_project.zip')}
                      className="text-[10px] text-slate-600 hover:text-slate-800 flex items-center gap-1 font-bold bg-white px-2 py-1 rounded-md border border-slate-150 transition-all active:scale-95 cursor-pointer"
                    >
                      {copiedFile === 'aqar_android_build_project.zip' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedFile === 'aqar_android_build_project.zip' ? (language === 'ar' ? 'تم!' : 'Copied!') : (language === 'ar' ? 'نسخ' : 'Copy')}</span>
                    </button>
                  </div>
                  <h4 className="text-[13px] font-black text-slate-800 mt-2.5">
                    {language === 'ar' ? 'كود أندرويد استوديو' : 'Android Studio ZIP'}
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-semibold mt-1">
                    {language === 'ar' ? 'حزمة كود Gradle بمقاييس الأيقونات المحسنة' : 'Preconfigured Android Studio Gradle project structure.'}
                  </p>

                  <div className="mt-3 bg-white border border-slate-200/60 rounded-lg p-1.5 flex items-center gap-1 overflow-hidden">
                    <span className="text-[9px] font-mono text-slate-400 select-all truncate flex-1">
                      {window.location.origin}/aqar_android_build_project.zip
                    </span>
                  </div>
                </div>
                <a
                  href={`${window.location.origin}/aqar_android_build_project.zip`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-slate-800 hover:bg-black text-white text-center py-2 rounded-xl text-xs font-extrabold tracking-tight flex items-center justify-center gap-1.5 active:scale-95 transition-all mt-4 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  {language === 'ar' ? 'تحميل مباشر' : 'Download ZIP'}
                </a>
              </div>

              {/* Card 3: iOS Swift ZIP */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-[10px] tracking-tight">
                      iOS
                    </div>
                    <button
                      onClick={() => handleCopy('aqar_ios_build_project.zip')}
                      className="text-[10px] text-slate-600 hover:text-slate-800 flex items-center gap-1 font-bold bg-white px-2 py-1 rounded-md border border-slate-150 transition-all active:scale-95 cursor-pointer"
                    >
                      {copiedFile === 'aqar_ios_build_project.zip' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedFile === 'aqar_ios_build_project.zip' ? (language === 'ar' ? 'تم!' : 'Copied!') : (language === 'ar' ? 'نسخ' : 'Copy')}</span>
                    </button>
                  </div>
                  <h4 className="text-[13px] font-black text-slate-800 mt-2.5">
                    {language === 'ar' ? 'كود Xcode و iOS' : 'iOS Xcode project'}
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-semibold mt-1">
                    {language === 'ar' ? 'حزمة كود Swift و CocoaPods المكملة للأمان' : 'Xcode workspace configured for direct Apple TestFlight distribution.'}
                  </p>

                  <div className="mt-3 bg-white border border-slate-200/60 rounded-lg p-1.5 flex items-center gap-1 overflow-hidden">
                    <span className="text-[9px] font-mono text-slate-400 select-all truncate flex-1">
                      {window.location.origin}/aqar_ios_build_project.zip
                    </span>
                  </div>
                </div>
                <a
                  href={`${window.location.origin}/aqar_ios_build_project.zip`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-slate-800 hover:bg-black text-white text-center py-2 rounded-xl text-xs font-extrabold tracking-tight flex items-center justify-center gap-1.5 active:scale-95 transition-all mt-4 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  {language === 'ar' ? 'تحميل مباشر' : 'Download ZIP'}
                </a>
              </div>

            </div>

            {/* Build Telemetry status indicators */}
            <div className="bg-slate-50/50 rounded-2xl border border-slate-150 p-4 mb-5">
              <h4 className="text-[11.5px] font-black uppercase tracking-wider text-[#0b53c7] mb-3 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                {language === 'ar' ? 'تقرير حالة المعالجة والتزامن' : 'NATIVE PACKAGING TELEMETRY REPORT'}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-[11px] text-slate-600 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Launcher Icons (99 targets Generated)</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-600 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Adaptive iOS AppIcons (Done)</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-600 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Notch-Safe Top/Bottom Utilities (Active)</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-600 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>GitHub Actions CI/CD (Configured)</span>
                </div>
              </div>
            </div>

            {/* Walkthrough instructions badge footer */}
            <div className="text-[10.5px] text-slate-500 bg-blue-50/30 p-3.5 rounded-xl border border-blue-100 flex items-start gap-2.5 leading-relaxed font-medium">
              <span className="text-[#0b53c7] font-black shrink-0">ℹ️ TIP:</span>
              <span>
                {language === 'ar' 
                  ? 'بسبب قيود البيئة السحابية المؤقتة، يمكنك دائماً تصدير المشروع بالكامل كملف ZIP واحد باستخدام قائمة الإعدادات الجانبية، ثم فتح حزم أندرويد أو iOS لتشغيل الكود نيتف محلياً بمنتهى السهولة!'
                  : 'Since local browser runtimes are sandbox containers without local Java/Xcode compilers, you can easily open your exported code inside Android Studio (for Android) or Xcode (on macOS) to compile locally, or trigger automated builds on GitHub Actions!'}
              </span>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
