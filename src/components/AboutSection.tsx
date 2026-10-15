import React from 'react';
import Image from 'next/image';
import {
  GraduationCap,
  Award,
  Building2,
  CheckCircle2,
  Stethoscope,
  Globe,
  BookOpen,
} from 'lucide-react';
import { DoctorProfile, Qualification, Experience } from '@/lib/db/types';

interface AboutSectionProps {
  profile: DoctorProfile;
  qualifications: Qualification[];
  experience: Experience[];
}

export default function AboutSection({
  profile,
  qualifications,
  experience,
}: AboutSectionProps) {
  const verifiedInstitutions = [
    {
      name: 'Christian Medical College (CMC), Vellore',
      programs: 'Fellowships in Emergency Medicine (FAEM), Neurocritical Care (FCCM), Diabetology (DFID)',
      badge: 'Advanced Subspecialty Fellowships',
    },
    {
      name: 'S.C.B. Medical College, Cuttack',
      programs: 'MD in General Medicine',
      badge: 'Postgraduate Residency',
    },
    {
      name: 'V.S.S. Medical College, Burla',
      programs: 'MBBS (Bachelor of Medicine & Bachelor of Surgery)',
      badge: 'Undergraduate Medical Training',
    },
  ];

  const clinicalInterests = [
    'Acute Ischemic & Hemorrhagic Stroke Protocols',
    'Advanced Intracranial Pressure (ICP) & Multimodal Neuromonitoring',
    'Traumatic Brain Injury (TBI) & Coma Resuscitation',
    'Critical Care Mechanical Ventilation & Sepsis Bundles',
    'Toxicological & Severe Polytrauma Resuscitation',
    'Diabetic Ketoacidosis & Complex Glycemic Optimization',
  ];

  return (
    <section id="about" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0F9D92]/10 text-[#0F9D92] text-xs font-bold uppercase tracking-wider mb-3">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>ABOUT THE DOCTOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12304A] tracking-tight">
            Distinguished Clinical Leadership &amp; Medical Dedication
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#64748B]">
            A comprehensive profile of Dr. Ishwar Chandra Behera&apos;s academic background,
            tertiary clinical training, and ongoing commitment to life-saving medical care.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Portrait & Key Credentials Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F3F8FC] rounded-3xl p-5 border border-slate-200/80 shadow-md">
              <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
                <Image
                  src={profile.portraitUrl || '/images/dr-ishwar-chandra-behera.jpg'}
                  alt="Dr. Ishwar Chandra Behera - Senior Neurointensivist"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-top"
                />
              </div>

              {/* Verified Credentials Summary */}
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
                  <span className="text-xs font-medium text-slate-500">Medical Registration</span>
                  <span className="text-xs font-bold text-[#12304A] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0F9D92]" />
                    {profile.registrationNumber}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
                  <span className="text-xs font-medium text-slate-500">Reg. Council</span>
                  <span className="text-xs font-bold text-[#12304A]">
                    {profile.registrationCouncil}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
                  <span className="text-xs font-medium text-slate-500">Languages</span>
                  <span className="text-xs font-bold text-[#12304A] flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-[#0F9D92]" />
                    {profile.languagesSpoken}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
                  <span className="text-xs font-medium text-slate-500">Active Affiliation</span>
                  <span className="text-xs font-bold text-[#0F9D92]">
                    Aspire Hospital, Bhubaneswar
                  </span>
                </div>
              </div>
            </div>

            {/* Quote Card */}
            <div className="p-6 rounded-2xl bg-[#12304A] text-white shadow-md relative overflow-hidden">
              <div className="text-3xl font-serif text-[#0F9D92] mb-1">&ldquo;</div>
              <p className="text-sm italic text-slate-200 leading-relaxed">
                In critical neurological events and acute emergencies, every minute saved preserves
                brain function. Compassionate, precision-guided medical care is our sacred obligation
                to every patient and family.
              </p>
              <p className="text-xs font-semibold text-teal-300 mt-3">
                — Dr. Ishwar Chandra Behera
              </p>
            </div>
          </div>

          {/* Right Column: Biography, Institutions, Clinical Interests */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Biography */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#12304A]">
                Professional Biography
              </h3>
              <p className="text-[#263238] text-base leading-relaxed">
                {profile.bio}
              </p>
              <p className="text-[#64748B] text-base leading-relaxed">
                {profile.aboutText}
              </p>
            </div>

            {/* Premier Institutions Attended */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center space-x-2 text-[#12304A]">
                <GraduationCap className="w-5 h-5 text-[#0F9D92]" />
                <h4 className="text-lg font-bold">Medical Education &amp; Training Institutions</h4>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {verifiedInstitutions.map((inst, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#0F9D92] transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <p className="font-bold text-sm text-[#12304A]">{inst.name}</p>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-white border border-slate-200 text-[#0F9D92]">
                        {inst.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{inst.programs}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical Focus & Interests */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center space-x-2 text-[#12304A]">
                <BookOpen className="w-5 h-5 text-[#0F9D92]" />
                <h4 className="text-lg font-bold">Key Clinical Interests &amp; Subspecialties</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {clinicalInterests.map((interest, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-2 text-xs text-[#263238] p-2.5 rounded-lg bg-white border border-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0F9D92] shrink-0 mt-0.5" />
                    <span className="font-medium">{interest}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Institutional Appointments */}
            <div className="p-4 rounded-xl bg-[#F3F8FC] border border-[#0F9D92]/20 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#0F9D92] uppercase tracking-wider">
                  CURRENT INSTITUTIONAL APPOINTMENT
                </p>
                <p className="text-sm font-bold text-[#12304A] mt-0.5">
                  Director &amp; Senior Neurointensivist — Aspire Hospital, Bhubaneswar
                </p>
                <p className="text-xs text-slate-500">
                  Leading emergency trauma stabilization and multi-bed neurocritical ICU services.
                </p>
              </div>
              <Building2 className="w-8 h-8 text-[#0F9D92] shrink-0 ml-4 hidden sm:block" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
