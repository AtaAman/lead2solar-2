'use client'
import { Heading, SubTitle } from '@/components/elements';
import { Container, Section } from '@/components/layouts';
import cn from '@/utils/clxs/cn';
import { Tag } from 'lucide-react';
import React, { useState } from 'react';

interface PricingPlan {
    name: string;
    planPrice: string;
    description: string;
    features: string[];
    iconColor: string;
    isHighlighted?: boolean;
    duration: string
    discount?: string
    originalPrice?: string
}

const pricingPlans: PricingPlan[] = [
    {
        name: "ESSENTIAL PLAN",
        planPrice: "₹ 3,999/-",
        description: "Receive 25 Verified Leads Per Month.",
        features: [
            "Receive 25 Verified Leads Per Month.",
            "5 Exclusive Leads only for your business.",
            "Each lead costs only Rs.160."
        ],
        duration: 'MONTHLY',
        iconColor: "#BEF264"
    },
    {
        name: "PROFESSIONAL PLAN",
        planPrice: "₹ 31,192/-",
        description: "Receive 450 Verified Leads (38/Month).",
        features: [
            "Receive 450 Verified Leads (38/Month).",
            "120 Exclusive Leads only for you (10/Month).",
            "Each lead costs only Rs.70.",
            "Enjoy 35% off compared to the monthly plan."
        ],
        iconColor: "#BEF264",
        isHighlighted: true,
        discount: "35%",
        duration: 'ANNUALLY',
        originalPrice: "₹47,988"
    },
    {
        name: "GROWTH PLAN",
        planPrice: "₹ 9,597/-", // Calculated monthly price based on quarterly price
        description: "Receive 90 Verified Leads (30/Month).",
        features: [
            "Receive 90 Verified Leads (30/Month).",
            "24 Exclusive Leads only for you (8/Month).",
            "Each lead costs only Rs.106.",
            "Enjoy 20% off compared to the monthly plan."
        ],
        iconColor: "#BEF264",
        duration: 'QUARTERLY',
        discount: "20%",
        originalPrice: "₹11,997"
    }
];


const PricingSection: React.FC = () => {
    return (
        <Section className="bg-beige-primary rounded-3xl">
            <Container>
                <SubTitle
                    dark
                    subTitle="Check out our pricing"
                    className="text-secondary-950"
                />
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-14 md:mb-20">
                        <Heading as="h2" className="text-title mb-3 leading-none">
                            Choose Your Perfect plan
                        </Heading>
                        {/* <h1 className="font-heading text-5xl sm:text-5xl mb-3">Pricing</h1>/ */}
                        <p className="text-sm text-gray-700">Our pricing plans are simple and designed to cater to households and companies of various sizes. Choose a plan that suits your needs and budget.</p>
                    </div>

                    <div className="max-w-sm mx-auto lg:max-w-none">

                        <div className="flex flex-wrap -mx-4">
                            {pricingPlans.map((plan, index) => (
                                <div key={index} className="w-full lg:w-1/3 px-4 mb-8 lg:mb-0">

                                    <div className={cn(
                                        "flex flex-col h-full hover:scale-105   transition-transform duration-300",
                                        plan.isHighlighted && "transform scale-105 hover:scale-110"
                                    )}>

                                        <div className={cn(
                                            "p-8 rounded-2xl h-full relative",
                                            plan.isHighlighted ? 'bg-secondary-900' : 'bg-secondary-300 border'
                                        )}>
                                            {plan.discount && (
                                                <div className="absolute top-4 right-4">
                                                    <span className="bg-green-500 text-white px-2 py-1 rounded-full flex gap-2 text-sm">
                                                        <span className='line-through text-secondary-900'>{plan.originalPrice}</span>
                                                        <span className='flex items-center  gap-1 font-bold'>

                                                            Save {plan.discount}
                                                            {/* <Tag size={14} /> */}
                                                        </span>
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex flex-col h-full">
                                                <div className="mb-auto">
                                                    <span className={cn(
                                                        "block text-xs font-medium px-3 py-1 rounded-full w-fit mt-8",
                                                        !plan.isHighlighted ? 'bg-secondary-950 text-beige-primary' : 'text-secondary-950 bg-beige-primary'
                                                    )}>{plan.duration}</span>
                                                    <span className={cn(
                                                        "block text-xl font-medium mb-4 mt-2",
                                                        plan.isHighlighted && "text-white"
                                                    )}>{plan.name}</span>
                                                    <div className="flex items-center mb-6">
                                                        <span className={cn(
                                                            "text-4xl",
                                                            plan.isHighlighted && "text-white"
                                                        )}>{plan.planPrice}</span>
                                                    </div>
                                                    <p className={cn(
                                                        "mb-8",
                                                        plan.isHighlighted && "text-white opacity-80"
                                                    )}>{plan.description}</p>
                                                </div>
                                                <span className={cn(
                                                    "block text-xl w-full items-center gap-2 flex flex-row border-b pb-2 font-bold mb-6",
                                                    plan.isHighlighted ? 'text-primary-50 border-primary-50' : 'text-primary-950 border-primary-950'
                                                )}>
                                                    <span className={cn(
                                                        "h-2 w-2 block rounded-full",
                                                        plan.isHighlighted ? 'bg-primary-50' : 'bg-primary-950'
                                                    )} />
                                                    What's included
                                                </span>
                                                <ul className="h-full">
                                                    {plan.features.map((feature, featureIndex) => (
                                                        <li key={featureIndex} className={cn(
                                                            "flex mb-4 items-center",
                                                            plan.isHighlighted ? 'text-white/80' : 'text-secondary-800'
                                                        )}>
                                                            <span className="flex-shrink-0">
                                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect width="20" height="20" rx="10" fill={plan.isHighlighted ? 'yellow' : "#022C22"}></rect>
                                                                    <path d="M14.8 6.40002L8.19995 13L5.19995 10" stroke={!plan.isHighlighted ? 'yellow' : "black"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                </svg>
                                                            </span>
                                                            <span className="ml-3">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default PricingSection;