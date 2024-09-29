import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");
  try {
    const bookings = await bookingsCollection
      .find({ email: params.email })
      .toArray();
    return NextResponse.json({ bookings });
  } catch (error) {
    return NextResponse.json({ mmessage: "somethimg wrong" });
  }
};
