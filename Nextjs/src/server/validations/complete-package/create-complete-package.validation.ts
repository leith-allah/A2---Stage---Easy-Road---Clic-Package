
import { z } from "zod";

import {
  createFlightSchema,
} from "@/server/validations/flight/create-flight.validation";

import {
  createHotelSchema,
} from "@/server/validations/hotel/create-hotel.validation";

import {
  createTransportSchema,
} from "@/server/validations/transport/create-transport.validation";

import {
  createExcursionSchema,
} from "@/server/validations/excursion/create-excursion.validation";

import {
  createPackageSchema,
} from "@/server/validations/package/create-package.validation";

export const createCompletePackageSchema = z.object({

  package: createPackageSchema,

  flight: createFlightSchema,

  hotel: createHotelSchema,

  transport: createTransportSchema,

  excursion: createExcursionSchema,

});

export type CreateCompletePackageInput =
  z.infer<typeof createCompletePackageSchema>;
  