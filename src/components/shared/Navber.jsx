"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
const Navber = () => {
  const path = usePathname();
  const session = useSession();
  console.log(session);
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="  lg:hidden">
              <Image
                className="w-12"
                src={"/assets/logo.svg"}
                alt="Logo image"
                width={600}
                height={600}
              />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links?.map((item, idx) => (
                <Link
                  className={`btn mr-4 ${
                    path === item.url
                      ? "text-red-500 border-red-500 bg-transparent hover:bg-red-500 hover:text-white"
                      : ""
                  }`}
                  href={item.url}
                  key={idx}
                >
                  {item.title}
                </Link>
              ))}
            </ul>
          </div>
          <a className=" text-xl">
            <Image
              className="w-16"
              src={"/assets/logo.svg"}
              alt="Logo image"
              width={600}
              height={600}
            />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links?.map((item, idx) => (
              <Link
                className={`btn mr-4 ${
                  path === item.url
                    ? "text-red-500 border-red-500 bg-transparent hover:bg-red-500 hover:text-white"
                    : ""
                }`}
                href={item.url}
                key={idx}
              >
                {item.title}
              </Link>
            ))}
          </ul>
        </div>
        <div className="navbar-end space-x-5">
          <FaShoppingCart />
          <FaSearch />
          <Image
            src={session?.data?.user?.image}
            alt="Profile picture"
            className="rounded-full"
            width={35}
            height={35}
          />
          <a className="btn">Apointment</a>
          {session.status === "loading" && <p>Loading...</p>}
          {session.status === "authenticated" && (
            <button onClick={() => signOut()} className="btn">
              Logout
            </button>
          )}
          {session.status === "unauthenticated" && (
            <Link href={"/login"} className="btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const links = [
  { title: "Home", url: "/" },
  { title: "About", url: "/about" },
  { title: "My Bookings", url: "/my-bookings" },
  { title: "Contact", url: "/contact" },
  { title: "Services", url: "/services" },
];
export default Navber;
