import { FestEvent, Registration, AttendanceRecord, DigitalPass, ActivityLogEntry, Notification } from '@/types';

export const mockEvents: FestEvent[] = [
  { id: 'e1', title: 'Hackathon 2026', category: 'technical', description: '24-hour coding marathon to build innovative solutions.', rules: ['Max team size: 4', 'No pre-built code', 'Must use approved tech stack'], date: '2026-04-15', time: '09:00', venue: 'Main Auditorium', coordinator: { name: 'Dr. Sharma', phone: '9876543210', email: 'sharma@fest.edu' }, maxParticipants: 200, registeredCount: 156, teamSize: { min: 2, max: 4 } },
  { id: 'e2', title: 'Battle of Bands', category: 'cultural', description: 'Rock the stage with your band!', rules: ['Max 6 members', '15 min per band', 'No playback'], date: '2026-04-16', time: '18:00', venue: 'Open Air Theatre', coordinator: { name: 'Prof. Mehta', phone: '9876543211', email: 'mehta@fest.edu' }, maxParticipants: 50, registeredCount: 42, teamSize: { min: 3, max: 6 } },
  { id: 'e3', title: 'Code Golf', category: 'technical', description: 'Solve problems in fewest characters possible.', rules: ['Individual event', '90 min duration', 'Any language'], date: '2026-04-15', time: '14:00', venue: 'Lab 301', coordinator: { name: 'Dr. Patel', phone: '9876543212', email: 'patel@fest.edu' }, maxParticipants: 100, registeredCount: 78 },
  { id: 'e4', title: 'Dance Mania', category: 'cultural', description: 'Solo and group dance competition.', rules: ['Max 8 members for group', '5 min per act', 'Props allowed'], date: '2026-04-17', time: '16:00', venue: 'Main Stage', coordinator: { name: 'Ms. Kapoor', phone: '9876543213', email: 'kapoor@fest.edu' }, maxParticipants: 80, registeredCount: 65, teamSize: { min: 1, max: 8 } },
  { id: 'e5', title: 'Cricket Tournament', category: 'sports', description: 'Inter-college T20 cricket tournament.', rules: ['11 players per team', 'Official ICC rules', 'White dress code'], date: '2026-04-18', time: '08:00', venue: 'Sports Ground', coordinator: { name: 'Coach Singh', phone: '9876543214', email: 'singh@fest.edu' }, maxParticipants: 120, registeredCount: 88, teamSize: { min: 11, max: 15 } },
  { id: 'e6', title: 'AI/ML Workshop', category: 'workshop', description: 'Hands-on workshop on machine learning with Python.', rules: ['Bring laptops', 'Pre-install Python 3.10+', 'Individual'], date: '2026-04-16', time: '10:00', venue: 'Seminar Hall', coordinator: { name: 'Dr. Gupta', phone: '9876543215', email: 'gupta@fest.edu' }, maxParticipants: 60, registeredCount: 55 },
  { id: 'e7', title: 'Valorant Championship', category: 'gaming', description: '5v5 Valorant tournament with prizes.', rules: ['5 players per team', 'Bring own peripherals', 'Standard competitive rules'], date: '2026-04-19', time: '11:00', venue: 'Gaming Arena', coordinator: { name: 'Mr. Kumar', phone: '9876543216', email: 'kumar@fest.edu' }, maxParticipants: 100, registeredCount: 90, teamSize: { min: 5, max: 5 } },
  { id: 'e8', title: 'Photography Walk', category: 'cultural', description: 'Campus photography walk and contest.', rules: ['Individual', 'DSLR/Phone allowed', 'Submit 5 best shots'], date: '2026-04-17', time: '07:00', venue: 'Campus Wide', coordinator: { name: 'Prof. Roy', phone: '9876543217', email: 'roy@fest.edu' }, maxParticipants: 50, registeredCount: 34 },
  { id: 'e9', title: 'Robo Wars', category: 'technical', description: 'Build and battle robots in the arena.', rules: ['Max 4 members', 'Weight limit: 25kg', 'No flammables'], date: '2026-04-18', time: '13:00', venue: 'Workshop Hall', coordinator: { name: 'Dr. Verma', phone: '9876543218', email: 'verma@fest.edu' }, maxParticipants: 40, registeredCount: 32, teamSize: { min: 2, max: 4 } },
  { id: 'e10', title: 'Stand-up Comedy', category: 'cultural', description: 'Open mic comedy night.', rules: ['Individual', '7 min per act', 'Clean humor only'], date: '2026-04-19', time: '19:00', venue: 'Amphitheatre', coordinator: { name: 'Mr. Joshi', phone: '9876543219', email: 'joshi@fest.edu' }, maxParticipants: 30, registeredCount: 25 },
  { id: 'e11', title: 'Badminton Singles', category: 'sports', description: 'Singles badminton championship.', rules: ['Individual', 'BWF rules', '3 sets match'], date: '2026-04-20', time: '09:00', venue: 'Indoor Court', coordinator: { name: 'Coach Reddy', phone: '9876543220', email: 'reddy@fest.edu' }, maxParticipants: 64, registeredCount: 48 },
  { id: 'e12', title: 'UI/UX Design Sprint', category: 'workshop', description: 'Design sprint for mobile app interfaces.', rules: ['Individual or duo', 'Use Figma', '4 hour sprint'], date: '2026-04-20', time: '10:00', venue: 'Design Lab', coordinator: { name: 'Ms. Nair', phone: '9876543221', email: 'nair@fest.edu' }, maxParticipants: 40, registeredCount: 36, teamSize: { min: 1, max: 2 } },
];

