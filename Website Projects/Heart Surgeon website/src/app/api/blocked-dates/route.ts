import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import BlockedDate from "@/models/BlockedDate";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const dates = await BlockedDate.find({}).sort({ date: 1 });
    return NextResponse.json(dates);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { date, reason } = await req.json();
    
    if (!date) return NextResponse.json({ error: "Date is required" }, { status: 400 });

    const newBlockedDate = await BlockedDate.create({ date, reason });
    return NextResponse.json({ success: true, data: newBlockedDate });
  } catch (error: any) {
    if (error.code === 11000) return NextResponse.json({ error: "Date is already blocked" }, { status: 400 });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
