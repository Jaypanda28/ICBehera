'use client';

import React from 'react';
import {
  CalendarDays,
  UserCheck,
  FileText,
  FileCheck2,
  ArrowRight,
} from 'lucide-react';

interface QuickActionCardsProps {
  onOpenStatusModal: () => void;
  onOpenConsultModal?: () => void;
}

export default function QuickActionCards({
  onOpenStatusModal,
}: QuickActionCardsProps) {
  const actions = [
    {
      title: 'Book Appointment',
      subtitle: 'Online booking with real-time slot selection',
      icon: CalendarDays,
      iconBg: 'bg-blue-50 text-blue-600',
      actionType: 'link',
      href: '#appointments',
      btnText: 'Select Slot',
    },
    {
      title: 'Consult Doctor',
      subtitle: 'In-person OPD & Telemedicine video consults',
      icon: UserCheck,
      iconBg: 'bg-teal-50 text-[#0F9D92]',
      actionType: 'link',
      href: '#expertise',
      btnText: 'View Specialties',
    },
    {
      title: 'View Reports & Status',
      subtitle: 'Track your appointment with Reference ID',
      icon: FileText,
      iconBg: 'bg-indigo-50 text-indigo-600',
      actionType: 'modal',
      onClick: onOpenStatusModal,
      btnText: 'Check Status',
    },
    {
      title: 'Prescriptions & Records',
      subtitle: 'Guidance on medical reports & clinical records',
      icon: FileCheck2,
      iconBg: 'bg-emerald-50 text-emerald-600',
      actionType: 'link',
      href: '#contact',
      btnText: 'Clinic Helpdesk',
    },
  ];

  return (
    <div className="relative -mt-6 sm:-mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-[#0F9D92]"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.iconBg} transition-transform group-hover:scale-105`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#12304A] group-hover:text-[#0F9D92] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#64748B] mt-1 line-clamp-2 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100">
                {item.actionType === 'modal' ? (
                  <button
                    onClick={item.onClick}
                    className="w-full inline-flex items-center justify-between text-xs font-semibold text-[#12304A] hover:text-[#0F9D92] transition-colors"
                  >
                    <span>{item.btnText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className="w-full inline-flex items-center justify-between text-xs font-semibold text-[#12304A] hover:text-[#0F9D92] transition-colors"
                  >
                    <span>{item.btnText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
