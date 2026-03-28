import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await dbConnect();

    const userExists = await User.findOne({ username: "admin" });

    if (userExists) {
      return NextResponse.json({ message: "Admin user already exists. Navigate to /admin to login." });
    }

    const hashedPassword = await bcrypt.hash("admin", 10);
    await User.create({
      username: "admin",
      password: hashedPassword,
      role: "admin",
    });

    return NextResponse.json({ message: "Admin user created successfully with username 'admin' and password 'admin'. Please navigate to /admin to login!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
