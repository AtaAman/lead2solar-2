export const revalidate = 0;

import { Button, Heading } from "@/components/elements";
import { Container, Section } from "@/components/layouts";
import { getHomepage } from "@/sanity/queries/page";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

const Hero = async () => {
  const data = await getHomepage();
  const { hero, gallery, promotion } = data;

  return (
    <Section className="bg-secondary-950 h-fit flex flex-col gap-32">
      <Container className="h-1/2 flex justify-center items-center">
        <div className="flex flex-col text-center items-center gap-10">
          <div className="text-white">
            <Heading as="h1" className="text-hero leading-none">
              Switch to Solar and Save Big on Your Energy Bills!
            </Heading>
          </div>
          <div className=" flex gap-4 flex-col text-center items-center ">
            <p className="text-base text-white ">
              Join the renewable energy revolution with Lead2Solar`s top-notch
              rooftop solar installations
            </p>
            <Button variant="secondary">
              <Link href={promotion.link}>Get Your Free Quote Now</Link>
            </Button>
          </div>
        </div>
      </Container>
      <div className="w-full col-span-2 h-1/2">
        <Marquee autoFill>
          <div className="flex justify-center gap-6 items-start mx-3">
            {gallery.imageUrls.map((item: any) => {
              return (
                <>
                  <Image
                    src={item.url}
                    alt="Hero Image"
                    width={450}
                    height={250}
                  />
                </>
              );
            })}
          </div>
        </Marquee>
      </div>
    </Section>
  );
};

export { Hero };
