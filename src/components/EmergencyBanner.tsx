import React from 'react';
import { PhoneCall, AlertCircle, Clock } from 'lucide-react';

export default function EmergencyBanner() {
  return (
    <div className="bg-[#12304A] text-white text-xs sm:text-sm border-b border-[#0F9D92]/30 py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-[#0F9D92] text-white animate-subtle-pulse">
            24/7 EMERGENCY
          </span>
          <span className="hidden md:inline text-slate-300">
            Acute Stroke &amp; Critical Care Resuscitation:
          </span>
          <a
            href="tel:06742596596"
            className="font-medium text-teal-300 hover:text-white transition-colors flex items-center gap-1"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            0674-2596596
          </a>
          <span className="text-slate-400">|</span>
          <a
            href="tel:+918260500020"
            className="font-medium text-teal-300 hover:text-white transition-colors"
          >
            +91 82605 00020
          </a>
        </div>

        <div className="flex items-center space-x-4 text-xs text-slate-300">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-teal-400" />
            <span>OPD: Mon–Sat 10:00 AM – 1:00 PM &amp; 5:00 PM – 8:00 PM</span>
          </span>
          <span className="hidden lg:inline text-slate-400">
            Location: Aspire Hospital, Ganga Nagar, Bhubaneswar
          </span>
        </div>
      </div>
    </div>
  );
}
