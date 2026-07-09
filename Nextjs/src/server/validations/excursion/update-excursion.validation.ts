
import { z } from "zod";

export const updateExcursionSchema =

  z.object({

    name:

      z.string()

        .trim()

        .min(2)

        .max(255)

        .optional(),

    location:

      z.string()

        .trim()

        .min(2)

        .max(50)

        .optional(),

    description:

      z.string()

        .trim()

        .min(5)

        .max(5000)

        .optional(),

  });

export type UpdateExcursionInput =

  z.infer<typeof updateExcursionSchema>;
  