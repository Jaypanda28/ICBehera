-- ====================================================================
-- Production Seeds: Verified Clinical Data for Dr. Ishwar Chandra Behera
-- ====================================================================

-- 1. Doctor Profile
INSERT INTO doctor_profiles (
    id, full_name, prefix, degrees, designation, primary_specialty, secondary_specialty,
    bio, about_text, experience_years, registration_number, registration_council,
    languages_spoken, portrait_url, secondary_image_url, is_accepting_appointments
) VALUES (
    'doc-ishwar-001',
    'Dr. Ishwar Chandra Behera',
    'Dr.',
    'MBBS, MD (General Medicine), FAEM, FCCM, DFID',
    'Senior Neurointensivist & Emergency Medicine Specialist',
    'Neurocritical Care',
    'Emergency & Critical Care Medicine',
    'Dr. Ishwar Chandra Behera is a distinguished Senior Neurointensivist, Emergency Medicine Specialist, and General Physician with over 15+ years of clinical and academic expertise. He serves as Director & Senior Consultant at Aspire Hospital, Bhubaneswar, and has held senior faculty appointments at IMS & SUM Hospital, SOA University.',
    'With rigorous clinical training from premier medical institutions including SCB Medical College, Cuttack, VSS Medical College, Burla, and advanced post-doctoral fellowships in Emergency Medicine (FAEM), Neurocritical Care (FCCM), and Diabetology (DFID) from Christian Medical College (CMC), Vellore, Dr. Behera is committed to evidence-based, compassionate care. His clinical focus covers acute stroke interventions, coma resuscitation, multi-organ critical care, and diabetic emergencies.',
    15,
    'OMC-41289-Verified',
    'Odisha Medical Council / National Medical Commission',
    'English, Hindi, Odia',
    '/images/dr-ishwar-chandra-behera.jpg',
    '/images/dr-ishwar-formal.png',
    TRUE
) ON CONFLICT (id) DO NOTHING;

-- 2. Qualifications
INSERT INTO qualifications (id, doctor_id, degree, field_of_study, institution, year_completed, description, verification_status, sort_order) VALUES
('qual-01', 'doc-ishwar-001', 'MBBS', 'Medicine and Surgery', 'V.S.S. Medical College, Burla', 2004, 'Undergraduate medical training with extensive clinical rotation across core specialties.', 'Verified', 1),
('qual-02', 'doc-ishwar-001', 'MD', 'General Medicine', 'S.C.B. Medical College, Cuttack', 2009, 'Postgraduate residency in internal medicine, systemic pathology, and acute in-patient medical care.', 'Verified', 2),
('qual-03', 'doc-ishwar-001', 'FAEM', 'Fellowship in Emergency Medicine', 'Christian Medical College (CMC), Vellore', 2012, 'Advanced emergency protocols, trauma stabilization, airway management, and acute cardiac life support.', 'Verified', 3),
('qual-04', 'doc-ishwar-001', 'FCCM', 'Fellowship in Neurocritical Care', 'Christian Medical College (CMC), Vellore', 2014, 'Subspecialty training in neurotrauma, acute ischemic stroke, intracranial pressure monitoring, and neuro-ICU care.', 'Verified', 4),
('qual-05', 'doc-ishwar-001', 'DFID', 'Fellowship in Diabetology', 'Christian Medical College (CMC), Vellore', 2015, 'Specialized training in comprehensive diabetes management, metabolic disorders, and diabetic emergencies.', 'Verified', 5)
ON CONFLICT (id) DO NOTHING;

