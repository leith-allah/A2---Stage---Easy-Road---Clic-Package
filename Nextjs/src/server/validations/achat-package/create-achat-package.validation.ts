
import { z } from "zod";

export const createAchatPackageSchema =

  z.object({

    packageId:
      z.number().positive(),

    nbVoyageurs:
      z.number().int().positive(),

    classeVol:
      z.enum([
        "ECONOMY",
        "BUSINESS",
        "FIRST",
      ]),

    typeChambre:
      z.enum([
        "SINGLE",
        "DOUBLE",
        "TRIPLE",
        "QUADRUPLE",
        "SUITE",
      ]),

    pension:
      z.enum([
        "BED_ONLY",
        "BED_BREAKFAST",
        "HALF_BOARD",
        "FULL_BOARD",
        "ALL_INCLUSIVE",
      ]),

  });
  