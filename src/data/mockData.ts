export type Category = 'cleanliness' | 'electrical' | 'plumbing' | 'safety' | 'connectivity' | 'infrastructure';
export type Priority = 'critical' | 'high' | 'medium' | 'low';
export type Status = 'submitted' | 'assigned' | 'in-progress' | 'resolved';
export type UserRole = 'student' | 'admin' | 'staff';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  avatar?: string;
}

export interface Issue {
  id: string;
  ticketId: string;
  title: string;
  description: string;
  images: string[];
  lat: number;
  lng: number;
  category: Category;
  priority: Priority;
  status: Status;
  department: string;
  createdAt: Date;
  updatedAt: Date;
  slaHours: number;
  assignedTo?: string;
  reportedBy: string;
  upvotes: number;
  location: string;
}

export interface Department {
  id: string;
  name: string;
  slaDefault: number;
  icon: string;
}

export const departments: Department[] = [
  { id: '1', name: 'Housekeeping', slaDefault: 4, icon: 'Sparkles' },
  { id: '2', name: 'Electrical', slaDefault: 8, icon: 'Zap' },
  { id: '3', name: 'Plumbing', slaDefault: 6, icon: 'Droplets' },
  { id: '4', name: 'Security', slaDefault: 1, icon: 'Shield' },
  { id: '5', name: 'IT Services', slaDefault: 12, icon: 'Wifi' },
  { id: '6', name: 'Infrastructure', slaDefault: 24, icon: 'Building2' },
];

export const users: User[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex@campus.edu', role: 'student', avatar: 'https://i.pravatar.cc/150?u=alex' },
  { id: '2', name: 'Sarah Chen', email: 'sarah@campus.edu', role: 'admin', department: 'Facilities', avatar: 'https://i.pravatar.cc/150?u=sarah' },
  { id: '3', name: 'Mike Rodriguez', email: 'mike@campus.edu', role: 'staff', department: 'Electrical', avatar: 'https://i.pravatar.cc/150?u=mike' },
  { id: '4', name: 'Emily Davis', email: 'emily@campus.edu', role: 'staff', department: 'Housekeeping', avatar: 'https://i.pravatar.cc/150?u=emily' },
  { id: '5', name: 'James Wilson', email: 'james@campus.edu', role: 'student', avatar: 'https://i.pravatar.cc/150?u=james' },
];

// Campus center coordinates (Stanford University as example)
const campusCenter = { lat: 37.4275, lng: -122.1697 };

const locationNames = [
  'Main Library - 2nd Floor',
  'Engineering Building A',
  'Student Union - Cafeteria',
  'Science Lab Complex',
  'Dormitory Block C',
  'Sports Complex - Gym',
  'Computer Science Building',
  'Medical Center',
  'Arts & Humanities Hall',
  'Administration Building',
  'Parking Lot B',
  'Chemistry Lab Wing',
  'Physics Department',
  'Business School',
  'Law Building',
  'Music Hall',
  'Theater Complex',
  'Recreation Center',
  'Graduate Housing',
  'Research Park',
];

const issueTitles: Record<Category, string[]> = {
  cleanliness: [
    'Overflowing trash bin',
    'Spill in hallway',
    'Bathroom needs cleaning',
    'Graffiti on wall',
    'Littering near entrance',
  ],
  electrical: [
    'Flickering lights',
    'Power outlet not working',
    'Light bulb burnt out',
    'Exposed wiring',
    'AC unit malfunction',
  ],
  plumbing: [
    'Leaking faucet',
    'Clogged drain',
    'Water fountain broken',
    'Toilet not flushing',
    'Water heater issue',
  ],
  safety: [
    'Broken handrail',
    'Missing fire extinguisher',
    'Damaged emergency exit sign',
    'Slippery floor hazard',
    'Broken lock on door',
  ],
  connectivity: [
    'WiFi not working',
    'Slow internet connection',
    'Network outage',
    'Printer offline',
    'No signal in area',
  ],
  infrastructure: [
    'Broken window',
    'Cracked sidewalk',
    'Door not closing properly',
    'Ceiling tile damaged',
    'Elevator out of service',
  ],
};

