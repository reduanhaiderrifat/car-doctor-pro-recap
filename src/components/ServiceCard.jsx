import Image from "next/image";
import Link from "next/link";
import React from "react";

const ServiceCard = ({ service }) => {
  const { title, price, image, _id } = service;
  return (
    <div className="card bg-base-100 ">
      <figure className="h-60 flex items-center justify-center">
        <Image
          src={image}
          alt="car"
          width={400}
          height={240}
          className="object-contain"
        />
      </figure>
      <div className="card-body flex-1">
        <h2 className="card-title">{title}</h2>
        <p>Price: ${price}</p>
        <div className="card-actions  w-full">
          <Link href={`/services/${_id}`} className="btn w-full btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
