import { Heading, SubTitle } from '@/components/elements'
import { Container, Section } from '@/components/layouts'
import React from 'react'

interface HowItWorksProps {
    isB2B?: boolean;
}

function HowItWorks({ isB2B = false }: HowItWorksProps) {
    const reasons = isB2B ? [
        {
            title: "Join Our Community: Sign up for one of our WhatsApp group plans or digital marketing services.",
            description: "Sign up for one of our WhatsApp group plans or digital marketing services to connect with potential customers and stay updated on industry trends."
        },
        {
            title: "Receive Quality Leads: Access and convert leads shared in our groups.",
            description: "Access and convert leads shared in our groups to grow your customer base and increase sales."
        },
        {
            title: "Boost Your Online Presence: Utilize our digital marketing services to engage with your audience and attract more customers.",
            description: "Utilize our digital marketing services to engage with your audience and attract more customers through targeted campaigns and content."
        },
        {
            title: "Grow Your Business: Watch your business thrive with increased sales and a stronger online presence.",
            description: "Watch your business thrive with increased sales and a stronger online presence, leading to long-term success and growth."
        }
    ] : [
        {
            title: "Zero Electricity Bills – Forever Free!",
            description: "Imagine a life with no electricity bills! Our customers have achieved just that by switching to solar. You can cut your energy expenses dramatically or even eliminate them altogether, saving thousands of rupees each year. Solar is not just a smart choice; it's a financially rewarding one."
        },
        {
            title: "Earn ₹78,000 in Government Rewards!",
            description: "Take advantage of generous government subsidies that make going solar even more affordable. Many of our clients have pocketed up to ₹78,000 in incentives, reducing the cost of installation and boosting their savings. We help you navigate the process to ensure you receive the full benefits."
        },
        {
            title: "Join the Green Revolution – Make a Difference!",
            description: "Be a part of the movement towards a sustainable future. By choosing solar, you're not only saving money but also contributing to a greener planet. Our customers take pride in their role in reducing carbon footprints and promoting renewable energy. Let's make the world a better place, together!"
        }
    ];

    return (
        <Section className="bg-[#FFF7ED] rounded-3xl py-16">
            <Container>
                <SubTitle
                    dark
                    className="text-primary-950"
                    subTitle={isB2B ? 'How It Works' : 'Why Go Solar'} />

                <div className="flex flex-col gap-8">
                    {reasons.map((reason, index) => (
                        <ReasonCard
                            key={index}
                            title={reason.title}
                            description={reason.description}
                        />
                    ))}
                </div>
            </Container>
        </Section>
    )
}

function ReasonCard({ title, description }: { title: string, description: string }) {
    return (
        <div className="rounded-xl py-6 ">
            <Heading as="h3" className="text-section leading-none mb-2 text-secondary-900">
                {title}
            </Heading>
            n
            <div className="text-gray-500 ml-4 break-before-auto text-balance p-4">{description}</div>
        </div>
    )
}

export default HowItWorks
