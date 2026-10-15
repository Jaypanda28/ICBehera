'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CalendarDays,
  Clock,
  User,
  Phone,
  Mail,
  FileQuestion,
  CheckCircle2,
  AlertCircle,
  Copy,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Video,
  Hospital,
  Loader2,
} from 'lucide-react';
import { appointmentSchema, AppointmentFormData } from '@/lib/validations/appointment';

interface AppointmentSectionProps {
  onCheckStatusWithRef?: (ref: string) => void;
}

export default function AppointmentSection({ onCheckStatusWithRef }: AppointmentSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<any | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Stable default date for SSR/prerender: October 2026
  const [calendarMonth, setCalendarMonth] = useState<Date>(() => new Date(2026, 9, 1));
  const [todayDate, setTodayDate] = useState<Date>(() => new Date(2026, 9, 14));

  useEffect(() => {
    // Sync with real client time on mount
    const now = new Date();
    setCalendarMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    setTodayDate(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patientFullName: '',
      mobileNumber: '',
      email: '',
      preferredDate: '2026-10-16',
      preferredTimeSlot: '10:30 AM',
      consultationType: 'In-Person Consultation',
      shortReason: '',
      consentAgreed: false,
    },
  });

  const selectedDate = watch('preferredDate');
  const selectedSlot = watch('preferredTimeSlot');
  const selectedType = watch('consultationType');

  const timeSlots = [
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM',
    '05:00 PM',
    '05:30 PM',
    '06:00 PM',
    '06:30 PM',
    '07:00 PM',
    '07:30 PM',
  ];

  const consultationTypes: {
    type: AppointmentFormData['consultationType'];
    label: string;
    description: string;
    icon: any;
  }[] = [
    {
      type: 'In-Person Consultation',
      label: 'In-Person Consultation',
      description: 'At Aspire Hospital, Unit-6, Bhubaneswar',
      icon: Hospital,
    },
    {
      type: 'Teleconsultation / Video',
      label: 'Telemedicine Video',
      description: 'Secure remote video consultation',
      icon: Video,
    },
    {
      type: 'Follow-up',
      label: 'Follow-up Review',
      description: 'Post-discharge or previous prescription review',
      icon: CheckCircle2,
    },
    {
      type: 'Second Opinion',
      label: 'Second Opinion',
      description: 'Neurocritical & acute management review',
      icon: ShieldCheck,
    },
  ];

  // Generate days for the visual calendar
  const currentYear = calendarMonth.getFullYear();
  const currentMonthIdx = calendarMonth.getMonth();
  const firstDayOfWeek = new Date(currentYear, currentMonthIdx, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(currentYear, currentMonthIdx + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCalendarMonth(new Date(currentYear, currentMonthIdx - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarMonth(new Date(currentYear, currentMonthIdx + 1, 1));
  };

  const handleSelectDate = (day: number) => {
    const formattedMonth = String(currentMonthIdx + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const dateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;

    const testDate = new Date(currentYear, currentMonthIdx, day);
    if (testDate >= todayDate) {
      setValue('preferredDate', dateStr, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to submit appointment request.');
      }

      setSubmissionSuccess(result);
      reset();
    } catch (err: any) {
      setServerError(err.message || 'An error occurred while submitting your appointment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyReference = () => {
    if (submissionSuccess?.referenceNumber) {
      navigator.clipboard.writeText(submissionSuccess.referenceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="appointments" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0F9D92]/10 text-[#0F9D92] text-xs font-bold uppercase tracking-wider mb-3">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>APPOINTMENT REQUEST SYSTEM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12304A] tracking-tight">
            Schedule a Consultation with Dr. Ishwar Chandra Behera
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#64748B]">
            Select your preferred date, time slot, and consultation mode.
            Our clinical coordinator will review your request and confirm your appointment.
          </p>
        </div>

        {/* Success Modal / State */}
        {submissionSuccess ? (
          <div className="max-w-2xl mx-auto bg-[#F3F8FC] rounded-3xl p-8 sm:p-10 border-2 border-[#0F9D92] shadow-xl text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-teal-100 text-[#0F9D92] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 mb-2">
              Status: PENDING CLINICAL CONFIRMATION
            </span>

            <h3 className="text-2xl font-bold text-[#12304A]">
              Appointment Request Submitted!
            </h3>

            <p className="text-sm text-[#64748B] mt-2 max-w-md mx-auto">
              Your appointment request has been recorded in the clinical queue.
            </p>

            {/* Reference Number Card */}
            <div className="my-6 p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs max-w-sm mx-auto">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Appointment Reference Number
              </p>
              <div className="flex items-center justify-center space-x-2 mt-1">
                <span className="text-xl sm:text-2xl font-mono font-bold text-[#12304A]">
                  {submissionSuccess.referenceNumber}
                </span>
                <button
                  onClick={copyReference}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-[#0F9D92] hover:bg-slate-50 transition-colors"
                  title="Copy reference number"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              {copied && <span className="text-[11px] text-teal-600 font-medium">Copied to clipboard!</span>}
            </div>

            {/* Summary Details */}
            <div className="grid grid-cols-2 gap-3 text-left max-w-md mx-auto text-xs bg-white p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400 font-medium">Preferred Date:</span>
                <p className="font-bold text-[#12304A]">{submissionSuccess.preferredDate}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Time Slot:</span>
                <p className="font-bold text-[#12304A]">{submissionSuccess.preferredTimeSlot}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Consultation Type:</span>
                <p className="font-bold text-[#12304A]">{submissionSuccess.consultationType}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Clinic Facility:</span>
                <p className="font-bold text-[#12304A]">{submissionSuccess.clinicName}</p>
              </div>
            </div>

            {/* Mandatory Medical Disclaimer Notice */}
            <div className="mt-6 p-3 rounded-xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-900 flex items-start space-x-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">Important Notice:</strong> An appointment request must not
                be represented as confirmed until verified by the doctor or authorized clinic staff. You will
                receive a call or confirmation message on your provided phone number.
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setSubmissionSuccess(null)}
                className="px-6 py-2.5 rounded-xl bg-[#12304A] text-white text-xs font-semibold hover:bg-slate-800"
              >
                Submit Another Request
              </button>
              {onCheckStatusWithRef && (
                <button
                  onClick={() => onCheckStatusWithRef(submissionSuccess.referenceNumber)}
                  className="px-6 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-[#12304A] hover:bg-white"
                >
                  Track Request Status
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Main Interactive Booking Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 5 Cols: Visual Calendar & Time Slot Picker */}
            <div className="lg:col-span-5 bg-[#F3F8FC] p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-[#12304A] flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-[#0F9D92]" />
                    <span>Select Preferred Date</span>
                  </h3>
                  <span className="text-xs font-medium text-slate-500">
                    Step 1 of 3
                  </span>
                </div>

                {/* Calendar Controls */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-[#12304A]">
                      {calendarMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </span>
                    <div className="flex items-center space-x-1">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="p-1 rounded-lg text-slate-500 hover:bg-slate-100"
                        aria-label="Previous Month"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="p-1 rounded-lg text-slate-500 hover:bg-slate-100"
                        aria-label="Next Month"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Day Names */}
                  <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-slate-400 mb-2">
                    <span>Su</span>
                    <span>Mo</span>
                    <span>Tu</span>
                    <span>We</span>
                    <span>Th</span>
                    <span>Fr</span>
                    <span>Sa</span>
                  </div>

                  {/* Day Cells */}
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {/* Empty cells before month start */}
                    {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                      <div key={`empty-${i}`} className="h-8" />
                    ))}

                    {/* Month days */}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const dayNumber = i + 1;
                      const checkDate = new Date(currentYear, currentMonthIdx, dayNumber);
                      const isPast = checkDate < todayDate;
                      const isSunday = checkDate.getDay() === 0;

                      const formattedMonth = String(currentMonthIdx + 1).padStart(2, '0');
                      const formattedDay = String(dayNumber).padStart(2, '0');
                      const thisDateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;
                      const isSelected = selectedDate === thisDateStr;

                      return (
                        <button
                          key={dayNumber}
                          type="button"
                          disabled={isPast || isSunday}
                          onClick={() => handleSelectDate(dayNumber)}
                          className={`h-8 w-8 mx-auto rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-[#0F9D92] text-white shadow-xs font-bold'
                              : isPast || isSunday
                              ? 'text-slate-300 cursor-not-allowed'
                              : 'text-slate-700 hover:bg-teal-50 hover:text-[#0F9D92]'
                          }`}
                        >
                          {dayNumber}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {errors.preferredDate && (
                  <p className="text-xs text-rose-600 mt-1">{errors.preferredDate.message}</p>
                )}
              </div>

              {/* Time Slots Selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-[#12304A] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#0F9D92]" />
                    <span>Select Time Slot</span>
                  </h3>
                  <span className="text-xs font-medium text-slate-500">
                    Step 2 of 3
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setValue('preferredTimeSlot', slot, { shouldValidate: true })}
                        className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                          isSelected
                            ? 'bg-[#12304A] border-[#12304A] text-white shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-[#0F9D92]'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
                {errors.preferredTimeSlot && (
                  <p className="text-xs text-rose-600 mt-1">{errors.preferredTimeSlot.message}</p>
                )}
              </div>

              {/* Clinic Consultation Hours Notice */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-[#12304A]">Standard OPD Timings:</p>
                <p>• Morning OPD: 10:00 AM – 01:00 PM (Mon–Sat)</p>
                <p>• Evening OPD: 05:00 PM – 08:00 PM (Mon–Sat)</p>
                <p className="text-[11px] text-slate-400">Emergency &amp; Neuro-ICU on-call 24 hours.</p>
              </div>

            </div>

            {/* Right 7 Cols: Patient Details & Form Submission */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                <div>
                  <h3 className="text-lg font-bold text-[#12304A] mb-1">
                    Patient &amp; Consultation Information
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    Please provide accurate patient details so the clinic can coordinate your appointment.
                  </p>
                </div>

                {serverError && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{serverError}</span>
                  </div>
                )}

                {/* Consultation Type Selector */}
                <div>
                  <label className="block text-xs font-bold text-[#12304A] uppercase tracking-wider mb-2">
                    Consultation Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {consultationTypes.map((item) => {
                      const Icon = item.icon;
                      const isSelected = selectedType === item.type;
                      return (
                        <div
                          key={item.type}
                          onClick={() => setValue('consultationType', item.type)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start space-x-3 ${
                            isSelected
                              ? 'border-[#0F9D92] bg-teal-50/50 shadow-2xs ring-1 ring-[#0F9D92]'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-[#0F9D92] text-white' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#12304A]">{item.label}</p>
                            <p className="text-[11px] text-slate-500 leading-tight">{item.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Patient Full Name */}
                <div>
                  <label htmlFor="patientFullName" className="block text-xs font-bold text-[#12304A] uppercase tracking-wider mb-1">
                    Patient Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="patientFullName"
                      type="text"
                      placeholder="e.g. Ramesh Kumar Nayak"
                      {...register('patientFullName')}
                      className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border ${
                        errors.patientFullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                      } focus:outline-hidden focus:border-[#0F9D92] focus:ring-1 focus:ring-[#0F9D92]`}
                    />
                  </div>
                  {errors.patientFullName && (
                    <p className="text-xs text-rose-600 mt-1">{errors.patientFullName.message}</p>
                  )}
                </div>

                {/* Mobile Number & Email in 2 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="mobileNumber" className="block text-xs font-bold text-[#12304A] uppercase tracking-wider mb-1">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="mobileNumber"
                        type="tel"
                        placeholder="e.g. +91 94370 12345"
                        {...register('mobileNumber')}
                        className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border ${
                          errors.mobileNumber ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                        } focus:outline-hidden focus:border-[#0F9D92] focus:ring-1 focus:ring-[#0F9D92]`}
                      />
                    </div>
                    {errors.mobileNumber && (
                      <p className="text-xs text-rose-600 mt-1">{errors.mobileNumber.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-[#12304A] uppercase tracking-wider mb-1">
                      Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="email"
                        type="email"
                        placeholder="e.g. ramesh@example.com"
                        {...register('email')}
                        className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border ${
                          errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                        } focus:outline-hidden focus:border-[#0F9D92] focus:ring-1 focus:ring-[#0F9D92]`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-rose-600 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Short Reason for Appointment */}
                <div>
                  <label htmlFor="shortReason" className="block text-xs font-bold text-[#12304A] uppercase tracking-wider mb-1">
                    Reason for Consultation <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="shortReason"
                      rows={3}
                      placeholder="Briefly state symptoms, previous diagnoses (e.g. stroke follow-up, uncontrolled diabetes, head injury)..."
                      {...register('shortReason')}
                      className={`w-full p-3 text-xs sm:text-sm rounded-xl border ${
                        errors.shortReason ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                      } focus:outline-hidden focus:border-[#0F9D92] focus:ring-1 focus:ring-[#0F9D92]`}
                    />
                  </div>
                  {errors.shortReason && (
                    <p className="text-xs text-rose-600 mt-1">{errors.shortReason.message}</p>
                  )}
                </div>

                {/* Consent Checkbox */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <label className="flex items-start space-x-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('consentAgreed')}
                      className="mt-0.5 w-4 h-4 text-[#0F9D92] rounded border-slate-300 focus:ring-[#0F9D92]"
                    />
                    <span className="text-xs text-slate-600 leading-snug">
                      I understand that submitting this request does not guarantee immediate appointment confirmation.
                      I agree to the practice privacy policy and authorize clinic staff to contact me via phone or SMS.
                    </span>
                  </label>
                  {errors.consentAgreed && (
                    <p className="text-xs text-rose-600 mt-1 pl-6.5">{errors.consentAgreed.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#0F9D92] hover:bg-[#0c7f76] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Recording Request...</span>
                    </>
                  ) : (
                    <>
                      <CalendarDays className="w-5 h-5" />
                      <span>Confirm &amp; Request Appointment</span>
                    </>
                  )}
                </button>

              </form>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
