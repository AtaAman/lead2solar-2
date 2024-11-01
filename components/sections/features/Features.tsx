import { Container, Heading, Section, SubTitle } from "@/components";
import DynamicIcon from "@/components/elements/icons/IconComponent";
import Link from "next/link";

export const capitalized = (name: any) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
};

export const Features = ({ isB2B = false }: { isB2B?: boolean }) => {
    const solutions = isB2B ? [
        {
            'header': 'Step 1',
            'heading': '🌟 Choose Your Plan & Connect',
            'excerpt': 'Select a subscription plan that suits you and join our exclusive WhatsApp group if you want to stay connected. Gain access to potential customers and stay informed on industry trends.',
            'icon': 'communityIcon'
        },
        {
            'header': 'Step 2',
            'heading': '📍 Location-Based Precision',
            'excerpt': 'Receive leads specifically from the locations you want, ensuring they`re relevant and valuable to your business.',
            'icon': 'locationIcon'
        },
        {
            'header': 'Step 3',
            'heading': '🤝 Pre-Verified Leads, Handpicked by You',
            'excerpt': 'Our team double-checks every lead for quality, so you can confidently claim the ones that align best with your goals.',
            'icon': 'verifiedIcon'
        },
        {
            'header': 'Step 4',
            'heading': '📈 See Your Business Flourish',
            'excerpt': 'Experience increased sales and a stronger online presence, setting your business up for long-term success and growth.',
            'icon': 'growthIcon'
        }
    ] : [
        {
            header: "Step 1",
            heading: "Get a Free Quote from Nearby Installers",
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
        <Section className="bg-secondary-950 rounded-3xl">
            <Container>
                <SubTitle
                    subTitle={isB2B ? "How It Works" : "Our Simple 3-Step Process"}
                    className="text-secondary-50"
                />
                <div>
                    <div className="mb-12 ">
                        <Heading as="h2" className="text-title text-primary-50 leading-none">
                            {isB2B ? "Discover Our Process" : "Go Solar in 3 Simple Steps"}
                        </Heading>
                    </div>
                    <div className={`grid md:grid-cols-2 gap-10 xl:${!(solutions.length > 3) && "grid-cols-3"}`}>
                        {solutions.map((item: any, index: number) => {
                            return (
                                <div key={index} className="flex duration-100  hover:shadow-md p-6 rounded-xl hover:bg-secondary-900  flex-col gap-6 items-start">
                                    <Heading
                                        className="bg-primary-500  px-4 py-2 rounded-full"
                                        as="h4"
                                    >
                                        {item.header}
                                    </Heading>
                                    <div>
                                        <div className=" text-3xl whitespace-pre-wrap text-primary-600  leading-none mb-4">
                                            {item.heading}
                                        </div>
                                        <p className="opacity-50 text-secondary-50">{item.excerpt}</p>
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
