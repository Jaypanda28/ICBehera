import { NextResponse } from 'next/server';
import { db } from '@/lib/db/store';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const publications = await db.getAllPublications();
  return NextResponse.json({ publications });
}

export async function POST(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const pub = {
    ...body,
    id: body.id || `pub-${Date.now()}`,
    doctorId: 'doc-ishwar-001',
    sortOrder: body.sortOrder || 99,
  };

  const saved = await db.savePublication(pub);
  return NextResponse.json({ success: true, publication: saved });
}

export async function DELETE(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  await db.deletePublication(id);
  return NextResponse.json({ success: true });
}
