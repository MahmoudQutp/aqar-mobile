import React, { useEffect, useState } from 'react';
import { useLanguage } from './LanguageContext';

export const AQarLogoSVG: React.FC<{ className?: string; size?: number; light?: boolean }> = ({ className = '', size = 80, light = false }) => {
  const primaryColor = light ? '#FFFFFF' : '#0b53c7';
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
    >
      {/* 
        HIGH-FIDELITY MATHEMATICAL REPRODUCTION OF THE DECEIVED BRAIDED EMBLAM 
        AND DESIGNED DIRECTLY TO REPLICATE THE UPLOADED LOGO:
        - Symmetric double ribbons with clean negative spaces showing weaving
        - House shape with duo glass square windows and central doorway
        - White horizontal cutting line
        - Integrated Kufic letter blocks ('ع', 'ق', 'ا', 'ر') sitting in base
      */}
      <g fill={primaryColor}>
        
        {/* UPPER BRAIDED SYSTEM */}
        
        {/* Left Outer Prong */}
        <path d="M 120,60 H 160 V 135 L 256,231 L 285,202 L 189,106 V 60 H 120 Z" />
        
        {/* Right Outer Prong */}
        <path d="M 392,60 H 352 V 135 L 256,231 L 227,202 L 323,106 V 60 H 392 Z" />
        
        {/* Inner Left Ribbon (overlapping the outer right) */}
        <path d="M 190,140 L 256,74 L 322,140 L 293,169 L 256,132 L 219,169 L 190,140 Z" />
        
        {/* Left-to-Right diagonal bridge that goes UNDER the Right-to-Left */}
        <path d="M 160,170 L 210,220 L 195,235 L 145,185 L 160,170 Z" />
        <path d="M 302,312 L 352,362 L 337,377 L 287,327 L 302,312 Z" />
        
        {/* Right-to-Left diagonal bridge (continuous, going OVER) */}
        <path d="M 352,170 L 160,362 L 135,337 L 327,145 L 352,170 Z" />

        {/* HOUSE STRUCTURE (MID SECTION) */}
        
        {/* Triangular Roof slants */}
        <path d="M 256,210 L 368,322 L 340,350 L 256,266 L 172,350 L 144,322 L 256,210 Z" />
        
        {/* House Walls & Columns wrapping down */}
        <rect x="172" y="320" width="32" height="100" />
        <rect x="308" y="320" width="32" height="100" />
        
        {/* Central House Block enclosing the windows */}
        <rect x="220" y="290" width="72" height="130" />
        
        {/* Left Outer Pillar block at mid height */}
        <rect x="120" y="320" width="32" height="100" />
        
        {/* Right Outer Pillar block at mid height */}
        <rect x="360" y="320" width="32" height="100" />

      </g>
      
      {/* House Square Windows (drawn in negative space matching primary background) */}
      <g fill={light ? '#0b53c7' : '#FFFFFF'}>
        <rect x="230" y="315" width="20" height="20" rx="1" />
        <rect x="262" y="315" width="20" height="20" rx="1" />
        <rect x="246" y="360" width="20" height="40" rx="1" />
      </g>

      {/* HORIZONTAL GAP DIVISION (Runs right across the base structure) */}
      {/* 
        This is a horizontal white slicing path that matches the gaps in the bottom 
        of the official reference logo image, giving it the premium corporate look.
      */}
      <rect x="100" y="420" width="312" height="12" fill={light ? '#0b53c7' : '#FFFFFF'} />

      {/* KUFIC CALLIGRAPHY STYLE LETTERS BASE */}
      <g fill={primaryColor}>
        
        {/* 'Ayn 'ع' Shape block on the right */}
        <path d="M 345,432 H 392 V 485 H 330 V 465 H 370 V 452 H 345 Q 345,445 345,432 Z" />
        
        {/* 'Qaf' 'ق' with square loop in the middle-right */}
        <rect x="256" y="432" width="65" height="53" />
        {/* Square loop hole */}
        <rect x="274" y="448" width="28" height="22" fill={light ? '#0b53c7' : '#FFFFFF'} />
        
        {/* 'Alef' 'ا' shape line middle-left */}
        <rect x="220" y="432" width="22" height="53" />
        
        {/* 'Reh' 'ر' shape block left */}
        <path d="M 120,432 H 185 V 455 H 145 V 485 H 120 Z" />
        
      </g>
    </svg>
  );
};

interface SplashScreenProperties {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProperties> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const { language } = useLanguage();

  useEffect(() => {
    const start = Date.now();
    const duration = 2000; // 2 seconds fast-acting luxury splash

    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const calculatedProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(calculatedProgress);

      if (calculatedProgress >= 100) {
        clearInterval(timer);
        setTimeout(onFinish, 200);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="absolute inset-0 z-[100] bg-gradient-to-b from-[#1252d6] to-[#0b53c7] flex flex-col items-center justify-between p-8 overflow-hidden select-none">
      {/* Micro-light glows */}
      <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>

      <div></div> {/* Top spacer */}

      {/* Center branded display */}
      <div className="flex flex-col items-center gap-6 z-10 text-center animate-fade-in">
        {/* Animated Custom Vector Crest */}
        <div className="relative p-4 rounded-3xl bg-white/10 ring-1 ring-white/20 shadow-2xl backdrop-blur-md">
          <AQarLogoSVG size={100} light={true} />
        </div>

        {/* Brand Display Names in Dual Language */}
        <div className="space-y-1 text-white">
          <h2 className="text-3xl font-black tracking-widest font-mono">
            AQar
          </h2>
          <p className="text-[10px] tracking-[0.25em] text-blue-100 font-bold uppercase">
            {language === 'ar' ? 'العقارات الفاخرة والـ CRM' : 'LUXURY REAL ESTATE & CRM'}
          </p>
          <p className="text-xl font-medium text-white/90 mt-2 font-mono">
            عـقـار
          </p>
        </div>
      </div>

      {/* Progressive loading state with localized indicators */}
      <div className="w-full max-w-xs flex flex-col items-center gap-4 z-10">
        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex justify-between w-full text-[10px] text-blue-100 font-mono font-medium">
          <span>{language === 'ar' ? 'جاري تهيئة النظام...' : 'CONNECTING REAL-TIME CRM...'}</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
};
