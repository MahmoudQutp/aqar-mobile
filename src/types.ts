export type Language = 'en' | 'ar';

export interface TranslationSet {
  searchPlaceholder: string;
  discoverProperties: string;
  luxuryLiving: string;
  dubaiEgyptStyle: string;
  exploreByArea: string;
  featuredProjects: string;
  featuredUnits: string;
  topDevelopers: string;
  statsSection: string;
  totalProjects: string;
  activeLeads: string;
  soldUnits: string;
  roiGuarantee: string;
  getInTouch: string;
  whatsappChat: string;
  callAgent: string;
  all: string;
  villas: string;
  apartments: string;
  penthouses: string;
  commercial: string;
  duplexes: string;
  crmSystem: string;
  kanbanPipeline: string;
  dashboard: string;
  leads: string;
  tasks: string;
  reminders: string;
  adminPanel: string;
  addUnit: string;
  addProject: string;
  languageSelect: string;
  onboardingTitle1: string;
  onboardingDesc1: string;
  onboardingTitle2: string;
  onboardingDesc2: string;
  onboardingTitle3: string;
  onboardingDesc3: string;
  getStarted: string;
  next: string;
  skip: string;
  loginTitle: string;
  loginSub: string;
  emailLabel: string;
  passwordLabel: string;
  loginBtn: string;
  registerBtn: string;
  forgotPasswordLink: string;
  noAccount: string;
  hasAccount: string;
  phoneLabel: string;
  fullNameLabel: string;
  backToLogin: string;
  recoverBtn: string;
  bottomHome: string;
  bottomProjects: string;
  bottomCRM: string;
  bottomFavorites: string;
  bottomProfile: string;
  projectDetails: string;
  paymentPlan: string;
  amenities: string;
  floorplans: string;
}

export interface Developer {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  descriptionAr: string;
  estYear: number;
  projectsCount: number;
  rating: number;
}

export interface Area {
  id: string;
  name: string;
  nameAr: string;
  city: string;
  cityAr: string;
  image: string;
  averagePriceSqft: string;
  activeProperties: number;
}

export interface Project {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  developerId: string;
  developerName: string;
  areaId: string;
  areaName: string;
  areaNameAr: string;
  priceStart: number;
  currency: string;
  images: string[];
  videoUrl?: string;
  deliveryDate: string;
  deliveryDateAr: string;
  paymentPlan: {
    downPayment: number;
    years: number;
    monthlyInstallment: string;
    monthlyInstallmentAr: string;
  };
  amenities: string[];
  amenitiesAr: string[];
  coordinates: { lat: number; lng: number };
  rating: number;
  featured: boolean;
  category: 'Villa' | 'Apartment' | 'Penthouse' | 'Duplex' | 'Commercial';
}

export interface Unit {
  id: string;
  projectId: string;
  projectName: string;
  projectNameAr: string;
  price: number;
  beds: number;
  baths: number;
  areaSqft: number;
  type: 'Villa' | 'Apartment' | 'Penthouse' | 'Duplex' | 'Office' | 'Commercial';
  image: string;
  agentPhone: string;
  agentWhatsApp: string;
  features: string[];
  featuresAr: string[];
  floorplanSvg: string;
}

export interface CRMLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  status: 'new' | 'contacted' | 'negotiation' | 'reserved' | 'closed';
  interestProject: string;
  budget: number;
  notes: string;
  createdAt: string;
}

export interface CRMTask {
  id: string;
  title: string;
  agentName: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  titleAr: string;
  message: string;
  messageAr: string;
  time: string;
  type: 'lead' | 'system' | 'whatsapp' | 'reminder';
  read: boolean;
}
