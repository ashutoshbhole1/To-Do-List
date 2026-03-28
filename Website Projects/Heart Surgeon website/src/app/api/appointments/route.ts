import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const appointments = await Appointment.find({}).sort({ date: -1, time: -1 });
    return NextResponse.json(appointments);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
