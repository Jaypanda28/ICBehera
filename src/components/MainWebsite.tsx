'use client';

import React, { useState } from 'react';
import EmergencyBanner from './EmergencyBanner';
import Header from './Header';
import Hero from './Hero';
import QuickActionCards from './QuickActionCards';
import ClinicFeatures from './ClinicFeatures';
import AboutSection from './AboutSection';
import SpecialtiesSection from './SpecialtiesSection';
import QualificationsTimeline from './QualificationsTimeline';
import ResearchSection from './ResearchSection';
import AppointmentSection from './AppointmentSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import StatusCheckModal from './StatusCheckModal';
import {
  DoctorProfile,
  Qualification,
  Specialty,
  Experience,
  Publication,
  ClinicLocation,
  ConsultationHour,
} from '@/lib/db/types';

interface MainWebsiteProps {
  profile: DoctorProfile;
  qualifications: Qualification[];
  specialties: Specialty[];
  experience: Experience[];
  publications: Publication[];
  clinicLocations: ClinicLocation[];
  consultationHours: ConsultationHour[];
}

export default function MainWebsite({
  profile,
  qualifications,
  specialties,
  experience,
  publications,
  clinicLocations,
  consultationHours,
}: MainWebsiteProps) {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [lookupRef, setLookupRef] = useState('');

  const handleOpenStatusModal = (ref?: string) => {
    if (ref) setLookupRef(ref);
    setIsStatusModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#263238] font-sans">
      {/* 24/7 Emergency & Critical Care Notification Top Bar */}
      <EmergencyBanner />

      {/* Sticky Main Navigation */}
      <Header onOpenStatusModal={() => handleOpenStatusModal()} />

      <main className="flex-1">
        {/* Hero Section with Authentic Portrait & Medical Credentials */}
        <Hero profile={profile} />

        {/* 4 Smart Quick Action Cards (Extracted from Infographic Screenshot) */}
        <QuickActionCards
          onOpenStatusModal={() => handleOpenStatusModal()}
        />

        {/* Digital Clinic Features & Services */}
        <ClinicFeatures />

        {/* About the Doctor: Academic Pedigree & Biography */}
        <AboutSection
          profile={profile}
          qualifications={qualifications}
          experience={experience}
        />

        {/* Areas of Clinical Expertise */}
        <SpecialtiesSection specialties={specialties} />

        {/* Academic Degrees & Clinical Experience Timeline */}
        <QualificationsTimeline
          qualifications={qualifications}
          experience={experience}
        />

        {/* Peer-Reviewed PubMed Research Publications */}
        <ResearchSection publications={publications} />

        {/* Interactive Appointment Request System with Calendar & Slots */}
        <AppointmentSection
          onCheckStatusWithRef={(ref) => handleOpenStatusModal(ref)}
        />

        {/* Contact, Consultation Hours & Google Maps */}
        <ContactSection
          locations={clinicLocations}
          consultationHours={consultationHours}
        />
      </main>

      {/* Comprehensive Medical Footer with Legal & Emergency Disclaimers */}
      <Footer />

      {/* Patient Portal: Status Check Modal by Reference ID */}
      <StatusCheckModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        initialRef={lookupRef}
      />
    </div>
  );
}
