/* eslint-disable @next/next/no-img-element */
export const revalidate = 0;

import { Button, Heading } from "@/components/elements";
import { Container, Section } from "@/components/layouts";
import { getHomepage } from "@/sanity/queries/page";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

import { GetAQuote } from "@/components/elements/get-a-quote";

const Hero = async () => {
  const data = await getHomepage();

  return (
    <Section className="bg-secondary-950 h-fit py-28 flex flex-col gap-32">
      <Container className="h-1/2 flex justify-center items-center">
        <div className="flex flex-col text-center items-center gap-10">
          <div className="text-white">
            <Heading
              as="h1"
              className="md:text-hero text-5xl mt-10 md:mt-0 leading-none"
            >
              Switch to Solar and Save Big on Your Energy Bills!
            </Heading>
          </div>
          <div className=" flex gap-4 flex-col text-center items-center ">
            <p className="text-sub-title  text-white ">
              Join the renewable energy revolution with Lead2Solar`s top-notch
              rooftop solar installations
            </p>
            <GetAQuote>
              <Button variant="secondary">Get Your Free Quote Now</Button>
            </GetAQuote>
          </div>
        </div>
      </Container>
      <div className="w-full col-span-2 h-1/2">
        <Marquee autoFill>
          <div className="flex justify-center gap-6 items-start mx-3">
            {Array.from({ length: 4 }).map((image, index) => (
              <div key={index} className=" h-64 overflow-hidden">
                <img
                  src={`/images/hero/main-${index+1}.jpg`}
                  alt={`Hero Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </Section>
  );
};

export { Hero };
