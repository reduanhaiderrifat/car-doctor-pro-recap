"use client";
import SocialLogin from "@/components/SocialLogin";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Signup = () => {
  const generateUID = () => {
    // Generate a UID based on current time and a random number
    return (
      Date.now().toString(36) + // Convert current time to base-36 string
      Math.random().toString(36).substr(2, 9) // Generate a random string
    );
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    const uid = generateUID();
    const newuser = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      uid,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/signup/api`, {
        method: "POST",
        body: JSON.stringify(newuser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      // Check for HTTP errors
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await res.json();
      console.log(data);
      // Optionally redirect or show a success message here
    } catch (error) {
      console.error("Error during signup:", error);
      // Optionally show an error message to the user
    }
  };
  return (
    <div className="container px-24 mx-auto py-24">
      <div className="grid grid-cols-2 gap-12 items-center">
        <div>
          <Image
            src="/assets/images/login/login.svg"
            height="540"
            width="540"
            alt="login image"
          />
        </div>
        <div className="border-2 p-12">
          <h6 className="text-3xl font-semibold text-primary text-center mb-12">
            Sign Up
          </h6>
          <form onSubmit={handleSignUp} action="">
            <label htmlFor="email">Name</label> <br />
            <input
              type="text"
              name="name"
              placeholder="your name"
              className="mt-3 w-full input input-bordered"
            />
            <br /> <br />
            <label htmlFor="email">Email</label> <br />
            <input
              type="text"
              name="email"
              placeholder="your email"
              className="mt-3 w-full input input-bordered"
            />
            <br /> <br />
            <label htmlFor="password">Password</label> <br />
            <input
              type="password"
              name="password"
              placeholder="your password"
              className="w-full mt-3 input input-bordered"
            />
            <br />
            <button
              type="submit"
              className="w-full btn btn-primary mt-12 text-lg"
            >
              Sign Up
            </button>
          </form>
          <div>
            <h6 className="my-12 text-center">or sign in with</h6>
            <SocialLogin />
            <h6 className="my-12 text-center">
              Already have account ?{" "}
              <Link className="text-primary font-semibold" href={"/login"}>
                Sign In
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
