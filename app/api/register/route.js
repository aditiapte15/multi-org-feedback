import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Organization from "@/models/org";

// POST /api/register
export async function POST(request) {
  try {
    const { orgName, email, password } = await request.json();

    await connectDB();

    // Save organization to DB
    const newOrg = await Organization.create({ orgName, email, password });

    return NextResponse.json({
      message: "Registered successfully",
      org: newOrg,
    }, { status: 200 });

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
