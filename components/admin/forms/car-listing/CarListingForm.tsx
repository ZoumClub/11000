"use client";

import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FORM_TABS, FormTab } from "@/lib/constants/carForm";
import { useCarForm } from "@/lib/hooks/useCarForm";
import { useCarFormSubmit } from "@/lib/hooks/useCarFormSubmit";
import { useCarFormNavigation } from "@/lib/hooks/useCarFormNavigation";
import { FormNavigation } from "./FormNavigation";
import { DealerInfo } from "./sections/DealerInfo";
import { BasicInfo } from "./sections/BasicInfo";
import { TechnicalSpecs } from "./sections/TechnicalSpecs";
import { Features } from "./sections/Features";
import { MediaSection } from "./MediaSection";
import type { DealerCar } from "@/types/dealerCar";

interface CarListingFormProps {
  car?: DealerCar | null;
  onSuccess: () => void;
}

export function CarListingForm({ car, onSuccess }: CarListingFormProps) {
  const form = useCarForm(car);
  const { isSubmitting, handleSubmit } = useCarFormSubmit({ car, onSuccess });
  const {
    currentTab,
    isLastTab,
    isFirstTab,
    handleNext,
    handlePrevious,
    handleTabChange,
  } = useCarFormNavigation(form);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Tabs
          value={currentTab}
          onValueChange={(value) => handleTabChange(value as FormTab)}
        >
          {/* Tab List */}
          <TabsList className="grid w-full grid-cols-5">
            {FORM_TABS.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-8">
            {/* Dealer Info Tab */}
            <TabsContent value="dealer">
              <DealerInfo form={form} />
            </TabsContent>

            {/* Basic Info Tab */}
            <TabsContent value="basic">
              <BasicInfo form={form} />
            </TabsContent>

            {/* Technical Specifications Tab */}
            <TabsContent value="specs">
              <TechnicalSpecs form={form} />
            </TabsContent>

            {/* Features Tab */}
            <TabsContent value="features">
              <Features form={form} />
            </TabsContent>

            {/* Media Upload Tab */}
            <TabsContent value="media">
              <MediaSection form={form} />
            </TabsContent>
          </div>
        </Tabs>

        {/* Form Navigation */}
        <FormNavigation
          isFirstTab={isFirstTab}
          isLastTab={isLastTab}
          isSubmitting={isSubmitting}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </form>
    </Form>
  );
}