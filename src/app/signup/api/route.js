import { connectDB } from "@/lib/connectDB";
import bcrypt from "bcrypt";
export const POST = async (req) => {
  const newuser = await req.json();
  try {
    const db = await connectDB();
    const userCollection = db.collection("users");
    const exits = await userCollection.findOne({ email: newuser.email });
    const hash = bcrypt.hashSync(newuser.password, 14);
    if (exits) {
      return Response.json({ message: "user already exist" });
    }
    const response = await userCollection.insertOne({
      ...newuser,
      password: hash,
    });
    return Response.json({ message: "USer created", response });
  } catch (error) {
    return Response.json({ message: "Something wrong", error });
  }
};
