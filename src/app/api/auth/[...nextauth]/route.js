import { connectDB } from "@/lib/connectDB";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"; // Correct
import GitHubProvider from "next-auth/providers/github"; // Correct

import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentails: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          return null;
        }

        const db = await connectDB();
        const currentUser = await db.collection("users").findOne({ email });
        if (!currentUser) {
          return null;
        }
        const passwordMatched = bcrypt.compareSync(
          password,
          currentUser.password
        );
        if (!passwordMatched) {
          return null;
        }
        return currentUser;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google" || account.provider === "github") {
        const { email } = user;

        try {
          const db = await connectDB();
          const userCollection = db.collection("users");
          const userEsxit = await userCollection.findOne({ email });
          if (!userEsxit) {
            const res = await userCollection.insertOne(user);
            return user;
          } else {
            return user;
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        return user;
      }
    },
  },
});

export { handler as GET, handler as POST };
