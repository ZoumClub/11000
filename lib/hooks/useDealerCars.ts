"use client";

import { useState, useEffect } from "react";
import { fetchDealerCars, transformDealerCar } from "@/lib/api/cars";
import type { DealerCar } from "@/types/dealerCar";

export function useDealerCars() {
  const [cars, setCars] = useState<DealerCar[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCars = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await fetchDealerCars();
      const transformedCars = await Promise.all(
        data.map(transformDealerCar)
      );

      setCars(transformedCars);
    } catch (error) {
      console.error("Error fetching dealer cars:", error);
      setError(error instanceof Error ? error : new Error('Failed to fetch cars'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return {
    cars,
    isLoading,
    error,
    refresh: fetchCars
  };
}