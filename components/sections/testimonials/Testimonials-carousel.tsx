"use client";
import { useWindScreenowSize } from "@/hooks/useWindowSize";

import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
export const TestimonialsCarousel = () => {
  const size = useWindScreenowSize();
  const testimonials = [
    {
      excerpt:
        "Switching to solar with Lead2Solar was the best decision! Our energy bills have dropped significantly.",
      image: "/path/to/customer1-image.jpg",
      heading: "John Smith",
      tagline: "Homeowner",
    },
    {
      excerpt:
        "Professional, efficient, and friendly service. Highly recommend!",
      image: "/path/to/customer2-image.jpg",
      heading: "Sarah Johnson",
      tagline: "Business Owner",
    },
    {
      excerpt:
        "The installation process was seamless, and the team at Lead2Solar was knowledgeable and helpful throughout.",
      image: "/path/to/customer3-image.jpg",
      heading: "Michael Davis",
      tagline: "Satisfied Customer",
    },
    {
      excerpt:
        "We've been enjoying clean, renewable energy and saving money on our utility bills. Thanks, Lead2Solar!",
      image: "/path/to/customer4-image.jpg",
      heading: "Emily Wilson",
      tagline: "Happy Client",
    },
    {
      excerpt:
        "I was impressed by the quality of the solar panels and the professionalism of the installation crew.",
      image: "/path/to/customer5-image.jpg",
      heading: "David Thompson",
      tagline: "Satisfied Homeowner",
    },
    {
      excerpt:
        "Going solar with Lead2Solar was a smooth and hassle-free experience. I highly recommend their services.",
      image: "/path/to/customer6-image.jpg",
      heading: "Jessica Anderson",
      tagline: "Clean Energy Advocate",
    },
  ];

  return (
    <Carousel
      stopOnHover
      showThumbs={false}
      showStatus={false}
      interval={4500}
      showArrows={false}
      autoPlay
      showIndicators={false}
      centerMode
      centerSlidePercentage={
        (size.width < 640 && 85) || (size.width < 1024 && 40) || 33
      }
      infiniteLoop
      useKeyboardArrows
      className="cursor-disable w-screen overflow-hidden max-w-7xl  duration-300"
    >
      {testimonials.map((user: any, index: number) => {
        return (
          <div
            key={index}
            className="w-full shrink-0  sm:col-span-1 p-10 rounded-3xl bg-primary-300"
          >
            <p className="text-left min-h-[180px]">{user.excerpt}</p>
            <div className="flex gap-6 items-center sm:flex-row flex-col ">
              <div className="h-[56px] w-[56px] shrink-0 relative">
                <image
                  src={user.image}
                  alt="Expert Image"
                  width={90}
                  height={90}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row justify-between w-full">
                <div className="text-black flex flex-col ">
                  <h3 className="text-sub-title">{user.heading}</h3>
                  <p className="text-black text-sm opacity-90">
                    {user.tagline}{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};
