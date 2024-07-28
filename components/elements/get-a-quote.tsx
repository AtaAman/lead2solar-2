"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./input";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "./shad-cn/button";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
  pincode: z.string().min(6, { message: "Pincode must be 6 digits" }),
  monthlyBill: z
    .string()
    .min(1, { message: "Monthly electricity bill is required" }),
  address: z.string().optional(),
  installedAt: z.enum(["home", "office", "factory", "other"]),
  remarks: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function GetAQuote({ children }: { children: any }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const formData = { ...data, type: "landing-page" };
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
    <Dialog>
      <DialogTrigger onClick={() => reset()} asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="py-4 text-left">
          <DialogTitle>Request a Quote</DialogTitle>
          {!isSubmitSuccessful && (
            <DialogDescription>
              Fill in the form below to get a personalized quote.
            </DialogDescription>
          )}
        </DialogHeader>
        {isSubmitSuccessful ? (
          <div>
            <div className="py-6">
              Thank you for your request. We will get back to you shortly.
            </div>

            <DialogFooter className="sm:justify-start flex gap-2 flex-row">
              <DialogClose onClick={() => reset()} asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="gap-4 grid grid-cols-2"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Your Name*</Label>
              <Input
                disabled={isSubmitting}
                id="name"
                type="text"
                placeholder="Enter your name"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                disabled={isSubmitting}
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Phone Number*</Label>
              <Input
                disabled={isSubmitting}
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                {...register("phone")}
              />
              {errors.phone && (
                <span className="text-red-500">{errors.phone.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="pincode">Pincode*</Label>
              <Input
                disabled={isSubmitting}
                id="pincode"
                type="text"
                placeholder="Enter your pincode"
                {...register("pincode")}
              />
              {errors.pincode && (
                <span className="text-red-500">{errors.pincode.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="monthlyBill">Monthly Electricity Bill*</Label>
              <Input
                disabled={isSubmitting}
                id="monthlyBill"
                type="text"
                placeholder="Enter your monthly electricity bill"
                {...register("monthlyBill")}
              />
              {errors.monthlyBill && (
                <span className="text-red-500">
                  {errors.monthlyBill.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                disabled={isSubmitting}
                id="address"
                type="text"
                placeholder="Enter your address"
                {...register("address")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="installedAt">Installed At</Label>

              <Select>
                <SelectTrigger
                  disabled={isSubmitting}
                  id="installedAt"
                  {...register("installedAt")}
                  className="w-[180px]"
                >
                  <SelectValue placeholder="Installed At" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                    <SelectItem value="factory">Factory</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="remarks">Remarks</Label>
              <textarea
                disabled={isSubmitting}
                id="remarks"
                className="flex h-20 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter any additional remarks"
                {...register("remarks")}
              />
            </div>
            <DialogFooter className="sm:justify-start flex gap-2 flex-row">
              <DialogClose onClick={() => reset()} asChild>
                <Button
                  type="button"
                  className="border-primary rounded-none text-primary"
                  variant="outline"
                >
                  Close
                </Button>
              </DialogClose>
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? "Submitting " : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
