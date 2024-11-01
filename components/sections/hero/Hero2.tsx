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
    companyName: z.string().min(1, 'Company name is required'),
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    name: z.string().min(1, 'Name is required'),
    pinCode: z.string().min(1, 'Pin code is required'),
    gstNumber: z.string().min(1, 'GST number is required'),
});
const Hero2: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schema),
    });
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    const onSubmit = async (data: any) => {
        try {
            const response = await fetch('/api/submitGoogleForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setIsSubmitted(true);
                reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    const formFields = (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-secondary-900 text-white bg-opacity-95 p-6  w-11/12 rounded-xl shadow-2xl backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-6 text-center text-secondary-400 ">Join Our Solar Network</h3>

            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                    <input
                        type="text"
                        {...register('name')}
                        placeholder="Full Name*"
                        className="w-full py-2 px-4 rounded-lg text-sm text-secondary-950 bg-beige-primary/90 focus:ring-2 focus:ring-lime-400 focus:bg-white transition-all duration-300 border-2 border-transparent hover:border-lime-400/50"
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message as any}</p>}
                </div>

                <div>
                    <input
                        type="text"
                        {...register('contactNumber')}
                        placeholder="WhatsApp Number*"
                        className="w-full py-2 px-4 rounded-lg text-sm text-secondary-950 bg-beige-primary/90 focus:ring-2 focus:ring-lime-400 focus:bg-white transition-all duration-300 border-2 border-transparent hover:border-lime-400/50"
                    />
                    {errors.contactNumber && <p className="text-red-400 text-xs mt-1">{errors.contactNumber.message as any}</p>}
                </div>

                <div>
                    <input
                        type="email"
                        {...register('email')}
                        placeholder="Email*"
                        className="w-full py-2 px-4 rounded-lg text-sm text-secondary-950 bg-beige-primary/90 focus:ring-2 focus:ring-lime-400 focus:bg-white transition-all duration-300 border-2 border-transparent hover:border-lime-400/50"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message as any}</p>}
                </div>

                <div>
                    <input
                        type="text"
                        {...register('companyName')}
                        placeholder="Company Name*"
                        className="w-full py-2 px-4 rounded-lg text-sm text-secondary-950 bg-beige-primary/90 focus:ring-2 focus:ring-lime-400 focus:bg-white transition-all duration-300 border-2 border-transparent hover:border-lime-400/50"
                    />
                    {errors.companyName && <p className="text-red-400 text-xs mt-1">{errors.companyName.message as any}</p>}
                </div>

                <div>
                    <input
                        type="text"
                        {...register('pinCode')}
                        placeholder="Pin Code*"
                        className="w-full py-2 px-4 rounded-lg text-sm text-secondary-950 bg-beige-primary/90 focus:ring-2 focus:ring-lime-400 focus:bg-white transition-all duration-300 border-2 border-transparent hover:border-lime-400/50"
                    />
                    {errors.pinCode && <p className="text-red-400 text-xs mt-1">{errors.pinCode.message as any}</p>}
                </div>

                <div className="col-span-2">
                    <input
                        type="text"
                        {...register('gstNumber')}
                        placeholder="GST Number*"
                        className="w-full py-2 px-4 rounded-lg text-sm text-secondary-950 bg-beige-primary/90 focus:ring-2 focus:ring-lime-400 focus:bg-white transition-all duration-300 border-2 border-transparent hover:border-lime-400/50"
                    />
                    {errors.gstNumber && <p className="text-red-400 text-xs mt-1">{errors.gstNumber.message as any}</p>}
                </div>
            </div>

            <Button
                variant="secondary"
                className="mt-6 text-black w-full bg-secondary-400 hover:bg-secondary-500 transition-all duration-300 py-3 font-semibold text-sm rounded-lg shadow-lg hover:shadow-xl"
            >
                Submit Application
            </Button>

            <p className="text-xs text-center mt-4 text-gray-300">
                By submitting, you agree to our Terms of Service
            </p>
        </form>
    );

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

                </div>
                <div className="hidden lg:flex items-center justify-center absolute top-0 right-0 h-full max-w-lg xl:max-w-none xl:w-2/5  ml-auto bg-lime-500">
                    <div className="w-full  flex items-center justify-center h-full bg-cover bg-center" style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1536408745983-0f03be6e8a00?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    }}>
                        {isSubmitted ? (
                            <div className="bg-white my-12 bg-opacity-80 p-6 rounded-lg">
                                <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
                                <p>Your form has been submitted successfully.</p>
                            </div>
                        ) : formFields}
                    </div>
                </div>
                <div className="relative flex lg:hidden  rounded-2xl bg-lime-500 items-center justify-center">
                    <div className="w-full my-10 flex items-center rounded-2xl justify-center h-full bg-cover bg-center" style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1536408745983-0f03be6e8a00?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    }}>
                        {isSubmitted ? (
                            <div className="bg-white my-12 bg-opacity-80 p-6 rounded-lg">
                                <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
                                <p>Your form has been submitted successfully.</p>
                            </div>
                        ) : (
                            formFields
                        )}
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default Hero2;