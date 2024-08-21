import { z } from "zod";

export const createCompanySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  code: z.string().min(1, { message: "Code is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  isActive: z.coerce.boolean().default(true),
  email: z.string().email({ message: "Invalid email" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  city: z.string().optional(),
  state: z.string().optional(),
});
export const updateCompanySchema = z.object({
  id: z.number().min(1, { message: "Id is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  code: z.string().min(1, { message: "Code is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  isActive: z.coerce.boolean().default(true),
  email: z.string().email({ message: "Invalid email" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  city: z.string().optional(),
  state: z.string().optional(),
});
