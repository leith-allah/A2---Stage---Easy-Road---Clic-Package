
import { z }
from "zod";

export const createHebergeSchema =
  z.object({

    id_pack:
      z.number(),

    id_hot:
      z.number(),

  });
  