"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { SellCarFormData } from "@/lib/validations/sellCar";
import { CAR_FEATURES } from "@/types/sellCar";

interface FeaturesProps {
  form: UseFormReturn<SellCarFormData>;
}

export function Features({ form }: FeaturesProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="features"
        render={({ field }) => (
          <FormItem>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CAR_FEATURES.map((feature) => (
                <FormItem
                  key={feature}
                  className="flex items-start space-x-3 space-y-0"
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(feature)}
                      onCheckedChange={(checked) => {
                        const currentValue = field.value || [];
                        const newValue = checked
                          ? [...currentValue, feature]
                          : currentValue.filter((value) => value !== feature);
                        field.onChange(newValue);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    {feature}
                  </FormLabel>
                </FormItem>
              ))}
            </div>
            <FormMessage className="mt-4" />
          </FormItem>
        )}
      />
    </div>
  );
}