const descriptions: string[] = [
  'This has been an issue for a few days now. Please fix ASAP.',
  'Noticed this while walking by. Could be a safety hazard.',
  'Multiple students have reported this problem.',
  'This is affecting our ability to study/work effectively.',
  'Urgent attention required. Please prioritize.',
];

function generateRandomIssue(index: number): Issue {
  const categories: Category[] = ['cleanliness', 'electrical', 'plumbing', 'safety', 'connectivity', 'infrastructure'];
  const priorities: Priority[] = ['critical', 'high', 'medium', 'low'];
  const statuses: Status[] = ['submitted', 'assigned', 'in-progress', 'resolved'];
  
  const category = categories[Math.floor(Math.random() * categories.length)];
  const priority = priorities[Math.floor(Math.random() * priorities.length)];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const location = locationNames[Math.floor(Math.random() * locationNames.length)];
  const titles = issueTitles[category];
  const title = titles[Math.floor(Math.random() * titles.length)];
  
  // Generate random position within campus bounds
  const lat = campusCenter.lat + (Math.random() - 0.5) * 0.015;
  const lng = campusCenter.lng + (Math.random() - 0.5) * 0.02;
  
  const createdAt = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
  const updatedAt = new Date(createdAt.getTime() + Math.random() * 2 * 24 * 60 * 60 * 1000);
  
  const departmentMap: Record<Category, string> = {
    cleanliness: 'Housekeeping',
    electrical: 'Electrical',
    plumbing: 'Plumbing',
    safety: 'Security',
    connectivity: 'IT Services',
    infrastructure: 'Infrastructure',
  };

  const slaMap: Record<Priority, number> = {
    critical: 2,
    high: 4,
    medium: 12,
    low: 24,
  };

  return {
    id: `issue-${index}`,
    ticketId: `CF-${String(1000 + index).padStart(4, '0')}`,
    title,
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    images: [],
    lat,
    lng,
    category,
    priority,
    status,
    department: departmentMap[category],
    createdAt,
    updatedAt,
    slaHours: slaMap[priority],
    assignedTo: status !== 'submitted' ? users[Math.floor(Math.random() * 3) + 2].id : undefined,
    reportedBy: users[Math.floor(Math.random() * 2)].id,
    upvotes: Math.floor(Math.random() * 25),
    location,
  };
}

export const issues: Issue[] = Array.from({ length: 50 }, (_, i) => generateRandomIssue(i));

export const getIssuesByStatus = (status: Status) => issues.filter(i => i.status === status);
export const getIssuesByCategory = (category: Category) => issues.filter(i => i.category === category);
export const getIssuesByPriority = (priority: Priority) => issues.filter(i => i.priority === priority);

export const stats = {
  totalIssues: issues.length,
  openIssues: issues.filter(i => i.status !== 'resolved').length,
  resolvedToday: issues.filter(i => i.status === 'resolved' && new Date(i.updatedAt).toDateString() === new Date().toDateString()).length,
  avgResolutionTime: 4.2,
  slaCompliance: 94,
  criticalIssues: issues.filter(i => i.priority === 'critical' && i.status !== 'resolved').length,
};

export const categoryStats = {
  cleanliness: issues.filter(i => i.category === 'cleanliness').length,
  electrical: issues.filter(i => i.category === 'electrical').length,
  plumbing: issues.filter(i => i.category === 'plumbing').length,
  safety: issues.filter(i => i.category === 'safety').length,
  connectivity: issues.filter(i => i.category === 'connectivity').length,
  infrastructure: issues.filter(i => i.category === 'infrastructure').length,
};

export const trendData = [
  { day: 'Mon', submitted: 12, resolved: 10 },
  { day: 'Tue', submitted: 15, resolved: 13 },
  { day: 'Wed', submitted: 8, resolved: 11 },
  { day: 'Thu', submitted: 18, resolved: 14 },
  { day: 'Fri', submitted: 14, resolved: 16 },
  { day: 'Sat', submitted: 6, resolved: 8 },
  { day: 'Sun', submitted: 4, resolved: 5 },
];
