import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Org from "@/models/org";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const org = await Org.findOne({ email });

    if (!org || org.password !== password) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        orgId: org._id,
        orgName: org.orgName,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { success: false, message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}
