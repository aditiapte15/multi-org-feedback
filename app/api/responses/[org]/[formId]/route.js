import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Org from "@/models/org";
import Response from "@/models/response";

// Handle submitting response
export async function POST(req, { params }) {
  await connectDB();
  const { org, formId } = params;
  const body = await req.json(); // answers submitted by user

  try {
    // ✅ Fix: match by organization name
    const organization = await Org.findOne({ orgName: org });

    if (!organization) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 });
    }

    const form = organization.forms.id(formId);
    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    // ✅ Ensure responses array exists
    if (!form.responses) {
      form.responses = [];
    }

    // Save response inside org.forms
    form.responses.push(body);
    await organization.save();

    // Save in Response collection too
    const responseDoc = await Response.create({ formId, answers: body });

    return NextResponse.json(
      { message: "Response submitted successfully!", response: responseDoc },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Handle fetching responses
export async function GET(req, { params }) {
  await connectDB();
  const { formId } = params;

  try {
    const responses = await Response.find({ formId });
    return NextResponse.json(responses, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
