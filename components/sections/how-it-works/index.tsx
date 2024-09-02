import { Heading, SubTitle } from '@/components/elements'
import { Container, Section } from '@/components/layouts'
import React from 'react'

function HowItWorks() {
    return (
        <Section className="bg-[#FFF7ED] rounded-3xl py-16">
            <Container>
                <SubTitle
                dark
          className="text-primary-950"
                subTitle={'Why Go Solar'} />

                <div className="flex flex-col gap-8">
                    <ReasonCard
                        title="Zero Electricity Bills – Forever Free!"
                        description="Imagine a life with no electricity bills! Our customers have achieved just that by switching to solar. You can cut your energy expenses dramatically or even eliminate them altogether, saving thousands of rupees each year. Solar is not just a smart choice; it's a financially rewarding one."
                    />
                    <ReasonCard
                        title="Earn ₹78,000 in Government Rewards!"
                        description="Take advantage of generous government subsidies that make going solar even more affordable. Many of our clients have pocketed up to ₹78,000 in incentives, reducing the cost of installation and boosting their savings. We help you navigate the process to ensure you receive the full benefits."
                    />
                    <ReasonCard
                        title="Join the Green Revolution – Make a Difference!"
                        description="Be a part of the movement towards a sustainable future. By choosing solar, you're not only saving money but also contributing to a greener planet. Our customers take pride in their role in reducing carbon footprints and promoting renewable energy. Let's make the world a better place, together!"
                    />
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

            <p className="text-gray-500 ml-4">{description}</p>
        </div>
    )
}

export default HowItWorks
