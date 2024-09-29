import React from "react";

const Banner = () => {
  return (
    <div className="">
      <div className="carousel w-full">
        {banners?.map((banner, idx) => (
          <div
            style={{
              background: `linear-gradient(45deg,rgba(7,25,82,0.7),rgba(0,0,0,0.3)),url(/assets/images/banner/${
                idx + 1
              }.jpg)`,
            }}
            id={`slide${idx + 1}`}
            key={idx}
            className="carousel-item relative h-[90vh] bg-no-repeat bg-top w-full"
          >
            <div className="absolute top-1/3 left-24 text-white">
              <h1 className="text-5xl mb-3">{banner.title}</h1>
              <p className="text-xl">{banner.description}</p>
            </div>
            <div className="absolute  right-12 gap-4 bottom-10 flex -translate-y-1/2 transform ">
              <a href={`#${banner.prev}`} className="btn btn-circle">
                ❮
              </a>
              <a href={`#${banner.next}`} className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const banners = [
  {
    title: "Afforable car repair work shop bro",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor",
    next: "slide2",
    prev: "slide4",
  },
  {
    title: "Afforable car repair work shop bro",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor",
    next: "slide3",
    prev: "slide1",
  },
  {
    title: "Afforable car repair work shop bro",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor",
    next: "slide4",
    prev: "slide2",
  },
  {
    title: "Afforable car repair work shop bro",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor",
    next: "slide1",
    prev: "slide3",
  },
];
export default Banner;
