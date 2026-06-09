
import { z } from "zod";

export const registerSchema =
  z.object({

    nin:
      z.string(),

    firstName:
      z.string(),

    lastName:
      z.string(),

    birthDate:
      z.string(),

    nationality:
      z.string(),

    email:
      z.string().email(),

    password:
      z.string().min(8),

  });
  