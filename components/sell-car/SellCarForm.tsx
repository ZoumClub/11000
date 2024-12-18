"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { ContactInfo } from "./sections/ContactInfo";
import { CarInfo } from "./sections/CarInfo";
import { TechnicalSpecs } from "./sections/TechnicalSpecs";
import { Features } from "./sections/Features";
import { MediaUpload } from "./sections/MediaUpload";
import { submitCarListing } from "@/lib/supabase/cars";
import { toast } from "sonner";
import { sellCarSchema, type SellCarFormData } from "@/lib/validations/sellCar";

const defaultValues: Partial<SellCarFormData> = {
  name: "",
  pinCode: "",
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  price: 0,
  mileage: "",
  previousOwners: 0,
  fuelType: undefined,
  transmission: undefined,
  bodyType: undefined,
  exteriorColor: undefined,
  interiorColor: undefined,
  features: [],
  images: [],
};

export function SellCarForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<SellCarFormData>({
    resolver: zodResolver(sellCarSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: SellCarFormData) => {
    try {
      setIsSubmitting(true);
      const result = await submitCarListing(data);
      
      if (result.success) {
        toast.success("Your car listing has been submitted successfully!");
        router.push("/");
      } else {
        throw new Error(result.error?.message || "Failed to submit car listing");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit car listing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <div className="space-y-12">
            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold border-b pb-2 mb-6">Contact Information</h2>
              <ContactInfo form={form} />
            </section>

            {/* Car Information */}
            <section>
              <h2 className="text-2xl font-semibold border-b pb-2 mb-6">Car Information</h2>
              <CarInfo form={form} />
            </section>

            {/* Technical Specifications */}
            <section>
              <h2 className="text-2xl font-semibold border-b pb-2 mb-6">Technical Specifications</h2>
              <TechnicalSpecs form={form} />
            </section>

            {/* Features */}
            <section>
              <h2 className="text-2xl font-semibold border-b pb-2 mb-6">Features & Equipment</h2>
              <Features form={form} />
            </section>

            {/* Media Upload */}
            <section>
              <h2 className="text-2xl font-semibold border-b pb-2 mb-6">Photos & Video</h2>
              <MediaUpload form={form} />
            </section>
          </div>

          {/* Submit Button */}
          <div className="sticky bottom-6 pt-6 bg-white border-t">
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Car Listing"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}