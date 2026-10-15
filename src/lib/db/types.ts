export interface DoctorProfile {
  id: string;
  fullName: string;
  prefix: string;
  degrees: string;
  designation: string;
  primarySpecialty: string;
  secondarySpecialty?: string;
  bio: string;
  aboutText: string;
  experienceYears: number;
  registrationNumber: string;
  registrationCouncil: string;
  languagesSpoken: string;
  portraitUrl: string;
  secondaryImageUrl?: string;
  isAcceptingAppointments: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Qualification {
  id: string;
  doctorId: string;
  degree: string;
  fieldOfStudy?: string;
  institution: string;
  yearCompleted?: number;
  description?: string;
  verificationStatus: 'Verified' | 'Pending Verification';
  sortOrder: number;
}

export interface Specialty {
  id: string;
  doctorId: string;
  name: string;
  shortDescription: string;
  detailedDescription?: string;
  iconName: string;
  conditionsTreated?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface Experience {
  id: string;
  doctorId: string;
  role: string;
  institution: string;
  location: string;
  startYear: number;
  endYear?: number | null;
  isCurrent: boolean;
  responsibilities?: string;
  sortOrder: number;
}

export interface Publication {
  id: string;
  doctorId: string;
  title: string;
  journal: string;
  publicationYear: number;
  authors: string;
  abstractSummary?: string;
  pmid?: string;
  doi?: string;
  pubmedUrl?: string;
  citationCount: number;
  isVerified: boolean;
  sortOrder: number;
}

export interface ClinicLocation {
  id: string;
  name: string;
  facilityType: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  postalCode: string;
  phonePrimary: string;
  phoneSecondary?: string;
  emergencyPhone?: string;
  ambulancePhone?: string;
  email: string;
  googleMapsEmbedUrl?: string;
  googleMapsDirectionsUrl?: string;
  latitude: number;
  longitude: number;
  isPrimary: boolean;
}

export interface ConsultationHour {
  id: string;
  clinicId: string;
  dayOfWeek: string;
  morningStartTime?: string | null;
  morningEndTime?: string | null;
  eveningStartTime?: string | null;
  eveningEndTime?: string | null;
  isAvailable: boolean;
  notes?: string;
}

export interface Appointment {
  id: string;
  referenceNumber: string;
  patientFullName: string;
  mobileNumber: string;
  email?: string;
  preferredDate: string; // YYYY-MM-DD
  preferredTimeSlot: string; // e.g. "10:30 AM"
  consultationType: 'In-Person Consultation' | 'Teleconsultation / Video' | 'Follow-up' | 'Second Opinion';
  shortReason: string;
  clinicLocationId?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  adminNotes?: string;
  consentAgreed: boolean;
  notificationSent?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  role: 'super_admin' | 'staff' | 'receptionist';
  lastLogin?: string;
  isActive: boolean;
  createdAt?: string;
}

export interface SiteSettings {
  siteTitle: string;
  hospitalAffiliation: string;
  emergencyNotice: string;
  telemedicineAvailable: boolean;
  instantBookingActive: boolean;
}