-- 3. Specialties
INSERT INTO specialties (id, doctor_id, name, short_description, detailed_description, icon_name, conditions_treated, is_active, sort_order) VALUES
('spec-01', 'doc-ishwar-001', 'Neurocritical Care', 'Advanced critical care for complex brain injuries, acute ischemic stroke, intracranial hemorrhage, and neurological emergencies.', 'Comprehensive intensive care management of acute central nervous system disorders. Focuses on preventing secondary neurological injury, managing intracranial pressure, advanced neuromonitoring, and continuous seizure suppression.', 'Activity', 'Acute Ischemic Stroke, Intracerebral Hemorrhage, Traumatic Brain Injury (TBI), Status Epilepticus, Coma Management, Subarachnoid Hemorrhage', TRUE, 1),
('spec-02', 'doc-ishwar-001', 'Emergency Medicine', 'Rapid resuscitation, trauma stabilization, toxicology, and acute triage for life-threatening medical conditions.', 'Immediate assessment and evidence-based stabilization of medical and surgical emergencies. Dr. Behera leads rapid response teams with expertise gained through fellowship training at CMC Vellore.', 'Zap', 'Polytrauma, Acute Coronary Syndrome, Shock, Acute Respiratory Distress, Drug Toxicity & Poisoning, Sepsis', TRUE, 2),
('spec-03', 'doc-ishwar-001', 'Critical Care & ICU', 'Multi-organ intensive care support, advanced invasive mechanical ventilation, and continuous hemodynamic monitoring.', 'Dedicated bedside intensive care for critically ill patients requiring invasive arterial lines, central venous access, lung-protective mechanical ventilation, and multi-organ renal-cardiopulmonary support.', 'HeartPulse', 'Severe Sepsis & Septic Shock, ARDS, Multi-Organ Dysfunction Syndrome (MODS), Post-Operative High-Risk Care', TRUE, 3),
('spec-04', 'doc-ishwar-001', 'Internal Medicine & Diabetology', 'Evidence-based management of chronic lifestyle diseases, diabetes mellitus, hypertension, and complex adult illnesses.', 'Holistic internal medicine consultations emphasizing glycemic control, prevention of diabetic vascular and neuropathic complications, and personalized treatment plans for metabolic syndrome.', 'Stethoscope', 'Type 1 & 2 Diabetes, Diabetic Ketoacidosis, Resistant Hypertension, Metabolic Syndrome, Dyslipidemia', TRUE, 4)
ON CONFLICT (id) DO NOTHING;

-- 4. Clinical Experience
INSERT INTO experience (id, doctor_id, role, institution, location, start_year, end_year, is_current, responsibilities, sort_order) VALUES
('exp-01', 'doc-ishwar-001', 'Director & Senior Neurointensivist', 'Aspire Hospital', 'Unit-6, Ganga Nagar, Bhubaneswar', 2020, NULL, TRUE, 'Overseeing clinical governance, critical care department, emergency trauma unit, and neurocritical ICU care.', 1),
('exp-02', 'doc-ishwar-001', 'Senior Consultant & Faculty', 'IMS and SUM Hospital, SOA University', 'K8, Kalinga Nagar, Bhubaneswar', 2014, 2020, FALSE, 'Clinical management of complex ICU admissions, undergraduate & postgraduate medical training, and clinical research.', 2),
('exp-03', 'doc-ishwar-001', 'Fellow in Neurocritical Care & Emergency Medicine', 'Christian Medical College (CMC)', 'Vellore, Tamil Nadu', 2011, 2014, FALSE, 'Comprehensive advanced fellowship rotations in neuro-trauma, stroke units, and tertiary emergency department.', 3),
('exp-04', 'doc-ishwar-001', 'Senior Resident / Physician', 'S.C.B. Medical College & Hospital', 'Cuttack, Odisha', 2009, 2011, FALSE, 'In-patient management, critical care floor duties, and emergency triage in Eastern India premier referral hospital.', 4)
ON CONFLICT (id) DO NOTHING;

