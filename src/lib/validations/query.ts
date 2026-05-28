// =============================================================================
// ✅ NIRVANA TECH — Query Validation Schema
// =============================================================================
// Zod schema for validating /api/query POST body.
// Shared between API route + (later) the client form.
// =============================================================================

import { z } from "zod";

export const queryFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address"),

  phoneCode: z
    .string()
    .trim()
    .regex(/^\+\d{1,4}$/, "Invalid country code")
    .default("+91"),

  phone: z
    .string()
    .trim()
    .min(6, "Phone number must be at least 6 digits")
    .max(20, "Phone number is too long")
    .regex(/^[\d\s\-()]+$/, "Phone must contain only digits"),

  company: z.string().trim().max(100).optional().or(z.literal("")),

  website: z.string().trim().max(200).optional().or(z.literal("")),

  service: z.string().trim().max(100).optional().or(z.literal("")),

  budget: z.string().trim().max(100).optional().or(z.literal("")),

  timeline: z.string().trim().max(100).optional().or(z.literal("")),

  message: z
    .string()
    .trim()
    .min(10, "Please provide a more detailed message (at least 10 characters)")
    .max(5000, "Message is too long"),
});

export type QueryFormInput = z.infer<typeof queryFormSchema>;