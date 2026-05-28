import { Project, Unit, Developer, Area, CRMLead, CRMTask, NotificationItem, TranslationSet } from './types';

export const translations: Record<'en' | 'ar', TranslationSet> = {
  en: {
    searchPlaceholder: 'Search projects, luxury villas, areas...',
    discoverProperties: 'Discover Prime Properties',
    luxuryLiving: 'Luxury Reimagined',
    dubaiEgyptStyle: 'Premium Developments in KSA, UAE & Egypt',
    exploreByArea: 'Explore Elite Areas',
    featuredProjects: 'Signature Projects',
    featuredUnits: 'Exclusive Handpicked Units',
    topDevelopers: 'Renowned Master Developers',
    statsSection: 'Market Pulse & Volume',
    totalProjects: 'Exclusive Projects',
    activeLeads: 'Registered CRM Leads',
    soldUnits: 'Succesfully Handled Units',
    roiGuarantee: 'Average Asset Yield',
    getInTouch: 'Consult Specialist',
    whatsappChat: 'Inquire on WhatsApp',
    callAgent: 'Call Developer Representative',
    all: 'All Properties',
    villas: 'Villas',
    apartments: 'Apartments',
    penthouses: 'Penthouses',
    commercial: 'Commercial',
    duplexes: 'Duplexes',
    crmSystem: 'Internal CRM Engine',
    kanbanPipeline: 'Deal Pipeline Tasks',
    dashboard: 'Executive Board',
    leads: 'Assigned Leads',
    tasks: 'Daily Reminders',
    reminders: 'System Updates',
    adminPanel: 'Manager Console',
    addUnit: 'Create New Listing',
    addProject: 'Publish Project',
    languageSelect: 'العربية',
    onboardingTitle1: 'A Legacy of Elegance',
    onboardingDesc1: 'Unlock curated listings in exclusive neighborhoods across Dubai, Riyadh, and North Coast.',
    onboardingTitle2: 'Direct Developer Entry',
    onboardingDesc2: 'Get instant unit assignments, real investment yields, and secure first-line price updates.',
    onboardingTitle3: 'Enterprise Mobile CRM',
    onboardingDesc3: 'Empower properties agents and brokers with real-time sales pipeline management.',
    getStarted: 'Embark Journey',
    next: 'Next',
    skip: 'Skip',
    loginTitle: 'Welcome back to AQar',
    loginSub: 'Sign in to access your luxury portfolio and business CRM',
    emailLabel: 'Business Email / Username',
    passwordLabel: 'Secure Password',
    loginBtn: 'Sign In',
    registerBtn: 'Request Partner Access',
    forgotPasswordLink: 'Reset Password Credentials',
    noAccount: "Don't have a secure workspace?",
    hasAccount: 'Already recognized by AQar?',
    phoneLabel: 'WhatsApp Registered Number',
    fullNameLabel: 'Formal Registry Name',
    backToLogin: 'Back to Registry Access',
    recoverBtn: 'Issue Recovery Token',
    bottomHome: 'Home',
    bottomProjects: 'Developments',
    bottomCRM: 'CRM Lead',
    bottomFavorites: 'Favorites',
    bottomProfile: 'Executive',
    projectDetails: 'Investment Profile',
    paymentPlan: 'Flexible Installment Frame',
    amenities: 'Elite Private Conveniences',
    floorplans: 'Spatial Blueprints'
  },
  ar: {
    searchPlaceholder: 'ابحث عن مشاريع، فيلات فاخرة، مناطق...',
    discoverProperties: 'اكتشف العقارات الفاخرة',
    luxuryLiving: 'الفخامة بمفهوم جديد',
    dubaiEgyptStyle: 'تطوير عقاري متميز في السعودية، الإمارات ومصر',
    exploreByArea: 'استكشف أرقى المناطق',
    featuredProjects: 'المشاريع الاستثنائية',
    featuredUnits: 'وحدات حصرية مختارة',
    topDevelopers: 'كبار المطورين العقاريين',
    statsSection: 'نبض السوق العقاري',
    totalProjects: 'مشاريع حصرية بريميوم',
    activeLeads: 'العملاء المحتملون النشطون',
    soldUnits: 'وحدات مبيعة ومسجلة',
    roiGuarantee: 'متوسط العائد الاستثماري',
    getInTouch: 'تواصل مع مستشار',
    whatsappChat: 'استفسار عبر الواتساب',
    callAgent: 'اتصال بوكيل المطور',
    all: 'الكل',
    villas: 'فيلات',
    apartments: 'شقق',
    penthouses: 'بنتهاوس',
    commercial: 'تجاري',
    duplexes: 'دوبلكس',
    crmSystem: 'محرك CRM الداخلي',
    kanbanPipeline: 'خط سير مبيعات عقار',
    dashboard: 'لوحة التحكم القيادية',
    leads: 'العملاء المستهدفين',
    tasks: 'المهام اليومية والنشطة',
    reminders: 'التنبيهات المباشرة',
    adminPanel: 'منصة الإدارة العليا',
    addUnit: 'إضافة وحدة عقارية',
    addProject: 'نشر مشروع جديد',
    languageSelect: 'English',
    onboardingTitle1: 'إرث من الفخامة',
    onboardingDesc1: 'تصفح باقة مختارة بعناية من أفخم الخيارات في دبي، الرياض، والساحل الشمالي.',
    onboardingTitle2: 'مباشر من المطور',
    onboardingDesc2: 'احصل على حجز فوري للمستندات والأسعار مباشرة من خطوط الإطلاق الأولى.',
    onboardingTitle3: 'نظام CRM محترف للموبايل',
    onboardingDesc3: 'قم بتمكين فريق مبيعات شركتك وتتبع تدفق إغلاق الصفقات العقارية بذكاء.',
    getStarted: 'ابدأ الرحلة',
    next: 'التالي',
    skip: 'تخطي',
    loginTitle: 'مرحبًا بك في عقار',
    loginSub: 'قم بتسجيل الدخول للوصول لمحفظتك العقارية ونظام إدارة المبيعات',
    emailLabel: 'البريد الإلكتروني للعمل',
    passwordLabel: 'كلمة المرور الآمنة',
    loginBtn: 'تسجيل الدخول',
    registerBtn: 'طلب انضمام كشريك المطور',
    forgotPasswordLink: 'إعادة تعيين كلمة المرور',
    noAccount: 'ليس لديك مساحة عمل آمنة؟',
    hasAccount: 'هل أنت مسجل بالفعل لدينا؟',
    phoneLabel: 'رقم هاتف الواتساب المسجل',
    fullNameLabel: 'الاسم الكامل بالخطاب الرسمي',
    backToLogin: 'العودة لتسجيل الدخول',
    recoverBtn: 'إرسال رمز الاستعادة الآمن',
    bottomHome: 'الرئيسية',
    bottomProjects: 'المشاريع',
    bottomCRM: 'العملاء',
    bottomFavorites: 'المفضلة',
    bottomProfile: 'الملف',
    projectDetails: 'الملف العقاري',
    paymentPlan: 'هيكل السداد والأقساط المرنة',
    amenities: 'مرافق وخدمات النخبة',
    floorplans: 'المخططات الهندسية والمساحة'
  }
};

