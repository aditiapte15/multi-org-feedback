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

    return NextResponse.json(
      {
        success: true,
        message: "Registered successfully",
        org: newOrg,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Registration error:", error);

    let errorMessage = "Registration failed";
    if (error.code === 11000) {
      // ✅ Duplicate key error from MongoDB
      if (error.keyPattern?.orgName) errorMessage = "Organization name already exists";
      if (error.keyPattern?.email) errorMessage = "Email already exists";
    }

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 400 }
    );
  }
}
