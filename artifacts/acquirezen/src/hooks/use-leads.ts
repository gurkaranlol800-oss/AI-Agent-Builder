import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

// Simulated lead capture schema
export const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  businessType: z.string().min(1, "Please select a business type"),
  message: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export function useCreateLead() {
  return useMutation({
    mutationFn: async (data: LeadInput) => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate successful submission without actual backend
      console.log("Lead captured:", data);
      return { success: true, message: "Strategy call requested successfully!" };
    }
  });
}