export const developers: Developer[] = [
  {
    id: 'dev_1',
    name: 'Emaar Properties',
    logoUrl: '🏆',
    description: 'Pioneering global luxury lifestyles with high-class master communities, including Burj Khalifa and Downtown Dubai.',
    descriptionAr: 'رائد اللين المميّز للمجتمعات الراقية عالمياً، المطور لبرج خليفة ووسط مدينة دبي الراقي.',
    estYear: 1997,
    projectsCount: 42,
    rating: 4.9
  },
  {
    id: 'dev_2',
    name: 'Talaat Moustafa Group (TMG)',
    logoUrl: '🎖️',
    description: 'Egypt\'s elite master community developer, famous for creating Madinaty, Celia, and luxury hotels.',
    descriptionAr: 'المطور الأبرز للمجتمعات العمرانية المتكاملة بمصر، الشهير بمدينة مدينتي وسيليا الفاخرة.',
    estYear: 1970,
    projectsCount: 28,
    rating: 4.8
  },
  {
    id: 'dev_3',
    name: 'Dar Al Arkan',
    logoUrl: '⭐️',
    description: 'The luxury real estate crown based in Riyadh, KSA, presenting premium co-branded designer residences with Missoni & pagani.',
    descriptionAr: 'تاج التطوير العقاري الفاخر ومقره الرياض، يقدم أفخم الإقامات بالشراكة مع ميسوني وباغاني.',
    estYear: 1994,
    projectsCount: 31,
    rating: 4.7
  },
  {
    id: 'dev_4',
    name: 'SODIC Properties',
    logoUrl: '🌟',
    description: 'Award-winning developer with premium mixed-use urban spaces in East and West Cairo.',
    descriptionAr: 'أبرز مطوري غرب وشرق القاهرة الحائزين على جوائز بالمجتمعات السكنية الراقية.',
    estYear: 1996,
    projectsCount: 19,
    rating: 4.8
  }
];

