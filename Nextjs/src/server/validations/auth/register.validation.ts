
import { z } from "zod";

export const registerSchema =
  z.object({

    nin:
      z.string(),

    id_bureau:
      z.number(),

    FIRSTName:
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
  