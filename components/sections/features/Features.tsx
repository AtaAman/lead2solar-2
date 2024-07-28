import { Container, Heading, Section, SubTitle } from "@/components";
import DynamicIcon from "@/components/elements/icons/IconComponent";
import Link from "next/link";

export const capitalized = (name: any) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const Features = async () => {
  const solutions = [
    {
      header: "Step 1",
      heading: "Get a Free Quote from us",
      excerpt: "Request a free quote to discover your solar savings potential.",
      icon: "quoteIcon",
    },
    {
      header: "Step 2",
      heading: "Schedule Your Installation",
      excerpt:
        "Choose a convenient date for our expert team to install your solar system.",
      icon: "calendarIcon",
    },
    {
      header: "Step 3",
      heading: "Enjoy Your Savings",
      excerpt:
        "Start saving on your energy bills and enjoy the benefits of clean solar power.",
      icon: "savingsIcon",
    },
  ];

  return (
    <Section className="bg-[#FFF7ED] rounded-3xl">
      <Container>
        <SubTitle
          dark
          subTitle="Our Simple 3-Step Process"
          className="text-primary-950"
        />
        <div>
          <div className="mb-12 sm:mb-24">
            <Heading as="h2" className="text-section leading-none">
              Go Solar in Just 3 Easy Steps
            </Heading>
          </div>
          <div className="grid md:grid-cols-2 gap-8 xl:grid-cols-3">
            {solutions.map((item: any, index: number) => {
              return (
                <div key={index} className="flex flex-col gap-6 items-start">
                  <Heading
                    className="bg-primary-500 px-4 py-2 rounded-full"
                    as="h4"
                  >
                    {item.header}
                  </Heading>
                  <div>
                    <Heading as="h3" className="text-title leading-none mb-4">
                      {item.heading}
                    </Heading>
                    <p className="text-neutral-800">{item.excerpt}</p>
                  </div>
                  {item.cta && (
                    <button className="text-primary-950">
                      <Link href="/contact">{item.cta}</Link>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
};