export const areas: Area[] = [
  {
    id: 'area_1',
    name: 'Downtown Dubai, UAE',
    nameAr: 'وسط مدينة دبي، الإمارات',
    city: 'Dubai',
    cityAr: 'دبي',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop&q=80',
    averagePriceSqft: '$1,200',
    activeProperties: 1240
  },
  {
    id: 'area_2',
    name: 'Marassi, North Coast',
    nameAr: 'مراسي، الساحل الشمالي',
    city: 'Egypt Coast',
    cityAr: 'الساحل الشمالي، مصر',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
    averagePriceSqft: '$450',
    activeProperties: 350
  },
  {
    id: 'area_3',
    name: 'Al-Malqa, Riyadh',
    nameAr: 'حي الملقا، الرياض',
    city: 'Riyadh',
    cityAr: 'الرياض',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&auto=format&fit=crop&q=80',
    averagePriceSqft: '$650',
    activeProperties: 480
  },
  {
    id: 'area_4',
    name: 'New Cairo, Egypt',
    nameAr: 'القاهرة الجديدة، مصر',
    city: 'Cairo',
    cityAr: 'القاهرة',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
    averagePriceSqft: '$300',
    activeProperties: 820
  }
];

export const initialProjects: Project[] = [
  {
    id: 'proj_1',
    title: 'Burj Crown Residences',
    titleAr: 'برج كراون ريزيدنسز',
    description: 'An elite residential high-rise standing next to Burj Khalifa, offering luxury apartments with direct views of the Dubai Opera and fountains.',
    descriptionAr: 'برج شاهق فاخر يقع بجانب برج خليفة، يوفر شققاً راقية بإطلالات مباشرة ومتميزة على أوبرا دبي ونافورات المدينة.',
    developerId: 'dev_1',
    developerName: 'Emaar Properties',
    areaId: 'area_1',
    areaName: 'Downtown Dubai, UAE',
    areaNameAr: 'وسط مدينة دبي، الإمارات',
    priceStart: 1850000,
    currency: 'AED',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-downtown-city-scenic-view-at-night-42289-large.mp4',
    deliveryDate: 'Q4 2026',
    deliveryDateAr: 'الربع الرابع ٢٠٢٦',
    paymentPlan: {
      downPayment: 10,
      years: 5,
      monthlyInstallment: '15,400 AED',
      monthlyInstallmentAr: '١٥,٤٠٠ درهم إماراتي'
    },
    amenities: ['Private Infinity Pool', 'State-of-the-art Gym', 'Exclusive Rooftop Garden', 'Concierge Elite Service', 'Direct Opera Access'],
    amenitiesAr: ['مسبح إنفينيتي خاص', 'صالة رياضية متكاملة', 'حديقة حصرية على السطح', 'خدمة كونسيرج متميزة', 'وصول مباشر للأوبرا'],
    coordinates: { lat: 25.1972, lng: 55.2744 },
    rating: 4.9,
    featured: true,
    category: 'Apartment'
  },
  {
    id: 'proj_2',
    title: 'The Riviera Gold Villas',
    titleAr: 'فيلات الريفيرا الذهبية',
    description: 'Breathtaking modern architectural marvel located within Marassi Riviera, offering sandy beachfront access and infinity lagoons.',
    descriptionAr: 'تحفة هندسية مذهلة تقع في قلب ريفيرا مراسي بالساحل الشمالي، تتميز بوصول مباشر للشاطئ وبحيرات مائية كريستالية لا متناهية.',
    developerId: 'dev_2',
    developerName: 'Talaat Moustafa Group (TMG)',
    areaId: 'area_2',
    areaName: 'Marassi, North Coast',
    areaNameAr: 'مراسي، الساحل الشمالي',
    priceStart: 24000000,
    currency: 'EGP',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-luxury-resort-or-hotel-poolside-42352-large.mp4',
    deliveryDate: 'Ready to Move',
    deliveryDateAr: 'جاهز للاستلام الفوري',
    paymentPlan: {
      downPayment: 5,
      years: 7,
      monthlyInstallment: '220,000 EGP',
      monthlyInstallmentAr: '٢٢٠,٠٠٠ جنيه مصري'
    },
    amenities: ['Private Sandy Private Beach', 'Integrated Yacht Port', 'World-Class Spa', 'Signature Golf Courts', '24/7 Premium Security Grid'],
    amenitiesAr: ['شاطئ رملي خاص', 'مرسى متكامل لليخوت', 'نادي صحي عالمي', 'ملاعب غولف دولية', 'شبكة حراسة ذكية ٢٤ ساعة'],
    coordinates: { lat: 30.9855, lng: 28.9664 },
    rating: 4.8,
    featured: true,
    category: 'Villa'
  },
  {
    id: 'proj_3',
    title: 'W Residences Riyadh',
    titleAr: 'دبليو ريزيدنسز الرياض',
    description: 'Bold custom designer penthouses and flats matching the high life of Al-Malqa, integrated with intelligent automated home hubs.',
    descriptionAr: 'شقق وبنتهاوس مصممة بأحدث صيحات التصميم العصري في حي الملقا الفاخر، مزودة بأنظمة التكنولوجيا المنزلية الذكية المتكاملة.',
    developerId: 'dev_3',
    developerName: 'Dar Al Arkan',
    areaId: 'area_3',
    areaName: 'Al-Malqa, Riyadh',
    areaNameAr: 'حي الملقا، الرياض',
    priceStart: 4200000,
    currency: 'SAR',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop&q=80'
    ],
    deliveryDate: 'Q2 2027',
    deliveryDateAr: 'الربع الثاني ٢٠٢٧',
    paymentPlan: {
      downPayment: 15,
      years: 4,
      monthlyInstallment: '45,000 SAR',
      monthlyInstallmentAr: '٤٥,٠٠٠ ريال سعودي'
    },
    amenities: ['Smart Home Automation', 'Olympic Indoor Lounge', 'Premium Cigar Lounge', 'Automated Valet Parking', 'Luxury Concierge Service'],
    amenitiesAr: ['نظام ذكي متكامل للمنزل', 'مسبح أوليمبي مغطى', 'صالون فاخر هادئ', 'خدمة ركن السيارات الآلية', 'خدمة رعاية الغرف المميّزة'],
    coordinates: { lat: 24.8115, lng: 46.6111 },
    rating: 4.7,
    featured: false,
    category: 'Penthouse'
  },
  {
    id: 'proj_4',
    title: 'The Villette Pavilion',
    titleAr: 'أجنحة فيليت المتميزة',
    description: 'A premium green commercial hub and office complex in New Cairo, tailored with beautiful glass facades and co-working premium lounges.',
    descriptionAr: 'مجمع مكاتب ووحدات تجارية بريميوم مستدام يقع بالقاهرة الجديدة، صُمّم بواجهات زجاجية ممتدة ومساحات تشغيل مشتركة ذكية.',
    developerId: 'dev_4',
    developerName: 'SODIC Properties',
    areaId: 'area_4',
    areaName: 'New Cairo, Egypt',
    areaNameAr: 'القاهرة الجديدة، مصر',
    priceStart: 12000000,
    currency: 'EGP',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=80'
    ],
    deliveryDate: 'Ready to Equip',
    deliveryDateAr: 'جاهز للتسليم والتشغيل',
    paymentPlan: {
      downPayment: 10,
      years: 6,
      monthlyInstallment: '145,000 EGP',
      monthlyInstallmentAr: '١٤٥,٠٠٠ جنيه مصري'
    },
    amenities: ['Fibre Optic Connectivity', 'Solar Power Infrastructure', 'Premium Conference Centers', 'VIP Dining Hubs', 'Executive Lounge Concierge'],
    amenitiesAr: ['اتصالات ألياف ضوئية فائقة السرعة', 'بنية طاقة شمسية مستدامة', 'مراكز مؤتمرات وقاعات مجهزة', 'مجمعات طعام مخصصة لمديري الأعمال', 'نظام رعاية واستقبال الزوار الفاخر'],
    coordinates: { lat: 30.0131, lng: 31.4913 },
    rating: 4.8,
    featured: false,
    category: 'Commercial'
  }
];

