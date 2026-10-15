'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Stethoscope,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Lock,
  X,
  AlertCircle,
} from 'lucide-react';

export default function Footer() {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'disclaimer' | null>(null);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Doctor', href: '#about' },
    { name: 'Areas of Expertise', href: '#expertise' },
    { name: 'Qualifications', href: '#qualifications' },
    { name: 'Research Publications', href: '#research' },
    { name: 'Book Appointment', href: '#appointments' },
    { name: 'Contact & Directions', href: '#contact' },
  ];

  return (
    <footer className="bg-[#12304A] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Doctor Profile & Credentials (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#0F9D92] flex items-center justify-center font-bold text-white shadow-xs">
                IB
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight">
                  Dr. Ishwar Chandra Behera
                </span>
                <p className="text-xs text-teal-300">
                  MBBS, MD (General Medicine), FAEM, FCCM, DFID
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pr-6">
              Senior Neurointensivist &amp; Emergency Medicine Specialist. Dedicated to
              compassionate, evidence-based critical care, neuro-trauma resuscitation, and
              comprehensive metabolic health.
            </p>

            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#0F9D92]" />
              <span>Odisha Medical Council Verified Practitioner (Reg: OMC-41289)</span>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-teal-300 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Verified Hospital Affiliation & Emergency (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Practice Location
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#0F9D92] shrink-0 mt-0.5" />
                <span>
                  Aspire Hospital, Plot No: 163, 208, Ekamra Road, Unit-6, Ganga Nagar, Bhubaneswar – 751001, Odisha
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#0F9D92] shrink-0" />
                <span>OPD: +91 82605 00020 / +91 82605 00030</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="text-rose-300 font-semibold">24/7 Emergency: 0674-2596596</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#0F9D92] shrink-0" />
                <span>info@aspirehospital.co.in</span>
              </div>
            </div>
          </div>

        </div>

        {/* Mandatory Medical Disclaimer (VERBATIM from prompt) */}
        <div className="py-8 border-b border-slate-800 text-xs text-slate-400 leading-relaxed text-center sm:text-left">
          <div className="max-w-4xl mx-auto flex items-start space-x-3">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-200">Medical Disclaimer: </strong>
              The information on this website is provided for general informational purposes and does not replace
              professional medical consultation, diagnosis, or treatment. For medical emergencies, contact local emergency services.
            </div>
          </div>
        </div>

        {/* Copyright, Policy Links & Admin Login */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; 2026 Dr. Ishwar Chandra Behera. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActiveModal('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveModal('terms')}
              className="hover:text-white transition-colors"
            >
              Terms of Use
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveModal('disclaimer')}
              className="hover:text-white transition-colors"
            >
              Clinical Disclaimers
            </button>
            <span>•</span>
            <Link
              href="/admin/login"
              className="inline-flex items-center text-teal-400 hover:text-white font-medium transition-colors"
            >
              <Lock className="w-3 h-3 mr-1" />
              Staff Login
            </Link>
          </div>
        </div>

      </div>

      {/* Legal & Policy Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-[#12304A]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-[#263238] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === 'privacy' && (
              <div className="space-y-4 text-xs leading-relaxed">
                <h3 className="text-lg font-bold text-[#12304A]">Privacy Policy</h3>
                <p>
                  We prioritize patient confidentiality and personal health data privacy in compliance with
                  the Indian Medical Council Professional Conduct Regulations and national health data frameworks.
                </p>
                <h4 className="font-bold text-slate-700">1. Information Collection</h4>
                <p>
                  We collect strictly necessary contact and appointment request details (Name, Phone number, Email,
                  and preferred consultation times) to coordinate your clinical schedule.
                </p>
                <h4 className="font-bold text-slate-700">2. Medical Confidentiality</h4>
                <p>
                  No clinical consultation logs, diagnostic evaluations, or medical histories submitted through
                  the website are shared with third parties or advertisers.
                </p>
                <h4 className="font-bold text-slate-700">3. Contact</h4>
                <p>For privacy queries, please reach us at info@aspirehospital.co.in.</p>
              </div>
            )}

            {activeModal === 'terms' && (
              <div className="space-y-4 text-xs leading-relaxed">
                <h3 className="text-lg font-bold text-[#12304A]">Terms of Use</h3>
                <p>
                  By accessing and utilizing this medical profile and appointment portal, you agree to these terms:
                </p>
                <h4 className="font-bold text-slate-700">1. Not Emergency Treatment</h4>
                <p>
                  This portal is intended for non-acute OPD scheduling. If you or a loved one is experiencing signs
                  of acute stroke (facial drooping, arm weakness, speech difficulty), chest pain, or trauma,
                  call emergency services immediately or report directly to the emergency department.
                </p>
                <h4 className="font-bold text-slate-700">2. Request Confirmation</h4>
                <p>
                  An appointment submission constitutes a request and must be validated by practice staff
                  before being confirmed.
                </p>
              </div>
            )}

            {activeModal === 'disclaimer' && (
              <div className="space-y-4 text-xs leading-relaxed">
                <h3 className="text-lg font-bold text-[#12304A]">Medical Disclaimers</h3>
                <p>
                  The information on this website is provided for general informational purposes and does not replace
                  professional medical consultation, diagnosis, or treatment. For medical emergencies, contact local emergency services.
                </p>
                <p>
                  Dr. Ishwar Chandra Behera’s medical qualifications and publications represent verified academic
                  and professional achievements. Individual health outcomes depend on personalized clinical examinations.
                </p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100 text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 rounded-xl bg-[#12304A] text-white text-xs font-semibold hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
