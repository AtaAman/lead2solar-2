import { Check, Container, Heading, Section, SubTitle } from "@/components";
import { getHomepage } from "@/sanity/queries/page";
import AboutUsCarousel from "./AboutUsCarousel";

export const AboutUs = async () => {
  const data = await getHomepage();

  const { aboutUs } = data;
  const checkpoints = [
    "High-efficiency solar panels",
    "Expert installation with minimal disruption",
    "Competitive pricing and financing options",
    "Comprehensive warranties",
    "Exceptional customer service",
  ];
  return (
    <Section className="bg-secondary-950 rounded-3xl">
      <Container>
        <SubTitle subTitle={aboutUs.tagline} />
        <div className="grid xl:grid-cols-2 gap-12 md:gap-24">
          <div className="flex justify-center flex-col gap-6">
            <Heading as="h2" className="text-section leading-none text-white">
              Why Choose Lead2Solar
            </Heading>
            {/* <p className="text-white">{aboutUs.excerpt}</p> */}
            <ul className="mt-4 grid grid-cols-2 xl:grid-cols-1 gap-4">
              {checkpoints.map((checkpoint, index) => (
                <li key={index} className="flex items-center gap-3 text-white">
                  <Check />
                  {checkpoint}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1">
            <AboutUsCarousel images={aboutUs.slider} />
          </div>
        </div>
      </Container>
    </Section>
  );
};
