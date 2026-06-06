
import { z } from "zod";

export const createRoleSchema = z.object({

  name: z
    .string()
    .min(2, "Nom trop court")
    .max(50, "Nom trop long"),

});

export type CreateRoleInput =
  z.infer<typeof createRoleSchema>;
  