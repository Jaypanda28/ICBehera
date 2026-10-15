'use client';

import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  ExternalLink,
  Search,
  Filter,
  FileCheck2,
  Bookmark,
} from 'lucide-react';
import { Publication } from '@/lib/db/types';

interface ResearchSectionProps {
  publications: Publication[];
}

export default function ResearchSection({ publications }: ResearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('All');

  const years = useMemo(() => {
    const list = Array.from(new Set(publications.map((p) => p.publicationYear.toString())));
    return ['All', ...list.sort((a, b) => Number(b) - Number(a))];
  }, [publications]);

  const filteredPublications = useMemo(() => {
    return publications.filter((pub) => {
      const matchesSearch =
        searchQuery === '' ||
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.journal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.authors.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesYear = selectedYear === 'All' || pub.publicationYear.toString() === selectedYear;

      return matchesSearch && matchesYear;
    });
  }, [publications, searchQuery, selectedYear]);

  if (!publications || publications.length === 0) {
    return null;
  }

  return (
    <section id="research" className="py-20 bg-[#F3F8FC] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0F9D92]/10 text-[#0F9D92] text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>ACADEMIC INVESTIGATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12304A] tracking-tight">
            Research &amp; Indexed Medical Publications
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#64748B]">
            Peer-reviewed clinical studies and observational research indexed in the National
            Library of Medicine (PubMed / NCBI).
          </p>
        </div>

        {/* Search & Year Filter Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search title, journal, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0F9D92] focus:ring-1 focus:ring-[#0F9D92]"
            />
          </div>

          {/* Year Filter Buttons */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <div className="flex items-center text-xs font-medium text-slate-500 mr-1 shrink-0">
              <Filter className="w-3.5 h-3.5 mr-1" />
              <span>Year:</span>
            </div>
            {years.map((yr) => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all shrink-0 ${
                  selectedYear === yr
                    ? 'bg-[#12304A] text-white shadow-2xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>

        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPublications.map((pub) => (
            <div
              key={pub.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:border-[#0F9D92]"
            >
              <div>
                {/* Meta details */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0F9D92] border border-teal-100">
                    {pub.journal}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Year: {pub.publicationYear}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-[#12304A] group-hover:text-[#0F9D92] transition-colors leading-snug mb-3">
                  {pub.title}
                </h3>

                {/* Authors */}
                <p className="text-xs text-slate-600 mb-3 italic">
                  <span className="font-semibold text-slate-700 not-italic">Authors: </span>
                  {pub.authors}
                </p>

                {/* Abstract summary */}
                {pub.abstractSummary && (
                  <p className="text-xs text-slate-600 leading-relaxed bg-[#F3F8FC] p-3 rounded-xl border border-slate-100">
                    {pub.abstractSummary}
                  </p>
                )}
              </div>

              {/* Action link & identifiers */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-[11px] text-slate-500">
                  {pub.pmid && (
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                      PMID: {pub.pmid}
                    </span>
                  )}
                  {pub.doi && (
                    <span className="hidden sm:inline px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px]">
                      DOI: {pub.doi}
                    </span>
                  )}
                </div>

                {pub.pubmedUrl && (
                  <a
                    href={pub.pubmedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-bold text-[#0F9D92] hover:text-[#0c7f76] transition-colors group/link"
                  >
                    <span>View on PubMed</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1 transition-transform group-hover/link:translate-x-0.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredPublications.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <Bookmark className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No publications matched your filter.</p>
            <p className="text-xs text-slate-500 mt-1">Try searching another term or resetting the year filter.</p>
          </div>
        )}

        {/* Disclaimer about copyright and identity */}
        <p className="text-center text-xs text-slate-400 mt-8">
          * Publication records are sourced directly from verified PubMed indexes. Full text papers are subject to journal copyrights and accessible via respective publisher links.
        </p>

      </div>
    </section>
  );
}
