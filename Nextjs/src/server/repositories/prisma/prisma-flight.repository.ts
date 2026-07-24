
import { prisma } from "@/server/db/prisma";

import { Flight } from "@/server/entities/flight.entity";
import { FlightAggregate } from "@/server/aggregates/flight.aggregate";

import { FlightRepository } from "../interfaces/flight.repository.interface";

import { FlightMapper } from "@/server/mappers/flight.mapper";

import { FlightPersistence } from "@/server/persistence/flight.persistence";

export class PrismaFlightRepository implements FlightRepository {

  async findAll(): Promise<Flight[]> {

    const flights: FlightPersistence[] =
      await prisma.vol.findMany({

        include: {

          compagnie_aerienne: true,

          aeroport_vol_id_aeroport_departToaeroport: {

            include: {

              ville: {

                include: {

                  pays: true,

                },

              },

            },

          },

          aeroport_vol_id_aeroport_arriveeToaeroport: {

            include: {

              ville: {

                include: {

                  pays: true,

                },

              },

            },

          },

        },

        orderBy: {

          depart_vol: "asc",

        },

      });

    return FlightMapper.toEntities(
      flights,
    );

  }

  async findById(
    id: number,
  ): Promise<Flight | null> {

    const flight =
      await prisma.vol.findUnique({

        where: {

          id_vol: BigInt(id),

        },

        include: {

          compagnie_aerienne: true,

          aeroport_vol_id_aeroport_departToaeroport: {

            include: {

              ville: {

                include: {

                  pays: true,

                },

              },

            },

          },

          aeroport_vol_id_aeroport_arriveeToaeroport: {

            include: {

              ville: {

                include: {

                  pays: true,

                },

              },

            },

          },

        },

      });

    if (!flight) {

      return null;

    }

    return FlightMapper.toEntity(
      flight,
    );

  }

  async createAggregate(
    aggregate: FlightAggregate,
  ): Promise<Flight> {

    const flight =
      aggregate.entity;

    const created =
      await prisma.vol.create({

        data: {

          statut_vol:
            flight.getStatus().getValue(),

          num_vol:
            flight.getFlightNumber(),

          depart_vol:
            flight.getDepartureDateTime(),

          arrivee_vol:
            flight.getArrivalDateTime(),

          id_compagnie:
            flight.getAirline().getId(),

          id_aeroport_depart:
            flight.getDepartureAirport().getId(),

          id_aeroport_arrivee:
            flight.getArrivalAirport().getId(),

        },

        include: {

          compagnie_aerienne: true,

          aeroport_vol_id_aeroport_departToaeroport: {

            include: {

              ville: {

                include: {

                  pays: true,

                },

              },

            },

          },

          aeroport_vol_id_aeroport_arriveeToaeroport: {

            include: {

              ville: {

                include: {

                  pays: true,

                },

              },

            },

          },

        },

      });

    return FlightMapper.toEntity(
      created,
    );

  }

  async updateAggregate(
    aggregate: FlightAggregate,
  ): Promise<Flight> {

    const flight =
      aggregate.entity;

    const updated =
      await prisma.vol.update({

        where: {

          id_vol: BigInt(
            flight.getId(),
          ),

        },

        data: {

          statut_vol:
            flight.getStatus().getValue(),

          num_vol:
            flight.getFlightNumber(),

          depart_vol:
            flight.getDepartureDateTime(),

          arrivee_vol:
            flight.getArrivalDateTime(),

          id_compagnie:
            flight.getAirline().getId(),

          id_aeroport_depart:
            flight.getDepartureAirport().getId(),

          id_aeroport_arrivee:
            flight.getArrivalAirport().getId(),

        },

        include: {

          compagnie_aerienne: true,

          aeroport_vol_id_aeroport_departToaeroport: {

            include: {

              ville: {

                include: {

                  pays: true,

                },

              },

            },

          },

          aeroport_vol_id_aeroport_arriveeToaeroport: {

            include: {

              ville: {

                include: {

                  pays: true,

                },

              },

            },

          },

        },

      });

    return FlightMapper.toEntity(
      updated,
    );

  }

  async delete(
    id: number,
  ): Promise<void> {

    await prisma.vol.delete({

      where: {

        id_vol: BigInt(id),

      },

    });

  }

}
