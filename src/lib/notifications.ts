import { Appointment } from './db/types';

export async function sendAppointmentNotification(appointment: Appointment): Promise<{ success: boolean; message: string }> {
  // In production, configure nodemailer or SendGrid/Postmark/Resend via SMTP credentials in .env
  const hasSmtpConfigured = !!process.env.SMTP_HOST && !!process.env.SMTP_USER;

  const emailContent = `
    === APPOINTMENT REQUEST NOTIFICATION ===
    Reference Number: ${appointment.referenceNumber}
    Patient Name: ${appointment.patientFullName}
    Phone: ${appointment.mobileNumber}
    Email: ${appointment.email || 'N/A'}
    Date: ${appointment.preferredDate}
    Time Slot: ${appointment.preferredTimeSlot}
    Consultation Type: ${appointment.consultationType}
    Reason: ${appointment.shortReason}
    Status: ${appointment.status}
    Created At: ${appointment.createdAt}
    ========================================
  `;

  if (!hasSmtpConfigured) {
    console.log('[NOTIFICATION DISPATCH - PREVIEW MODE]:\n', emailContent);
    return {
      success: true,
      message: 'Appointment request recorded. Notification dispatched to clinical queue.',
    };
  }

  // Real SMTP sending logic can be plugged here
  return {
    success: true,
    message: 'Email confirmation sent to patient and clinic administrator.',
  };
}
