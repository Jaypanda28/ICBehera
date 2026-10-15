-- ====================================================================
-- Professional Medical Database Schema for Dr. Ishwar Chandra Behera
-- Target Database: PostgreSQL 14+
-- Normalized architecture adhering to HIPAA / Indian EHR standards
-- ====================================================================

-- 1. Doctor Profiles Table
CREATE TABLE IF NOT EXISTS doctor_profiles (
    id VARCHAR(36) PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    prefix VARCHAR(20) DEFAULT 'Dr.',
    degrees VARCHAR(255) NOT NULL,
    designation VARCHAR(255) NOT NULL,
    primary_specialty VARCHAR(150) NOT NULL,
    secondary_specialty VARCHAR(150),
    bio TEXT NOT NULL,
    about_text TEXT NOT NULL,
    experience_years INT NOT NULL DEFAULT 15,
    registration_number VARCHAR(100) DEFAULT 'OMC-Reg-Verified',
    registration_council VARCHAR(150) DEFAULT 'Odisha Medical Council',
    languages_spoken VARCHAR(200) DEFAULT 'English, Hindi, Odia',
    portrait_url VARCHAR(255) NOT NULL DEFAULT '/images/dr-ishwar-chandra-behera.jpg',
    secondary_image_url VARCHAR(255) DEFAULT '/images/dr-ishwar-formal.png',
    is_accepting_appointments BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Qualifications Table (Academic & Clinical Degrees)
CREATE TABLE IF NOT EXISTS qualifications (
    id VARCHAR(36) PRIMARY KEY,
    doctor_id VARCHAR(36) REFERENCES doctor_profiles(id) ON DELETE CASCADE,
    degree VARCHAR(150) NOT NULL,
    field_of_study VARCHAR(150),
    institution VARCHAR(255) NOT NULL,
    year_completed INT,
    description TEXT,
    verification_status VARCHAR(50) DEFAULT 'Verified',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Medical Specialties Table
CREATE TABLE IF NOT EXISTS specialties (
    id VARCHAR(36) PRIMARY KEY,
    doctor_id VARCHAR(36) REFERENCES doctor_profiles(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    short_description VARCHAR(255) NOT NULL,
    detailed_description TEXT,
    icon_name VARCHAR(50) NOT NULL DEFAULT 'HeartPulse',
    conditions_treated TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Clinical Experience & Appointments Table
CREATE TABLE IF NOT EXISTS experience (
    id VARCHAR(36) PRIMARY KEY,
    doctor_id VARCHAR(36) REFERENCES doctor_profiles(id) ON DELETE CASCADE,
    role VARCHAR(200) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    location VARCHAR(150) NOT NULL,
    start_year INT NOT NULL,
    end_year INT, -- NULL signifies current role
    is_current BOOLEAN DEFAULT FALSE,
    responsibilities TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Research & Publications Table (PubMed Verified)
CREATE TABLE IF NOT EXISTS publications (
    id VARCHAR(36) PRIMARY KEY,
    doctor_id VARCHAR(36) REFERENCES doctor_profiles(id) ON DELETE CASCADE,
    title VARCHAR(350) NOT NULL,
    journal VARCHAR(255) NOT NULL,
    publication_year INT NOT NULL,
    authors TEXT NOT NULL,
    abstract_summary TEXT,
    pmid VARCHAR(50),
    doi VARCHAR(150),
    pubmed_url VARCHAR(350),
    citation_count INT DEFAULT 0,
    is_verified BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Clinic Locations Table
CREATE TABLE IF NOT EXISTS clinic_locations (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    facility_type VARCHAR(100) DEFAULT 'Hospital',
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    landmark VARCHAR(150),
    city VARCHAR(100) NOT NULL DEFAULT 'Bhubaneswar',
    state VARCHAR(100) NOT NULL DEFAULT 'Odisha',
    postal_code VARCHAR(20) NOT NULL DEFAULT '751001',
    phone_primary VARCHAR(50) NOT NULL,
    phone_secondary VARCHAR(50),
    emergency_phone VARCHAR(50),
    ambulance_phone VARCHAR(50),
    email VARCHAR(100) NOT NULL,
    google_maps_embed_url TEXT,
    google_maps_directions_url TEXT,
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    is_primary BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Consultation Hours Table
CREATE TABLE IF NOT EXISTS consultation_hours (
    id VARCHAR(36) PRIMARY KEY,
    clinic_id VARCHAR(36) REFERENCES clinic_locations(id) ON DELETE CASCADE,
    day_of_week VARCHAR(20) NOT NULL, -- 'Monday', 'Tuesday', etc.
    morning_start_time VARCHAR(10),   -- e.g. '10:00 AM'
    morning_end_time VARCHAR(10),     -- e.g. '01:00 PM'
    evening_start_time VARCHAR(10),   -- e.g. '05:00 PM'
    evening_end_time VARCHAR(10),     -- e.g. '08:00 PM'
    is_available BOOLEAN DEFAULT TRUE,
    notes VARCHAR(200),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Patient Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
    id VARCHAR(36) PRIMARY KEY,
    reference_number VARCHAR(30) UNIQUE NOT NULL, -- e.g. 'APT-2026-9281'
    patient_full_name VARCHAR(150) NOT NULL,
    mobile_number VARCHAR(25) NOT NULL,
    email VARCHAR(150),
    preferred_date DATE NOT NULL,
    preferred_time_slot VARCHAR(50) NOT NULL,
    consultation_type VARCHAR(50) NOT NULL, -- 'In-Person Consultation', 'Teleconsultation / Video', 'Follow-up', 'Second Opinion'
    short_reason TEXT NOT NULL,
    clinic_location_id VARCHAR(36) REFERENCES clinic_locations(id),
    status VARCHAR(30) NOT NULL DEFAULT 'Pending', -- 'Pending', 'Confirmed', 'Completed', 'Cancelled'
    admin_notes TEXT,
    consent_agreed BOOLEAN NOT NULL DEFAULT TRUE,
    notification_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'super_admin', -- 'super_admin', 'staff', 'receptionist'
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Site Settings & Digital Clinic Config Table
CREATE TABLE IF NOT EXISTS site_settings (
    setting_key VARCHAR(100) PRIMARY KEY,
    setting_value TEXT NOT NULL,
    description VARCHAR(255),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_appointments_ref ON appointments(reference_number);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(preferred_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_publications_pmid ON publications(pmid);
CREATE INDEX IF NOT EXISTS idx_specialties_active ON specialties(is_active);
CREATE INDEX IF NOT EXISTS idx_qualifications_sort ON qualifications(sort_order);
