'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  CalendarCheck,
  User,
  Activity,
  GraduationCap,
  BookOpen,
  Clock,
  LogOut,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Edit,
  Save,
  Loader2,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import {
  Appointment,
  DoctorProfile,
  Specialty,
  Qualification,
  Publication,
  ConsultationHour,
} from '@/lib/db/types';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'appointments' | 'profile' | 'specialties' | 'qualifications' | 'publications'>('appointments');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);

  // Data states
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [profile, setProfile] = useState<DoctorProfile | null>(null);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);

  // Appointment filters
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<string | null>(null);

  // Profile edit form state
  const [profileForm, setProfileForm] = useState<Partial<DoctorProfile>>({});
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);

  // New Specialty Form Modal
  const [showAddSpecialty, setShowAddSpecialty] = useState(false);
  const [newSpecialty, setNewSpecialty] = useState({
    name: '',
    shortDescription: '',
    iconName: 'Activity',
    conditionsTreated: '',
    isActive: true,
  });

  // New Qualification Form Modal
  const [showAddQual, setShowAddQual] = useState(false);
  const [newQual, setNewQual] = useState({
    degree: '',
    fieldOfStudy: '',
    institution: '',
    yearCompleted: 2024,
    description: '',
  });

  // New Publication Form Modal
  const [showAddPub, setShowAddPub] = useState(false);
  const [newPub, setNewPub] = useState({
    title: '',
    journal: '',
    publicationYear: 2024,
    authors: 'Dr. Ishwar Chandra Behera et al.',
    abstractSummary: '',
    pmid: '',
    doi: '',
    pubmedUrl: '',
  });

  // Verify Auth on mount
  useEffect(() => {
    async function checkAuthAndLoadData() {
      try {
        const meRes = await fetch('/api/admin/auth/me');
        if (!meRes.ok) {
          router.push('/admin/login');
          return;
        }
        const meData = await meRes.json();
        setUser(meData.user);

        // Load all data
        const [aptRes, docRes] = await Promise.all([
          fetch('/api/appointments'),
          fetch('/api/doctor-data'),
        ]);

        if (aptRes.ok) {
          const aptData = await aptRes.json();
          setAppointments(aptData.appointments || []);
        }

        if (docRes.ok) {
          const docData = await docRes.json();
          setProfile(docData.profile);
          setProfileForm(docData.profile);
          setSpecialties(docData.specialties || []);
          setQualifications(docData.qualifications || []);
          setPublications(docData.publications || []);
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuthAndLoadData();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const handleUpdateAppointmentStatus = async (
    id: string,
    status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled',
    adminNotes?: string
  ) => {
    setIsUpdatingStatus(id);
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNotes }),
      });
      const data = await res.json();
      if (res.ok) {
        setAppointments((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status, adminNotes: adminNotes ?? a.adminNotes } : a))
        );
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setProfileMessage(null);

    try {
      const res = await fetch('/api/admin/doctor-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm),
      });
      const data = await res.json();
      if (res.ok) {
        setProfile(data.profile);
        setProfileMessage('Doctor profile successfully updated!');
        setTimeout(() => setProfileMessage(null), 3000);
      }
    } catch (err) {
      setProfileMessage('Failed to save profile changes.');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleAddSpecialty = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/specialties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSpecialty),
      });
      const data = await res.json();
      if (res.ok) {
        setSpecialties((prev) => [...prev, data.specialty]);
        setShowAddSpecialty(false);
        setNewSpecialty({
          name: '',
          shortDescription: '',
          iconName: 'Activity',
          conditionsTreated: '',
          isActive: true,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSpecialty = async (id: string) => {
    if (!confirm('Are you sure you want to remove this specialty?')) return;
    try {
      const res = await fetch(`/api/admin/specialties?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSpecialties((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddQual = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/qualifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newQual, verificationStatus: 'Verified' }),
      });
      const data = await res.json();
      if (res.ok) {
        setQualifications((prev) => [...prev, data.qualification]);
        setShowAddQual(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteQual = async (id: string) => {
    if (!confirm('Are you sure you want to delete this qualification?')) return;
    try {
      const res = await fetch(`/api/admin/qualifications?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setQualifications((prev) => prev.filter((q) => q.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddPub = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/publications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newPub, isVerified: true }),
      });
      const data = await res.json();
      if (res.ok) {
        setPublications((prev) => [...prev, data.publication]);
        setShowAddPub(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePub = async (id: string) => {
    if (!confirm('Delete this publication?')) return;
    try {
      const res = await fetch(`/api/admin/publications?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPublications((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
    const matchesSearch =
      searchQuery === '' ||
      apt.patientFullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.mobileNumber.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === 'Pending').length,
    confirmed: appointments.filter((a) => a.status === 'Confirmed').length,
    completed: appointments.filter((a) => a.status === 'Completed').length,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F3F8FC] flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="w-10 h-10 animate-spin text-[#0F9D92] mx-auto" />
          <p className="text-sm font-semibold text-[#12304A]">Loading Clinical Practice Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F8FC]">
      
      {/* Top Admin Header */}
      <header className="bg-[#12304A] text-white py-4 px-6 shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#0F9D92] flex items-center justify-center font-bold text-white">
              IB
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight">
                Practice Administration Portal
              </h1>
              <p className="text-xs text-teal-300">
                Dr. Ishwar Chandra Behera Clinical Practice
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="hidden md:inline text-xs text-slate-300">
              Logged in as: <strong className="text-white">{user?.fullName || 'Administrator'}</strong>
            </span>
            <Link
              href="/"
              target="_blank"
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-600 hover:bg-slate-800 text-slate-200 transition-colors hidden sm:inline-flex items-center gap-1"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs px-3 py-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white font-semibold flex items-center gap-1 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Requests</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#12304A] mt-1">{stats.total}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-2xs">
            <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Pending Review</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1">{stats.pending}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-2xs">
            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Confirmed Scheduled</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1">{stats.confirmed}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-blue-200 bg-blue-50/20 shadow-2xs">
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider">Completed Visits</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 mt-1">{stats.completed}</p>
          </div>
        </div>

        {/* Dashboard Tabs Navigation */}
        <div className="bg-white rounded-2xl p-2 border border-slate-200 flex items-center space-x-2 overflow-x-auto">
          {[
            { id: 'appointments', label: 'Appointments Queue', icon: CalendarCheck },
            { id: 'profile', label: 'Doctor Profile', icon: User },
            { id: 'specialties', label: 'Clinical Specialties', icon: Activity },
            { id: 'qualifications', label: 'Qualifications', icon: GraduationCap },
            { id: 'publications', label: 'PubMed Publications', icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                  isActive
                    ? 'bg-[#12304A] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: APPOINTMENTS QUEUE */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#12304A]">
                  Patient Appointment Requests
                </h2>
                <p className="text-xs text-slate-500">
                  Review and confirm consultation requests, assign notes, and manage attendance.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search patient, phone, ref..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0F9D92]"
                  />
                </div>

                <div className="flex items-center space-x-1">
                  {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                        statusFilter === st
                          ? 'bg-[#0F9D92] text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Appointments Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F3F8FC] text-slate-600 uppercase font-semibold text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Ref #</th>
                    <th className="py-3 px-4">Patient Name</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Date &amp; Slot</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Reason</th>
                    <th className="py-3 px-4">Status &amp; Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#12304A]">
                        {apt.referenceNumber}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-800">
                        {apt.patientFullName}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        <div>{apt.mobileNumber}</div>
                        {apt.email && <div className="text-[10px] text-slate-400">{apt.email}</div>}
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        <div className="font-medium">{apt.preferredDate}</div>
                        <div className="text-teal-700 font-semibold">{apt.preferredTimeSlot}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-[11px]">
                          {apt.consultationType}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 max-w-xs truncate" title={apt.shortReason}>
                        {apt.shortReason}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <select
                            value={apt.status}
                            disabled={isUpdatingStatus === apt.id}
                            onChange={(e) =>
                              handleUpdateAppointmentStatus(
                                apt.id,
                                e.target.value as any,
                                apt.adminNotes
                              )
                            }
                            className={`text-xs font-semibold py-1 px-2 rounded-lg border focus:outline-hidden ${
                              apt.status === 'Confirmed'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : apt.status === 'Completed'
                                ? 'bg-blue-50 text-blue-800 border-blue-300'
                                : apt.status === 'Cancelled'
                                ? 'bg-rose-50 text-rose-800 border-rose-300'
                                : 'bg-amber-50 text-amber-800 border-amber-300'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredAppointments.length === 0 && (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No appointment requests matching your current filter.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: DOCTOR PROFILE EDITOR */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-4xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#12304A]">
                Edit Doctor Profile
              </h2>
              <p className="text-xs text-slate-500">
                Update professional introduction, credentials, and appointment availability status.
              </p>
            </div>

            {profileMessage && (
              <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-800 font-semibold flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#0F9D92]" />
                <span>{profileMessage}</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Doctor Full Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.fullName || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0F9D92]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Degrees &amp; Fellowships
                  </label>
                  <input
                    type="text"
                    value={profileForm.degrees || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, degrees: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0F9D92]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Designation &amp; Specialty Title
                </label>
                <input
                  type="text"
                  value={profileForm.designation || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, designation: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0F9D92]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Homepage Bio Summary
                </label>
                <textarea
                  rows={3}
                  value={profileForm.bio || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0F9D92]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Detailed About Section Narrative
                </label>
                <textarea
                  rows={4}
                  value={profileForm.aboutText || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, aboutText: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0F9D92]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    value={profileForm.registrationNumber || ''}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, registrationNumber: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    value={profileForm.experienceYears || 15}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, experienceYears: Number(e.target.value) })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Accepting New Appointments
                  </label>
                  <select
                    value={profileForm.isAcceptingAppointments ? 'yes' : 'no'}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        isAcceptingAppointments: e.target.value === 'yes',
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  >
                    <option value="yes">Yes (Accepting)</option>
                    <option value="no">No (Paused)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSavingProfile}
                className="py-2.5 px-6 rounded-xl bg-[#0F9D92] hover:bg-[#0c7f76] text-white font-bold transition-colors flex items-center gap-2"
              >
                {isSavingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Profile Changes</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: SPECIALTIES MANAGEMENT */}
        {activeTab === 'specialties' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#12304A]">
                  Manage Clinical Specialties
                </h2>
                <p className="text-xs text-slate-500">
                  Update active specialties and list key conditions treated.
                </p>
              </div>
              <button
                onClick={() => setShowAddSpecialty(true)}
                className="px-3.5 py-2 rounded-xl bg-[#0F9D92] text-white text-xs font-bold hover:bg-[#0c7f76] flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Specialty
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specialties.map((spec) => (
                <div
                  key={spec.id}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-start"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-[#12304A]">{spec.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-semibold">
                        {spec.isActive ? 'Active' : 'Hidden'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{spec.shortDescription}</p>
                    <p className="text-[11px] text-slate-500">
                      <strong>Conditions:</strong> {spec.conditionsTreated}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteSpecialty(spec.id)}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors ml-2"
                    title="Delete specialty"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Specialty Modal */}
            {showAddSpecialty && (
              <div className="fixed inset-0 z-50 bg-[#12304A]/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
                  <h3 className="text-lg font-bold text-[#12304A]">Add New Clinical Specialty</h3>
                  <form onSubmit={handleAddSpecialty} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold mb-1">Specialty Name</label>
                      <input
                        type="text"
                        required
                        value={newSpecialty.name}
                        onChange={(e) => setNewSpecialty({ ...newSpecialty, name: e.target.value })}
                        className="w-full p-2 rounded-lg border border-slate-200"
                        placeholder="e.g. Stroke Interventions"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Short Description</label>
                      <textarea
                        rows={2}
                        required
                        value={newSpecialty.shortDescription}
                        onChange={(e) =>
                          setNewSpecialty({ ...newSpecialty, shortDescription: e.target.value })
                        }
                        className="w-full p-2 rounded-lg border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Conditions Treated (comma separated)</label>
                      <input
                        type="text"
                        value={newSpecialty.conditionsTreated}
                        onChange={(e) =>
                          setNewSpecialty({ ...newSpecialty, conditionsTreated: e.target.value })
                        }
                        className="w-full p-2 rounded-lg border border-slate-200"
                      />
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddSpecialty(false)}
                        className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-[#0F9D92] text-white font-bold"
                      >
                        Save Specialty
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: QUALIFICATIONS */}
        {activeTab === 'qualifications' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#12304A]">
                  Manage Medical Qualifications
                </h2>
                <p className="text-xs text-slate-500">
                  Documented academic degrees and post-doctoral clinical fellowships.
                </p>
              </div>
              <button
                onClick={() => setShowAddQual(true)}
                className="px-3.5 py-2 rounded-xl bg-[#0F9D92] text-white text-xs font-bold hover:bg-[#0c7f76] flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Qualification
              </button>
            </div>

            <div className="space-y-3">
              {qualifications.map((q) => (
                <div
                  key={q.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-sm text-[#12304A]">{q.degree}</span>
                    <span className="text-slate-400 ml-2">({q.yearCompleted || 'Verified'})</span>
                    <p className="text-[#0F9D92] font-semibold">{q.institution}</p>
                    {q.description && <p className="text-slate-500 mt-0.5">{q.description}</p>}
                  </div>
                  <button
                    onClick={() => handleDeleteQual(q.id)}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Qual Modal */}
            {showAddQual && (
              <div className="fixed inset-0 z-50 bg-[#12304A]/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 text-xs">
                  <h3 className="text-lg font-bold text-[#12304A]">Add Medical Qualification</h3>
                  <form onSubmit={handleAddQual} className="space-y-3">
                    <div>
                      <label className="block font-bold mb-1">Degree / Fellowship Title</label>
                      <input
                        type="text"
                        required
                        value={newQual.degree}
                        onChange={(e) => setNewQual({ ...newQual, degree: e.target.value })}
                        className="w-full p-2 rounded-lg border border-slate-200"
                        placeholder="e.g. Fellowship in Critical Care"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Institution</label>
                      <input
                        type="text"
                        required
                        value={newQual.institution}
                        onChange={(e) => setNewQual({ ...newQual, institution: e.target.value })}
                        className="w-full p-2 rounded-lg border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Year Completed</label>
                      <input
                        type="number"
                        value={newQual.yearCompleted}
                        onChange={(e) =>
                          setNewQual({ ...newQual, yearCompleted: Number(e.target.value) })
                        }
                        className="w-full p-2 rounded-lg border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={newQual.description}
                        onChange={(e) => setNewQual({ ...newQual, description: e.target.value })}
                        className="w-full p-2 rounded-lg border border-slate-200"
                      />
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddQual(false)}
                        className="px-4 py-2 rounded-xl text-slate-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-[#0F9D92] text-white font-bold"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: PUBLICATIONS */}
        {activeTab === 'publications' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#12304A]">
                  Manage PubMed Publications
                </h2>
                <p className="text-xs text-slate-500">
                  Documented peer-reviewed research papers and NCBI citations.
                </p>
              </div>
              <button
                onClick={() => setShowAddPub(true)}
                className="px-3.5 py-2 rounded-xl bg-[#0F9D92] text-white text-xs font-bold hover:bg-[#0c7f76] flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Publication
              </button>
            </div>

            <div className="space-y-4">
              {publications.map((pub) => (
                <div
                  key={pub.id}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between text-xs"
                >
                  <div className="space-y-1">
                    <span className="font-bold text-sm text-[#12304A] block">{pub.title}</span>
                    <span className="text-[#0F9D92] font-semibold">
                      {pub.journal} ({pub.publicationYear})
                    </span>
                    <p className="text-slate-500 italic">Authors: {pub.authors}</p>
                    {pub.pubmedUrl && (
                      <a
                        href={pub.pubmedUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-teal-600 underline text-[11px] inline-flex items-center gap-1"
                      >
                        <span>PubMed Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeletePub(pub.id)}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Pub Modal */}
            {showAddPub && (
              <div className="fixed inset-0 z-50 bg-[#12304A]/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 text-xs">
                  <h3 className="text-lg font-bold text-[#12304A]">Add Indexed Publication</h3>
                  <form onSubmit={handleAddPub} className="space-y-3">
                    <div>
                      <label className="block font-bold mb-1">Paper Title</label>
                      <input
                        type="text"
                        required
                        value={newPub.title}
                        onChange={(e) => setNewPub({ ...newPub, title: e.target.value })}
                        className="w-full p-2 rounded-lg border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Journal Name</label>
                      <input
                        type="text"
                        required
                        value={newPub.journal}
                        onChange={(e) => setNewPub({ ...newPub, journal: e.target.value })}
                        className="w-full p-2 rounded-lg border border-slate-200"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-bold mb-1">Year</label>
                        <input
                          type="number"
                          value={newPub.publicationYear}
                          onChange={(e) =>
                            setNewPub({ ...newPub, publicationYear: Number(e.target.value) })
                          }
                          className="w-full p-2 rounded-lg border border-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-1">PMID</label>
                        <input
                          type="text"
                          value={newPub.pmid}
                          onChange={(e) => setNewPub({ ...newPub, pmid: e.target.value })}
                          className="w-full p-2 rounded-lg border border-slate-200"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Authors</label>
                      <input
                        type="text"
                        value={newPub.authors}
                        onChange={(e) => setNewPub({ ...newPub, authors: e.target.value })}
                        className="w-full p-2 rounded-lg border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">PubMed URL</label>
                      <input
                        type="url"
                        value={newPub.pubmedUrl}
                        onChange={(e) => setNewPub({ ...newPub, pubmedUrl: e.target.value })}
                        className="w-full p-2 rounded-lg border border-slate-200"
                        placeholder="https://pubmed.ncbi.nlm.nih.gov/..."
                      />
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddPub(false)}
                        className="px-4 py-2 rounded-xl text-slate-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-[#0F9D92] text-white font-bold"
                      >
                        Save Paper
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
