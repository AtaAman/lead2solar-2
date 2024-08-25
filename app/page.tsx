export const revalidate = 0;

import {
  AboutUs,
  Features,
  Hero,
  NewLetter,
  Testimonials,
} from "@/components";
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
      {/* <div className="p-2 sm:p-4 bg-beige-primary">
        <Testimonials />
      </div> */}
      <div id="estimate" className="p-2 sm:p-4 bg-secondary-950">
        <SolarCalculator />
      </div>
      {/* <OurExpert /> */}
      <div className="p-2 sm:p-4 bg-beige-primary">
        <NewLetter />
      </div>
      {/* <Blog /> */}
    </main>
  );
}
