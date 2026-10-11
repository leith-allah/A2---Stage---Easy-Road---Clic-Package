
import { z } from "zod";

export const updateMyProfileSchema = z.object({
  firstName: z.string().min(2).optional(),
  FIRSTName: z.string().min(2).optional(), // 👈 Fallback de compatibilité
  lastName: z.string().min(2).optional(),
  nationality: z.string().optional(),
  email: z.string().email().optional(),
});
