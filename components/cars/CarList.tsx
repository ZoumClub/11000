"use client";

import { CarCard } from "./CarCard";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import type { DealerCar } from "@/types/dealerCar";

interface CarListProps {
  cars: DealerCar[];
  isLoading: boolean;
}

export function CarList({ cars, isLoading }: CarListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!cars.length) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">
          No cars found matching your criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}