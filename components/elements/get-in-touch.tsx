"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "./input";
import { Label } from "./label";
import { Button } from "./shad-cn/button";
import { Container, Section } from "../layouts";
import { SubTitle } from "./sub-title";
import { Heading } from "./heading";

const schema = {
    name: { required: "Name is required" },
    email: { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" } },
    phone: { required: "Phone number is required", minLength: { value: 10, message: "Phone number must be at least 10 digits" } },
    address: {},
    message: {},
};

type FormValues = {
    name: string;
    email: string;
    phone: string;
    address: string;
    message: string;
};

export function GetInTouch() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitted, isSubmitting, isSubmitSuccessful },
    } = useForm<FormValues>({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            address: '',
            message: '',
        },
    });

    const onSubmit = async (data: FormValues) => {
        try {
            const formData = { ...data, type: "landing-page", pageType: 'B2B' };
            const response = await fetch("/api/submitForm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            await response.json();

            reset();
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
        }
    };

    return (
        <Section className="bg-beige-primary rounded-3xl ">
            <Container>
                <SubTitle
                    dark
                    subTitle="Get in Touch"
                    className="text-secondary-950"
                />
                <div className="mb-12">
                    <Heading as="h2" className="text-section leading-none ">
                        Get in Touch With Us!
                    </Heading>
                </div>
                {isSubmitSuccessful ? (
                    <div>
                        <div className="pb-3 text-xl text-secondary-950">
                            Thank you for your request. We will get back to you shortly.
                        </div>

                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="gap-6 text-secondary-950 flex flex-col"
                    >
                        <div className="flex  flex-col gap-2">
                            <Label htmlFor="name">Your Name*</Label>
                            <Input
                                disabled={isSubmitting}
                                id="name"
                                type="text"
                                className="border border-secondary-950 shadow-none h-[44px] placeholder:text-secondary-950/50"
                                placeholder="Enter your name"
                                {...register("name")}
                            />
                            {errors.name && (
                                <span className="text-red-500">{errors.name.message}</span>
                            )}
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex flex-col w-full gap-2">
                                <Label htmlFor="email">Email Address*</Label>
                                <Input
                                    disabled={isSubmitting}
                                    id="email"
                                    className="border border-secondary-950 placeholder:text-secondary-950/50  h-[44px]"
                                    type="email"
                                    placeholder="Enter your email"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <span className="text-red-500">{errors.email.message}</span>
                                )}
                            </div>
                            <div className="flex flex-col w-full gap-2">
                                <Label htmlFor="phone">Phone Number*</Label>
                                <Input
                                    disabled={isSubmitting}
                                    id="phone"
                                    className="border border-secondary-950 placeholder:text-secondary-950/50  h-[44px]"
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    {...register("phone")}
                                />
                                {errors.phone && (
                                    <span className="text-red-500">{errors.phone.message}</span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="address">Address</Label>
                            <textarea
                                disabled={isSubmitting}
                                id="address"
                                className="flex h-20 w-full border bg-inherit border-secondary-950 placeholder:text-secondary-950/50 rounded-lg px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Enter your address"
                                {...register("address")}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="message">Message us</Label>
                            <textarea
                                disabled={isSubmitting}
                                id="message"
                                className="flex h-20 w-full rounded-md bg-inherit border border-secondary-950 placeholder:text-secondary-950/50 px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Enter your message"
                                {...register("message")}
                            />
                        </div>
                        <div className="sm:justify-start flex gap-2 flex-row">
                            <Button disabled={isSubmitting} className="bg-secondary-950 text-secondary-50 hover:bg-secondary-800" size={'lg'} type="submit">
                                {isSubmitting ? "Submitting " : "Submit Details"}
                            </Button>
                        </div>
                    </form>
                )}

            </Container></Section>
    );
}
