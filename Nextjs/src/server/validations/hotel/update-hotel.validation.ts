
import { z } from "zod";

export const updateHotelSchema =
  z.object({

    nom_hot:
      z.string().min(1).max(100).optional(),

    nb_etoiles_hot:
      z.number()
       .int()
       .min(1)
       .max(5)
       .optional(),

    pays_hot:
      z.string().min(1).max(50).optional(),

    ville_hot:
      z.string().min(1).max(50).optional(),

    adresse_hot:
      z.string().min(1).max(255).optional(),

  });
  