
import { z }
from "zod";

export const createPossedeSchema =
  z.object({

    id_pack:
      z.number(),

    id_vol:
      z.number(),

  });
  