export const mockRegistrations: Registration[] = [
  { id: 'r1', participantName: 'Arjun Reddy', email: 'arjun@mail.com', phone: '9000000001', eventId: 'e1', eventTitle: 'Hackathon 2026', type: 'team', teamName: 'Code Crushers', teamMembers: ['Arjun', 'Priya', 'Rahul', 'Sneha'], status: 'approved', paymentStatus: 'paid', amount: 500, registeredAt: '2026-03-20T10:30:00', documentUrl: '/mock-doc.pdf', paymentProofUrl: '/mock-payment.jpg' },
  { id: 'r2', participantName: 'Priya Sharma', email: 'priya@mail.com', phone: '9000000002', eventId: 'e4', eventTitle: 'Dance Mania', type: 'team', teamName: 'Rhythm Squad', teamMembers: ['Priya', 'Anita', 'Kavya'], status: 'under_scrutiny', paymentStatus: 'paid', amount: 300, registeredAt: '2026-03-21T14:00:00', documentUrl: '/mock-doc.pdf', paymentProofUrl: '/mock-payment.jpg' },
  { id: 'r3', participantName: 'Rahul Kumar', email: 'rahul@mail.com', phone: '9000000003', eventId: 'e3', eventTitle: 'Code Golf', type: 'individual', status: 'pending', paymentStatus: 'pending', amount: 200, registeredAt: '2026-03-22T09:15:00' },
  { id: 'r4', participantName: 'Sneha Patel', email: 'sneha@mail.com', phone: '9000000004', eventId: 'e6', eventTitle: 'AI/ML Workshop', type: 'individual', status: 'approved', paymentStatus: 'paid', amount: 400, registeredAt: '2026-03-19T11:45:00', documentUrl: '/mock-doc.pdf', paymentProofUrl: '/mock-payment.jpg' },
  { id: 'r5', participantName: 'Vikram Singh', email: 'vikram@mail.com', phone: '9000000005', eventId: 'e5', eventTitle: 'Cricket Tournament', type: 'team', teamName: 'Thunder XI', teamMembers: ['Vikram', 'Ajay', 'Suresh', 'Mohit', 'Karan', 'Deepak', 'Ravi', 'Amit', 'Nikhil', 'Sanjay', 'Rohit'], status: 'approved', paymentStatus: 'paid', amount: 1000, registeredAt: '2026-03-18T08:30:00', documentUrl: '/mock-doc.pdf', paymentProofUrl: '/mock-payment.jpg' },
  { id: 'r6', participantName: 'Kavya Nair', email: 'kavya@mail.com', phone: '9000000006', eventId: 'e8', eventTitle: 'Photography Walk', type: 'individual', status: 'rejected', paymentStatus: 'failed', amount: 150, registeredAt: '2026-03-23T16:20:00', remarks: 'Incomplete documentation' },
  { id: 'r7', participantName: 'Ankit Joshi', email: 'ankit@mail.com', phone: '9000000007', eventId: 'e7', eventTitle: 'Valorant Championship', type: 'team', teamName: 'Phoenix Five', teamMembers: ['Ankit', 'Siddharth', 'Manish', 'Rohan', 'Tarun'], status: 'under_scrutiny', paymentStatus: 'paid', amount: 750, registeredAt: '2026-03-24T13:00:00', documentUrl: '/mock-doc.pdf', paymentProofUrl: '/mock-payment.jpg' },
  { id: 'r8', participantName: 'Meera Gupta', email: 'meera@mail.com', phone: '9000000008', eventId: 'e10', eventTitle: 'Stand-up Comedy', type: 'individual', status: 'pending', paymentStatus: 'pending', amount: 100, registeredAt: '2026-03-25T10:00:00' },
  { id: 'r9', participantName: 'Siddharth Rao', email: 'sid@mail.com', phone: '9000000009', eventId: 'e9', eventTitle: 'Robo Wars', type: 'team', teamName: 'Iron Bots', teamMembers: ['Siddharth', 'Harish', 'Neeraj'], status: 'approved', paymentStatus: 'paid', amount: 600, registeredAt: '2026-03-17T15:30:00', documentUrl: '/mock-doc.pdf', paymentProofUrl: '/mock-payment.jpg' },
  { id: 'r10', participantName: 'Nisha Verma', email: 'nisha@mail.com', phone: '9000000010', eventId: 'e2', eventTitle: 'Battle of Bands', type: 'team', teamName: 'Sonic Boom', teamMembers: ['Nisha', 'Kiran', 'Pooja', 'Ritu'], status: 'pending', paymentStatus: 'paid', amount: 400, registeredAt: '2026-03-26T12:00:00', documentUrl: '/mock-doc.pdf' },
  { id: 'r11', participantName: 'Deepak Chauhan', email: 'deepak@mail.com', phone: '9000000011', eventId: 'e11', eventTitle: 'Badminton Singles', type: 'individual', status: 'approved', paymentStatus: 'paid', amount: 200, registeredAt: '2026-03-20T09:00:00' },
  { id: 'r12', participantName: 'Ritu Agarwal', email: 'ritu@mail.com', phone: '9000000012', eventId: 'e12', eventTitle: 'UI/UX Design Sprint', type: 'individual', status: 'under_scrutiny', paymentStatus: 'paid', amount: 250, registeredAt: '2026-03-27T11:30:00', documentUrl: '/mock-doc.pdf', paymentProofUrl: '/mock-payment.jpg' },
];

