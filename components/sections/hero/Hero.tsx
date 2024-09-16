/* eslint-disable @next/next/no-img-element */
export const revalidate = 0;

import { Button, Heading } from "@/components/elements";
import { Container, Section } from "@/components/layouts";
import Marquee from "react-fast-marquee";

import { GetAQuote } from "@/components/elements/get-a-quote";

interface HeroProps {
    isB2B?: boolean;
}

const Hero = ({ isB2B = false }: HeroProps) => {
    const texts = isB2B ? {
        Headline: 'Empower Your Solar Business with Digital Solutions',
        Subheadline: 'Join Lead2Solar and Connect with Customers Ready to Go Solar',
        CTA: 'Get Your Free Quote Now',
    } : {
        Headline: 'Switch to Solar and Save Big on Your Energy Bills!',
        Subheadline: 'Get exclusive deals from top nearby local installers! Join the renewable energy revolution with Lead2Solar.',
        CTA: 'Get Your Free Quote Now',
    };

    return (
        <Section className="bg-secondary-950 h-fit py-20 flex flex-col gap-20">
            <Container className="h-1/2 flex justify-center items-center">
                <div className="flex flex-col text-center items-center gap-6">
                    <div className="text-white">
                        <Heading
                            as="h1"
                            className=" text-title md:text-7xl  mt-28 md:mt-14 leading-none"
                        >
                            {texts.Headline}
                        </Heading>
                    </div>
                    <div className=" flex lg:w-2/3 mx-auto gap-4 flex-col text-center items-center ">
                        <p className=" text-white ">
                            {texts.Subheadline}
                        </p>
                        <GetAQuote>
                            <Button variant="secondary">{texts.CTA}</Button>
                        </GetAQuote>
                    </div>
                </div>
            </Container>
            <div className="w-full col-span-2 min-h-64 h-1/2">
                <Marquee autoFill>
                    <div className="flex justify-center gap-6 items-start mx-3">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-64 aspect-video rounded-lg overflow-hidden bg-primary-200  relative"
                            >
                                <img
                                    src={`/images/hero/main-${index + 1}.webp`}
                                    alt={`Hero Image ${index + 1}`}
                                    className="w-full h-full object-cover absolute top-0 left-0"

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
