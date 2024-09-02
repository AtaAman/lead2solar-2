"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/elements/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/elements/select";
import { Input } from "@/components/elements/input";
import { Button } from "@/components/elements/shad-cn/button";
import { Container, Heading, Section, SubTitle } from "@/components";
import { useState } from "react";
import { Label } from "@/components/elements/label";
import cn from "@/utils/clxs/cn";

interface SolarIrradianceData {
    [key: string]: number;
}

const solarIrradianceData: SolarIrradianceData = {
    "Andhra Pradesh": 5.4,
    "Arunachal Pradesh": 4.5,
    Assam: 4.8,
    Bihar: 5.1,
    Chhattisgarh: 5.2,
    Goa: 5.5,
    Gujarat: 5.8,
    Haryana: 5.5,
    "Himachal Pradesh": 5.0,
    Jharkhand: 5.2,
    Karnataka: 5.6,
    Kerala: 5.4,
    "Madhya Pradesh": 5.5,
    Maharashtra: 5.6,
    Manipur: 4.6,
    Meghalaya: 4.7,
    Mizoram: 4.6,
    Nagaland: 4.6,
    Odisha: 5.3,
    Punjab: 5.4,
    Rajasthan: 5.8,
    Sikkim: 4.8,
    "Tamil Nadu": 5.6,
    Telangana: 5.5,
    Tripura: 4.7,
    "Uttar Pradesh": 5.3,
    Uttarakhand: 5.1,
    "West Bengal": 5.0,
};

