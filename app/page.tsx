'use client'

import {
    AboutUs,
    Features,
    Hero,
    NewLetter,
    Testimonials,
} from "@/components";
import { GetInTouch } from "@/components/elements/get-in-touch";
import FAQ from "@/components/sections/faq-section";
import HowItWorks from "@/components/sections/how-it-works";
import SolarCalculator from "@/data/solar-generator";
import { useSearchParams } from "next/navigation";

export default function Home({ searchParams }: { searchParams: any }) {
    return searchParams.type ? <B2BMain /> : <B2CMain />;
}

const B2BMain = () => {
    return (
        <main className="">
            <Hero isB2B />
            <div id="about-us" className="p-2 sm:p-4 bg-beige-primary">
                <AboutUs isB2B />{" "}
            </div>
            <div className="p-2 sm:p-4 bg-secondary-950">
                <SolarCalculator />
            </div>
            <div id="process" className="p-2 sm:p-4 bg-beige-primary">
                <Features isB2B />
            </div>
            {/* <Metrics /> */}
            {/* <div className="p-2 sm:p-4 bg-beige-primary">
            </div> */}

            <div id="estimate" className="p-2 sm:p-4 bg-secondary-950">
                <GetInTouch />
            </div>

            {/* <OurExpert /> */}
            <div id={'frequently-asked-questions'} className="p-2 sm:p-4 bg-beige-primary">
                <FAQ isB2B />
            </div>

            {/* <Blog /> */}
        </main>
    );
};

const B2CMain = () => {
    return (
        <main className="">
            <Hero />
            <div id="about-us" className="p-2 sm:p-4 bg-beige-primary">
                <AboutUs />{" "}
            </div>
            <div id="process" className="p-2 sm:p-4 bg-secondary-950">
                <HowItWorks />
            </div>
            {/* <Metrics /> */}
            <div className="p-2 sm:p-4 bg-beige-primary">
                <Features />
            </div>
            <div id="estimate" className="p-2 sm:p-4 bg-secondary-950">
                <SolarCalculator />
            </div>
            {/* <OurExpert /> */}
            <div id={'frequently-asked-questions'} className="p-2 sm:p-4 bg-beige-primary">
                <FAQ />
            </div>

            {/* <Blog /> */}
        </main>
    );
};
