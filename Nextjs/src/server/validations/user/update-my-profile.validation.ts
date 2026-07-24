
import { z }
from "zod";

export const updateMyProfileSchema =

  z.object({

    FIRSTName:
      z.string().min(2).optional(),

    lastName:
      z.string().min(2).optional(),

    nationality:
      z.string().optional(),

    email:
      z.email().optional(),

  });
  