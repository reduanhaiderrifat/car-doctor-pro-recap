"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CheckoutPage = ({ params }) => {
  const { data } = useSession();
  const [service, setService] = useState();
  const [loading, setLoading] = useState(false);
  const { title, image, price, service_id } = service || {};
  const loadedDaata = async () => {
    const response = await fetch(
      `https://car-doctor-pro-recap-hbdo.vercel.app/services/api/${params.id}`
    );
    const data = await response.json();
    setService(data);
  };
  console.log(service);
  useEffect(() => {
    loadedDaata();
  }, [params.id]);
  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    const date = e.target.date.value;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const price = e.target.price.value;
    const address = e.target.address.value;
    const booking = {
      date: date,
      name: name,
      email: email,
      phone: phone,
      address: address,
      price: price,
      image,
      title,
      service_id,
    };
    try {
      const response = await fetch(
        `$https://car-doctor-pro-recap-hbdo.vercel.app/checkout/api/booking`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(booking),
        }
      );
      if (response.status === 200 && response.ok === true) {
        toast.success("Booking succesfully");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto">
      <div className="relative  h-72">
        <Image
          className="absolute h-72 w-full left-0 top-0 object-cover"
          src={image}
          alt="service"
          width={1920}
          height={1080}
          style={{ width: "90vw" }}
        />
        <div className="absolute h-full left-0 top-0 flex items-center justify-center bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] ">
          <h1 className="text-white text-3xl font-bold flex justify-center items-center ml-8">
            Checkout {title}
          </h1>
        </div>
      </div>
      <div className="my-12 bg-slate-300 p-12">
        <form onSubmit={handleBooking}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                defaultValue={data?.user?.name}
                type="text"
                name="name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input
                defaultValue={new Date().toString()}
                type="date"
                name="date"
                required
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                defaultValue={data?.user?.email}
                type="text"
                name="email"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Due amount</span>
              </label>
              <input
                defaultValue={price}
                readOnly
                type="text"
                name="price"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                required
                type="text"
                name="phone"
                placeholder="Your Phone"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Present Address</span>
              </label>
              <input
                type="text"
                name="address"
                placeholder="Your Address"
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="form-control mt-6">
            <input
              className="btn btn-primary btn-block"
              type="submit"
              value={loading ? "Loading..." : "Order Confirm"}
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
