import { NextResponse } from 'next/server';
import { db } from '@/lib/db/store';
import { appointmentSchema } from '@/lib/validations/appointment';
import { sendAppointmentNotification } from '@/lib/notifications';
import { getCurrentAdmin } from '@/lib/auth';

// Public submission of appointment request
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = appointmentSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          issues: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;
    const locations = await db.getClinicLocations();
    const primaryLocation = locations.find((l) => l.isPrimary) || locations[0];

    const newAppointment = await db.createAppointment({
      patientFullName: data.patientFullName,
      mobileNumber: data.mobileNumber,
      email: data.email || undefined,
      preferredDate: data.preferredDate,
      preferredTimeSlot: data.preferredTimeSlot,
      consultationType: data.consultationType,
      shortReason: data.shortReason,
      clinicLocationId: primaryLocation?.id,
      consentAgreed: data.consentAgreed,
    });

    // Dispatch background email notification
    await sendAppointmentNotification(newAppointment);

    return NextResponse.json({
      success: true,
      message: 'Appointment request submitted successfully.',
      referenceNumber: newAppointment.referenceNumber,
      status: newAppointment.status,
      preferredDate: newAppointment.preferredDate,
      preferredTimeSlot: newAppointment.preferredTimeSlot,
      consultationType: newAppointment.consultationType,
      clinicName: primaryLocation?.name || 'Aspire Hospital',
    });
  } catch (err: any) {
    console.error('Error creating appointment:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your request.' },
      { status: 500 }
    );
  }
}

// Protected admin endpoint to fetch appointments
export async function GET(req: Request) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;

    const appointments = await db.getAppointments({ status, search });
    return NextResponse.json({ appointments });
  } catch (err) {
    console.error('Error fetching appointments:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
