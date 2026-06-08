
import { z } from "zod";

export const updateNotificationSchema =
  z.object({

    status:
      z.string()
       .optional(),

    comment:
      z.string()
       .optional(),
  });
  