"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./input";
import { Label } from "./label";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Button } from "./shad-cn/button";

const schema = z.object({
  companyName: z.string().min(1, { message: "Company Name is required" }),
  name: z.string().min(1, { message: "Your Name is required" }),
  whatsappNumber: z.string().min(10, { message: "WhatsApp Number must be at least 10 digits" }),
  pinCode: z.string().min(6, { message: "Pin Code must be 6 digits" }),
  gstNumber: z.string(),
});

type FormValues = z.infer<typeof schema>;

export function CompanyInquiryForm({ children }: { children: React.ReactNode }) {
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
      const formData = { ...data, type: "company-inquiry" };
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
    }
  };

  return (
    <Dialog>
      <DialogTrigger onClick={() => reset()} asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="py-4 text-left">
          <DialogTitle>Company Inquiry</DialogTitle>
          {!isSubmitSuccessful && (
            <DialogDescription>
              Fill in the form below to inquire about our services.
            </DialogDescription>
          )}
        </DialogHeader>
        {isSubmitSuccessful ? (
          <div>
            <div className="py-6">
              Thank you for your inquiry. We will get back to you shortly.
            </div>
            <DialogFooter className="sm:justify-start flex gap-2 flex-row">
              <DialogClose onClick={() => reset()} asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="gap-4 grid grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="companyName">Company Name*</Label>
              <Input
                disabled={isSubmitting}
                id="companyName"
                type="text"
                placeholder="Enter your company name"
                {...register("companyName")}
              />
              {errors.companyName && (
                <span className="text-red-500">{errors.companyName.message}</span>
              )}
            </div>
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
              <Label htmlFor="whatsappNumber">WhatsApp Number*</Label>
              <Input
                disabled={isSubmitting}
                id="whatsappNumber"
                type="tel"
                placeholder="Enter your WhatsApp number"
                {...register("whatsappNumber")}
              />
              {errors.whatsappNumber && (
                <span className="text-red-500">{errors.whatsappNumber.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="pinCode">Pin Code*</Label>
              <Input
                disabled={isSubmitting}
                id="pinCode"
                type="text"
                placeholder="Enter your pin code"
                {...register("pinCode")}
              />
              {errors.pinCode && (
                <span className="text-red-500">{errors.pinCode.message}</span>
              )}
            </div>
            <div className="flex flex-col col-span-2 gap-2">
              <Label htmlFor="gstNumber">GST Number*</Label>
              <Input
                disabled={isSubmitting}
                id="gstNumber"
                type="text"
                placeholder="Enter your GST number"
                {...register("gstNumber")}
              />
              {errors.gstNumber && (
                <span className="text-red-500">{errors.gstNumber.message}</span>
              )}
            </div>
            <DialogFooter className="sm:justify-start col-span-2 flex gap-2 flex-row">
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
