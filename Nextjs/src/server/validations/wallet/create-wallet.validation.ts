
import { z } from "zod";

export const createWalletSchema =
  z.object({
    userId: z.number(),
  });

export type CreateWalletInput =
  z.infer<typeof createWalletSchema>;
  