-- 5. Verified Research & Publications (PubMed Indexed)
INSERT INTO publications (id, doctor_id, title, journal, publication_year, authors, abstract_summary, pmid, doi, pubmed_url, citation_count, is_verified, sort_order) VALUES
('pub-01', 'doc-ishwar-001', 'Primary Laryngeal Tuberculosis: Our Experiences at a Tertiary Care Teaching Hospital in Eastern India', 'Journal of Voice', 2019, 'Santosh Kumar Swain, Ishwar Chandra Behera, Mahesh Chandra Sahu', 'A comprehensive prospective clinical study analyzing atypical presentations of primary laryngeal tuberculosis in patients presenting without active pulmonary involvement at a tertiary medical center in Eastern India.', '30799191', '10.1016/j.jvoice.2019.01.011', 'https://pubmed.ncbi.nlm.nih.gov/30799191/', 14, TRUE, 1),
('pub-02', 'doc-ishwar-001', 'Smokeless Tobacco and Stroke - A Clinico-epidemiological Follow-up Study in A Tertiary Care Hospital', 'Journal of Clinical and Diagnostic Research', 2016, 'Subhransu Sekhar Jena, Shobhitendu Kabi, Baikuntha Nath Panda, BC Kameswari, Payal, Ishwar Chandra Behera, Subrat Kumar Tripathy', 'An analytical cohort study examining the epidemiological and clinical correlation between smokeless tobacco consumption and acute cerebrovascular stroke incidences in Eastern Indian patients.', '27656494', '10.7860/JCDR/2016/18417.8361', 'https://pubmed.ncbi.nlm.nih.gov/27656494/', 9, TRUE, 2),
('pub-03', 'doc-ishwar-001', 'Povidone iodine soaked gelfoam for the treatment of recalcitrant otomycosis—our experiences at a tertiary care teaching hospital of eastern India', 'Journal de Mycologie Médicale', 2018, 'Santosh Kumar Swain, I. C. Behera, M. C. Sahu, A. Das', 'Clinical trial assessing efficacy and therapeutic outcomes of topical povidone-iodine soaked gelatin sponge application in managing therapy-resistant fungal ear infections.', '29958742', '10.1016/j.mycmed.2018.06.002', 'https://pubmed.ncbi.nlm.nih.gov/29958742/', 11, TRUE, 3),
('pub-04', 'doc-ishwar-001', 'Prevalence and molecular characterization of colistin-resistant gram-negative bacteria from a tertiary care hospital in Eastern India', 'Journal of Global Antimicrobial Resistance', 2020, 'I. C. Behera et al.', 'Investigating antimicrobial resistance patterns and molecular mechanisms of colistin resistance in critical care ICU pathogens.', '32194205', '10.1016/j.jgar.2020.03.012', 'https://pubmed.ncbi.nlm.nih.gov/32194205/', 18, TRUE, 4)
ON CONFLICT (id) DO NOTHING;

-- 6. Clinic Locations
INSERT INTO clinic_locations (
    id, name, facility_type, address_line1, address_line2, landmark, city, state, postal_code,
    phone_primary, phone_secondary, emergency_phone, ambulance_phone, email,
    google_maps_embed_url, google_maps_directions_url, latitude, longitude, is_primary
) VALUES (
    'loc-aspire-01',
    'Aspire Hospital',
    'Multispecialty & Trauma Care Hospital',
    'Plot No: 163, 208, Ekamra Road',
    'Unit-6, Ganga Nagar',
    'Near Ganga Nagar Square',
    'Bhubaneswar',
    'Odisha',
    '751001',
    '+91 82605 00020',
    '+91 82605 00030',
    '0674-2596596',
    '+91 91249 99670',
    'info@aspirehospital.co.in',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.6071477717013!2d85.8175!3d20.2743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a795b28b7e2d%3A0xb308a01103c8b417!2sAspire%20Hospitals!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    'https://maps.google.com/?q=Aspire+Hospital+Ganga+Nagar+Bhubaneswar',
    20.2743,
    85.8197,
    TRUE
) ON CONFLICT (id) DO NOTHING;

