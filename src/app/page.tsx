import { db } from '@/lib/db/store';
import MainWebsite from '@/components/MainWebsite';

export default async function HomePage() {
  const [
    profile,
    qualifications,
    specialties,
    experience,
    publications,
    clinicLocations,
    consultationHours,
  ] = await Promise.all([
    db.getDoctorProfile(),
    db.getQualifications(),
    db.getSpecialties(),
    db.getExperience(),
    db.getPublications(),
    db.getClinicLocations(),
    db.getConsultationHours(),
  ]);

  return (
    <MainWebsite
      profile={profile}
      qualifications={qualifications}
      specialties={specialties}
      experience={experience}
      publications={publications}
      clinicLocations={clinicLocations}
      consultationHours={consultationHours}
    />
  );
}
