
import { TransportService } from "@/server/services/transport.service";

import { transportRepository }

from "../repositories/transport.repository";

export const transportService =

  new TransportService(

    transportRepository,

  );
  