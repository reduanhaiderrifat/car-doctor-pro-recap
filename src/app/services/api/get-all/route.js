import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // Connect to the database
    const db = await connectDB();

    // Check if database connection was successful
    if (!db) {
      return NextResponse.json(
        { message: "Failed to connect to the database" },
        { status: 500 }
      );
    }

    // Access the 'services' collection
    const servicesCollection = db.collection("services");

    // Fetch the services from the database
    const services = await servicesCollection.find().toArray();

    // Return services as JSON response
    return NextResponse.json({ services }, { status: 200 });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { message: "Failed to fetch services" },
      { status: 500 }
    );
  }
};
