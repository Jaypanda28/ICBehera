import { NextResponse } from 'next/server';
import { db } from '@/lib/db/store';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const qualifications = await db.getQualifications();
  return NextResponse.json({ qualifications });
}

export async function POST(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const qual = {
    ...body,
    id: body.id || `qual-${Date.now()}`,
    doctorId: 'doc-ishwar-001',
    sortOrder: body.sortOrder || 99,
  };

  const saved = await db.saveQualification(qual);
  return NextResponse.json({ success: true, qualification: saved });
}

export async function DELETE(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  await db.deleteQualification(id);
  return NextResponse.json({ success: true });
}
