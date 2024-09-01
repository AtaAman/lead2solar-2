export const revalidate = 0;

import {
  AboutUs,
  Features,
  Hero,
  NewLetter,
  Testimonials,
} from "@/components";
import FAQ from "@/components/sections/faq-section";
import HowItWorks from "@/components/sections/how-it-works";
import SolarCalculator from "@/data/solar-generator";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <div id="about-us" className="p-2 sm:p-4 bg-beige-primary">
        <AboutUs />{" "}
      </div>
      <div id="process" className="p-2 sm:p-4 bg-secondary-950">
        <Features />
      </div>
      {/* <Metrics /> */}
      <div className="p-2 sm:p-4 bg-beige-primary">
        <HowItWorks />
      </div>
      <div id="estimate" className="p-2 sm:p-4 bg-secondary-950">
        <SolarCalculator />
      </div>
      {/* <OurExpert /> */}
       <div id={'frequently-asked-questions'} className="p-2 sm:p-4 bg-beige-primary">
        <FAQ />
      </div>
      <div className="p-2 sm:p-4  bg-secondary-950">
        <NewLetter />
      </div>
      {/* <Blog /> */}
    </main>
  );
}
