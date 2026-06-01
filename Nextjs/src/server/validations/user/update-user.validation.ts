
import { z } from "zod";

export const updateUserSchema =
  z.object({
    email:
      z.email().optional(),

    firstName:
      z.string().min(2).optional(),

    lastName:
      z.string().min(2).optional(),

    role:
      z.string().optional(),

    suspended:
      z.boolean().optional(),
  });

export type UpdateUserInput =
  z.infer<
    typeof updateUserSchema
  >;
  