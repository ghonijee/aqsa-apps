import { z } from "zod";

export const newAccountSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  code: z.string().min(1, { message: "Code is required" }),
  parent: z
    .object({
      id: z.number().min(1, { message: "Parent is required" }),
      name: z.string().min(1, { message: "Parent is required" }),
    })
    .optional(),
});
