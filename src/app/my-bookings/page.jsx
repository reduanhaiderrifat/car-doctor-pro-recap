"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BookingsPage = () => {
  const { data: session } = useSession(); // Destructure session data for better readability
  const [storeEmail, setStoreEmail] = useState(null); // Use a better variable name for consistency
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Update storeEmail when the session is available
  useEffect(() => {
    if (session?.user?.email) {
      setStoreEmail(session.user.email);
    }
  }, [session?.user?.email]);

  // Function to fetch bookings data
  const loadData = async () => {
    if (storeEmail) {
      try {
        const res = await fetch(
          `https://car-doctor-pro-recap-hbdo.vercel.app/my-bookings/api/${storeEmail}`
        );
        const data = await res.json();
        setBookings(data?.bookings || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(true);
      }
    }
  };

  // Fetch bookings data when storeEmail is available
  useEffect(() => {
    loadData();
  }, [storeEmail]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `$https://car-doctor-pro-recap-hbdo.vercel.app/my-bookings/bookings/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      console.log(data);
      if (data.result.deletedCount > 0) {
        toast.success("Deleted booking successfully");
        loadData(); // Reload bookings data after deletion
      }
    } catch (error) {
      console.error("Error while deleting booking:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="relative h-72">
        <Image
          className="absolute h-72 w-full left-0 top-0 object-cover"
          src={"/assets/images/about_us/parts.jpg"}
          alt="service"
          width={1920}
          height={1080}
          style={{ width: "90vw" }}
        />
        <div className="absolute h-full left-0 top-0 flex items-center justify-center bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] ">
          <h1 className="text-white text-3xl font-bold flex justify-center items-center ml-8">
            My Bookings
          </h1>
        </div>
      </div>
      <div className="mt-12">
        <div className="overflow-x-auto">
          {loading ? (
            <p>Loading...</p>
          ) : bookings.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Service Name</th>
                  <th>Price</th>
                  <th>Booking Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings?.map(({ title, _id, date, price }, index) => (
                  <tr key={_id}>
                    <th>{index + 1}</th>
                    <td>{title}</td>
                    <td>{price}</td>
                    <td>{date}</td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <Link href={`/my-bookings/update/${_id}`}>
                          <button className="btn btn-primary">Edit</button>
                        </Link>
                        <button
                          onClick={() => handleDelete(_id)}
                          className="btn btn-error"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No bookings found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
