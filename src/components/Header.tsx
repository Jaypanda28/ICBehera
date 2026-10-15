'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  CalendarCheck,
  Search,
  ShieldCheck,
  Stethoscope,
  ChevronRight,
} from 'lucide-react';

interface HeaderProps {
  onOpenStatusModal?: () => void;
}

export default function Header({ onOpenStatusModal }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Doctor', href: '#about' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Qualifications', href: '#qualifications' },
    { name: 'Research', href: '#research' },
    { name: 'Appointments', href: '#appointments' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
          : 'bg-white border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Doctor Monogram & Logo */}
          <Link href="#home" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-[#12304A] text-white flex items-center justify-center font-bold shadow-sm group-hover:bg-[#0F9D92] transition-colors relative">
              <span className="text-lg tracking-wider">IB</span>
              <div className="absolute -bottom-1 -right-1 bg-[#0F9D92] rounded-full p-0.5 text-white">
                <Stethoscope className="w-3 h-3" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="text-base sm:text-lg font-bold text-[#12304A] tracking-tight group-hover:text-[#0F9D92] transition-colors">
                  Dr. Ishwar Chandra Behera
                </span>
                <ShieldCheck className="w-4 h-4 text-[#0F9D92]" aria-label="Verified Doctor" />
              </div>
              <span className="text-xs text-[#64748B] font-medium hidden sm:inline">
                Senior Neurointensivist &amp; Emergency Specialist | MD, FAEM, FCCM
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#263238] hover:text-[#0F9D92] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#0F9D92] hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            {onOpenStatusModal && (
              <button
                onClick={onOpenStatusModal}
                className="inline-flex items-center text-xs font-semibold px-3 py-2 rounded-lg border border-slate-200 text-[#12304A] hover:bg-slate-50 transition-colors"
                title="Check existing appointment status"
              >
                <Search className="w-3.5 h-3.5 mr-1.5 text-[#0F9D92]" />
                Check Status
              </button>
            )}

            <a
              href="#appointments"
              className="inline-flex items-center text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-lg bg-[#0F9D92] hover:bg-[#0c7f76] text-white shadow-sm hover:shadow transition-all group"
            >
              <CalendarCheck className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
              Book Appointment
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center space-x-2">
            <a
              href="#appointments"
              className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#0F9D92] text-white"
            >
              Book
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-[#0F9D92] hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-[#263238] hover:bg-teal-50 hover:text-[#0F9D92] transition-colors"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              {onOpenStatusModal && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenStatusModal();
                  }}
                  className="w-full flex items-center justify-center py-2.5 text-sm font-semibold rounded-lg border border-slate-200 text-[#12304A] hover:bg-slate-50"
                >
                  <Search className="w-4 h-4 mr-2 text-[#0F9D92]" />
                  Check Appointment Status
                </button>
              )}
              <a
                href="#appointments"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center py-2.5 text-sm font-semibold rounded-lg bg-[#0F9D92] text-white hover:bg-[#0c7f76]"
              >
                <CalendarCheck className="w-4 h-4 mr-2" />
                Book an Appointment
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