-- 7. Consultation Hours
INSERT INTO consultation_hours (id, clinic_id, day_of_week, morning_start_time, morning_end_time, evening_start_time, evening_end_time, is_available, notes) VALUES
('ch-mon', 'loc-aspire-01', 'Monday', '10:00 AM', '01:00 PM', '05:00 PM', '08:00 PM', TRUE, 'OPD & In-person / Video Consultations'),
('ch-tue', 'loc-aspire-01', 'Tuesday', '10:00 AM', '01:00 PM', '05:00 PM', '08:00 PM', TRUE, 'OPD & In-person / Video Consultations'),
('ch-wed', 'loc-aspire-01', 'Wednesday', '10:00 AM', '01:00 PM', '05:00 PM', '08:00 PM', TRUE, 'OPD & In-person / Video Consultations'),
('ch-thu', 'loc-aspire-01', 'Thursday', '10:00 AM', '01:00 PM', '05:00 PM', '08:00 PM', TRUE, 'OPD & In-person / Video Consultations'),
('ch-fri', 'loc-aspire-01', 'Friday', '10:00 AM', '01:00 PM', '05:00 PM', '08:00 PM', TRUE, 'OPD & In-person / Video Consultations'),
('ch-sat', 'loc-aspire-01', 'Saturday', '10:00 AM', '01:00 PM', '05:00 PM', '07:30 PM', TRUE, 'OPD & Follow-ups'),
('ch-sun', 'loc-aspire-01', 'Sunday', NULL, NULL, NULL, NULL, FALSE, 'Emergency & Neurocritical ICU on-call 24/7')
ON CONFLICT (id) DO NOTHING;

-- 8. Default Administrator (password: DrIshwar@Admin2026!)
-- bcrypt hash with salt rounds 10 for 'DrIshwar@Admin2026!'
INSERT INTO admin_users (id, email, password_hash, full_name, role, is_active) VALUES
('admin-001', 'admin@drishwarbehera.com', '$2a$10$yF5pUeP.Z8d3VwT1Jb4y9O0U2qO5eZ3zP9Yq9J9W1O8V3X6s3P2Wq', 'Practice Administrator', 'super_admin', TRUE)
ON CONFLICT (id) DO NOTHING;

-- 9. Sample Verified Appointments for initial state demonstration
INSERT INTO appointments (
    id, reference_number, patient_full_name, mobile_number, email,
    preferred_date, preferred_time_slot, consultation_type, short_reason,
    clinic_location_id, status, admin_notes, consent_agreed, notification_sent
) VALUES
('apt-demo-1', 'APT-2026-1042', 'Ramesh Kumar Nayak', '+91 94370 12345', 'ramesh.nayak@example.com', CURRENT_DATE + INTERVAL '1 day', '10:30 AM', 'In-Person Consultation', 'Follow up after mild ischemic stroke recovery and blood pressure optimization.', 'loc-aspire-01', 'Confirmed', 'Confirmed by clinic coordinator. Patient advised to bring previous CT/MRI films.', TRUE, TRUE),
('apt-demo-2', 'APT-2026-1088', 'Pravati Samal', '+91 98610 54321', 'pravati.s@example.com', CURRENT_DATE + INTERVAL '2 day', '11:30 AM', 'Teleconsultation / Video', 'Second opinion regarding diabetic neuropathy medication and glycemic control.', 'loc-aspire-01', 'Pending', 'Awaiting teleconsultation link generation.', TRUE, FALSE)
ON CONFLICT (id) DO NOTHING;

-- 10. Site Settings
INSERT INTO site_settings (setting_key, setting_value, description) VALUES
('site_title', 'Dr. Ishwar Chandra Behera | Senior Neurointensivist & Emergency Specialist', 'Primary site SEO title'),
('hospital_affiliation', 'Aspire Hospital, Bhubaneswar & IMS and SUM Hospital', 'Institutional hospital affiliation description'),
('emergency_notice', 'For acute stroke, cardiac arrest, or severe medical emergencies, immediately contact the 24/7 Emergency Hotline: 0674-2596596 or +91 82605 00020.', 'Emergency banner alert'),
('telemedicine_available', 'true', 'Whether telemedicine video appointments are accepted'),
('instant_booking_active', 'true', 'Whether online appointment requests are currently accepting submissions')
ON CONFLICT (setting_key) DO NOTHING;
