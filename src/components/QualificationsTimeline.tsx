import React from 'react';
import {
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Calendar,
  Building,
} from 'lucide-react';
import { Qualification, Experience } from '@/lib/db/types';

interface QualificationsTimelineProps {
  qualifications: Qualification[];
  experience: Experience[];
}

export default function QualificationsTimeline({
  qualifications,
  experience,
}: QualificationsTimelineProps) {
  return (
    <section id="qualifications" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0F9D92]/10 text-[#0F9D92] text-xs font-bold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC &amp; CLINICAL MILESTONES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12304A] tracking-tight">
            Qualifications &amp; Professional Experience
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#64748B]">
            A documented chronological record of medical degrees, specialized post-doctoral
            fellowships, and hospital appointments.
          </p>
        </div>

        {/* Dual Column Layout: Qualifications Timeline on Left, Experience Timeline on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Medical Qualifications Column */}
          <div>
            <div className="flex items-center space-x-3 mb-8 pb-3 border-b border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-[#0F9D92]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#12304A]">Medical Qualifications</h3>
                <p className="text-xs text-slate-500">Degrees &amp; Post-Doctoral Fellowships</p>
              </div>
            </div>

            {/* Vertical Timeline */}
            <div className="relative pl-6 sm:pl-8 border-l-2 border-[#0F9D92]/30 space-y-8">
              {qualifications.map((qual) => (
                <div key={qual.id} className="relative group">
                  {/* Timeline Node Point */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#0F9D92] group-hover:scale-125 transition-transform" />

                  {/* Card Content */}
                  <div className="bg-[#F3F8FC] rounded-2xl p-5 border border-slate-200/80 hover:border-[#0F9D92] transition-colors shadow-2xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <span className="text-sm sm:text-base font-bold text-[#12304A]">
                        {qual.degree}
                      </span>
                      {qual.yearCompleted && (
                        <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-[#0F9D92]">
                          <Calendar className="w-3 h-3 mr-1" />
                          {qual.yearCompleted}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-[#0F9D92] mb-1">
                      {qual.institution}
                    </p>

                    {qual.fieldOfStudy && (
                      <p className="text-xs text-slate-500 mb-2">
                        Specialty: {qual.fieldOfStudy}
                      </p>
                    )}

                    {qual.description && (
                      <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 pt-2 mt-2">
                        {qual.description}
                      </p>
                    )}

                    <div className="mt-3 flex items-center text-[11px] font-medium text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                      <span>{qual.verificationStatus}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Experience Column */}
          <div>
            <div className="flex items-center space-x-3 mb-8 pb-3 border-b border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#12304A]">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#12304A]">Clinical Experience</h3>
                <p className="text-xs text-slate-500">Hospital Appointments &amp; Academic Posts</p>
              </div>
            </div>

            {/* Vertical Timeline */}
            <div className="relative pl-6 sm:pl-8 border-l-2 border-[#12304A]/30 space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="relative group">
                  {/* Timeline Node Point */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#12304A] group-hover:scale-125 transition-transform" />

                  {/* Card Content */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-[#12304A] transition-colors shadow-2xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <span className="text-sm sm:text-base font-bold text-[#12304A]">
                        {exp.role}
                      </span>
                      <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {exp.isCurrent ? (
                          <span className="flex items-center text-emerald-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                            {exp.startYear} – Present
                          </span>
                        ) : (
                          `${exp.startYear} – ${exp.endYear || ''}`
                        )}
                      </span>
                    </div>

                    <div className="flex items-center text-xs sm:text-sm font-semibold text-[#0F9D92] mb-1">
                      <Building className="w-3.5 h-3.5 mr-1" />
                      <span>{exp.institution}</span>
                    </div>

                    <p className="text-xs text-slate-500 mb-2">
                      Location: {exp.location}
                    </p>

                    {exp.responsibilities && (
                      <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2 mt-2">
                        {exp.responsibilities}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
