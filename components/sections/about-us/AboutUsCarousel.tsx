/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

function AboutUsCarousel({ images }: { images: { url: string }[] }) {
  return (
    <Carousel
      swipeable
      stopOnHover
      showStatus={false}
      interval={6000}
      showArrows={false}
      useKeyboardArrows={true}
      showThumbs={false}
      emulateTouch
      infiniteLoop
      autoPlay
      centerSlidePercentage={90}
      className="h-full w-full cursor-grabbing"
    >
      {Array.from({ length: 12 }).map((image, index) => {
        return (
          <div
            key={index}
            className="w-full  h-[450px] aspect-[4/3] sm:h-[500px]"
          >
            <img
              src={`/images/image-${index + 1}.jpeg`}
              alt="About Us Image"
              className="w-full object-cover h-full rounded-3xl"
            />
          </div>
        );
      })}
    </Carousel>
  );
}

export default AboutUsCarousel;