const FormSchema = z.object({
    state: z.string({
        required_error: "Please select your state.",
    }),
    customerType: z.string({
        required_error: "Please select your customer type.",
    }),
    monthlyBill: z.coerce
        .number({
            required_error:
                "Please enter your average monthly electricity bill in rupees.",
        })
        .min(1, "Monthly bill must be greater than zero."),
    phoneNumber: z.string({
        required_error: "Please enter your 10-digit phone number.",
    }).regex(/^[0-9]{10}$/, "Phone number must be a 10-digit number."),
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    pincode: z.string({
        required_error: "Please enter your 6-digit pincode.",
    }).regex(/^[0-9]{6}$/, "Pincode must be a 6-digit number."),
});
interface CalculationResult {
    systemSize: number;
    systemCost: number;
    incentiveAmount: number;
    netCost: number;
    annualSavings: number;
    paybackPeriod: string;
    roi: string;
}
const SolarCalculator: React.FC = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    const [calculationResult, setCalculationResult] =
        useState<CalculationResult | null>(null);
    const [key, setKey] = useState(0);
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const { state, customerType, monthlyBill } = data;

        // Constants
        const perDayGenerationPerKW = 4; // kWh
        const daysInYear = 365;
        const electricityPrice = 11; // Rs per kWh
        const averagePriceFor1kW = 63000; // Rs

        // Calculate system size (assuming monthly bill is in Rs)
        const yearlyBill = monthlyBill * 12;
        const systemSize = Math.ceil(yearlyBill / (perDayGenerationPerKW * daysInYear * electricityPrice));

        // Calculate system cost
        const systemCost = systemSize * averagePriceFor1kW;

        // Calculate government incentive
        let incentiveAmount;
        if (systemSize <= 1) {
            incentiveAmount = 30000;
        } else if (systemSize <= 2) {
            incentiveAmount = 60000;
        } else {
            incentiveAmount = 78000;
        }

        // Calculate net cost
        const netCost = systemCost - incentiveAmount;

        // Calculate annual savings
        const yearlyGenerationPerKW = perDayGenerationPerKW * daysInYear;
        const totalSystemGeneration = systemSize * yearlyGenerationPerKW;
        const annualSavings = totalSystemGeneration * electricityPrice;

        // Calculate payback period
        const paybackPeriod = (netCost / annualSavings)?.toFixed(2);

        // Calculate ROI (Return on Investment)
        const roi = ((annualSavings / netCost) * 100).toFixed(2);

        const result: CalculationResult = {
            systemSize,
            systemCost,
            incentiveAmount,
            netCost,
            annualSavings,
            paybackPeriod,
            roi,
        };
        await onSubmitToGoogleSheets({...data,...result});
        setCalculationResult(result);
    }


    const onSubmitToGoogleSheets = async (data:any) => {
        try {
          const formData = { ...data, type: "estimate" };
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
console.log(`(logs) > response:`, response);
        } catch (error) {
          console.error("Error submitting form:", error);
        } finally {
        }
      };

    function resetForm() {
        form.reset();
        setKey((prevKey) => prevKey + 1); // Add this line
        setCalculationResult(null);
    }
    return (
        <Section className="bg-[#FFF7ED] rounded-3xl">
            <Container>
                <SubTitle
                    dark
                    subTitle="Estimate your solar savings in a few simple steps"
                    className="text-primary-950"
                />
                <div className="mb-12 sm:mb-24">
                    <Heading as="h2" className="text-section leading-none">
                        Solar Calculator - See Your Potential Savings
                    </Heading>
                </div>
                <Form key={key} {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex gap-6 flex-col">
                        <div className="space-y-6 flex gap-6 flex-row md:flex-col ">
                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Select Your State</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger style={{ border: '2px solid #143109', borderRadius: '8px' }} className="border-0 rounded-none shadow-none " >
                                                    <SelectValue className="bg-primary-200 text-secondary-500" placeholder="Select your state" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.keys(solarIrradianceData).map((state) => (
                                                    <SelectItem key={state} value={state}>
                                                        {state}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="customerType"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Select Customer Type</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger style={{ border: '2px solid #143109', borderRadius: '8px' }} className="border-0 rounded-none shadow-none " >
                                                    <SelectValue placeholder="Customer type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="residential">Residential</SelectItem>
                                                <SelectItem value="institutional">Institutional</SelectItem>
                                                <SelectItem value="industrial">Industrial</SelectItem>
                                                <SelectItem value="commercial">Commercial</SelectItem>
                                                <SelectItem value="government">Government</SelectItem>
                                                <SelectItem value="Social Sector">Social Sector</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-6 flex gap-6 flex-col ">
                            <FormField
                                control={form.control}
                                name="monthlyBill"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel  >
                                            Enter Your Average Monthly Electricity Bill (₹)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                style={{ border: '2px solid #143109', borderRadius: '8px' }} className="border-0 rounded-none shadow-none "
                                                type="number"
                                                placeholder="Enter your average monthly electricity bill"
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /><FormField
                                control={form.control}
                                name="pincode"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Pincode</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="10001"
                                                style={{ border: '2px solid #143109', borderRadius: '8px' }} className="border-0 rounded-none shadow-none"
                                                type="text"
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="1234567890"
                                            style={{ border: '2px solid #143109', borderRadius: '8px' }} className="border-0 rounded-none shadow-none"
                                            type="tel"
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="space-y-6 flex gap-6 flex-row md:flex-col ">
                            <FormField
                                control={form.control}
                                name="name"

                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Customer Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="John Doe"
                                                style={{ border: '2px solid #143109', borderRadius: '8px' }} className="border-0 rounded-none shadow-none"
                                                type="text"
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="email@example.com"
                                                style={{ border: '2px solid #143109', borderRadius: '8px' }} className="border-0 rounded-none shadow-none"
                                                type="email"
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button className=" text-white" variant={"secondary"} style={{ height: '45px' }} type="submit">
                            Calculate Savings
                        </Button>
                    </form>
                </Form>
                {calculationResult && (
                    <div className="pt-8 mt-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div

                                className="  bg-secondary-950  rounded-xl p-4 sm:p-8 text-lg flex gap-2 flex-col  text-white "
                            >
                                <CardTitle subTitle=" System Details" />

                                <p>System Size: {calculationResult.systemSize.toFixed(2)} kW</p>
                                <p>System Cost: ₹{calculationResult.systemCost.toFixed(2)}</p>
                                <p>
                                    Government Subsidy: ₹
                                    {calculationResult.incentiveAmount.toFixed(2)}
                                </p>
                                <p>Net Cost: ₹{calculationResult.netCost.toFixed(2)}</p>
                            </div>
                            <div

                                className="  bg-secondary-950 rounded-xl text-lg p-4 md:p-8 flex gap-2 flex-col  text-white "
                            >
                                <CardTitle subTitle="Savings & ROI" />
                                <p>
                                    Annual Savings: ₹{calculationResult.annualSavings}
                                </p>
                                <p>
                                    Payback Period: {calculationResult.paybackPeriod}{" "}
                                    years
                                </p>
                                <p>Return on Investment: {calculationResult.roi}%</p>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-4">
                            <Button size={"lg"} className="bg-secondary-950 text-white w-full" variant="secondary" onClick={resetForm}>
                                Reset
                            </Button>
                        </div>
                    </div>
                )}
            </Container>
        </Section>
    );
};

const CardTitle = ({ subTitle }: { subTitle: string }) => {
    return (
        <div
            className={cn(
                "flex text-white text-lg w-full items-center gap-2 border-b  mb-4  pb-4",
                "border-neutral-300"
            )}
        >
            <span className={cn("h-3 w-3  block rounded-full", "bg-primary-300")} />
            <span>{subTitle}</span>
        </div>
    );
};

export default SolarCalculator;
