"use client";

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface MediaFile {
  file: File;
  preview: string;
}