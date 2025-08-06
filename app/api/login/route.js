import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Org from '@/models/org';

export async function POST(req) {
  const { email, password } = await req.json();

  await connectMongo();

  const org = await Org.findOne({ email, password }); // No hashing for now

  if (!org) {
    return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
  }

  return NextResponse.json({ orgName: org.orgName }, { status: 200 });
}
