'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Stethoscope,
  ChevronLeft,
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@drishwarbehera.com');
  const [password, setPassword] = useState('DrIshwar@Admin2026!');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F8FC] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        
        {/* Back link */}
        <div className="mb-6 text-center sm:text-left">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-semibold text-[#0F9D92] hover:text-[#0c7f76]"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Public Website
          </Link>
        </div>

        {/* Doctor Monogram & Branding */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#12304A] text-white flex items-center justify-center font-bold text-xl mx-auto shadow-md relative">
            <span>IB</span>
            <div className="absolute -bottom-1 -right-1 bg-[#0F9D92] rounded-full p-1 text-white">
              <Stethoscope className="w-3.5 h-3.5" />
            </div>
          </div>
          <h2 className="mt-4 text-2xl font-extrabold text-[#12304A] tracking-tight">
            Clinic Practice Portal
          </h2>
          <p className="mt-1 text-xs text-[#64748B]">
            Dr. Ishwar Chandra Behera Practice Administration
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-xl rounded-3xl border border-slate-200 sm:px-10">
          
          <form className="space-y-5" onSubmit={handleLogin}>
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-bold text-[#12304A] uppercase tracking-wider mb-1">
                Authorized Staff Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0F9D92] focus:ring-1 focus:ring-[#0F9D92]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold text-[#12304A] uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0F9D92] focus:ring-1 focus:ring-[#0F9D92]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[#0F9D92] hover:bg-[#0c7f76] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Secure Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Credential Notice for review */}
          <div className="mt-6 p-4 rounded-2xl bg-[#F3F8FC] border border-slate-200 text-xs text-slate-600 space-y-1">
            <p className="font-bold text-[#12304A]">Preconfigured Administrative Credentials:</p>
            <p className="font-mono text-[11px] text-slate-700">Email: admin@drishwarbehera.com</p>
            <p className="font-mono text-[11px] text-slate-700">Password: DrIshwar@Admin2026!</p>
          </div>

        </div>
      </div>
    </div>
  );
}
