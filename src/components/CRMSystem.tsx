import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { CRMLead, CRMTask } from '../types';
import { 
  Users, Trash2, Search, CheckSquare, 
  Clock, TrendingUp, DollarSign, Calendar, ChevronRight, UserPlus, CheckCircle2 
} from 'lucide-react';

interface CRMSystemProperties {
  leads: CRMLead[];
  tasks: CRMTask[];
  onAddLead: (lead: Omit<CRMLead, 'id' | 'createdAt'>) => void;
  onUpdateLeadStatus: (leadId: string, nextStatus: CRMLead['status']) => void;
  onToggleTask: (taskId: string) => void;
  onDeleteLead: (leadId: string) => void;
}

export const CRMSystem: React.FC<CRMSystemProperties> = ({
  leads,
  tasks,
  onAddLead,
  onUpdateLeadStatus,
  onToggleTask,
  onDeleteLead
}) => {
  const { t, language, isRtl } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<'pipeline' | 'leads' | 'tasks'>('pipeline');
  const [searchWord, setSearchWord] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<CRMLead | null>(null);

  // Form states for adding a new lead
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadBudget, setNewLeadBudget] = useState('3000000');
  const [newLeadProject, setNewLeadProject] = useState('W Residences Riyadh');
  const [newLeadNotes, setNewLeadNotes] = useState('');

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchWord.toLowerCase()) ||
    l.interestProject.toLowerCase().includes(searchWord.toLowerCase()) ||
    l.phone.includes(searchWord)
  );

  const pipelineStages: { key: CRMLead['status']; label: string; color: string; bg: string }[] = [
    { key: 'new', label: language === 'ar' ? 'جديد' : 'New', color: 'text-blue-600 border-blue-100', bg: 'bg-blue-50' },
    { key: 'contacted', label: language === 'ar' ? 'تم التواصل' : 'Contacted', color: 'text-[#0b53c7] border-blue-100', bg: 'bg-blue-50/50' },
    { key: 'negotiation', label: language === 'ar' ? 'تفاوض' : 'Negotiation', color: 'text-indigo-600 border-indigo-100', bg: 'bg-indigo-50' },
    { key: 'reserved', label: language === 'ar' ? 'حجز مسبق' : 'Reserved', color: 'text-emerald-600 border-emerald-100', bg: 'bg-emerald-50' }
  ];

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName || !newLeadPhone) return;

    onAddLead({
      name: newLeadName,
      phone: newLeadPhone,
      email: newLeadEmail || 'client@aqar-investor.luxury',
      source: 'Direct Mobile SaaS App',
      status: 'new',
      interestProject: newLeadProject,
      budget: parseFloat(newLeadBudget) || 1500000,
      notes: newLeadNotes || 'No custom requirements specified yet.'
    });

    // Reset forms
    setNewLeadName('');
    setNewLeadPhone('');
    setNewLeadEmail('');
    setNewLeadBudget('3000000');
    setNewLeadNotes('');
    setShowAddModal(false);
  };

  const getStatusActionLabel = (current: CRMLead['status']): string => {
    switch(current) {
      case 'new': return language === 'ar' ? 'تواصل مع العميل' : 'Promote to Contacted';
      case 'contacted': return language === 'ar' ? 'بدء تفاوض' : 'Begin Negotiation';
      case 'negotiation': return language === 'ar' ? 'انتقال للحجز والقرعة' : 'Book Unit (Reserve)';
      case 'reserved': return language === 'ar' ? 'إغلاق الصفقة بنجاح' : 'Close Won Asset';
      default: return language === 'ar' ? 'مكتملة' : 'Completed';
    }
  };

  const getNextStatusValue = (current: CRMLead['status']): CRMLead['status'] => {
    if (current === 'new') return 'contacted';
    if (current === 'contacted') return 'negotiation';
    if (current === 'negotiation') return 'reserved';
    if (current === 'reserved') return 'closed';
    return 'closed';
  };

  // Stats calculation
  const totalBudgetOpportunity = leads.reduce((sum, lead) => sum + lead.budget, 0);
  const activePipelineCount = leads.filter(l => l.status !== 'closed').length;

  return (
    <div className="flex-1 bg-[#f4f7fe] flex flex-col h-full text-slate-800 relative font-sans">
      
      {/* Visual Header Grid stats */}
      <div className="bg-white p-4 border-b border-slate-100 space-y-3 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-black text-[#092a5e] tracking-tight font-sans">
              {t.crmSystem}
            </h3>
            <p className="text-[10px] text-slate-400 font-mono font-bold tracking-wider">MEMBER WORKSPACE SUITE</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="luxury-btn-primary flex items-center gap-1.5 px-4 py-2 bg-[#0b53c7] hover:bg-[#1062e5] text-white text-xs font-bold shadow-sm transition-all"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'إضافة عميل' : 'New Lead'}</span>
          </button>
        </div>

        {/* Quick KPI stats blocks */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl flex gap-2 items-center shadow-sm">
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{language === 'ar' ? 'حجم محفظة العملاء' : 'Op Volume'}</p>
              <p className="text-xs font-black font-mono text-emerald-600">
                ${(totalBudgetOpportunity / 1000000).toFixed(1)}M
              </p>
            </div>
          </div>
          
          <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl flex gap-2 items-center shadow-sm">
            <div className="p-1.5 rounded-lg bg-blue-50 text-[#0b53c7]">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{language === 'ar' ? 'العملاء المستهدفين' : 'Active Deals'}</p>
              <p className="text-xs font-black font-mono text-[#0b53c7]">
                {activePipelineCount}
              </p>
            </div>
          </div>
        </div>

        {/* Modular Navigation Bar for CRM segments */}
        <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
          <button
            onClick={() => { setActiveSubTab('pipeline'); setSelectedLead(null); }}
            className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-all ${
              activeSubTab === 'pipeline' ? 'bg-white text-[#0b53c7] shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            📊 {language === 'ar' ? 'سلسلة المبيعات' : 'Pipeline'}
          </button>
          <button
            onClick={() => { setActiveSubTab('leads'); setSelectedLead(null); }}
            className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-all ${
              activeSubTab === 'leads' ? 'bg-white text-[#0b53c7] shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            👥 {language === 'ar' ? 'العملاء' : 'Leads'}
          </button>
          <button
            onClick={() => { setActiveSubTab('tasks'); setSelectedLead(null); }}
            className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-all ${
              activeSubTab === 'tasks' ? 'bg-white text-[#0b53c7] shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            📋 {language === 'ar' ? 'المهام' : 'Tasks'}
          </button>
        </div>
      </div>

      {/* Main Container Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {/* Search bar displayed for leads and pipeline views */}
        {activeSubTab !== 'tasks' && (
          <div className="relative">
            <Search className={`absolute inset-y-0 ${isRtl ? 'right-3' : 'left-3'} m-auto w-4 h-4 text-[#0b53c7]`} />
            <input
              type="text"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              className={`luxury-input ${isRtl ? 'pr-10 text-right' : 'pl-10'} placeholder-slate-400`}
              placeholder={language === 'ar' ? 'بحث عن عميل، تفاصيل...' : 'Search by name, project, phone...'}
            />
          </div>
        )}

        {/* PIPELINE VIEW */}
        {activeSubTab === 'pipeline' && (
          <div className="space-y-4">
            {pipelineStages.map((stage) => {
              const stageLeads = filteredLeads.filter(l => l.status === stage.key);
              return (
                <div key={stage.key} className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${stage.color} ${stage.bg} border`}>
                      {stage.label} ({stageLeads.length})
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono font-bold">
                      ${(stageLeads.reduce((s,l) => s + l.budget, 0) / 1000000).toFixed(1)}M Vol
                    </span>
                  </div>

                  {stageLeads.length === 0 ? (
                    <div className="p-4 text-center rounded-2xl bg-white border border-dashed border-slate-200 text-[10px] text-slate-400 italic">
                      {language === 'ar' ? 'لا توجد صفقات هنا حالياً' : 'No opportunities in this stage.'}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {stageLeads.map((lead) => (
                        <div
                          key={lead.id}
                          onClick={() => setSelectedLead(lead)}
                          className="p-3.5 rounded-2xl bg-white border border-slate-100 hover:border-blue-100 transition-all cursor-pointer relative shadow-sm flex justify-between items-start"
                        >
                          <div className="space-y-1">
                            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 flex-wrap">
                              {lead.name}
                              <span className="text-[8px] px-1.5 py-0.2 bg-blue-50 text-[#0b53c7] rounded-full font-mono font-bold border border-blue-100">
                                {lead.source}
                              </span>
                            </h4>
                            <p className="text-[10px] text-slate-500 font-bold">{lead.interestProject}</p>
                            <p className="text-[10px] text-[#0b53c7] font-mono font-bold">Budget: ${lead.budget.toLocaleString()}</p>
                          </div>
                          
                          <div className="flex flex-col items-end justify-between h-full">
                            <ChevronRight className="w-3.5 h-3.5 text-[#0b53c7]" />
                            <span className="text-[9px] text-slate-400 mt-2 font-mono font-bold">
                              {new Date(lead.createdAt).toLocaleDateString([], {month: 'short', day: 'numeric'})}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* LEADS SYSTEM DIRECT LIST CONTAINER */}
        {activeSubTab === 'leads' && (
          <div className="space-y-3">
            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="p-4 rounded-2xl bg-white border border-slate-100 flex flex-col gap-2.5 relative shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{lead.name}</h4>
                    <span className="text-[10px] text-slate-400 font-mono font-bold">{lead.email}</span>
                  </div>
                  <span className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded-full ${
                    lead.status === 'reserved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-50 text-slate-500 border border-slate-150'
                  }`}>
                    {lead.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl text-[10px] border border-slate-100">
                  <div>
                    <span className="text-slate-400 font-mono font-semibold">Property Interest:</span>
                    <p className="text-[#0b53c7] font-bold truncate">{lead.interestProject}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono font-semibold">Budget Cap:</span>
                    <p className="text-slate-700 font-mono font-bold">${lead.budget.toLocaleString()}</p>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 bg-slate-50 p-2.5 rounded-xl italic font-mono leading-relaxed border border-slate-100">
                  {lead.notes}
                </p>

                {/* Lead Context Actions */}
                <div className="flex gap-2 justify-between items-center mt-1 pt-1.5 border-t border-slate-100">
                  <div className="flex gap-2">
                    {/* Promoting pipeline action trigger */}
                    {lead.status !== 'closed' && (
                      <button
                        onClick={() => onUpdateLeadStatus(lead.id, getNextStatusValue(lead.status))}
                        className="px-2.5 py-1 rounded-lg text-[9px] font-black bg-blue-50 text-[#0b53c7] hover:bg-blue-100 transition-colors border border-blue-105 font-mono"
                      >
                        {getStatusActionLabel(lead.status)}
                      </button>
                    )}
                    
                    {/* Simulated Direct WhatsApp Call Client */}
                    <a
                      href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Dear%20${encodeURIComponent(lead.name)},%20this%20is%20AQar%20Private%20Real%20Estate%20Advising.%20Regarding%20your%20interest%20in%20${encodeURIComponent(lead.interestProject)}...`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg text-[9px] font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-105 flex items-center gap-1"
                    >
                      <span>{language === 'ar' ? 'تذكير واتساب' : 'WhatsApp'}</span>
                    </a>
                  </div>

                  <button
                    onClick={() => onDeleteLead(lead.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 active:scale-95 transition-all"
                    title="Delete lead"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TASKS VIEW */}
        {activeSubTab === 'tasks' && (
          <div className="space-y-3">
            <h4 className="text-xs font-black text-slate-700 tracking-wide flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-[#0b53c7]" />
              <span>{language === 'ar' ? 'قائمة مهام الوكيل العقاري اليومية' : "Broker's Daily Action Tasks"}</span>
            </h4>

            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 shadow-sm ${
                    task.completed 
                      ? 'bg-slate-50 border-slate-100 opacity-60' 
                      : 'bg-white border-slate-100 hover:border-blue-150'
                  }`}
                >
                  <button
                    onClick={() => onToggleTask(task.id)}
                    className={`mt-0.5 rounded-md border text-white flex items-center justify-center transition-colors cursor-pointer ${
                      task.completed 
                        ? 'bg-emerald-600 border-emerald-500 text-white w-4.5 h-4.5' 
                        : 'border-slate-300 hover:border-[#0b53c7] w-4.5 h-4.5 bg-slate-50'
                    }`}
                  >
                    {task.completed && <span className="text-[10px] leading-none font-bold">✓</span>}
                  </button>

                  <div className="flex-1 space-y-1">
                    <p className={`text-xs font-medium ${task.completed ? 'line-through text-slate-400 font-normal' : 'text-slate-800'}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 text-[9px] text-slate-400 font-mono font-bold uppercase">
                      <span>Agent: {task.agentName}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5 text-slate-505">
                        <Calendar className="w-2.5 h-2.5 text-[#0b53c7]" /> {task.dueDate}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[8px] font-mono font-black px-2 py-0.5 rounded uppercase ${
                    task.priority === 'high' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-slate-50 text-slate-500 border border-slate-100'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SELECTED LEAD DETAIL BOX (Interactive Overlay for pipeline inspection) */}
      {selectedLead && (
        <div className="absolute inset-x-0 bottom-0 top-[12%] z-50 bg-white border-t border-slate-100 rounded-t-[32px] p-6 shadow-2xl overflow-y-auto space-y-5 animate-slide-up">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <div>
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Lead Pipeline Inspector</span>
              <h3 className="text-base font-black text-slate-850">{selectedLead.name}</h3>
            </div>
            <button 
              onClick={() => setSelectedLead(null)}
              className="px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:text-slate-800 text-xs font-bold font-mono cursor-pointer"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[9px] font-mono text-slate-400 font-bold">Pipeline State:</span>
              <p className="text-xs font-bold text-[#0b53c7] uppercase font-mono">{selectedLead.status}</p>
            </div>
            <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[9px] font-mono text-slate-400 font-bold">Target Budget:</span>
              <p className="text-xs font-bold text-emerald-600 font-mono">${selectedLead.budget.toLocaleString()}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-750 font-sans uppercase tracking-wider text-[11px]">Activity & Broker Timeline</h4>
            <div className="border-l-2 border-blue-100 pl-4 space-y-4 font-mono">
              <div className="relative">
                <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]"></div>
                <div className="text-[10px]">
                  <p className="text-slate-700 font-bold">{language === 'ar' ? 'تم إنشاء العميل آلياً' : 'Lead Automatically Created'}</p>
                  <span className="text-[9px] text-slate-400">Date: {selectedLead.createdAt}</span>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="text-[10px]">
                  <p className="text-slate-700 font-bold">{language === 'ar' ? 'تم تعيين الوكيل العقاري المعتمد' : 'Corporate Account Broker Assigned'}</p>
                  <p className="text-slate-405 leading-relaxed mt-0.5">SaaS routing completed. Connected rep successfully.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            <h4 className="text-xs font-bold text-slate-750 font-sans uppercase tracking-wider text-[11px]">Requirements Notebook</h4>
            <p className="text-xs text-slate-500 bg-slate-50 border border-slate-100 p-3.5 rounded-xl italic leading-relaxed font-sans">
              "{selectedLead.notes}"
            </p>
          </div>

          <div className="pt-2 flex gap-3 font-mono">
            <a
              href={`tel:${selectedLead.phone}`}
              className="flex-1 py-3 text-center bg-slate-100 hover:bg-slate-200 rounded-2xl text-slate-700 font-extrabold text-xs transition duration-150 border border-slate-200"
            >
              📞 Call Representative
            </a>
            <a
              href={`https://wa.me/${selectedLead.phone}?text=Hello`}
              target="_blank"
              rel="noopener"
              className="flex-1 py-3 text-center bg-gradient-to-r from-[#1252d6] to-[#0b53c7] hover:brightness-105 rounded-2xl text-white font-extrabold text-xs shadow-md shadow-blue-500/10"
            >
              💬 WhatsApp Chat
            </a>
          </div>
        </div>
      )}

      {/* ADD LEAD POPUP DIALOG */}
      {showAddModal && (
        <div className="absolute inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form 
            onSubmit={handleCreateLead} 
            className="w-full max-w-sm bg-white border border-slate-100 p-5 rounded-[24px] space-y-4 shadow-2xl animate-scale-in"
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#0b53c7]" />
                <span>{language === 'ar' ? 'تسجيل عميل عقاري جديد' : 'Ingest Premium Lead'}</span>
              </h3>
              <button 
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-xs text-slate-400 hover:text-slate-700 font-mono font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-600">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Lead Formal Name *</label>
                <input
                  type="text"
                  required
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  placeholder="e.g. Prince Faisal Al-Saud"
                  className="luxury-input py-2.5"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">WhatsApp Phone *</label>
                <input
                  type="text"
                  required
                  value={newLeadPhone}
                  onChange={(e) => setNewLeadPhone(e.target.value)}
                  placeholder="+966 5X XXX XXX"
                  className="luxury-input py-2.5 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">Corporate Email</label>
                <input
                  type="email"
                  value={newLeadEmail}
                  onChange={(e) => setNewLeadEmail(e.target.value)}
                  placeholder="corporate@saudiholding.com"
                  className="luxury-input py-2.5 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">Budget (USD/AED)</label>
                  <input
                    type="number"
                    value={newLeadBudget}
                    onChange={(e) => setNewLeadBudget(e.target.value)}
                    className="luxury-input py-2.5 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">Project Target</label>
                  <select
                    value={newLeadProject}
                    onChange={(e) => setNewLeadProject(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-[14px] text-slate-800 text-[13px] font-semibold focus:bg-white focus:outline-none focus:border-[#0b53c7] focus:ring-4 focus:ring-[#0b53c7]/6 transition-all"
                  >
                    <option value="W Residences Riyadh">W Residences Riyadh</option>
                    <option value="Burj Crown Residences">Burj Crown Residences</option>
                    <option value="The Riviera Gold Villas">The Riviera Gold Villas</option>
                    <option value="The Villette Pavilion">The Villette Pavilion</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">Requirements Notes</label>
                <textarea
                  value={newLeadNotes}
                  onChange={(e) => setNewLeadNotes(e.target.value)}
                  rows={2}
                  placeholder="Requests highest residential floor with full panoramic views..."
                  className="w-full px-3 py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-[14px] text-slate-800 text-[12px] focus:bg-white focus:outline-none focus:border-[#0b53c7] focus:ring-4 focus:ring-[#0b53c7]/6 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="luxury-btn-primary w-full py-4 shadow-md mt-4 text-center cursor-pointer"
            >
              PROVISION BUSINESS LEAD
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