export const initialUnits: Unit[] = [
  {
    id: 'unit_1',
    projectId: 'proj_1',
    projectName: 'Burj Crown Residences',
    projectNameAr: 'برج كراون ريزيدنسز',
    price: 2100000,
    beds: 2,
    baths: 2,
    areaSqft: 1140,
    type: 'Apartment',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&auto=format&fit=crop&q=80',
    agentPhone: '+971501234567',
    agentWhatsApp: '971501234567',
    features: ['High-floor Skyline View', 'Marble Countertops', 'Fully Furnished Miele Kitchen', 'Pre-wired Smart Sound'],
    featuresAr: ['إطلالة بانورامية مرتفعة', 'أسطح رخامية مستوردة', 'مطبخ متكامل ماركة ميلي', 'تمديدات صوتية ذكية مسبقة'],
    floorplanSvg: `<svg viewBox="0 0 100 100" fill="none" class="w-full h-full stroke-orange-400 stroke-2"><rect x="10" y="10" width="80" height="80" rx="4"/><line x1="10" y1="50" x2="90" y2="50"/><line x1="50" y1="10" x2="50" y2="90"/><circle cx="30" cy="30" r="8"/><circle cx="70" cy="70" r="10"/></svg>`
  },
  {
    id: 'unit_2',
    projectId: 'proj_2',
    projectName: 'The Riviera Gold Villas',
    projectNameAr: 'فيلات الريفيرا الذهبية',
    price: 28500000,
    beds: 5,
    baths: 6,
    areaSqft: 5200,
    type: 'Villa',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&auto=format&fit=crop&q=80',
    agentPhone: '+201004567890',
    agentWhatsApp: '201004567890',
    features: ['Infinite Horizon Front Pool', 'Private Elevator', 'Separate Driver & Maid Quarters', 'Private Moorage For Watercraft'],
    featuresAr: ['مسبح رملي خاص على خط الأفق', 'مصعد داخلي مدمج', 'مبيت مستقل للسائق والمربية في الملحق', 'موقع رسو خاص للقوارب الخفيفة'],
    floorplanSvg: `<svg viewBox="0 0 100 100" fill="none" class="w-full h-full stroke-yellow-500 stroke-2"><rect x="10" y="10" width="80" height="80" rx="10"/><path d="M10 30h80M10 70h80M40 10v90M70 10v90"/><circle cx="25" cy="50" r="12"/></svg>`
  },
  {
    id: 'unit_3',
    projectId: 'proj_3',
    projectName: 'W Residences Riyadh',
    projectNameAr: 'دبليو ريزيدنسز الرياض',
    price: 4950000,
    beds: 3,
    baths: 4,
    areaSqft: 2400,
    type: 'Penthouse',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&auto=format&fit=crop&q=80',
    agentPhone: '+966551239876',
    agentWhatsApp: '966551239876',
    features: ['Double-Height Ceilings', 'Floor-to-Ceiling Windows', 'Premium Jacuzzi Deck', 'Dedicated 2 VIP Parking Slots'],
    featuresAr: ['أسقف مزدوجة الارتفاع للشعور بالاتساع', 'نوافذ ممتدة من الأرض إلى السقف', 'شرفة مخصصة مع جاكوزي دافئ', 'موقفان مغطيان لسيارات كبار الشخصيات'],
    floorplanSvg: `<svg viewBox="0 0 100 100" fill="none" class="w-full h-full stroke-amber-500 stroke-2"><polygon points="50,10 90,40 90,90 10,90 10,40"/><line x1="10" y1="50" x2="90" y2="50"/><line x1="50" y1="50" x2="50" y2="90"/></svg>`
  }
];

