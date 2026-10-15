import { NextResponse } from 'next/server';
import { db } from '@/lib/db/store';

export async function GET() {
  try {
    const [
      profile,
      qualifications,
      specialties,
      experience,
      publications,
      clinicLocations,
      consultationHours,
      siteSettings,
    ] = await Promise.all([
      db.getDoctorProfile(),
      db.getQualifications(),
      db.getSpecialties(),
      db.getExperience(),
      db.getPublications(),
      db.getClinicLocations(),
      db.getConsultationHours(),
      db.getSiteSettings(),
    ]);

    return NextResponse.json({
      profile,
      qualifications,
      specialties,
      experience,
      publications,
      clinicLocations,
      consultationHours,
      siteSettings,
    });
  } catch (err) {
    console.error('Error fetching doctor public data:', err);
    return NextResponse.json({ error: 'Failed to retrieve doctor profile' }, { status: 500 });
  }
}
