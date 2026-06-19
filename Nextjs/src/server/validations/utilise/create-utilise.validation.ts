
import { z }
from "zod";

export const createUtiliseSchema =
  z.object({

    id_pack:
      z.number(),

    id_transp:
      z.number(),

  });
  