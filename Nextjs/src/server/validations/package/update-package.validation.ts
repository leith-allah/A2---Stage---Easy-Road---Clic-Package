
import { z } from "zod";


export const updatePackageSchema =
  z.object({

    name:
      z.string().min(2).optional(),

    country:
      z.string().min(2).optional(),

    destination:
      z.string().min(2).optional(),

    image:
      z.string().optional(),

    description:
      z.string().optional(),

    departureDate:
      z.string().optional(),

    returnDate:
      z.string().optional(),

    basePrice:
      z.number().positive().optional(),

    totalStock:
      z.number().int().positive().optional(),
      

    suppEconomy: 
      z.number().min(0).optional(),

    suppBusiness: 
        z.number().min(0).optional(),

    suppFirst: 
        z.number().min(0).optional(),


    suppSingle: 
        z.number().min(0).optional(),

    suppDouble: 
        z.number().min(0).optional(),

    suppTriple: 
        z.number().min(0).optional(),

    suppQuadruple: 
        z.number().min(0).optional(),

    suppSuite: 
        z.number().min(0).optional(),


    suppBedOnly: 
        z.number().min(0).optional(),

    suppBedBreakfast: 
        z.number().min(0).optional(),

    suppHalfBoard: 
        z.number().min(0).optional(),

    suppFullBoard: 
        z.number().min(0).optional(),

    suppAllInclusive: 
        z.number().min(0).optional(),

  });



export type UpdatePackageInput =
  z.infer<
    typeof updatePackageSchema
  >;
  