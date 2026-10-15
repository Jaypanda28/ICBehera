import { NextResponse } from 'next/server';
import { db } from '@/lib/db/store';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const profile = await db.getDoctorProfile();
  return NextResponse.json({ profile });
}

export async function PUT(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const updated = await db.updateDoctorProfile(body);
  return NextResponse.json({ success: true, profile: updated });
}
