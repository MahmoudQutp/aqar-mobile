import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { ArrowLeft, ArrowRight, Shield, Award, Briefcase } from 'lucide-react';
import { AQarLogoSVG } from './SplashScreen';

interface OnboardingProperties {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProperties> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t, language, isRtl } = useLanguage();

  const slides = [
    {
      title: t.onboardingTitle1,
      description: t.onboardingDesc1,
      tag: 'PORTFOLIO',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80',
      icon: <Award className="w-8 h-8 text-[#0b53c7]" />
    },
    {
      title: t.onboardingTitle2,
      description: t.onboardingDesc2,
      tag: 'DIRECT ACCESS',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
      icon: <Shield className="w-8 h-8 text-[#0b53c7]" />
    },
    {
      title: t.onboardingTitle3,
      description: t.onboardingDesc3,
      tag: 'CRM INTEGRATION',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80',
      icon: <Briefcase className="w-8 h-8 text-[#0b53c7]" />
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  return (
    <div className="absolute inset-0 bg-[#F4F6FA] flex flex-col justify-between overflow-hidden relative select-none">
      {/* Background Lifestyle Image with custom modern bright gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={slides[currentSlide].image}
          alt="Luxury villa scene"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-60 scale-100 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F4F6FA] via-[#F4F6FA]/85 to-[#F4F6FA]/30"></div>
      </div>

      {/* Top Header Row with Logo and Skip */}
      <div className="pt-6 px-6 flex items-center justify-between z-10 w-full animate-fade-in">
        <div className="flex items-center gap-2">
          <AQarLogoSVG size={36} />
          <span className="font-extrabold text-sm tracking-widest text-[#0b53c7] font-sans">عـقـار</span>
        </div>
        <button
          onClick={onComplete}
          className="text-[10px] font-extrabold tracking-wider text-[#0b53c7] hover:bg-white px-3.5 py-2 rounded-full bg-white/90 border border-[#0b53c7]/20 font-sans uppercase transition-colors shadow-xs active:scale-95 cursor-pointer"
        >
          {t.skip}
        </button>
      </div>

      {/* Center Graphics Frame */}
      <div className="px-6 flex flex-col justify-end flex-1 pb-8 z-10">
        <div className="mb-6 inline-flex p-4 rounded-2xl bg-white border border-[#0b53c7]/8 shadow-sm backdrop-blur-md self-start">
          {slides[currentSlide].icon}
        </div>

        {/* Floating Tag */}
        <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#c5a059] font-mono mb-2 block uppercase">
          {slides[currentSlide].tag}
        </span>

        {/* Dynamic headings with smooth trans effects */}
        <div className="space-y-3 max-w-sm">
          <h1 className="text-2xl font-black tracking-tight text-[#092a5e] leading-tight min-h-[64px] transition-all">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed font-light min-h-[50px]">
            {slides[currentSlide].description}
          </p>
        </div>

        {/* Carousel indicator dots */}
        <div className="flex items-center gap-2 mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === index ? 'w-8 bg-[#0b53c7]' : 'w-2 bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Actions Panel */}
      <div className="p-6 bg-white/95 border-t border-slate-200/50 backdrop-blur-md z-10 flex items-center justify-between">
        {/* Back option */}
        {currentSlide > 0 ? (
          <button
            onClick={handleBack}
            className="p-3.5 rounded-xl text-slate-600 hover:text-[#0b53c7] bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200 active:scale-95 cursor-pointer"
          >
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          </button>
        ) : (
          <div className="w-12 h-12"></div>
        )}

        {/* Confirm Journey Forward button */}
        <button
          onClick={handleNext}
          className="luxury-btn-primary flex items-center gap-2 cursor-pointer shadow-md"
        >
          <span>{currentSlide === slides.length - 1 ? t.getStarted : t.next}</span>
          {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
