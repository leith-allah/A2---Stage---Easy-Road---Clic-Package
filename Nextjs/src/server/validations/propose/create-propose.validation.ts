
import { z }
from "zod";

export const createProposeSchema =
  z.object({

    id_pack:
      z.number(),

    id_exc:
      z.number(),

  });
  