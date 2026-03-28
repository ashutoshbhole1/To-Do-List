import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import WorkingHour from "@/models/WorkingHour";

export const dynamic = "force-dynamic";

const defaultHours = [
  { day: "Monday", start: "09:00", end: "17:00", isClosed: false, note: "", order: 1 },
  { day: "Tuesday", start: "09:00", end: "17:00", isClosed: false, note: "", order: 2 },
  { day: "Wednesday", start: "09:00", end: "17:00", isClosed: false, note: "", order: 3 },
  { day: "Thursday", start: "00:00", end: "00:00", isClosed: false, note: "Operatory (No OPD)", order: 4 },
  { day: "Friday", start: "09:00", end: "17:00", isClosed: false, note: "", order: 5 },
  { day: "Saturday", start: "09:00", end: "14:00", isClosed: false, note: "", order: 6 },
  { day: "Sunday", start: "00:00", end: "00:00", isClosed: true, note: "Closed", order: 7 }
];

export async function GET() {
  try {
    await dbConnect();
    let hours = await WorkingHour.find({}).sort({ order: 1 });
    if (hours.length === 0) {
      // Seed default hours if empty
      hours = await WorkingHour.insertMany(defaultHours);
    }
    return NextResponse.json(hours);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json(); // Array of days updated
    
    // Bulk update or individual updates
    for (const item of body) {
      await WorkingHour.findByIdAndUpdate(item._id, {
        start: item.start,
        end: item.end,
        isClosed: item.isClosed,
        note: item.note
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