export const mockAttendance: AttendanceRecord[] = [
  { id: 'a1', participantName: 'Arjun Reddy', eventId: 'e1', eventTitle: 'Hackathon 2026', checkInTime: '2026-04-15T08:55:00', present: true },
  { id: 'a2', participantName: 'Sneha Patel', eventId: 'e6', eventTitle: 'AI/ML Workshop', checkInTime: '2026-04-16T09:50:00', present: true },
  { id: 'a3', participantName: 'Vikram Singh', eventId: 'e5', eventTitle: 'Cricket Tournament', checkInTime: '2026-04-18T07:45:00', present: true },
  { id: 'a4', participantName: 'Siddharth Rao', eventId: 'e9', eventTitle: 'Robo Wars', present: false },
  { id: 'a5', participantName: 'Deepak Chauhan', eventId: 'e11', eventTitle: 'Badminton Singles', checkInTime: '2026-04-20T08:50:00', present: true },
  { id: 'a6', participantName: 'Priya Sharma', eventId: 'e4', eventTitle: 'Dance Mania', present: false },
  { id: 'a7', participantName: 'Rahul Kumar', eventId: 'e3', eventTitle: 'Code Golf', checkInTime: '2026-04-15T13:55:00', present: true },
  { id: 'a8', participantName: 'Meera Gupta', eventId: 'e10', eventTitle: 'Stand-up Comedy', checkInTime: '2026-04-19T18:50:00', present: true },
];

export const mockPasses: DigitalPass[] = [
  { id: 'p1', participantName: 'Arjun Reddy', eventTitle: 'Hackathon 2026', eventDate: '2026-04-15', status: 'checked_in', qrData: 'FEST-2026-P1-ARJUN', passType: 'event' },
  { id: 'p2', participantName: 'Priya Sharma', eventTitle: 'Dance Mania', eventDate: '2026-04-17', status: 'active', qrData: 'FEST-2026-P2-PRIYA', passType: 'event' },
  { id: 'p3', participantName: 'Vikram Singh', eventTitle: 'All Events', eventDate: '2026-04-15', status: 'active', qrData: 'FEST-2026-P3-VIKRAM-ALL', passType: 'all_access' },
  { id: 'p4', participantName: 'Sneha Patel', eventTitle: 'AI/ML Workshop', eventDate: '2026-04-16', status: 'checked_in', qrData: 'FEST-2026-P4-SNEHA', passType: 'event' },
  { id: 'p5', participantName: 'Kavya Nair', eventTitle: 'Day 1 Pass', eventDate: '2026-04-15', status: 'expired', qrData: 'FEST-2026-P5-KAVYA-D1', passType: 'day' },
  { id: 'p6', participantName: 'Ankit Joshi', eventTitle: 'Valorant Championship', eventDate: '2026-04-19', status: 'active', qrData: 'FEST-2026-P6-ANKIT', passType: 'event' },
];

