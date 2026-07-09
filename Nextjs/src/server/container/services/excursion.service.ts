
import { ExcursionService }

from "@/server/services/excursion.service";

import { excursionRepository }

from "../repositories/excursion.repository";

export const excursionService =

  new ExcursionService(

    excursionRepository,

  );
  