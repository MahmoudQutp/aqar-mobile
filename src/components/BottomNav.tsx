import React from 'react';
import { useLanguage } from './LanguageContext';
import { Home, Layers, Users, Heart, Settings } from 'lucide-react';

interface BottomNavProperties {
  activeTab: string;
  onNavigate: (tab: string) => void;
  favoritesCount: number;
}

export const BottomNav: React.FC<BottomNavProperties> = ({
  activeTab,
  onNavigate,
  favoritesCount
}) => {
  const { t, language } = useLanguage();

  const tabs = [
    { key: 'home', label: t.bottomHome, icon: <Home className="w-4 h-4" /> },
    { key: 'projects', label: t.bottomProjects, icon: <Layers className="w-4 h-4" /> },
    { key: 'crm', label: t.bottomCRM, icon: <Users className="w-4 h-4" />, badge: 'Pro' },
    { key: 'favorites', label: t.bottomFavorites, icon: <Heart className="w-4 h-4" />, count: favoritesCount },
    { key: 'admin', label: language === 'ar' ? 'الإدارة' : 'Admin', icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <div className="absolute bottom-0 inset-x-0 bg-white/95 border-t border-slate-200/50 backdrop-blur-md px-2 py-2 flex justify-around items-center z-50 select-none pb-5 shadow-[0_-8px_30px_rgba(11,83,199,0.06)]">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onNavigate(tab.key)}
            className="flex flex-col items-center justify-center py-1.5 flex-1 relative active:scale-95 transition-all group cursor-pointer"
          >
            {/* Visual Indicator Bullet Top (Obsidian / Gold tone) */}
            <div className={`w-3.5 h-0.5 rounded-full bg-[#c5a059] mb-1.5 transition-all duration-300 ${isActive ? 'opacity-100 scale-110' : 'opacity-0 scale-50'}`} />

            {/* Icon panel */}
            <div className={`p-2 rounded-[14px] transition-all duration-300 ${
              isActive 
                ? 'text-[#0b53c7] bg-[#0b53c7]/6 shadow-sm' 
                : 'text-slate-400 group-hover:text-slate-600'
            }`}>
              {React.cloneElement(tab.icon, { className: 'w-4 h-4' })}
            </div>

            {/* Label texts */}
            <span className={`text-[9.5px] font-extrabold tracking-tight mt-1 transition-colors duration-200 ${
              isActive ? 'text-[#0a3582]' : 'text-slate-400'
            }`}>
              {tab.label}
            </span>

            {/* Dynamic visual numeric triggers */}
            {tab.count !== undefined && tab.count > 0 && (
              <span className="absolute top-3.5 right-6 bg-rose-500 text-white text-[8px] font-extrabold w-3.5 h-3.5 flex items-center justify-center rounded-full leading-none scale-100 animate-pulse border border-white">
                {tab.count}
              </span>
            )}

            {/* Business pro context badge indicator */}
            {tab.badge && (
              <span className="absolute top-2.5 right-4.5 bg-gradient-to-r from-[#0b53c7] to-[#1062e5] text-[7px] font-extrabold uppercase text-white px-1.2 py-0.3 rounded-full shadow-2xs tracking-wider font-mono">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