export const mockActivityLog: ActivityLogEntry[] = [
  { id: 'al1', action: 'New registration: Arjun Reddy for Hackathon 2026', user: 'System', timestamp: '2026-03-20T10:30:00', type: 'registration' },
  { id: 'al2', action: 'Registration approved: Sneha Patel - AI/ML Workshop', user: 'Admin', timestamp: '2026-03-20T11:00:00', type: 'approval' },
  { id: 'al3', action: 'New event created: Valorant Championship', user: 'Admin', timestamp: '2026-03-19T09:00:00', type: 'event' },
  { id: 'al4', action: 'Attendance marked: Arjun Reddy checked in', user: 'System', timestamp: '2026-04-15T08:55:00', type: 'attendance' },
  { id: 'al5', action: 'Registration rejected: Kavya Nair - Photography Walk', user: 'Admin', timestamp: '2026-03-24T10:00:00', type: 'approval' },
  { id: 'al6', action: 'Bulk approval: 5 registrations approved', user: 'Admin', timestamp: '2026-03-25T14:00:00', type: 'approval' },
  { id: 'al7', action: 'Event updated: Hackathon venue changed', user: 'Coordinator', timestamp: '2026-03-26T16:00:00', type: 'event' },
  { id: 'al8', action: 'System backup completed', user: 'System', timestamp: '2026-03-27T02:00:00', type: 'system' },
];

export const mockNotifications: Notification[] = [
  { id: 'n1', title: 'New Registration', message: 'Meera Gupta registered for Stand-up Comedy', read: false, timestamp: '2026-03-25T10:00:00', type: 'info' },
  { id: 'n2', title: 'Payment Received', message: 'Payment confirmed for Ankit Joshi - ₹750', read: false, timestamp: '2026-03-24T13:05:00', type: 'success' },
  { id: 'n3', title: 'Scrutiny Required', message: '3 registrations pending verification', read: true, timestamp: '2026-03-23T09:00:00', type: 'warning' },
  { id: 'n4', title: 'Event Full', message: 'Valorant Championship is at 90% capacity', read: false, timestamp: '2026-03-22T15:00:00', type: 'warning' },
  { id: 'n5', title: 'Registration Rejected', message: 'Kavya Nair registration rejected - incomplete docs', read: true, timestamp: '2026-03-24T10:00:00', type: 'error' },
];

export const analyticsData = {
  totalRegistrations: 347,
  totalRevenue: 245000,
  totalAttendance: 289,
  totalEvents: 12,
  registrationsByCategory: [
    { name: 'Technical', value: 120, color: 'hsl(262, 83%, 58%)' },
    { name: 'Cultural', value: 95, color: 'hsl(199, 89%, 48%)' },
    { name: 'Sports', value: 65, color: 'hsl(142, 76%, 36%)' },
    { name: 'Workshop', value: 45, color: 'hsl(38, 92%, 50%)' },
    { name: 'Gaming', value: 22, color: 'hsl(0, 84%, 60%)' },
  ],
  dailyRegistrations: [
    { date: 'Mar 17', count: 12 }, { date: 'Mar 18', count: 25 }, { date: 'Mar 19', count: 30 },
    { date: 'Mar 20', count: 45 }, { date: 'Mar 21', count: 38 }, { date: 'Mar 22', count: 52 },
    { date: 'Mar 23', count: 28 }, { date: 'Mar 24', count: 42 }, { date: 'Mar 25', count: 35 },
    { date: 'Mar 26', count: 22 }, { date: 'Mar 27', count: 18 },
  ],
  attendanceByEvent: [
    { event: 'Hackathon', present: 145, absent: 11 },
    { event: 'Bands', present: 38, absent: 4 },
    { event: 'Code Golf', present: 70, absent: 8 },
    { event: 'Dance', present: 58, absent: 7 },
    { event: 'Cricket', present: 80, absent: 8 },
    { event: 'AI/ML', present: 52, absent: 3 },
  ],
};