export const initialCRMLeads: CRMLead[] = [
  {
    id: 'lead_1',
    name: 'Abdulrahman Al-Sudairy',
    phone: '+966 50 123 4567',
    email: 'sudairy.invests@saudi.com',
    source: 'WhatsApp Organic',
    status: 'negotiation',
    interestProject: 'W Residences Riyadh',
    budget: 5200000,
    notes: 'Inquired about the 3-Bedroom Master Penthouse. Prefers high floor with city skyline view.',
    createdAt: '2026-05-23T14:20:00Z'
  },
  {
    id: 'lead_2',
    name: 'Sherif Mansour',
    phone: '+20 100 555 4321',
    email: 'sherif.m@mansourgroup.egy',
    source: 'Marassi Campaign Ad',
    status: 'new',
    interestProject: 'The Riviera Gold Villas',
    budget: 30000000,
    notes: 'Interested in ready-to-move signature beach villas. Scheduled a site tour for tomorrow.',
    createdAt: '2026-05-24T08:15:00Z'
  },
  {
    id: 'lead_3',
    name: 'Sarah Jenkins',
    phone: '+971 52 999 8811',
    email: 'sarah.luxury@dubaiholdings.ae',
    source: 'Emaar Signature Campaign',
    status: 'reserved',
    interestProject: 'Burj Crown Residences',
    budget: 2000000,
    notes: 'Paid booking deposit of 10% on Burj Crown Apartment Unit 105. Awaiting contract dispatch.',
    createdAt: '2026-05-22T19:40:00Z'
  }
];

