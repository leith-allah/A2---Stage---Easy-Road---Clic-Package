
import { prisma }
from "@/server/db/prisma";

import { FLIGHT_STATUS }
from "@/server/constants/flight-status";


export const flightRepository = {

  findAll() {

    return prisma.vol.findMany({

      where: {

        NOT: {
          statut_vol:
            FLIGHT_STATUS.ARCHIVED,
        },

      },

      orderBy: {
        date_aller_vol: "asc",
      },

    });

  },

  findById(id: number) {

    return prisma.vol.findFirst({

      where: {
        id_vol:
          BigInt(id),

        NOT: {
          statut_vol:
            FLIGHT_STATUS.ARCHIVED,
        },
      },
    });
  },

  create(data: {

    airline: string;

    departureLocation: string;

    destination: string;

    departureDate: Date;

    departureTime: Date;

    arrivalTime: Date;

    returnDate?: Date | null;

    returnDepartureTime?: Date | null;

    returnArrivalTime?: Date | null;

    flightNumber: string;

  }) {

    return prisma.vol.create({

      data: {

        compagnie_vol:
          data.airline,

        lieu_depart_vol:
          data.departureLocation,

        destination_vol:
          data.destination,

        date_aller_vol:
          data.departureDate,

        heure_depart_aller_vol:
          data.departureTime,

        heure_arrivee_aller_vol:
          data.arrivalTime,

        date_retour_vol:
          data.returnDate,

        heure_depart_retour_vol:
          data.returnDepartureTime,

        heure_arrivee_retour_vol:
          data.returnArrivalTime,

        num_vol:
          data.flightNumber,

      },

    });

  },

  update(
    id: number,
    data: any
  ) {

    return prisma.vol.update({

      where: {
        id_vol: BigInt(id),
      },

      data: {

        ...(data.airline && {

          compagnie_vol:
            data.airline,

        }),

        ...(data.departureLocation && {

          lieu_depart_vol:
            data.departureLocation,

        }),

        ...(data.destination && {

          destination_vol:
            data.destination,

        }),

        ...(data.departureDate && {

          date_aller_vol:
            data.departureDate,

        }),

        ...(data.departureTime && {

          heure_depart_aller_vol:
            data.departureTime,

        }),

        ...(data.arrivalTime && {

          heure_arrivee_aller_vol:
            data.arrivalTime,

        }),

        ...(data.returnDate !== undefined && {

          date_retour_vol:
            data.returnDate,

        }),

        ...(data.returnDepartureTime !== undefined && {

          heure_depart_retour_vol:
            data.returnDepartureTime,

        }),

        ...(data.returnArrivalTime !== undefined && {

          heure_arrivee_retour_vol:
            data.returnArrivalTime,

        }),

        ...(data.flightNumber && {

          num_vol:
            data.flightNumber,

        }),

      },

    });

  },

  delete(
    id: number
  ) {

    return prisma.vol.update({

      where: {
        id_vol:
          BigInt(id),
      },

      data: {
        statut_vol:
          FLIGHT_STATUS.ARCHIVED,
      },
    });
  }
};
