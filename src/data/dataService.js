// ===== EFFICACY DATA SERVICE =====
// localStorage-backed CRUD operations, easily swappable with Firebase

const KEYS = {
  EVENTS: 'efficacy_events',
  PARTICIPANTS: 'efficacy_participants',
  GALLERY: 'efficacy_gallery',
  TEAM: 'efficacy_team',
  CONTENT: 'efficacy_content',
  ADMIN: 'efficacy_admin',
  AUTH: 'efficacy_auth',
};

// ===== Helper =====
function getStore(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || null;
  } catch { return null; }
}
function setStore(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

// ===== SEED DATA =====
const SEED_EVENTS = [
  { id: 'ev1', name: 'Paper Presentation', category: 'Tech', description: 'Present your innovative ideas and research papers on emerging technologies in Mechanical Engineering. Showcase your knowledge and communication skills.', rules: '1. Team of 2 members\n2. Time limit: 8+2 minutes\n3. Abstract must be submitted prior\n4. PPT must be original work\n5. Topics related to Mechanical Engineering only', poster: '', coordinator: 'Arun Kumar S', phone: '9876543210', createdAt: '2026-01-15', eventType: 'Team', isVisible: true, registrationEnabled: true, fee: 150 },
  { id: 'ev2', name: '3D CAD Modeling (Design Challenge)', category: 'Tech', description: 'Put your CAD skills to the test! Design complex components and assemblies using industry-standard software. Speed, accuracy, and design intent will be judged.', rules: '1. Individual event\n2. Software: SolidWorks / Fusion 360 / AutoCAD\n3. Time limit: 60 minutes\n4. 2D drafting to 3D model conversion\n5. Bring your own laptop (optional but recommended)', poster: '', coordinator: 'Priya M', phone: '9876543211', createdAt: '2026-01-16', eventType: 'Solo', isVisible: true, registrationEnabled: true, fee: 150 },
  { id: 'ev3', name: 'Mech Core Quiz', category: 'Tech', description: 'Challenge your core mechanical engineering knowledge in this fast-paced quiz covering thermodynamics, fluid mechanics, manufacturing, and general aptitude.', rules: '1. Team of 2 members\n2. Three rounds: Prelims, Semis, Finals\n3. No electronic devices\n4. Judges decision is final\n5. Negative marking in finals', poster: '', coordinator: 'Karthik R', phone: '9876543212', createdAt: '2026-01-17', eventType: 'Team', isVisible: true, registrationEnabled: true, fee: 150 },
  { id: 'ev4', name: 'Legend in Lathe (Machining)', category: 'Tech', description: 'Showcase your practical workshop skills. Participants will be given a raw workpiece and a drawing to machine the exact component using a conventional Lathe machine within the given time.', rules: '1. Individual event\n2. Proper workshop attire (shoes) is mandatory\n3. Time limit: 2 hours\n4. Machining accuracy and finish will be evaluated\n5. Safety protocols must be strictly followed', poster: '', coordinator: 'Deepika S', phone: '9876543213', createdAt: '2026-01-18', eventType: 'Solo', isVisible: true, registrationEnabled: true, fee: 150 },
  { id: 'ev5', name: 'Connections', category: 'Non-Tech', description: 'A fun-filled visual puzzle game where you connect the dots between seemingly unrelated clues to arrive at a common answer. Test your lateral thinking!', rules: '1. Team of 2 members\n2. Multiple rounds\n3. Time-based scoring\n4. No electronic devices\n5. Judges decision is final', poster: '', coordinator: 'Vishnu K', phone: '9876543214', createdAt: '2026-01-19', eventType: 'Team', isVisible: true, registrationEnabled: true, fee: 150 },
  { id: 'ev6', name: 'Workshop on 3D Printing', category: 'Workshop', description: 'Hands-on workshop covering the fundamentals of additive manufacturing, 3D modeling for print, and practical experience with FDM 3D printers.', rules: '1. Individual participation\n2. Laptop required\n3. Software will be provided\n4. Certificate will be issued\n5. Limited seats available', poster: '', coordinator: 'Ramesh V', phone: '9876543215', createdAt: '2026-01-20', eventType: 'Solo', isVisible: true, registrationEnabled: true, fee: 150 },
];

const SEED_PARTICIPANTS = [
  { id: 'p1', name: 'Rahul Sharma', college: 'PSG College of Technology', department: 'Mechanical Engineering', year: '3rd', email: 'rahul@psg.edu', phone: '9871234560', eventName: 'Paper Presentation', paymentStatus: 'Paid', transactionId: 'TXN1001', teamName: 'Innovators', teamMembers: ['Suresh G'], registrationDate: '2026-02-01' },
  { id: 'p2', name: 'Sneha Patel', college: 'Kongu Engineering College', department: 'Mechanical Engineering', year: '2nd', email: 'sneha@kongu.edu', phone: '9871234561', eventName: 'CAD Designing', paymentStatus: 'Paid', transactionId: 'TXN1002', teamName: '', teamMembers: [], registrationDate: '2026-02-02' },
  { id: 'p3', name: 'Ajay Kumar', college: 'GCE Erode', department: 'Mechanical Engineering', year: '4th', email: 'ajay@gce.edu', phone: '9871234562', eventName: 'Tech Quiz', paymentStatus: 'Pending', transactionId: '', teamName: 'MindBlowers', teamMembers: ['Vijay T'], registrationDate: '2026-02-03' },
  { id: 'p4', name: 'Kavitha R', college: 'Bannari Amman Institute', department: 'Mechanical Engineering', year: '3rd', email: 'kavitha@bait.edu', phone: '9871234563', eventName: 'Project Expo', paymentStatus: 'Paid', transactionId: 'TXN1004', teamName: 'TechTitans', teamMembers: ['Arjun K', 'Sarah L'], registrationDate: '2026-02-04' },
  { id: 'p5', name: 'Manoj K', college: 'Sri Krishna College', department: 'Mechanical Engineering', year: '2nd', email: 'manoj@skcet.edu', phone: '9871234564', eventName: 'Paper Presentation', paymentStatus: 'Paid', transactionId: 'TXN1005', teamName: 'MechMinds', teamMembers: ['Ravi B'], registrationDate: '2026-02-05' },
  { id: 'p6', name: 'Divya S', college: 'PSG College of Technology', department: 'Mechanical Engineering', year: '3rd', email: 'divya@psg.edu', phone: '9871234565', eventName: 'Connections', paymentStatus: 'Pending', transactionId: '', teamName: 'Connectors', teamMembers: ['Pooja P'], registrationDate: '2026-02-06' },
  { id: 'p7', name: 'Surya V', college: 'Kongu Engineering College', department: 'Mechanical Engineering', year: '4th', email: 'surya@kongu.edu', phone: '9871234566', eventName: 'Workshop on 3D Printing', paymentStatus: 'Paid', transactionId: 'TXN1007', teamName: '', teamMembers: [], registrationDate: '2026-02-07' },
  { id: 'p8', name: 'Anitha M', college: 'GCE Erode', department: 'Mechanical Engineering', year: '2nd', email: 'anitha@gce.edu', phone: '9871234567', eventName: 'Tech Quiz', paymentStatus: 'Paid', transactionId: 'TXN1008', teamName: 'QuizWiz', teamMembers: ['Mithun C'], registrationDate: '2026-02-08' },
  { id: 'p9', name: 'Bala R', college: 'Bannari Amman Institute', department: 'Mechanical Engineering', year: '3rd', email: 'bala@bait.edu', phone: '9871234568', eventName: 'CAD Designing', paymentStatus: 'Paid', transactionId: 'TXN1009', teamName: '', teamMembers: [], registrationDate: '2026-02-10' },
  { id: 'p10', name: 'Nithya K', college: 'Sri Krishna College', department: 'Mechanical Engineering', year: '4th', email: 'nithya@skcet.edu', phone: '9871234569', eventName: 'Project Expo', paymentStatus: 'Pending', transactionId: '', teamName: 'BuildBots', teamMembers: ['John D', 'Emily R', 'Mark Lee'], registrationDate: '2026-02-12' },
  { id: 'p11', name: 'Ganesh P', college: 'SSM Institute', department: 'Mechanical Engineering', year: '2nd', email: 'ganesh@ssm.edu', phone: '9871234570', eventName: 'Paper Presentation', paymentStatus: 'Paid', transactionId: 'TXN1011', teamName: 'PaperKings', teamMembers: ['Raja S'], registrationDate: '2026-02-14' },
  { id: 'p12', name: 'Meena L', college: 'Velalar College', department: 'Mechanical Engineering', year: '3rd', email: 'meena@velalar.edu', phone: '9871234571', eventName: 'Connections', paymentStatus: 'Paid', transactionId: 'TXN1012', teamName: 'BrainDrain', teamMembers: ['Karthik D'], registrationDate: '2026-02-15' },
];

const SEED_GALLERY = [
  { id: 'alb1', name: 'Inauguration', images: [
    { id: 'img1', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600', caption: 'Inauguration Ceremony' },
    { id: 'img2', url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600', caption: 'Lighting the Lamp' },
    { id: 'img3', url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600', caption: 'Chief Guest Address' },
  ]},
  { id: 'alb2', name: 'Technical Events', images: [
    { id: 'img4', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600', caption: 'Paper Presentation' },
    { id: 'img5', url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600', caption: 'CAD Competition' },
    { id: 'img6', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600', caption: 'Tech Quiz Finals' },
  ]},
  { id: 'alb3', name: 'Participants', images: [
    { id: 'img7', url: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600', caption: 'Enthusiastic Participants' },
    { id: 'img8', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600', caption: 'Team Discussions' },
  ]},
  { id: 'alb4', name: 'Workshop', images: [
    { id: 'img9', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600', caption: '3D Printing Workshop' },
    { id: 'img10', url: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600', caption: 'Hands-on Session' },
  ]},
  { id: 'alb5', name: 'Prize Distribution', images: [
    { id: 'img11', url: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600', caption: 'Winner Announcement' },
    { id: 'img12', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600', caption: 'Prize Distribution Ceremony' },
  ]},
];

const SEED_TEAM = [
  { id: 'tm1', name: 'Dr. K. Senthilkumar', role: 'Faculty Coordinator', department: 'Mechanical Engineering', photo: '', linkedin: '#', section: 'Faculty Coordinators' },
  { id: 'tm2', name: 'Dr. M. Rajmohan', role: 'Faculty Advisor', department: 'Mechanical Engineering', photo: '', linkedin: '#', section: 'Faculty Coordinators' },
  { id: 'tm3', name: 'Arun Kumar S', role: 'Student Coordinator', department: 'Mechanical Engineering', photo: '', linkedin: '#', section: 'Student Coordinators' },
  { id: 'tm4', name: 'Priya M', role: 'Student Coordinator', department: 'Mechanical Engineering', photo: '', linkedin: '#', section: 'Student Coordinators' },
  { id: 'tm5', name: 'Karthik R', role: 'IT Wing Lead', department: 'Mechanical Engineering', photo: '', linkedin: '#', section: 'IT Wing' },
  { id: 'tm6', name: 'Deepika S', role: 'IT Wing Member', department: 'Mechanical Engineering', photo: '', linkedin: '#', section: 'IT Wing' },
  { id: 'tm7', name: 'Vishnu K', role: 'Volunteer Lead', department: 'Mechanical Engineering', photo: '', linkedin: '#', section: 'Volunteers' },
  { id: 'tm8', name: 'Ramesh V', role: 'Volunteer', department: 'Mechanical Engineering', photo: '', linkedin: '#', section: 'Volunteers' },
];

const SEED_CONTENT = {
  heroTitle: 'EFFICACY\'26',
  heroSubtitle: 'Mechanical Engineering Symposium',
  heroTagline: 'Government College of Engineering, Erode\nDepartment of Mechanical Engineering',
  aboutText: '<span class="golden-text" style="font-weight: 600">EFFICACY\'26</span> is the flagship technical symposium organized by the Department of Mechanical Engineering at Government College of Engineering, Erode. It brings together bright minds from colleges across Tamil Nadu to compete, collaborate, and celebrate the spirit of engineering. With a diverse mix of technical events, workshops, and cultural activities, <span class="golden-text" style="font-weight: 600">EFFICACY\'26</span> provides a platform for students to showcase their talent and innovation.',
  highlights: [
    { icon: '🏆', title: '6+ Events', description: 'Technical and non-technical events for all' },
    { icon: '🎓', title: '500+ Participants', description: 'Students from colleges across Tamil Nadu' },
    { icon: '🏫', title: '20+ Colleges', description: 'Participating institutions' },
    { icon: '💡', title: 'Workshops', description: 'Hands-on learning with industry experts' },
  ],
  paymentQr: '',
  paymentUpi: 'efficacy2026@ibl',
};

const DEFAULT_ADMIN = { username: 'admin', password: 'efficacy2026' };

// ===== INITIALIZATION =====
export function initializeData() {
  // Force reset schema to fix undefined crashes
  const currentVersion = '2.1';
  if (localStorage.getItem('efficacy_version') !== currentVersion) {
    // Migrate events to add missing 'fee'
    let currentEvents = getStore(KEYS.EVENTS) || SEED_EVENTS;
    let updatedEvents = currentEvents.map(ev => ({fee: 150, ...ev}));
    setStore(KEYS.EVENTS, updatedEvents);

    // Migrate content to add missing payment info
    let currentContent = getStore(KEYS.CONTENT) || SEED_CONTENT;
    if (!currentContent.paymentUpi) {
      currentContent.paymentUpi = 'efficacy2026@ibl';
      currentContent.paymentQr = '';
      setStore(KEYS.CONTENT, currentContent);
    }
    
    // Legacy drop
    if (!localStorage.getItem('efficacy_version') || localStorage.getItem('efficacy_version') < '2.0') {
      localStorage.removeItem(KEYS.PARTICIPANTS);
    }
    localStorage.setItem('efficacy_version', currentVersion);
  }

  if (!getStore(KEYS.EVENTS)) setStore(KEYS.EVENTS, SEED_EVENTS);
  if (!getStore(KEYS.PARTICIPANTS)) setStore(KEYS.PARTICIPANTS, SEED_PARTICIPANTS);
  if (!getStore(KEYS.GALLERY)) setStore(KEYS.GALLERY, SEED_GALLERY);
  if (!getStore(KEYS.TEAM)) setStore(KEYS.TEAM, SEED_TEAM);
  if (!getStore(KEYS.CONTENT)) setStore(KEYS.CONTENT, SEED_CONTENT);
  if (!getStore(KEYS.ADMIN)) setStore(KEYS.ADMIN, DEFAULT_ADMIN);
}

// ===== AUTH =====
export function login(username, password) {
  const admin = getStore(KEYS.ADMIN) || DEFAULT_ADMIN;
  if (username === admin.username && password === admin.password) {
    sessionStorage.setItem(KEYS.AUTH, 'true');
    return true;
  }
  return false;
}
export function logout() { sessionStorage.removeItem(KEYS.AUTH); }
export function isAuthenticated() { return sessionStorage.getItem(KEYS.AUTH) === 'true'; }
export function changePassword(newPassword) {
  const admin = getStore(KEYS.ADMIN) || DEFAULT_ADMIN;
  admin.password = newPassword;
  setStore(KEYS.ADMIN, admin);
}

// ===== EVENTS =====
export function getEvents() { return getStore(KEYS.EVENTS) || []; }
export function getEvent(id) { return getEvents().find(e => e.id === id) || null; }
export function addEvent(event) {
  const events = getEvents();
  events.push({ ...event, id: generateId(), createdAt: new Date().toISOString().split('T')[0] });
  setStore(KEYS.EVENTS, events);
}
export function updateEvent(id, data) {
  const events = getEvents().map(e => e.id === id ? { ...e, ...data } : e);
  setStore(KEYS.EVENTS, events);
}
export function deleteEvent(id) {
  setStore(KEYS.EVENTS, getEvents().filter(e => e.id !== id));
}

// ===== PARTICIPANTS =====
export function getParticipants() { return getStore(KEYS.PARTICIPANTS) || []; }
export function addParticipant(p) {
  const ps = getParticipants();
  ps.push({ ...p, id: generateId(), registrationDate: new Date().toISOString().split('T')[0] });
  setStore(KEYS.PARTICIPANTS, ps);
}
export function updateParticipant(id, data) {
  setStore(KEYS.PARTICIPANTS, getParticipants().map(p => p.id === id ? { ...p, ...data } : p));
}
export function deleteParticipant(id) {
  setStore(KEYS.PARTICIPANTS, getParticipants().filter(p => p.id !== id));
}

// ===== GALLERY =====
export function getAlbums() { return getStore(KEYS.GALLERY) || []; }
export function getAlbum(id) { return getAlbums().find(a => a.id === id) || null; }
export function addAlbum(name) {
  const albums = getAlbums();
  albums.push({ id: generateId(), name, images: [] });
  setStore(KEYS.GALLERY, albums);
}
export function renameAlbum(id, name) {
  setStore(KEYS.GALLERY, getAlbums().map(a => a.id === id ? { ...a, name } : a));
}
export function deleteAlbum(id) {
  setStore(KEYS.GALLERY, getAlbums().filter(a => a.id !== id));
}
export function addImageToAlbum(albumId, url, caption) {
  const albums = getAlbums().map(a => {
    if (a.id === albumId) {
      a.images.push({ id: generateId(), url, caption });
    }
    return a;
  });
  setStore(KEYS.GALLERY, albums);
}
export function deleteImage(albumId, imageId) {
  const albums = getAlbums().map(a => {
    if (a.id === albumId) {
      a.images = a.images.filter(img => img.id !== imageId);
    }
    return a;
  });
  setStore(KEYS.GALLERY, albums);
}

// ===== TEAM =====
export function getTeam() { return getStore(KEYS.TEAM) || []; }
export function addMember(member) {
  const team = getTeam();
  team.push({ ...member, id: generateId() });
  setStore(KEYS.TEAM, team);
}
export function updateMember(id, data) {
  setStore(KEYS.TEAM, getTeam().map(m => m.id === id ? { ...m, ...data } : m));
}
export function deleteMember(id) {
  setStore(KEYS.TEAM, getTeam().filter(m => m.id !== id));
}

// ===== CONTENT =====
export function getContent() { return getStore(KEYS.CONTENT) || SEED_CONTENT; }
export function updateContent(data) {
  setStore(KEYS.CONTENT, { ...getContent(), ...data });
}

// ===== ANALYTICS =====
export function getAnalytics() {
  const participants = getParticipants();
  const events = getEvents();
  const colleges = [...new Set(participants.map(p => p.college))];

  const eventWise = {};
  events.forEach(e => { eventWise[e.name] = 0; });
  participants.forEach(p => { if (eventWise[p.eventName] !== undefined) eventWise[p.eventName]++; else eventWise[p.eventName] = 1; });

  const collegeWise = {};
  participants.forEach(p => { collegeWise[p.college] = (collegeWise[p.college] || 0) + 1; });

  const dailyTrend = {};
  participants.forEach(p => { dailyTrend[p.registrationDate] = (dailyTrend[p.registrationDate] || 0) + 1; });

  return {
    totalParticipants: participants.length,
    totalEvents: events.length,
    totalColleges: colleges.length,
    totalRegistrations: participants.length,
    eventWise,
    collegeWise,
    dailyTrend,
    paidCount: participants.filter(p => p.paymentStatus === 'Paid').length,
    pendingCount: participants.filter(p => p.paymentStatus === 'Pending').length,
  };
}
