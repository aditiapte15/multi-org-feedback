import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Org from "@/models/org";

export async function POST(req, { params }) {
  await connectDB();
  const { org, formId } = params;
  const body = await req.json(); // answers submitted by user

  try {
    const organization = await Org.findOne({ org });
    if (!organization) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 });
    }

    const form = organization.forms.id(formId);
    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    form.responses.push(body); // ✅ Save response in DB
    await organization.save();

    return NextResponse.json({ message: "Response submitted successfully!" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
