import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';
import {
  DoctorProfile,
  Qualification,
  Specialty,
  Experience,
  Publication,
  ClinicLocation,
  ConsultationHour,
  Appointment,
  AdminUser,
  SiteSettings,
} from './types';
import {
  initialDoctorProfile,
  initialQualifications,
  initialSpecialties,
  initialExperience,
  initialPublications,
  initialClinicLocations,
  initialConsultationHours,
  initialAppointments,
  initialAdminUsers,
  initialSiteSettings,
} from './seed-data';

interface DatabaseState {
  doctorProfile: DoctorProfile;
  qualifications: Qualification[];
  specialties: Specialty[];
  experience: Experience[];
  publications: Publication[];
  clinicLocations: ClinicLocation[];
  consultationHours: ConsultationHour[];
  appointments: Appointment[];
  adminUsers: AdminUser[];
  siteSettings: SiteSettings;
}

// PostgreSQL connection pool (used when DATABASE_URL is provided)
let pgPool: Pool | null = null;
if (process.env.DATABASE_URL) {
  try {
    pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
    });
  } catch (err) {
    console.error('Failed to initialize PostgreSQL pool:', err);
    pgPool = null;
  }
}

// File-based store for zero-config local development and resilient fallback
const DATA_DIR = path.resolve(process.cwd(), '.data');
const STORE_PATH = path.join(DATA_DIR, 'clinic_store.json');

function getInitialState(): DatabaseState {
  return {
    doctorProfile: { ...initialDoctorProfile },
    qualifications: [...initialQualifications],
    specialties: [...initialSpecialties],
    experience: [...initialExperience],
    publications: [...initialPublications],
    clinicLocations: [...initialClinicLocations],
    consultationHours: [...initialConsultationHours],
    appointments: [...initialAppointments],
    adminUsers: [...initialAdminUsers],
    siteSettings: { ...initialSiteSettings },
  };
}

function loadState(): DatabaseState {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(STORE_PATH)) {
      const initial = getInitialState();
      fs.writeFileSync(STORE_PATH, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const raw = fs.readFileSync(STORE_PATH, 'utf-8');
    return JSON.parse(raw) as DatabaseState;
  } catch (err) {
    console.error('Error loading clinic state from file store, using seed fallback:', err);
    return getInitialState();
  }
}

function saveState(state: DatabaseState): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing clinic store to disk:', err);
  }
}

