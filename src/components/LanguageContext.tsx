import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TranslationSet } from '../types';
import { translations } from '../mockData';

interface LanguageContextProperties {
  language: Language;
  toggleLanguage: () => void;
  t: TranslationSet;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextProperties | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = translations[language];
  const isRtl = language === 'ar';

  useEffect(() => {
    // Set html lang and dir attributes for the document frame
    document.documentElement.lang = language;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [language, isRtl]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, isRtl }}>
      <div style={{ direction: isRtl ? 'rtl' : 'ltr' }} className={isRtl ? 'font-sans' : 'font-sans text-left'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
