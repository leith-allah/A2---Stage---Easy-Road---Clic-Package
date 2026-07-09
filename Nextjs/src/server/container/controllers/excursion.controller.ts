
import { ExcursionController }

from "@/server/controllers/excursion.controller";

import { excursionService }

from "../services/excursion.service";

export const excursionController =

  new ExcursionController(

    excursionService,

  );
  