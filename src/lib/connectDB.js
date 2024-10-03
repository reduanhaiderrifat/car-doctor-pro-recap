import { MongoClient, ServerApiVersion } from "mongodb";

let cachedDb = null;

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("Please define the MONGODB_URI environment variable");
    }

    if (cachedDb) {
      return cachedDb;
    }

    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
    cachedDb = client.db("car-doctor-pro-recap");
    return cachedDb;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw new Error("Database connection error");
  }
};
