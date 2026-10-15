import React from 'react';
import Image from 'next/image';
import {
  CalendarCheck,
  UserCheck,
  Award,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';
import { DoctorProfile } from '@/lib/db/types';

interface HeroProps {
  profile: DoctorProfile;
}

export default function Hero({ profile }: HeroProps) {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-[#F3F8FC] to-white pt-8 pb-16 lg:py-20">
      {/* Decorative background grid and blurs */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0F9D92]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#12304A]/5 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
            
            {/* Small Label with Verified Icon */}
            <div className="inline-flex items-center space-x-2 w-fit px-3 py-1.5 rounded-full bg-white border border-[#0F9D92]/30 text-[#12304A] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#0F9D92] animate-ping" />
              <span className="text-xs font-bold tracking-wider text-[#0F9D92] uppercase">
                PROFESSIONAL MEDICAL CARE
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-xs text-[#64748B] flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0F9D92]" /> Verified Clinician
              </span>
            </div>

            {/* Main Heading & Qualifications */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12304A] tracking-tight leading-tight">
                {profile.fullName || 'Dr. Ishwar Chandra Behera'}
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-[#0F9D92]">
                Committed to Compassionate, Evidence-Based Care
              </p>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">
                <span className="inline-block bg-slate-100 px-2.5 py-1 rounded text-slate-700 mr-2 mb-1">
                  {profile.degrees || 'MBBS, MD, FAEM, FCCM, DFID'}
                </span>
                <span className="text-slate-500">
                  Senior Neurointensivist &amp; Emergency Specialist
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-2xl">
              Explore the doctor&apos;s professional background, medical qualifications,
              areas of expertise, and consultation information. Providing advanced
              neurocritical care, emergency trauma management, and comprehensive internal medicine.
            </p>

            {/* Quick Highlights / Affiliations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-[#263238]">
              <div className="flex items-center space-x-2.5 bg-white p-2.5 rounded-lg border border-slate-200/80 shadow-2xs">
                <div className="w-8 h-8 rounded-md bg-[#0F9D92]/10 flex items-center justify-center text-[#0F9D92] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-[#12304A]">Aspire Hospital, Bhubaneswar</p>
                  <p className="text-xs text-slate-500">Director &amp; Senior Consultant</p>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 bg-white p-2.5 rounded-lg border border-slate-200/80 shadow-2xs">
                <div className="w-8 h-8 rounded-md bg-[#12304A]/10 flex items-center justify-center text-[#12304A] shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-[#12304A]">CMC Vellore Trained</p>
                  <p className="text-xs text-slate-500">Fellow in Neurocritical &amp; Emergency Care</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#appointments"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#0F9D92] hover:bg-[#0c7f76] text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 group"
              >
                <CalendarCheck className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                Book an Appointment
              </a>

              <a
                href="#about"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#12304A] border border-slate-300 font-semibold text-sm sm:text-base shadow-2xs hover:shadow transition-all"
              >
                <UserCheck className="w-5 h-5 mr-2 text-[#0F9D92]" />
                Explore Professional Profile
              </a>
            </div>

            {/* Quick stats counter */}
            <div className="pt-4 border-t border-slate-200/60 flex items-center space-x-8 text-left">
              <div>
                <p className="text-2xl font-bold text-[#12304A]">15+ Years</p>
                <p className="text-xs text-slate-500">Clinical Experience</p>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <p className="text-2xl font-bold text-[#0F9D92]">1000s</p>
                <p className="text-xs text-slate-500">ICU &amp; Trauma Cases Managed</p>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <p className="text-2xl font-bold text-[#12304A]">OMC Reg.</p>
                <p className="text-xs text-slate-500">Verified Medical License</p>
              </div>
            </div>

          </div>

          {/* Right Hero Image Column (Authentic Portrait) */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative max-w-sm sm:max-w-md w-full">
              
              {/* Outer Decorative Glow & Borders */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#0F9D92]/20 to-[#12304A]/10 rounded-3xl blur-lg" />
              
              <div className="relative rounded-3xl overflow-hidden bg-white p-2 border-2 border-slate-100 shadow-xl">
                {/* Doctor Portrait Image */}
                <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden bg-slate-50">
                  <Image
                    src={profile.portraitUrl || '/images/dr-ishwar-chandra-behera.jpg'}
                    alt="Dr. Ishwar Chandra Behera - Senior Neurointensivist & Emergency Medicine Specialist"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover object-top hover:scale-102 transition-transform duration-500"
                  />
                  
                  {/* Subtle Gradient Overlay at Bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#12304A]/80 via-[#12304A]/30 to-transparent" />
                  
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <p className="font-bold text-base tracking-tight">
                      {profile.fullName}
                    </p>
                    <p className="text-xs text-teal-200">
                      {profile.designation}
                    </p>
                  </div>
                </div>

                {/* Floating Verified Badge Bottom Right */}
                <div className="absolute -bottom-4 right-4 bg-white px-4 py-2 rounded-xl shadow-lg border border-slate-100 flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-[#0F9D92]/10 flex items-center justify-center text-[#0F9D92]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-[#12304A]">Aspire Hospital</p>
                    <p className="text-[10px] text-slate-500">Director &amp; Neurointensivist</p>
                  </div>
                </div>

                {/* Floating Response Badge Top Left */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg shadow-sm border border-slate-200/80 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-semibold text-slate-700">
                    Accepting New Consultations
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
