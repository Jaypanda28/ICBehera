'use client';

import React, { useState } from 'react';
import {
  Activity,
  Zap,
  HeartPulse,
  Stethoscope,
  ArrowRight,
  CheckCircle2,
  X,
  ShieldCheck,
} from 'lucide-react';
import { Specialty } from '@/lib/db/types';

interface SpecialtiesSectionProps {
  specialties: Specialty[];
}

export default function SpecialtiesSection({ specialties }: SpecialtiesSectionProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity':
        return <Activity className="w-7 h-7 text-[#0F9D92]" />;
      case 'Zap':
        return <Zap className="w-7 h-7 text-amber-500" />;
      case 'HeartPulse':
        return <HeartPulse className="w-7 h-7 text-rose-500" />;
      case 'Stethoscope':
      default:
        return <Stethoscope className="w-7 h-7 text-[#12304A]" />;
    }
  };

  return (
    <section id="expertise" className="py-20 bg-[#F3F8FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0F9D92]/10 text-[#0F9D92] text-xs font-bold uppercase tracking-wider mb-3">
            <Activity className="w-3.5 h-3.5" />
            <span>CLINICAL EXCELLENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12304A] tracking-tight">
            Verified Areas of Clinical Expertise
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#64748B]">
            Evidence-based medical care specializing in neurocritical emergencies,
            advanced trauma life support, intensive care unit management, and chronic metabolic diseases.
          </p>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialties.map((spec) => (
            <div
              key={spec.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-[#0F9D92] hover:-translate-y-1"
            >
              <div>
                {/* Icon & Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center transition-transform group-hover:scale-110">
                    {getIcon(spec.iconName)}
                  </div>
                  <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-[#0F9D92] border border-teal-100">
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    Verified
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#12304A] group-hover:text-[#0F9D92] transition-colors mb-2">
                  {spec.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-4">
                  {spec.shortDescription}
                </p>

                {spec.conditionsTreated && (
                  <div className="mb-4">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Key Conditions Managed:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {spec.conditionsTreated
                        .split(',')
                        .slice(0, 3)
                        .map((cond, i) => (
                          <span
                            key={i}
                            className="text-[11px] bg-slate-50 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                          >
                            {cond.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => setSelectedSpecialty(spec)}
                  className="w-full inline-flex items-center justify-between text-xs font-semibold text-[#0F9D92] hover:text-[#0c7f76] transition-colors py-1 group/btn"
                >
                  <span>Learn More &amp; Conditions</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Informational Callout */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-200 text-center max-w-4xl mx-auto shadow-2xs">
          <p className="text-xs sm:text-sm text-[#64748B]">
            <strong className="text-[#12304A]">Consultation Note:</strong> Consultations for
            neurocritical follow-ups, internal medicine, and diabetology are scheduled during regular OPD
            hours. For acute stroke or trauma emergencies, please access the 24/7 Emergency Department
            at Aspire Hospital.
          </p>
        </div>

      </div>

      {/* Specialty Detail Modal */}
      {selectedSpecialty && (
        <div className="fixed inset-0 z-50 bg-[#12304A]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 border border-slate-100">
            <button
              onClick={() => setSelectedSpecialty(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
                {getIcon(selectedSpecialty.iconName)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#12304A]">
                  {selectedSpecialty.name}
                </h3>
                <p className="text-xs text-[#0F9D92] font-semibold">
                  Clinical Specialty Profile
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-[#263238] leading-relaxed my-4">
              <p>{selectedSpecialty.detailedDescription || selectedSpecialty.shortDescription}</p>

              {selectedSpecialty.conditionsTreated && (
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Scope of Treatment &amp; Conditions:
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedSpecialty.conditionsTreated.split(',').map((item, idx) => (
                      <li key={idx} className="flex items-center text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0F9D92] mr-2 shrink-0" />
                        <span>{item.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
              <button
                onClick={() => setSelectedSpecialty(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <a
                href="#appointments"
                onClick={() => setSelectedSpecialty(null)}
                className="px-5 py-2.5 rounded-xl bg-[#0F9D92] text-white text-xs font-semibold hover:bg-[#0c7f76] shadow-xs"
              >
                Request Appointment for this Specialty
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
