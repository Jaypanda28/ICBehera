import { z } from 'zod';

export const appointmentSchema = z.object({
  patientFullName: z
    .string()
    .min(3, 'Full name must be at least 3 characters')
    .max(100, 'Full name cannot exceed 100 characters')
    .regex(/^[a-zA-Z\s.'-]+$/, 'Name can only contain letters, spaces, dots, and hyphens'),
  mobileNumber: z
    .string()
    .min(10, 'Mobile number must be at least 10 digits')
    .max(15, 'Mobile number too long')
    .regex(/^[+]?[0-9\s-]{10,15}$/, 'Please enter a valid mobile phone number'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  preferredDate: z
    .string()
    .min(1, 'Please select your preferred date')
    .refine((dateStr) => {
      const selected = new Date(dateStr);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return !isNaN(selected.getTime()) && selected >= today;
    }, 'Appointment date cannot be in the past'),
  preferredTimeSlot: z
    .string()
    .min(1, 'Please select a preferred time slot'),
  consultationType: z.enum([
    'In-Person Consultation',
    'Teleconsultation / Video',
    'Follow-up',
    'Second Opinion',
  ]),
  shortReason: z
    .string()
    .min(5, 'Please provide a brief reason for consultation (at least 5 characters)')
    .max(500, 'Reason cannot exceed 500 characters'),
  consentAgreed: z
    .boolean()
    .refine((val) => val === true, 'You must agree to the privacy policy to proceed'),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
