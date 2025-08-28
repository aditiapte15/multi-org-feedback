import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Org from "@/models/org";

export async function GET(req, { params }) {
  await connectDB();
  const { org, formId } = params;

  try {
    const organization = await Org.findOne({ org });
    if (!organization) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 });
    }

    const form = organization.forms.id(formId);
    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    return NextResponse.json(form, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
