
import { z } from "zod";

export const createUserSchema =
  z.object({
    email: z.email(),

    password:
      z.string().min(6),

    firstName:
      z.string().min(2),

    lastName:
      z.string().min(2),

    role:
      z.string(),

    suspended:
      z.boolean().optional(),
  });

export type CreateUserInput =
  z.infer<
    typeof createUserSchema
  >;
  