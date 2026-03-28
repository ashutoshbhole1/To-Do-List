import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import BlockedDate from "@/models/BlockedDate";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    await dbConnect();
    const deletedDate = await BlockedDate.findByIdAndDelete(resolvedParams.id);
    
    if (!deletedDate) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
