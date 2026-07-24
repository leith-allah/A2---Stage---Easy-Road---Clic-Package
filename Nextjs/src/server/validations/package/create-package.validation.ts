
import { z } from "zod";


export const createPackageSchema =
  z.object({

    name:
      z.string().min(2),

    country:
      z.string().min(2),

    destination:
      z.string().min(2),

    image:
      z.string().optional(),

    description:
      z.string().optional(),

    departureDate:
      z.string(),

    returnDate:
      z.string(),

    basePrice:
      z.number().positive(),

    totalStock:
      z.number().int().positive(),


    suppEconomy: 
      z.number().min(0),

    suppBusiness: 
        z.number().min(0),

    suppFirst: 
        z.number().min(0),


    suppSingle: 
        z.number().min(0),

    suppDouble: 
        z.number().min(0),

    suppTriple: 
        z.number().min(0),

    suppQuadruple: 
        z.number().min(0),

    suppSuite: 
        z.number().min(0),


    suppBedOnly: 
        z.number().min(0),

    suppBedBreakfast: 
        z.number().min(0),

    suppHalfBoard: 
        z.number().min(0),

    suppFullBoard: 
        z.number().min(0),

    suppAllInclusive: 
        z.number().min(0),

  });



export type CreatePackageInput =
  z.infer<
    typeof createPackageSchema
  >;
  