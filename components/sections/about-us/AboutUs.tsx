import { Check, Container, Heading, Section, SubTitle } from "@/components";
import AboutUsCarousel from "./AboutUsCarousel";

export const AboutUs = ({ isB2B = false }) => {
    const checkpoints = isB2B ? [
        "Solar Industry Expertise",
        "Comprehensive Digital Solutions",
        "Double-Verified Leads for Quality",
        "Select Leads That Fit Your Business",
        "Customised Services for Your Needs"
    ] : [
        " Get the best deals from local installers tailored to your needs", "Easy comparisons to find the perfect option", "Expert installation with minimal disruption", "Competitive pricing and flexible financing options", "Comprehensive warranties for peace of mind", "Exceptional customer service every step of the way"
    ];


    const aboutUsText = isB2B ?
        "At Lead2Solar, we focus on helping solar installers grow their business by going digital and getting quality leads. Our all-in-one services are designed to boost your online presence and increase your sales. Join us and benefit from what we offer."
        :
        "At Lead2Solar, we specialize in connecting homeowners and businesses with trusted solar installers in their area. Our mission is to make solar energy accessible and affordable for everyone. By partnering with local experts, we ensure our customers receive the highest quality service at the most competitive rates. With a commitment to excellence and sustainability, we help our clients reduce their electricity bills while contributing to a greener planet. Join us on this journey towards a more sustainable future and enjoy the benefits of clean, renewable energy.";

    return (
        <Section className="bg-secondary-950 rounded-3xl">
            <Container>
                <SubTitle subTitle={'About Us'} />
                <div className="grid xl:grid-cols-2 gap-12 md:gap-24">
                    <div className="flex justify-center flex-col gap-6">
                        <Heading as="h2" className="text-section leading-none text-white">
                            Why Choose Lead2Solar
                        </Heading>

                        <p className="text-white text-sm italic">{aboutUsText}</p>
                        <ul className="mt-4 grid grid-cols-1 gap-4">
                            {checkpoints.map((checkpoint, index) => (
                                <li key={index} className="flex items-center gap-3 text-white">
                                    <Check />
                                    {checkpoint}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-span-1">
                        <AboutUsCarousel />
                    </div>
                </div>
            </Container>
        </Section>
    );
};
