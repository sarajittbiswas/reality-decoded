import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'edge';

export async function GET() {
  const cookieStore = await cookies();
  const operatorId = cookieStore.get('hq_operator_id')?.value;
  
  // Returns the logged-in username (agent_id) securely to the frontend
  return NextResponse.json({ id: operatorId || null });
}