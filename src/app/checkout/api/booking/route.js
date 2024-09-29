import { connectDB } from "@/lib/connectDB";

export const POST = async (req) => {
  const booking = await req.json();
  const db = await connectDB();
  const bookingCollection = db.collection("bookings");
  try {
    const newBooking = await bookingCollection.insertOne(booking);
    return Response.json({ message: "Data not POST successfully", newBooking });
  } catch (error) {
    return Response.json({ message: "Data not POST something wrong" });
  }
};
