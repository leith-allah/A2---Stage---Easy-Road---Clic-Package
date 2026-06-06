
import { z } from "zod";

export const updateRoleSchema = z.object({

  name: z
    .string()
    .min(2)
    .max(50)
    .optional(),

});

export type UpdateRoleInput =
  z.infer<typeof updateRoleSchema>;
  