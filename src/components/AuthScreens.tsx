import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { 
  Mail, Lock, Phone, User, Key, ArrowRight, ShieldCheck, 
  CheckCircle2, ChevronLeft, Globe, Eye, EyeOff, 
  Shield, BarChart3, Building2, Headphones 
} from 'lucide-react';
import { AQarLogoSVG } from './SplashScreen';

interface AuthScreensProperties {
  onSuccess: (userRole: 'broker' | 'admin' | 'guest') => void;
}

export const AuthScreens: React.FC<AuthScreensProperties> = ({ onSuccess }) => {
  const [view, setView] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('broker@aqar.luxury');
  const [password, setPassword] = useState('aqar2026');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorVisible, setErrorVisible] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const { t, language, isRtl, toggleLanguage } = useLanguage();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorVisible('');
    
    if (!email || !password) {
      setErrorVisible(language === 'ar' ? 'الرجاء ملء كافة الحقول المطلوبة' : 'Please fill in all requested fields.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // Determine user privilege role based on login text indicators
      if (email.includes('admin')) {
        onSuccess('admin');
      } else if (email.includes('guest')) {
        onSuccess('guest');
      } else {
        onSuccess('broker');
      }
    }, 900);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorVisible('');
    setSuccessMsg('');

    if (!fullName || !email || !phone) {
      setErrorVisible(language === 'ar' ? 'جميع الحقول مطلوبة لإرسال طلب الانضمام' : 'All fields are required.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg(language === 'ar' ? 'تم تقديم طلب الاعتماد بنجاح! سيتواصل معك المنسق هاتفياً.' : 'Application received! A coordinator will contact you shortly.');
      setTimeout(() => {
        setView('login');
        setSuccessMsg('');
      }, 2500);
    }, 1000);
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorVisible('');
    setSuccessMsg('');

    if (!email) {
      setErrorVisible(language === 'ar' ? 'من فضلك أدخل البريد الإلكتروني للعمل' : 'Please enter your corporate email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg(language === 'ar' ? 'تم إرسال رمز الأمان إلى بريدك المسجل.' : 'Recovery instructions dispatched to your corporate email.');
    }, 900);
  };

  return (
    <div className="absolute inset-0 bg-[#F4F6FA] flex flex-col overflow-y-auto scrollbar-none select-none relative font-sans text-slate-850 pb-16 pt-safe pb-safe">
      
      {/* Dynamic Ambient Luxury Lighting Background (Soft Royal Blue & Gold Glow circles) */}
      <div className="absolute top-[-5%] left-[-15%] w-[600px] h-[600px] bg-[#0b53c7]/4 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[480px] h-[480px] bg-[#c5a059]/3 rounded-full blur-[130px] pointer-events-none z-0"></div>
      
      {/* Micro Grid Overlay for premium SaaS look */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b53c702_1px,transparent_1px),linear-gradient(to_bottom,#0b53c703_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-0" />

      {/* Elegant Luxury Real Estate Tower Silhouette - Subtle and faint underlay */}
      <div className="absolute inset-x-0 top-0 h-[420px] opacity-[0.035] pointer-events-none mix-blend-overlay z-0 select-none">
        <svg className="w-full h-full" viewBox="0 0 400 380" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M20 380 V120 L50 90 H90 V380 M90 380 V180 L110 160 H150 V380 M150 380 V50 H190 V380 M190 380 V200 L220 170 H260 V380 M260 380 V130 L280 110 H320 V380" stroke="#0b53c7" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M10 380 V240 L30 220 H60 V380 M130 380 V290 H160 V380 L180 370 M210 380 V220 H230 V380" stroke="#0b53c7" strokeWidth="1.5" />
        </svg>
      </div>

      {/* LUXURY STATUS OR HEADER AREA: MATCHING SCREEN REFERENCE (Language toggle on the right, no distracting badges) */}
      <div className={`w-full flex justify-end items-center z-10 px-6 pt-5 pb-2 max-w-lg mx-auto`}>
        {/* Modern Minimal Language Switch (matching reference phone top exactly) */}
        <button 
          onClick={toggleLanguage}
          type="button"
          className="flex items-center gap-1.5 text-[12px] font-bold text-[#0b53c7] hover:bg-white/40 px-3 py-1.5 rounded-full border border-slate-200/50 bg-white/40 backdrop-blur-md transition-all cursor-pointer active:scale-95"
          id="language-switcher-top"
        >
          <Globe className="w-3.5 h-3.5 text-[#0b53c7]" />
          <span className="font-sans font-black tracking-tight">{language === 'ar' ? 'English' : 'العربية'}</span>
        </button>
      </div>

      {/* CORE FRAME CONTENT CONTAINER */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 z-10 w-full max-w-sm mx-auto">
        
        {/* LARGE OFFICIAL AQAR LOGO PRESENTATION - MATCHING HIGH-RES SPECIFICATIONS */}
        <div className="flex flex-col items-center mt-2 mb-6 text-center animate-fade-in w-full select-none">
          <div className="p-1 mb-1 transform hover:scale-[1.02] transition-transform duration-300">
            {/* Elegant official AQar braided blue icon symbol in pixel-perfect vector representation */}
            <AQarLogoSVG size={105} />
          </div>
          
          <div className="space-y-1 mt-1">
            {/* Official Arabic Branding Text */}
            <p className="text-[11px] font-bold tracking-wider text-[#0b53c7] font-sans">
              عقار للاستثمار و التسويق العقاري
            </p>
            
            {/* Arabic Welcome Heading */}
            <h1 className="text-2xl font-black text-slate-900 tracking-tight pt-2 font-sans">
              {language === 'ar' ? 'مرحباً بك في عقار' : 'Welcome to AQar'}
            </h1>
            
            {/* Arabic Welcome Subtitle */}
            <p className="text-[10.5px] text-slate-400 font-medium leading-relaxed max-w-[280px] mx-auto">
              {language === 'ar' 
                ? 'سجل دخولك للوصول إلى حسابك وإدارة أعمالك العقارية بسهولة' 
                : 'Log in to access your account and manage your real estate business easily'}
            </p>
          </div>
        </div>

        {/* CORE PREMIUM WHITE CARD: MATCHING SHADOWS AND OUTLINE DENSITY */}
        <div className="w-full bg-white border border-slate-150 p-6 rounded-[24px] shadow-[0_12px_40px_-4px_rgba(11,83,199,0.05),0_4px_16px_-2px_rgba(11,83,199,0.01)] relative overflow-hidden animate-scale-in">
          
          {/* LOGIN VIEW */}
          {view === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              
              {errorVisible && (
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100 text-[11px] text-rose-600 font-bold leading-relaxed flex items-start gap-2 animate-slide-down">
                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0 mt-1.5"></span>
                  <span>{errorVisible}</span>
                </div>
              )}

              {/* Email Address / Username Field */}
              <div className="space-y-1 text-right">
                <label className={`text-[11px] font-bold text-slate-500 font-sans block ${isRtl ? 'text-right' : 'text-left'} pr-1`}>
                  {language === 'ar' ? 'البريد الإلكتروني / اسم المستخدم' : 'Email Address / Username'}
                </label>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Mail className="w-4 h-4 text-[#0b53c7]" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-3.5 pl-11 pr-4 bg-[#F8FAFC]/70 border border-slate-200 rounded-[14px] text-[13px] text-slate-900 focus:outline-none focus:border-[#0b53c7] focus:bg-white focus:ring-4 focus:ring-[#0b53c7]/5 transition-all duration-200 text-left font-sans font-medium"
                    placeholder="broker@aqar.luxury"
                    autoCapitalize="none"
                    required
                  />
                </div>
              </div>

              {/* Password Input Block */}
              <div className="space-y-1 text-right">
                <label className={`text-[11px] font-bold text-slate-500 font-sans block ${isRtl ? 'text-right' : 'text-left'} pr-1`}>
                  {language === 'ar' ? 'كلمة المرور' : 'Password'}
                </label>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Lock className="w-4 h-4 text-[#0b53c7]" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-3.5 pl-11 pr-11 bg-[#F8FAFC]/70 border border-slate-200 rounded-[14px] text-[13px] text-slate-900 focus:outline-none focus:border-[#0b53c7] focus:bg-white focus:ring-4 focus:ring-[#0b53c7]/5 transition-all duration-200 text-left font-sans"
                    placeholder="••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-[#0b53c7] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me and Forgot Password actions */}
              <div className={`flex justify-between items-center text-[11px] pt-1 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                <label className={`flex items-center gap-1.5 text-slate-500 font-bold cursor-pointer ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                  <input 
                    type="checkbox" 
                    defaultChecked 
                    className="rounded border-slate-300 text-[#0b53c7] focus:ring-[#0b53c7]/20 w-4 h-4 cursor-pointer"
                  />
                  <span>{language === 'ar' ? 'تذكرني' : 'Remember me'}</span>
                </label>

                <button
                  type="button"
                  onClick={() => setView('forgot')}
                  className="font-bold text-[#0b53c7] hover:underline cursor-pointer"
                >
                  {language === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot Password?'}
                </button>
              </div>

              {/* ROYAL BLUE CTA BUTTON (Matching exactly the mockup's royal blue gradient and proportions) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-[12px] bg-[#0b53c7] hover:bg-[#0946b5] text-white text-[13px] font-black shadow-[0_6px_20px_rgba(11,83,199,0.2)] active:scale-[0.98] duration-200 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
              >
                {isSubmitting ? (
                  <div className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>{language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}</span>
                    <ArrowRight className={`w-4.5 h-4.5 shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
                  </>
                )}
              </button>

              {/* Subtle visual branding helper */}
              <div className="relative flex py-1.5 items-center">
                <div className="flex-grow border-t border-slate-100"></div>
                <span className="flex-shrink mx-3 text-[10px] text-slate-400 font-extrabold tracking-wide uppercase">
                  {language === 'ar' ? 'أو سجل الدخول باستخدام' : 'Or sign in with'}
                </span>
                <div className="flex-grow border-t border-slate-100"></div>
              </div>

              {/* Social Login Buttons row */}
              <div className="grid grid-cols-3 gap-3">
                {/* Google */}
                <button
                  type="button"
                  onClick={() => {
                    setEmail('broker@aqar.luxury');
                    setPassword('aqar2026');
                  }}
                  className="flex items-center justify-center py-2.5 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-[12px] transition-all active:scale-95 cursor-pointer"
                  title="Google Quick Access"
                  id="social-login-google"
                >
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.87-2.6-2.6-4.53-5.29-4.53V14.09z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                  </svg>
                </button>
                {/* Apple */}
                <button
                  type="button"
                  onClick={() => {
                    setEmail('admin@aqar.luxury');
                    setPassword('aqar2026');
                  }}
                  className="flex items-center justify-center py-2.5 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-[12px] transition-all active:scale-95 cursor-pointer"
                  title="Apple Corporate Key Access"
                  id="social-login-apple"
                >
                  <svg className="w-4.5 h-4.5 text-black fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.55 2.95-1.39z"/>
                  </svg>
                </button>
                {/* Microsoft */}
                <button
                  type="button"
                  onClick={() => {
                    setEmail('guest@aqar.luxury');
                    setPassword('aqar2026');
                  }}
                  className="flex items-center justify-center py-2.5 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-[12px] transition-all active:scale-95 cursor-pointer"
                  title="Microsoft Corporate Access"
                  id="social-login-microsoft"
                >
                  <svg className="w-4 h-4" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0" y="0" width="10.5" height="10.5" fill="#f25022" />
                    <rect x="11.5" y="0" width="10.5" height="10.5" fill="#7fba00" />
                    <rect x="0" y="11.5" width="10.5" height="10.5" fill="#00a4ef" />
                    <rect x="11.5" y="11.5" width="10.5" height="10.5" fill="#ffb900" />
                  </svg>
                </button>
              </div>

              {/* DEMO CHEAT HINTS */}
              <div className="pt-2 text-[9.5px] text-slate-400 font-sans text-center bg-[#F4F6FA]/50 p-2 rounded-xl border border-slate-100 leading-normal select-text">
                <span className="font-extrabold text-[#c5a059] block mb-0.5">💡 {language === 'ar' ? 'للتجربة الفورية السريعة:' : 'INSTANT DEMO SUGGESTION:'}</span>
                {language === 'ar' ? (
                  <span>اضغط على أيقونة <strong className="text-[#0b53c7]">Apple</strong> للدخول كمدير، أو <strong className="text-[#0b53c7]">Google</strong> للوسيط.</span>
                ) : (
                  <span>Tap <strong className="text-[#0b53c7]">Apple</strong> icon for Admin Console or <strong className="text-[#0b53c7]">Google</strong> for Broker!</span>
                )}
              </div>

              {/* Create Account Link */}
              <div className="text-center pt-2.5 border-t border-slate-100 text-[11px]">
                <span className="text-slate-400 font-medium">{language === 'ar' ? 'ليس لديك حساب؟ ' : "Don't have an account? "}</span>
                <button
                  type="button"
                  id="switch-view-register"
                  onClick={() => setView('register')}
                  className="font-black text-[#0b53c7] hover:underline cursor-pointer"
                >
                  {language === 'ar' ? 'إنشاء حساب جديد' : 'Create Account'}
                </button>
              </div>

            </form>
          )}

          {/* REGISTER VIEW */}
          {view === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4 animate-fade-in text-right">
              <div className={`flex items-center gap-2 pb-2 border-b border-slate-50 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-[#0b53c7] transition duration-200 cursor-pointer"
                >
                  <ChevronLeft className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                </button>
                <div className="flex-1">
                  <h3 className={`text-xs font-black text-[#092a5e] ${isRtl ? 'text-right' : 'text-left'}`}>
                    {language === 'ar' ? 'طلب حساب شريك جديد' : 'New Partner Registry'}
                  </h3>
                </div>
              </div>

              {errorVisible && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-[11px] text-rose-600 font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0"></span>
                  <span>{errorVisible}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-[11px] text-emerald-600 flex items-start gap-2 animate-slide-up">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                  <span className="font-medium leading-relaxed">{successMsg}</span>
                </div>
              )}

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className={`text-[11px] font-bold text-slate-400 block ${isRtl ? 'text-right' : 'text-left'} pr-0.5`}>{language === 'ar' ? 'الاسم الكامل' : 'Full Name'}</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full py-2.5 px-3 bg-[#F8FAFC] border border-slate-200 rounded-xl focus:outline-none focus:border-[#0b53c7] focus:bg-white text-[12.5px]"
                    placeholder="e.g. Ahmed Al-Mansoori"
                  />
                </div>

                <div className="space-y-1">
                  <label className={`text-[11px] font-bold text-slate-400 block ${isRtl ? 'text-right' : 'text-left'} pr-0.5`}>{language === 'ar' ? 'البريد الإلكتروني للعمل' : 'Corporate Email'}</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-2.5 px-3 bg-[#F8FAFC] border border-slate-200 rounded-xl focus:outline-none focus:border-[#0b53c7] focus:bg-white text-[12.5px] font-mono text-left"
                    placeholder="name@company.com"
                  />
                </div>

                <div className="space-y-1">
                  <label className={`text-[11px] font-bold text-slate-400 block ${isRtl ? 'text-right' : 'text-left'} pr-0.5`}>{language === 'ar' ? 'رقم الجوال' : 'Phone Number'}</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full py-2.5 px-3 bg-[#F8FAFC] border border-slate-200 rounded-xl focus:outline-none focus:border-[#0b53c7] focus:bg-white text-[12.5px] font-mono text-left"
                    placeholder="+966 50 000 0000"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0b53c7] hover:bg-[#1062e5] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-4"
              >
                <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                <span>{language === 'ar' ? 'تقديم طلب الانضمام للنخبة' : 'Request Elite Access'}</span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="text-xs font-bold text-slate-500 hover:text-[#0b53c7] transition duration-200 cursor-pointer"
                >
                  {language === 'ar' ? 'العودة لتسجيل الدخول' : t.backToLogin}
                </button>
              </div>
            </form>
          )}

          {/* FORGOT PASSWORD VIEW */}
          {view === 'forgot' && (
            <form onSubmit={handleForgot} className="space-y-4 animate-fade-in text-right">
              <div className={`flex items-center gap-2 pb-2 border-b border-slate-50 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-[#0b53c7] transition duration-200 cursor-pointer"
                >
                  <ChevronLeft className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                </button>
                <div className="flex-1">
                  <h3 className={`text-xs font-black text-[#092a5e] ${isRtl ? 'text-right' : 'text-left'}`}>
                    {language === 'ar' ? 'استعادة حساب عقار' : 'Corporate Accounts Reset'}
                  </h3>
                </div>
              </div>

              {errorVisible && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-[11px] text-rose-600 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0"></span>
                  <span>{errorVisible}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-[11px] text-emerald-600 flex items-start gap-2 animate-slide-up">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                  <span className="font-medium leading-relaxed">{successMsg}</span>
                </div>
              )}

              <div className="space-y-1">
                <label className={`text-[11px] font-bold text-slate-400 block ${isRtl ? 'text-right' : 'text-left'} pr-0.5`}>{language === 'ar' ? 'أدخل بريدك الإلكتروني المسجل' : 'Enter Registered Email'}</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2.5 px-3 bg-[#F8FAFC] border border-slate-200 rounded-xl focus:outline-none focus:border-[#0b53c7] focus:bg-white text-[12.5px] font-mono text-left"
                  placeholder="broker@aqar.luxury"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0b53c7] hover:bg-[#1062e5] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Key className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'إرسال تعليمات الاستعادة' : 'Dispatch Instructions'}</span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="text-xs font-bold text-slate-500 hover:text-[#0b53c7] transition duration-200 cursor-pointer"
                >
                  {language === 'ar' ? 'العودة لتسجيل الدخول' : t.backToLogin}
                </button>
              </div>
            </form>
          )}

        </div>

        {/* SECURE MARKER CHECK SHIELD MATCHING THE REFERENCE PICTURE ON BOTH ANDROID & IPHONE */}
        <div className="mt-5 text-center">
          <span className="inline-flex items-center gap-1.5 text-[10.5px] font-black tracking-wider text-[#0b53c7] bg-[#0b53c7]/6 px-4 py-2 rounded-full border border-[#0b53c7]/12 shadow-3xs">
            <Shield className="w-3.5 h-3.5 text-[#0b53c7] fill-[#0b53c7]/10" />
            <span>AQAR SECURE CONSOLE V3.5</span>
          </span>
        </div>
      </div>

    </div>
  );
};
