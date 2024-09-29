"use client"; // This indicates the component uses client-side features
import SocialLogin from "@/components/SocialLogin";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; // Ensure you use the correct import for client-side routing

const Login = () => {
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // Handle redirection manually
    });

    if (res?.error) {
      // Handle login failure
      console.error("Login failed: ", res.error);
      // Optionally, show an error message to the user
    } else {
      // Redirect on successful login
      const redirectPath =
        new URLSearchParams(window.location.search).get("redirect") || "/";
      router.push(redirectPath); // Redirect to the desired path
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
            Sign In
          </h6>
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              className="mt-3 w-full input input-bordered"
              required
            />
            <br />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              name="password"
              placeholder="Your password"
              className="w-full mt-3 input input-bordered"
              required
            />
            <br />
            <button
              type="submit"
              className="w-full btn btn-primary mt-12 text-lg"
            >
              Sign In
            </button>
          </form>
          <div>
            <h6 className="my-4 text-center">or sign in with</h6>
            <SocialLogin />
            <h6 className="my-12 text-center">
              Don’t have an account?{" "}
              <Link className="text-primary font-semibold" href="/signup">
                Sign Up
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
