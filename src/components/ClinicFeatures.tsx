import React from 'react';
import Image from 'next/image';
import {
  Globe,
  CalendarCheck,
  ClipboardList,
  Video,
  CreditCard,
  FileText,
  Shield,
  Sparkles,
} from 'lucide-react';

export default function ClinicFeatures() {
  const features = [
    {
      title: 'Personalized Clinic Website',
      description: 'Modern, responsive, and trustworthy online presence tailored for Dr. Ishwar Chandra Behera’s practice.',
      icon: Globe,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      title: 'Patient Booking System',
      description: 'Streamlined online appointment scheduling with real-time slot selection and instant tracking reference.',
      icon: CalendarCheck,
      color: 'text-[#0F9D92] bg-teal-50',
    },
    {
      title: 'Clinic & Appointment Management',
      description: 'Integrated administrative control to confirm, reschedule, manage OPD queues, and record coordinator notes.',
      icon: ClipboardList,
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      title: 'Telemedicine & Video Consultation',
      description: 'Secure remote consultations for follow-ups, second opinions, and patient inquiries from anywhere.',
      icon: Video,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      title: 'Patient Records & Report Guidance',
      description: 'Structured appointment history and instructions for bringing pre-requisite MRI/CT neuro-imaging.',
      icon: FileText,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      title: 'Privacy & Data Protection',
      description: 'Strict adherence to medical data privacy standards, zero public leakage of personal health records.',
      icon: Shield,
      color: 'text-rose-600 bg-rose-50',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0F9D92]/10 text-[#0F9D92] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SMART DIGITAL CLINIC</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12304A] tracking-tight">
            Digital Solutions for Modern Healthcare
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#64748B]">
            Simplifying patient access, optimizing clinical coordination, and enhancing medical care delivery.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#F3F8FC] border border-slate-200/80 hover:border-[#0F9D92] hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color} mb-4 transition-transform group-hover:scale-110`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#12304A] group-hover:text-[#0F9D92] transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