export const db = {
  // Doctor Profile
  async getDoctorProfile(): Promise<DoctorProfile> {
    if (pgPool) {
      try {
        const res = await pgPool.query('SELECT * FROM doctor_profiles LIMIT 1');
        if (res.rows.length > 0) {
          const row = res.rows[0];
          return {
            id: row.id,
            fullName: row.full_name,
            prefix: row.prefix,
            degrees: row.degrees,
            designation: row.designation,
            primarySpecialty: row.primary_specialty,
            secondarySpecialty: row.secondary_specialty,
            bio: row.bio,
            aboutText: row.about_text,
            experienceYears: row.experience_years,
            registrationNumber: row.registration_number,
            registrationCouncil: row.registration_council,
            languagesSpoken: row.languages_spoken,
            portraitUrl: row.portrait_url,
            secondaryImageUrl: row.secondary_image_url,
            isAcceptingAppointments: row.is_accepting_appointments,
          };
        }
      } catch (err) {
        console.warn('Postgres query error, falling back to local store:', err);
      }
    }
    return loadState().doctorProfile;
  },

  async updateDoctorProfile(profile: Partial<DoctorProfile>): Promise<DoctorProfile> {
    const state = loadState();
    state.doctorProfile = {
      ...state.doctorProfile,
      ...profile,
      updatedAt: new Date().toISOString(),
    };
    saveState(state);
    return state.doctorProfile;
  },

  // Qualifications
  async getQualifications(): Promise<Qualification[]> {
    const state = loadState();
    return state.qualifications.sort((a, b) => a.sortOrder - b.sortOrder);
  },

  async saveQualification(qual: Qualification): Promise<Qualification> {
    const state = loadState();
    const idx = state.qualifications.findIndex((q) => q.id === qual.id);
    if (idx >= 0) {
      state.qualifications[idx] = qual;
    } else {
      state.qualifications.push(qual);
    }
    saveState(state);
    return qual;
  },

  async deleteQualification(id: string): Promise<boolean> {
    const state = loadState();
    state.qualifications = state.qualifications.filter((q) => q.id !== id);
    saveState(state);
    return true;
  },

  // Specialties
  async getSpecialties(): Promise<Specialty[]> {
    const state = loadState();
    return state.specialties.filter((s) => s.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
  },

  async getAllSpecialties(): Promise<Specialty[]> {
    const state = loadState();
    return state.specialties.sort((a, b) => a.sortOrder - b.sortOrder);
  },

  async saveSpecialty(spec: Specialty): Promise<Specialty> {
    const state = loadState();
    const idx = state.specialties.findIndex((s) => s.id === spec.id);
    if (idx >= 0) {
      state.specialties[idx] = spec;
    } else {
      state.specialties.push(spec);
    }
    saveState(state);
    return spec;
  },

  async deleteSpecialty(id: string): Promise<boolean> {
    const state = loadState();
    state.specialties = state.specialties.filter((s) => s.id !== id);
    saveState(state);
    return true;
  },

  // Experience
  async getExperience(): Promise<Experience[]> {
    const state = loadState();
    return state.experience.sort((a, b) => a.sortOrder - b.sortOrder);
  },

  async saveExperience(exp: Experience): Promise<Experience> {
    const state = loadState();
    const idx = state.experience.findIndex((e) => e.id === exp.id);
    if (idx >= 0) {
      state.experience[idx] = exp;
    } else {
      state.experience.push(exp);
    }
    saveState(state);
    return exp;
  },

  async deleteExperience(id: string): Promise<boolean> {
    const state = loadState();
    state.experience = state.experience.filter((e) => e.id !== id);
    saveState(state);
    return true;
  },

  // Publications
  async getPublications(): Promise<Publication[]> {
    const state = loadState();
    return state.publications.filter((p) => p.isVerified).sort((a, b) => a.sortOrder - b.sortOrder);
  },

  async getAllPublications(): Promise<Publication[]> {
    const state = loadState();
    return state.publications.sort((a, b) => a.sortOrder - b.sortOrder);
  },

  async savePublication(pub: Publication): Promise<Publication> {
    const state = loadState();
    const idx = state.publications.findIndex((p) => p.id === pub.id);
    if (idx >= 0) {
      state.publications[idx] = pub;
    } else {
      state.publications.push(pub);
    }
    saveState(state);
    return pub;
  },

  async deletePublication(id: string): Promise<boolean> {
    const state = loadState();
    state.publications = state.publications.filter((p) => p.id !== id);
    saveState(state);
    return true;
  },

  // Clinic Locations & Hours
  async getClinicLocations(): Promise<ClinicLocation[]> {
    return loadState().clinicLocations;
  },

  async getConsultationHours(): Promise<ConsultationHour[]> {
    return loadState().consultationHours;
  },

  async updateConsultationHours(hours: ConsultationHour[]): Promise<ConsultationHour[]> {
    const state = loadState();
    state.consultationHours = hours;
    saveState(state);
    return hours;
  },

  // Appointments
  async getAppointments(filters?: {
    status?: string;
    search?: string;
  }): Promise<Appointment[]> {
    const state = loadState();
    let list = [...state.appointments];

    if (filters?.status && filters.status !== 'All') {
      list = list.filter((a) => a.status.toLowerCase() === filters.status?.toLowerCase());
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (a) =>
          a.patientFullName.toLowerCase().includes(q) ||
          a.referenceNumber.toLowerCase().includes(q) ||
          a.mobileNumber.includes(q)
      );
    }

    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async getAppointmentByReference(ref: string): Promise<Appointment | null> {
    const state = loadState();
    const apt = state.appointments.find((a) => a.referenceNumber.toUpperCase() === ref.trim().toUpperCase());
    return apt || null;
  },

  async createAppointment(
    data: Omit<Appointment, 'id' | 'referenceNumber' | 'status' | 'createdAt' | 'updatedAt'>
  ): Promise<Appointment> {
    const state = loadState();
    const count = state.appointments.length + 1;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceNumber = `APT-2026-${randomSuffix}`;
    const now = new Date().toISOString();

    const newAppointment: Appointment = {
      ...data,
      id: `apt-${Date.now()}-${count}`,
      referenceNumber,
      status: 'Pending',
      createdAt: now,
      updatedAt: now,
      notificationSent: false,
    };

    state.appointments.unshift(newAppointment);
    saveState(state);
    return newAppointment;
  },

  async updateAppointmentStatus(
    id: string,
    status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled',
    adminNotes?: string
  ): Promise<Appointment | null> {
    const state = loadState();
    const idx = state.appointments.findIndex((a) => a.id === id);
    if (idx === -1) return null;

    state.appointments[idx] = {
      ...state.appointments[idx],
      status,
      adminNotes: adminNotes !== undefined ? adminNotes : state.appointments[idx].adminNotes,
      updatedAt: new Date().toISOString(),
    };

    saveState(state);
    return state.appointments[idx];
  },

  // Admin User Auth
  async getAdminByEmail(email: string): Promise<AdminUser | null> {
    const state = loadState();
    const admin = state.adminUsers.find((u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.isActive);
    return admin || null;
  },

  // Site Settings
  async getSiteSettings(): Promise<SiteSettings> {
    return loadState().siteSettings;
  },

  async updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const state = loadState();
    state.siteSettings = { ...state.siteSettings, ...settings };
    saveState(state);
    return state.siteSettings;
  },
};
