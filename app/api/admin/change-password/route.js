import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(req) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const { currentPassword, newPassword } = await req.json();

    const admin = await Admin.findOne({ email: session.user.email });

    if (!admin) {
      if (currentPassword !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ success: false, error: "Current password is incorrect" }, { status: 400 });
      }
      await Admin.create({ email: session.user.email, password: newPassword });
      return NextResponse.json({ success: true });
    }

    if (admin.password !== currentPassword) {
      return NextResponse.json({ success: false, error: "Current password is incorrect" }, { status: 400 });
    }

    admin.password = newPassword;
    await admin.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}