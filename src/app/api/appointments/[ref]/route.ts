import { NextResponse } from 'next/server';
import { db } from '@/lib/db/store';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ ref: string }> }
) {
  try {
    const { ref } = await params;
    if (!ref) {
      return NextResponse.json({ error: 'Reference number is required' }, { status: 400 });
    }

    const apt = await db.getAppointmentByReference(ref);
    if (!apt) {
      return NextResponse.json({ error: 'No appointment found with the given reference number' }, { status: 404 });
    }

    // Return sanitized public tracking details without exposing private clinical notes or contact info
    return NextResponse.json({
      found: true,
      referenceNumber: apt.referenceNumber,
      patientInitials: apt.patientFullName.split(' ').map((n) => n[0]).join('. ') + '.',
      preferredDate: apt.preferredDate,
      preferredTimeSlot: apt.preferredTimeSlot,
      consultationType: apt.consultationType,
      status: apt.status,
      createdAt: apt.createdAt,
      adminNotes: apt.status === 'Confirmed' ? apt.adminNotes : undefined,
    });
  } catch (err) {
    console.error('Error fetching appointment status:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
