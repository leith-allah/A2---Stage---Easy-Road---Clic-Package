
import { TransportController } from "@/server/controllers/transport.controller";

import { transportService }

from "../services/transport.service";

export const transportController =

  new TransportController(

    transportService,

  );
  