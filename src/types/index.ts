export type UserRole = 'admin' | 'participant' | 'coordinator';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export type RegistrationStatus = 'pending' | 'under_scrutiny' | 'approved' | 'rejected';
export type PaymentStatus = 'paid' | 'pending' | 'failed';
export type PassStatus = 'active' | 'checked_in' | 'expired';
export type CertificateCategory = 'participation' | 'winner' | 'runner_up';
export type EventCategory = 'technical' | 'cultural' | 'sports' | 'workshop' | 'gaming';

export interface FestEvent {
  id: string;
  title: string;
  category: EventCategory;
  description: string;
  rules: string[];
  date: string;
  time: string;
  venue: string;
  coordinator: { name: string; phone: string; email: string };
  maxParticipants: number;
  registeredCount: number;
  teamSize?: { min: number; max: number };
  image?: string;
}

export interface Registration {
  id: string;
  participantName: string;
  email: string;
  phone: string;
  eventId: string;
  eventTitle: string;
  type: 'individual' | 'team';
  teamName?: string;
  teamMembers?: string[];
  status: RegistrationStatus;
  paymentStatus: PaymentStatus;
  amount: number;
  registeredAt: string;
  documentUrl?: string;
  paymentProofUrl?: string;
  remarks?: string;
}

export interface AttendanceRecord {
  id: string;
  participantName: string;
  eventId: string;
  eventTitle: string;
  checkInTime?: string;
  present: boolean;
}

export interface DigitalPass {
  id: string;
  participantName: string;
  eventTitle: string;
  eventDate: string;
  status: PassStatus;
  qrData: string;
  passType: 'day' | 'event' | 'all_access';
}

export interface ActivityLogEntry {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  type: 'registration' | 'approval' | 'attendance' | 'event' | 'system';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
}
