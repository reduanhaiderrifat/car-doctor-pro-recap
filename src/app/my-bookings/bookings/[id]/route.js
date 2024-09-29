import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server"; // Import NextResponse

export const DELETE = async (req, { params }) => {
  const db = await connectDB();
  const collection = db.collection("bookings");
  try {
    const result = await collection.deleteOne({ _id: new ObjectId(params.id) });
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "No booking found to delete" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Deleted successfully", result });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
};

export const GET = async (req, { params }) => {
  const db = await connectDB();
  const collection = db.collection("bookings");
  try {
    const result = await collection.findOne({ _id: new ObjectId(params.id) });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
};

export const PATCH = async (req, { params }) => {
  const updateDoc = await req.json();
  const db = await connectDB();
  const collection = db.collection("bookings");
  try {
    const result = await collection.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { ...updateDoc } }
    );

    return NextResponse.json({ message: "Update successfully", result });
  } catch (error) {
    console.error("Error Updating booking:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
};
