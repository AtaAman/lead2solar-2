
import {
    AboutUs,
    Features,
    Hero,
    NewLetter,
    Testimonials,
} from "@/components";
import { GetInTouch } from "@/components/elements/get-in-touch";
import FAQ from "@/components/sections/faq-section";
import SheetData from "@/components/sections/get-sheet-data";
import HowItWorks from "@/components/sections/how-it-works";
import SolarCalculator from "@/data/solar-generator";
// import { useEffect } from "react";

export default function Home({ searchParams }: { searchParams: any }) {
    return searchParams.type ? <B2BMain /> : <B2CMain />;
}

const B2BMain = () => {
    return (
        <main className="">
            <Hero isB2B />
            <Section id="about-us" isBeige>
                <AboutUs isB2B />{" "}
            </Section>
            <Section
                id={'frequently-asked-questions'}

            >
                <SheetData />
            </Section>
            <Section id='process' isBeige>

                <Features isB2B /></Section>
            <Section id="estimate">
                <GetInTouch title="Get Qualified leads today!" />
            </Section>
            <Section
                id={'frequently-asked-questions'}
                isBeige
            >
                <FAQ isB2B />
            </Section>

        </main>
    );
};

const B2CMain = () => {
    return (
        <main className="">
            <Hero />
            <Section id="about-us" isBeige>
                <AboutUs />
            </Section>
            <Section id="process" >
                <HowItWorks />
            </Section>

            <Section isBeige>
                <Features />
            </Section>
            <Section id="estimate">
                <SolarCalculator />
            </Section>
            <Section
                id={'frequently-asked-questions'}
                isBeige
            >
                <FAQ />
            </Section>

        </main>
    );
};

const Section = ({ id, isBeige = false, children }: { id?: string, isBeige?: boolean, children: any }) => (
    <div
        id={id}
        className={`p-2 sm:p-4 ${isBeige ? 'bg-beige-primary' : 'bg-secondary-950'}`}
    >
        {children}
    </div>
);