export const initialCRMTasks: CRMTask[] = [
  {
    id: 'task_1',
    title: 'Send Missoni and Missoni Signature price catalog to Abdulrahman',
    agentName: 'Ahmad Al-Ghamdi',
    dueDate: '2026-05-25',
    priority: 'high',
    completed: false
  },
  {
    id: 'task_2',
    title: 'Confirm Marassi Beach-access site tour times',
    agentName: 'Youssef El-Sawy',
    dueDate: '2026-05-24',
    priority: 'high',
    completed: true
  },
  {
    id: 'task_3',
    title: 'Upload Burj Crown updated construction status video to media Hub',
    agentName: 'Maya Zeitan',
    dueDate: '2026-05-27',
    priority: 'medium',
    completed: false
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif_1',
    title: '⚡ Lead Status Upgraded',
    titleAr: '⚡ ترقية حالة العميل',
    message: 'Abdulrahman Al-Sudairy moved to "Negotiation stage" on W Residences Riyadh.',
    messageAr: 'تم نقل العميل عبد الرحمن السديري إلى مرحلة "التفاوض" بشأن مشروع دبليو ريزيدنسز الرياض.',
    time: '2 hours ago',
    type: 'lead',
    read: false
  },
  {
    id: 'notif_2',
    title: '💬 Direct WhatsApp Inquiry',
    titleAr: '💬 استفسار واتساب جديد',
    message: 'New organic request on Burj Crown Residences 2-Bedroom Unit.',
    messageAr: 'طلب جديد غير مدفوع على شقة برجين كراون ريزيدنسز غرفتين.',
    time: '4 hours ago',
    type: 'whatsapp',
    read: false
  },
  {
    id: 'notif_3',
    title: '📅 Site Inspection Reminder',
    titleAr: '📅 تذكير بجولة الموقع',
    message: 'Tour scheduled with Sherif Mansour on Marassi beachfront development tomorrow at 11 AM.',
    messageAr: 'تم جدولة جولة عرض الموقع مع شريف منصور في مراسي غداً الساعة ١١ صباحاً.',
    time: '1 day ago',
    type: 'reminder',
    read: true
  }
];
