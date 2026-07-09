
import { z } from "zod";

export const createExcursionSchema =

  z.object({

    name:

      z.string()

        .trim()

        .min(2, "Le nom est obligatoire.")

        .max(255),

    location:

      z.string()

        .trim()

        .min(2, "Le lieu est obligatoire.")

        .max(50),

    description:

      z.string()

        .trim()

        .min(5)

        .max(5000),

  });

export type CreateExcursionInput =

  z.infer<typeof createExcursionSchema>;
  