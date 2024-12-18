"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import type { Brand } from "@/types/brand";

export function useBrands() {
  const [data, setData] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBrands = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data: brands, error } = await supabase
        .from("brands")
        .select("*")
        .order("order_index");

      if (error) throw error;
      
      setData(brands || []);
    } catch (err) {
      console.error("Error fetching brands:", err);
      setError(err instanceof Error ? err : new Error("Failed to fetch brands"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return { 
    data, 
    isLoading, 
    error,
    refresh: fetchBrands
  };
}