import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './components/LanguageContext';
import { DeviceFrame } from './components/DeviceFrame';
import { SplashScreen, AQarLogoSVG } from './components/SplashScreen';
import { Onboarding } from './components/Onboarding';
import { AuthScreens } from './components/AuthScreens';
import { HomeDashboard } from './components/HomeDashboard';
import { ProjectDetails } from './components/ProjectDetails';
import { CRMSystem } from './components/CRMSystem';
import { AdminPanel } from './components/AdminPanel';
import { BottomNav } from './components/BottomNav';

import { 
  developers, areas, initialProjects, initialUnits, initialCRMLeads, initialCRMTasks, initialNotifications 
} from './mockData';
import { Project, Unit, CRMLead, CRMTask, NotificationItem } from './types';
import { 
  Bell, CheckCircle2, Phone, LogOut, ArrowRightLeft, Globe, 
  Sparkles, KeyRound, MessageSquare, MapPin 
} from 'lucide-react';

function AQarMainApp() {
  const [splashActive, setSplashActive] = useState(true);
  const [onboardingActive, setOnboardingActive] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'broker' | 'admin' | 'guest'>('broker');
  const [activeTab, setActiveTab] = useState('home');

  // Core Dynamic Database Databases
  const [projectsList, setProjectsList] = useState<Project[]>(initialProjects);
  const [unitsList, setUnitsList] = useState<Unit[]>(initialUnits);
  const [leadsList, setLeadsList] = useState<CRMLead[]>(initialCRMLeads);
  const [tasksList, setTasksList] = useState<CRMTask[]>(initialCRMTasks);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  
  // Custom states
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [favorites, setFavorites] = useState<string[]>(['proj_1', 'proj_2']);
  const [showNotificationsDrawer, setShowNotificationsDrawer] = useState(false);
  
  // Dual-language hook
  const { t, language, toggleLanguage, isRtl } = useLanguage();

  // Handle Favorites toggle
  const handleToggleFavorite = (projectId: string) => {
    setFavorites((prev) => 
      prev.includes(projectId) ? prev.filter(id => id !== projectId) : [...prev, projectId]
    );
  };

  // Handle Admin publishing a new project
  const handleAddProject = (newProject: Omit<Project, 'id' | 'rating' | 'featured'>) => {
    const freshProj: Project = {
      ...newProject,
      id: `proj_${projectsList.length + 1}`,
      rating: 4.8,
      featured: false
    };
    setProjectsList((prev) => [freshProj, ...prev]);

    // Push dynamic alert notification
    const freshNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: '🏗️ New Luxury Project Live',
      titleAr: '🏗️ مشروع فاخر جديد ينطلق',
      message: `Project "${newProject.title}" has been authorized and published to market listing query.`,
      messageAr: `تم اعتماد ونشر مشروع "${newProject.titleAr}" الفاخر ليكون متاحاً للعرض المباشر.`,
      time: 'Just now',
      type: 'system',
      read: false
    };
    setNotifications(prev => [freshNotif, ...prev]);
  };

  // Contact CRM Leads state transitions
  const handleAddLead = (newLead: Omit<CRMLead, 'id' | 'createdAt'>) => {
    const freshLead: CRMLead = {
      ...newLead,
      id: `lead_${leadsList.length + 1}`,
      createdAt: new Date().toISOString()
    };
    setLeadsList((prev) => [freshLead, ...prev]);

    // Push alert notification
    const freshNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: '👤 New Inbound CRM Client',
      titleAr: '👤 عميل عقاري محتمل مسجل',
      message: `Lead ${newLead.name} automatically routed on interest in ${newLead.interestProject}.`,
      messageAr: `تم توجيه عميل جديد ${newLead.name} مهتم بمشروع ${newLead.interestProject} لصفحتك.`,
      time: 'Just now',
      type: 'lead',
      read: false
    };
    setNotifications(prev => [freshNotif, ...prev]);
  };

  const handleUpdateLeadStatus = (leadId: string, nextStatus: CRMLead['status']) => {
    setLeadsList((prev) => 
      prev.map(l => l.id === leadId ? { ...l, status: nextStatus } : l)
    );
  };

  const handleDeleteLead = (leadId: string) => {
    setLeadsList(prev => prev.filter(l => l.id !== leadId));
  };

  const handleToggleTask = (taskId: string) => {
    setTasksList(prev => 
      prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
    );
  };

  // Interactive comparisons logic
  const favoriteProjects = projectsList.filter(p => favorites.includes(p.id));

  return (
    <DeviceFrame activeTab={activeTab} onNavigate={setActiveTab} isLoggedIn={isLoggedIn}>
      {/* 1. Launching Splash Stage */}
      {splashActive && <SplashScreen onFinish={() => setSplashActive(false)} />}

      {/* 2. Interactive Onboarding slides */}
      {!splashActive && onboardingActive && (
        <Onboarding onComplete={() => setOnboardingActive(false)} />
      )}

      {/* 3. Secure Partner Credentials Gate */}
      {!splashActive && !onboardingActive && !isLoggedIn && (
        <AuthScreens onSuccess={(role) => {
          setUserRole(role);
          setIsLoggedIn(true);
        }} />
      )}

      {/* 4. Active Authenticated Native Mobile Application Frame */}
      {!splashActive && !onboardingActive && isLoggedIn && (
        <div className="absolute inset-0 bg-[#f4f7fe] flex flex-col justify-between overflow-hidden">
          
          {/* TOP APP FLOATING COCKPIT BAR */}
          <div className="bg-white px-5 py-3.5 border-b border-slate-100 flex justify-between items-center z-30 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 shadow-3xs p-1">
                <AQarLogoSVG size={22} />
              </div>
              <div>
                <h3 className="text-xs font-black tracking-widest text-[#092a5e] leading-none font-sans">عـقـار</h3>
                <span className="text-[8px] text-slate-400 font-sans font-extrabold block mt-0.5">AQAR • GLOBAL NETWORK</span>
              </div>
            </div>

            {/* Micro Controls: Notifications dynamic alert bell & Logout session icon */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowNotificationsDrawer(prev => !prev)}
                className="relative p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-[#0b53c7] border border-slate-150 transition-colors cursor-pointer"
                title="SaaS Push Notifications"
              >
                <Bell className="w-4 h-4 text-slate-605" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                )}
              </button>

              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setOnboardingActive(true);
                }}
                className="p-2 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-550 hover:text-rose-600 border border-slate-150 transition-colors cursor-pointer"
                title="Reset Workspace session"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* MAIN CONTAINER CONTROLLING ACTIVE MULTI-TAB DISPLAY VIEWS */}
          <div className="flex-1 overflow-hidden relative flex flex-col bg-[#f4f7fe]">
            
            {/* HOME VIEWPORT FEED */}
            {activeTab === 'home' && (
              <HomeDashboard
                projects={projectsList}
                units={unitsList}
                developers={developers}
                areas={areas}
                favorites={favorites}
                onSelectProject={(p) => setSelectedProject(p)}
                onToggleFavorite={handleToggleFavorite}
                activeTab={activeTab}
                onNavigate={(tab) => {
                  setActiveTab(tab);
                  setShowNotificationsDrawer(false);
                }}
              />
            )}

            {/* PROJECTS MULTI-GRID MAP CONSOLE */}
            {activeTab === 'projects' && (
              <div className="flex-1 bg-[#f4f7fe] overflow-y-auto pb-24 text-slate-800 select-none scrollbar-none">
                <div className="p-4 bg-white border-b border-slate-100 flex justify-between items-center shadow-sm">
                  <div>
                    <h3 className="text-xs font-black tracking-wider uppercase text-[#092a5e] font-sans">
                      {t.bottomProjects}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Dubai & Riyadh Premium Assets</p>
                  </div>
                  <span className="text-[9px] bg-blue-50 text-[#0b53c7] px-2.5 py-1 rounded-full font-mono font-bold border border-blue-100">
                    {projectsList.length} Units Available
                  </span>
                </div>

                <div className="p-4 space-y-4">
                  {projectsList.map((project) => {
                    const isFav = favorites.includes(project.id);
                    return (
                      <div
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className="p-3 bg-white border border-slate-100 hover:border-blue-100 rounded-2xl flex gap-3 cursor-pointer transition-all shadow-sm"
                      >
                        <img src={project.images[0]} alt={project.title} className="w-24 h-24 rounded-xl object-cover bg-slate-100 shrink-0" />
                        <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                          <div>
                            <span className="text-[8px] text-[#0b53c7] font-black uppercase font-sans tracking-wide">{project.category}</span>
                            <h4 className="text-xs font-bold text-slate-800 truncate">
                              {language === 'ar' ? project.titleAr : project.title}
                            </h4>
                            <p className="text-[10px] text-slate-405 flex items-center gap-0.5 mt-0.5 font-sans font-semibold">
                              <MapPin className="w-2.5 h-2.5 text-[#0b53c7]" />
                              <span className="truncate">{language === 'ar' ? project.areaNameAr : project.areaName}</span>
                            </p>
                          </div>

                          <div className="flex justify-between items-center text-[10px] mt-1.5 pt-1.5 border-t border-slate-100">
                            <div>
                              <span className="text-[8px] text-slate-400 block font-bold font-mono">Est: {project.deliveryDate}</span>
                            </div>
                            <span className="text-sm font-black text-[#0b53c7] font-mono">
                              ${project.priceStart.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CRM BROKERS PIPELINE PANEL */}
            {activeTab === 'crm' && (
              <CRMSystem
                leads={leadsList}
                tasks={tasksList}
                onAddLead={handleAddLead}
                onUpdateLeadStatus={handleUpdateLeadStatus}
                onToggleTask={handleToggleTask}
                onDeleteLead={handleDeleteLead}
              />
            )}

            {/* FAVORITES & COMPARATIVE SLIDER SCREEN */}
            {activeTab === 'favorites' && (
              <div className="flex-1 bg-[#f4f7fe] overflow-y-auto pb-24 text-slate-800 select-none scrollbar-none">
                <div className="p-4 bg-white border-b border-slate-100 flex justify-between items-center shadow-sm">
                  <div>
                    <h3 className="text-xs font-black tracking-wider uppercase text-[#092a5e] font-sans">
                      {language === 'ar' ? 'عقاراتك المفضلة للمقارنة' : 'Saved Portfolios & Comparison'}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Bespoke selection tracking and ROI metrics</p>
                  </div>
                </div>

                {favoriteProjects.length === 0 ? (
                  <div className="p-10 text-center space-y-4">
                    <p className="text-xs text-slate-400 italic">No properties saved to favorites.</p>
                    <button
                      onClick={() => setActiveTab('home')}
                      className="px-5 py-2.5 bg-gradient-to-r from-[#1252d6] to-[#0b53c7] text-white font-black text-xs rounded-xl shadow-md cursor-pointer"
                    >
                      Browse Signature Homes
                    </button>
                  </div>
                ) : (
                  <div className="p-4 space-y-5">
                    {/* Comparative Spec table matrix */}
                    <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-3 shadow-sm">
                      <h4 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                        <ArrowRightLeft className="w-4 h-4 text-[#0b53c7]" />
                        <span>Interactive Portfolio Comparison Matrix</span>
                      </h4>
                      
                      <div className="space-y-2 text-[10px] text-slate-500 font-mono font-bold">
                        <div className="flex justify-between border-b border-slate-150 pb-1">
                          <span>Properties Count:</span>
                          <span className="text-[#092a5e] font-bold">{favoriteProjects.length} Custom Homes</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-150 pb-1">
                          <span>Collective Net Capital:</span>
                          <span className="text-emerald-700 font-bold">
                            ${favoriteProjects.reduce((sum, p) => sum + p.priceStart, 0).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between pb-1">
                          <span>Average Downpayment:</span>
                          <span className="text-[#092a5e]">
                            {(favoriteProjects.reduce((sum, p) => sum + p.paymentPlan.downPayment, 0) / favoriteProjects.length).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Favorites list */}
                    <div className="space-y-3">
                      {favoriteProjects.map((project) => (
                        <div
                          key={project.id}
                          className="p-3.5 bg-white rounded-2xl border border-slate-100 flex justify-between items-center shadow-sm"
                        >
                          <div className="flex gap-2.5 items-center min-w-0">
                            <img src={project.images[0]} alt={project.title} className="w-12 h-12 rounded-lg object-cover" />
                            <div className="min-w-0">
                              <h5 
                                onClick={() => setSelectedProject(project)}
                                className="text-xs font-bold text-slate-800 hover:text-[#0b53c7] cursor-pointer truncate"
                              >
                                {language === 'ar' ? project.titleAr : project.title}
                              </h5>
                              <p className="text-[10px] text-[#0b53c7] font-mono font-bold">${project.priceStart.toLocaleString()}</p>
                            </div>
                          </div>

                          <button
                            onClick={() => handleToggleFavorite(project.id)}
                            className="bg-rose-50 text-rose-600 p-2 rounded-xl border border-rose-100 hover:bg-rose-100 cursor-pointer active:scale-95 transition-all text-xs font-bold font-mono"
                            title="Remove favorite"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SYSTEM ADMIN & DEVELOPMENT CONFIG PANEL */}
            {activeTab === 'admin' && (
              <AdminPanel
                projects={projectsList}
                developers={developers}
                onAddProject={handleAddProject}
              />
            )}

            {/* FULL DETAILED SHEET OVERLAY */}
            {selectedProject && (
              <ProjectDetails
                project={selectedProject}
                developer={developers.find(d => d.id === selectedProject.developerId)}
                units={unitsList.filter(u => u.projectId === selectedProject.id)}
                relatedProjects={projectsList.filter(p => p.id !== selectedProject.id).slice(0, 3)}
                isFavorited={favorites.includes(selectedProject.id)}
                onClose={() => setSelectedProject(null)}
                onToggleFavorite={() => handleToggleFavorite(selectedProject.id)}
                onSelectProject={(p) => setSelectedProject(p)}
              />
            )}

          </div>

          {/* SYSTEM GLOBAL PUSH NOTIFICATIONS DRAWER OVERLAY */}
          {showNotificationsDrawer && (
            <div className="absolute inset-x-0 top-[52px] max-h-[75%] z-50 bg-white border-b border-slate-150 rounded-b-3xl p-4 shadow-2xl flex flex-col space-y-3 overflow-y-auto animate-slide-down">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <h4 className="text-xs font-black tracking-normal text-[#092a5e] uppercase">
                  🔔 Enterprise Alerts Stream ({notifications.length})
                </h4>
                <button
                  onClick={() => setNotifications(prev => prev.map(n => ({...n, read: true})))}
                  className="text-[9px] text-[#0b53c7] hover:underline font-bold uppercase cursor-pointer"
                >
                  Mark all read
                </button>
              </div>

              <div className="space-y-2">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 rounded-xl border text-[11px] space-y-1 ${
                      notif.read ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-blue-50/50 border-blue-105'
                    }`}
                  >
                    <div className="flex justify-between items-center text-slate-800 font-bold">
                      <span>{language === 'ar' ? notif.titleAr : notif.title}</span>
                      <span className="text-[9px] text-slate-400 font-mono font-bold">{notif.time}</span>
                    </div>
                    <p className="text-slate-500 font-mono text-[10px] leading-relaxed">
                      {language === 'ar' ? notif.messageAr : notif.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FLOATING DIRECT GLOBAL WHATSAPP CTA WIDGET */}
          <div className="absolute bottom-[80px] right-[16px] z-45">
            <a
              href="https://wa.me/971501234567?text=Hi%20AQar%20Support!%20Interested%20in%20obtaining%20exclusive%20Saudi%20%2F%20Dubai%20listings%20brochures."
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 hover:shadow-emerald-500/20 active:scale-95 transition-all text-white flex items-center justify-center shadow-lg border border-emerald-400/20 cursor-pointer animate-bounce"
              title="Official WhatsApp Client Direct Line"
            >
              <MessageSquare className="w-5 h-5 fill-current text-white" />
            </a>
          </div>

          {/* BOTTOM NAVIGATION FOOTER TAB-BAR */}
          <BottomNav
            activeTab={activeTab}
            onNavigate={(tab) => {
              setActiveTab(tab);
              setShowNotificationsDrawer(false);
            }}
            favoritesCount={favorites.length}
          />
        </div>
      )}
    </DeviceFrame>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AQarMainApp />
    </LanguageProvider>
  );
}
