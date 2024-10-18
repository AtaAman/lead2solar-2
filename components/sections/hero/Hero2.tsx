'use client'
import { Button, Heading } from '@/components/elements';
import { Container, Section } from '@/components/layouts';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/elements/input';

const schema = z.object({
    contactNumber: z.string().min(1, 'Contact number is required'),
    companyName: z.string().optional(),
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
});

const Hero2: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schema),
    });

    const [isSubmitted, setIsSubmitted] = React.useState(false);

    const onSubmit = (data: any) => {
        console.log(data);
        setIsSubmitted(true);
        reset();
    };
    return (
        <Section className="bg-secondary-950 h-fit py-20 flex flex-col gap-20">
            <Container >
                <div className="max-w-lg xl:max-w-2xl mx-auto lg:mx-0 pt-12 pb-28 lg:py-24">
                    <Heading
                        as="h1"
                        className=" text-title md:text-6xl text-white   leading-none"
                    >
                        Empower Your Solar Business with Digital Solutions
                    </Heading>
                    <p className="max-w-md xl:max-w-none  text-md text-beige-primary mt-4 mb-10">
                        Join Lead2Solar and Connect with Customers Ready to Go Solar
                    </p>
                    <Button variant="secondary">Get Your Free Quote Now</Button>
                </div>
                <div className="hidden lg:flex items-center justify-center absolute top-0 right-0 h-full max-w-lg xl:max-w-none xl:w-2/5  ml-auto bg-lime-500">
                    <div className="w-full flex items-center justify-center h-full bg-cover bg-center" style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1536408745983-0f03be6e8a00?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    }}>
                        {isSubmitted ? (
                            <div className="bg-white my-12 bg-opacity-80 p-6 rounded-lg">
                                <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
                                <p>Your form has been submitted successfully.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="bg-secondary-900 text-white bg-opacity-90 p-6  mt-16 w-10/12 rounded-xl">
                                <div className="mb-4">
                                    <label htmlFor="contactNumber" className="block mb-2">Contact Number*</label>
                                    <input
                                        type="text"
                                        {...register('contactNumber')}
                                        placeholder="Enter your contact number"
                                        className="w-full py-1 px-3 rounded-2xl h-10 placeholder:text-secondary-950/40 text-secondary-950 border bg-beige-primary rounded"
                                    />
                                    {errors.contactNumber && <p className="text-red-500">{errors.contactNumber.message as any}</p>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="companyName" className="block mb-2">Company Name</label>
                                    <input
                                        type="text"
                                        {...register('companyName')}
                                        placeholder="Enter your company name"
                                        className="w-full py-1 px-3 rounded-2xl h-10 placeholder:text-secondary-950/40 text-secondary-950 border bg-beige-primary rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block mb-2">Email*</label>
                                    <input
                                        type="email"
                                        {...register('email')}
                                        placeholder="Enter your email address"
                                        className="w-full py-1 px-3 rounded-2xl h-10 placeholder:text-secondary-950/40 text-secondary-950 border bg-beige-primary rounded"
                                    />
                                    {errors.email && <p className="text-red-500">{errors.email.message as any}</p>}
                                </div>
                                <Button variant="secondary" className="mt-4 text-black w-full">Submit</Button>
                            </form>
                        )}
                    </div>
                </div>
                <div className="relative flex lg:hidden  rounded-2xl bg-lime-500 items-center justify-center">
                    <div className="w-full flex items-center rounded-2xl justify-center h-full bg-cover bg-center" style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1536408745983-0f03be6e8a00?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    }}>
                        {isSubmitted ? (
                            <div className="bg-white my-12 bg-opacity-80 p-6 rounded-lg">
                                <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
                                <p>Your form has been submitted successfully.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="bg-secondary-900 text-white bg-opacity-90 p-6  my-10 w-10/12 rounded-xl">
                                <div className="mb-4">
                                    <label htmlFor="contactNumber" className="block mb-2">Contact Number*</label>
                                    <input
                                        type="text"
                                        {...register('contactNumber')}
                                        placeholder="Enter your contact number"
                                        className="w-full py-1 px-3 rounded-2xl h-10 placeholder:text-secondary-950/40 text-secondary-950 border bg-beige-primary rounded"
                                    />
                                    {errors.contactNumber && <p className="text-red-500">{errors.contactNumber.message as any}</p>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="companyName" className="block mb-2">Company Name</label>
                                    <input
                                        type="text"
                                        {...register('companyName')}
                                        placeholder="Enter your company name"
                                        className="w-full py-1 px-3 rounded-2xl h-10 placeholder:text-secondary-950/40 text-secondary-950 border bg-beige-primary rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block mb-2">Email*</label>
                                    <input
                                        type="email"
                                        {...register('email')}
                                        placeholder="Enter your email address"
                                        className="w-full py-1 px-3 rounded-2xl h-10 placeholder:text-secondary-950/40 text-secondary-950 border bg-beige-primary rounded"
                                    />
                                    {errors.email && <p className="text-red-500">{errors.email.message as any}</p>}
                                </div>
                                <Button variant="secondary" className="mt-4 text-black w-full">Submit</Button>
                            </form>
                        )}
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default Hero2;