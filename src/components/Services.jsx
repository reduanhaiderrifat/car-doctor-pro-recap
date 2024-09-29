"use client";
import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState();
  const loadedData = async () => {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/services/api/get-all`
    );
    const { services } = await data.json();
    setServices(services);
  };
  useEffect(() => {
    loadedData();
  }, []);
  console.log(services);
  return (
    <div>
      <div className="text-center my-24">
        <h1 className="text-6xl text-orange-500 font-bold">Service section</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam eligendi
          distinctio, ipsa accusantium architecto quasi aut fuga reiciendis
          expedita asperiores voluptates cupiditate recusandae, necessitatibus
          natus repellendus alias quis consequuntur vel!
        </p>
      </div>
      {services ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {services?.map((service, idx) => (
            <ServiceCard service={service} key={idx} />
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Services;
