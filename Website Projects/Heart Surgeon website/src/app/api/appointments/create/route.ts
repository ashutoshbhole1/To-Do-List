import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const { patientName, phone, email, issue, date, time, type } = body;

    // Validate
    if (!patientName || !phone || !issue || !date || !time || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create Appointment
    const newAppointment = await Appointment.create({
      patientName,
      phone,
      email,
      issue,
      date,
      time,
      type,
      status: "pending",
    });

    // TODO: Connect with actual Google Calendar for Meet link later, or let Admin generate it in backend.

    return NextResponse.json({ success: true, data: newAppointment }, { status: 201 });
  } catch (error: any) {
    console.error("Booking Error:", error);
    return NextResponse.json({ error: error.message || "Server Error" }, { status: 500 });
  }
}
