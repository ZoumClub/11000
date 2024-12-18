"use client";

import { z } from "zod";
import { mediaSchema } from "@/lib/types/forms";

export const dealerCarSchema = z.object({
  dealer_id: z.string().uuid("Please select a dealer"),
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  price: z.number().positive("Price must be greater than 0"),
  mileage_range: z.string().min(1, "Mileage range is required"),
  previous_owners: z.number().int().min(0),
  fuel_type: z.string().min(1, "Fuel type is required"),
  transmission: z.string().min(1, "Transmission is required"),
  body_type: z.string().min(1, "Body type is required"),
  exterior_color: z.string().min(1, "Exterior color is required"),
  interior_color: z.string().min(1, "Interior color is required"),
  features: z.array(z.string()).min(1, "Please select at least one feature"),
  type: z.enum(['new', 'used']),
  ...mediaSchema
});

export type DealerCarFormData = z.infer<typeof dealerCarSchema>;