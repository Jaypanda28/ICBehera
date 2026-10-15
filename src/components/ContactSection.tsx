import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  PhoneCall,
  Building2,
  CalendarCheck,
} from 'lucide-react';
import { ClinicLocation, ConsultationHour } from '@/lib/db/types';

interface ContactSectionProps {
  locations: ClinicLocation[];
  consultationHours: ConsultationHour[];
}

export default function ContactSection({
  locations,
  consultationHours,
}: ContactSectionProps) {
  const primaryLocation = locations.find((l) => l.isPrimary) || locations[0];
  const secondaryLocation = locations.find((l) => !l.isPrimary);

  return (
    <section id="contact" className="py-20 bg-[#F3F8FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0F9D92]/10 text-[#0F9D92] text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>PRACTICE LOCATIONS &amp; CONSULTATION HOURS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12304A] tracking-tight">
            Consultation Facilities &amp; Contact Details
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#64748B]">
            In-person neurocritical and internal medicine consultations at Aspire Hospital,
            Bhubaneswar, with academic affiliations at IMS and SUM Hospital.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 7 Cols: Location Cards & Action Buttons */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Primary Location Card (Aspire Hospital) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <span className="text-[11px] font-bold text-[#0F9D92] uppercase tracking-wider">
                    PRIMARY CLINICAL APPOINTMENT &amp; OPD
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#12304A]">
                    {primaryLocation?.name || 'Aspire Hospital'}
                  </h3>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-50 text-[#0F9D92] border border-teal-100">
                  {primaryLocation?.facilityType || 'Multispecialty Hospital'}
                </span>
              </div>

              {/* Address */}
              <div className="space-y-3 text-xs sm:text-sm text-[#263238] mb-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#0F9D92] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">{primaryLocation?.addressLine1}</p>
                    <p>{primaryLocation?.addressLine2}, {primaryLocation?.landmark}</p>
                    <p>{primaryLocation?.city}, {primaryLocation?.state} – {primaryLocation?.postalCode}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-2">
                  <Phone className="w-4 h-4 text-[#0F9D92] shrink-0" />
                  <div>
                    <span className="font-medium text-slate-500 mr-2">OPD / Appointments:</span>
                    <a
                      href={`tel:${primaryLocation?.phonePrimary}`}
                      className="font-bold text-[#12304A] hover:text-[#0F9D92] transition-colors"
                    >
                      {primaryLocation?.phonePrimary}
                    </a>
                    {primaryLocation?.phoneSecondary && (
                      <>
                        <span className="mx-2 text-slate-300">|</span>
                        <a
                          href={`tel:${primaryLocation?.phoneSecondary}`}
                          className="font-bold text-[#12304A] hover:text-[#0F9D92] transition-colors"
                        >
                          {primaryLocation?.phoneSecondary}
                        </a>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <PhoneCall className="w-4 h-4 text-rose-500 shrink-0" />
                  <div>
                    <span className="font-medium text-rose-600 mr-2">24/7 ICU &amp; Emergency:</span>
                    <a
                      href={`tel:${primaryLocation?.emergencyPhone}`}
                      className="font-bold text-rose-600 hover:underline"
                    >
                      {primaryLocation?.emergencyPhone}
                    </a>
                    {primaryLocation?.ambulancePhone && (
                      <>
                        <span className="mx-2 text-slate-300">|</span>
                        <span className="text-slate-500 text-xs">Ambulance: </span>
                        <a
                          href={`tel:${primaryLocation?.ambulancePhone}`}
                          className="font-bold text-slate-700 hover:text-[#0F9D92]"
                        >
                          {primaryLocation?.ambulancePhone}
                        </a>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-[#0F9D92] shrink-0" />
                  <div>
                    <span className="font-medium text-slate-500 mr-2">Email:</span>
                    <a
                      href={`mailto:${primaryLocation?.email}`}
                      className="font-semibold text-[#12304A] hover:text-[#0F9D92]"
                    >
                      {primaryLocation?.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${primaryLocation?.phonePrimary}`}
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#12304A] hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 mr-2" />
                  Call the Clinic
                </a>

                <a
                  href={`mailto:${primaryLocation?.email}`}
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-[#12304A] text-xs font-bold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 mr-2 text-[#0F9D92]" />
                  Email the Clinic
                </a>

                {primaryLocation?.googleMapsDirectionsUrl && (
                  <a
                    href={primaryLocation.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#0F9D92] text-xs font-bold border border-teal-200 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 mr-2" />
                    Get Directions
                  </a>
                )}
              </div>
            </div>

            {/* Secondary Academic Affiliation Card (IMS and SUM Hospital) */}
            {secondaryLocation && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  <Building2 className="w-3.5 h-3.5 text-[#12304A]" />
                  <span>ACADEMIC &amp; CLINICAL AFFILIATION</span>
                </div>
                <h4 className="text-base font-bold text-[#12304A]">
                  {secondaryLocation.name}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  {secondaryLocation.addressLine1}, {secondaryLocation.addressLine2}, {secondaryLocation.city} – {secondaryLocation.postalCode}
                </p>
                <p className="text-xs text-[#64748B] mt-1">
                  Former Faculty &amp; Senior Consultant in Critical Care &amp; Clinical Medicine.
                </p>
              </div>
            )}

            {/* Consultation Hours Table */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
              <div className="flex items-center space-x-2 mb-4 text-[#12304A]">
                <Clock className="w-5 h-5 text-[#0F9D92]" />
                <h4 className="text-base font-bold">Doctor Consultation Schedule</h4>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {consultationHours.map((ch) => (
                  <div key={ch.id} className="py-2.5 flex items-center justify-between">
                    <span className="font-bold text-[#12304A] w-28">{ch.dayOfWeek}</span>
                    {ch.isAvailable ? (
                      <div className="text-slate-600 text-right">
                        <span>{ch.morningStartTime} – {ch.morningEndTime}</span>
                        <span className="mx-2 text-slate-300">|</span>
                        <span>{ch.eveningStartTime} – {ch.eveningEndTime}</span>
                      </div>
                    ) : (
                      <span className="text-amber-600 font-medium text-right">
                        {ch.notes || 'Emergency on-call only'}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right 5 Cols: Interactive Google Maps Embed */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-3 border border-slate-200 shadow-md overflow-hidden">
              <div className="relative aspect-4/3 sm:aspect-square w-full rounded-2xl overflow-hidden bg-slate-100">
                <iframe
                  title="Aspire Hospital Ganga Nagar Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.6071477717013!2d85.8175!3d20.2743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a795b28b7e2d%3A0xb308a01103c8b417!2sAspire%20Hospitals!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              <div className="p-4 text-center">
                <p className="text-xs font-bold text-[#12304A]">
                  Aspire Hospital — Ganga Nagar, Unit-6, Bhubaneswar
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Centrally accessible near Ekamra Road, with 24/7 emergency ramp &amp; dedicated patient parking.
                </p>
                <a
                  href="https://maps.google.com/?q=Aspire+Hospital+Ganga+Nagar+Bhubaneswar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center text-xs font-bold text-[#0F9D92] hover:text-[#0c7f76]"
                >
                  <Navigation className="w-3.5 h-3.5 mr-1" />
                  Open in Google Maps Application
                </a>
              </div>
            </div>

            {/* Quick emergency notice box */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start space-x-2.5">
              <PhoneCall className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">Urgent Medical Triage:</strong> For patients requiring
                immediate critical care, acute stroke clot-busting protocols, or mechanical ventilation,
                please notify the Aspire Hospital emergency desk prior to arrival: <strong>0674-2596596</strong>.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
