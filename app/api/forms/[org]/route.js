import connectDB from "@/lib/mongodb";
import Org from "@/models/org";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();
    const { org } = params;

    // ✅ Check org exists
    const organization = await Org.findOne({ orgName: org });
    if (!organization) {
      return NextResponse.json(
        { success: false, error: "Org not found" },
        { status: 404 }
      );
    }

    // ✅ Push new form into Org.forms
    const { title, description, questions } = body;
    const newForm = { title, description, questions };

    organization.forms.push(newForm);
    await organization.save();

    return NextResponse.json(
      { success: true, form: newForm },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving form:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { org } = params;

    // ✅ Find org
    const organization = await Org.findOne({ orgName: org });
    if (!organization) {
      return NextResponse.json(
        { success: false, error: "Org not found" },
        { status: 404 }
      );
    }

    // ✅ Return org forms
    return NextResponse.json(
      { success: true, forms: organization.forms },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
