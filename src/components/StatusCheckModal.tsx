'use client';

import React, { useState } from 'react';
import {
  Search,
  X,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Calendar,
  Building,
  Loader2,
} from 'lucide-react';

interface StatusCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRef?: string;
}

export default function StatusCheckModal({
  isOpen,
  onClose,
  initialRef = '',
}: StatusCheckModalProps) {
  const [refInput, setRefInput] = useState(initialRef);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refInput.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/appointments/${encodeURIComponent(refInput.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'No appointment found with this reference number.');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to locate appointment record.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
          </span>
        );
      case 'Completed':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" /> Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
      case 'Pending':
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Pending Review
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#12304A]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 border border-slate-100">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0F9D92] flex items-center justify-center shrink-0">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#12304A]">Track Appointment</h3>
            <p className="text-xs text-slate-500">
              Verify your booking status &amp; coordinator notes
            </p>
          </div>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-bold text-[#12304A] uppercase tracking-wider mb-1">
              Reference Number
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. APT-2026-1042"
                value={refInput}
                onChange={(e) => setRefInput(e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm uppercase font-mono rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0F9D92] focus:ring-1 focus:ring-[#0F9D92]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !refInput.trim()}
            className="w-full py-2.5 rounded-xl bg-[#12304A] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Checking Records...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Lookup Appointment Status</span>
              </>
            )}
          </button>
        </form>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start space-x-2 mb-4">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Result Card */}
        {result && (
          <div className="p-4 rounded-2xl bg-[#F3F8FC] border border-slate-200 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Reference
                </span>
                <p className="font-mono font-bold text-sm text-[#12304A]">
                  {result.referenceNumber}
                </p>
              </div>
              <div>{getStatusBadge(result.status)}</div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-400 font-medium">Patient:</span>
                <p className="font-bold text-slate-700">{result.patientInitials}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Type:</span>
                <p className="font-bold text-slate-700">{result.consultationType}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Date:</span>
                <p className="font-bold text-slate-700">{result.preferredDate}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Time Slot:</span>
                <p className="font-bold text-slate-700">{result.preferredTimeSlot}</p>
              </div>
            </div>

            {result.adminNotes && (
              <div className="p-3 rounded-xl bg-white border border-teal-100 text-xs text-slate-700 mt-2">
                <p className="font-bold text-[#0F9D92] mb-0.5">Clinic Coordinator Note:</p>
                <p>{result.adminNotes}</p>
              </div>
            )}

            <div className="text-[11px] text-slate-500 pt-1">
              Location: Aspire Hospital, Unit-6, Ganga Nagar, Bhubaneswar.
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
