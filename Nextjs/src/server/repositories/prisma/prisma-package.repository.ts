
import { prisma } from "@/server/db/prisma";

import crypto from "crypto";

import { PackageRepository }
from "@/server/repositories/interfaces/package.repository.interface";

import { PackageAggregate }
from "@/server/aggregates/package.aggregate";

import { PackageAggregateMapper }
from "@/server/mappers/package-aggregate.mapper";

import { FlightMapper }
from "@/server/mappers/flight.mapper";

import { HotelMapper }
from "@/server/mappers/hotel.mapper";

import { TransportMapper }
from "@/server/mappers/transport.mapper";

import { ExcursionMapper }
from "@/server/mappers/excursion.mapper";

import {
    PackageStatusValue,
} from "@/server/entities/value-objects/package-status.value-object";

import {
    FlightClass,
    RoomType,
    BoardType,
} from "@/server/entities/value-objects/supplements.value-object";


export class PrismaPackageRepository
implements PackageRepository {

  private toAggregate(p: any): PackageAggregate {

      console.log(p);

      return PackageAggregateMapper.fromPersistence({

          id: Number(p.id_pack),

          name: p.nom_pack,

          country: p.pays_pack,

          destination: p.destination_pack,

          image: p.image_pack,

          description: p.description_pack,

          departureDate: p.date_depart_pack,

          returnDate: p.date_retour_pack,

          basePrice: Number(p.prix_base_pack),

          totalStock: p.stock_total_pack,

          availableStock: p.stock_dispo_pack,

          status: p.statut_pack as PackageStatusValue,

          defaultFlightClass:
              p.default_flight_class_pack.toUpperCase() as FlightClass,

          defaultRoomType:
              p.default_room_type_pack.toUpperCase() as RoomType,

          defaultBoardType:
              p.default_board_type_pack.toUpperCase() as BoardType,

          ownerId: Number(p.id_user),

          supplements: {

            ECONOMY: Number(p.supp_economy_pack),
            BUSINESS: Number(p.supp_business_pack),
            FIRST: Number(p.supp_first_pack),

            SINGLE: Number(p.supp_single_pack),
            DOUBLE: Number(p.supp_double_pack),
            TRIPLE: Number(p.supp_triple_pack),
            QUADRUPLE: Number(p.supp_quadruple_pack),
            SUITE: Number(p.supp_suite_pack),

            BED_ONLY: Number(p.supp_bed_only_pack),
            BED_BREAKFAST: Number(p.supp_bed_breakfast_pack),
            HALF_BOARD: Number(p.supp_half_board_pack),
            FULL_BOARD: Number(p.supp_full_board_pack),
            ALL_INCLUSIVE: Number(p.supp_all_inclusive_pack),

          },

          flights:
              p.possede.map((x: any) =>
                  FlightMapper.toEntity(x.vol)
              ),

          hotels:
              p.heberge.map((x: any) =>
                  HotelMapper.toEntity(x.hotel)
              ),

          transports:
              p.utilise.map((x: any) =>
                  TransportMapper.toEntity(x.transport)
              ),

          excursions:
              p.propose.map((x: any) =>
                  ExcursionMapper.toEntity(x.excursion)
              ),

      });

  }

  async findAll(): Promise<PackageAggregate[]> {

      const packages =
          await prisma.package_voyage.findMany({

              where: {
                  statut_pack: {
                      not: PackageStatusValue.ARCHIVED,
                  },
              },

              include: {

                  possede: {
                      include: {
                          vol: {
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
                          },
                      },
                  },

                  heberge: {
                      include: {
                          hotel: true,
                      },
                  },

                  utilise: {
                      include: {
                          transport: true,
                      },
                  },

                  propose: {
                      include: {
                          excursion: true,
                      },
                  },

              },

              orderBy: {
                  id_pack: "desc",
              },

          });

      return packages.map(
          p => this.toAggregate(p)
      );

  }

  async findArchived(): Promise<PackageAggregate[]> {

      const packages =
          await prisma.package_voyage.findMany({

              where: {
                  statut_pack: PackageStatusValue.ARCHIVED,
              },

              include: {

                  possede: {
                      include: {
                          vol: {
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
                          },
                      },
                  },

                  heberge: {
                      include: {
                          hotel: true,
                      },
                  },

                  utilise: {
                      include: {
                          transport: true,
                      },
                  },

                  propose: {
                      include: {
                          excursion: true,
                      },
                  },

              },

              orderBy: {
                  id_pack: "desc",
              },

          });

      return packages.map(
          p => this.toAggregate(p)
      );

  }

  async findFiltered(filters: {

      country?: string;

      destination?: string;

      status?: string;

  }): Promise<PackageAggregate[]> {

      const packages =
          await prisma.package_voyage.findMany({

              where: {

                  ...(filters.country && {
                      pays_pack: filters.country,
                  }),

                  ...(filters.destination && {
                      destination_pack: filters.destination,
                  }),

                  ...(filters.status && {
                      statut_pack: filters.status,
                  }),

              },

              include: {

                  possede: {
                      include: {
                          vol: {
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
                          },
                      },
                  },

                  heberge: {
                      include: {
                          hotel: true,
                      },
                  },

                  utilise: {
                      include: {
                          transport: true,
                      },
                  },

                  propose: {
                      include: {
                          excursion: true,
                      },
                  },

              },

          });

      return packages.map(
          p => this.toAggregate(p)
      );

  }


  async findById(
      id: number,
  ): Promise<PackageAggregate | null> {

      const p =
          await prisma.package_voyage.findUnique({

              where: {
                  id_pack: BigInt(id),
              },

              include: {

                  possede: {
                      include: {
                          vol: {
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
                          },
                      },
                  },

                  heberge: {
                      include: {
                          hotel: true,
                      },
                  },

                  utilise: {
                      include: {
                          transport: true,
                      },
                  },

                  propose: {
                      include: {
                          excursion: true,
                      },
                  },

              },

          });

      if (!p) {

          return null;

      }

      return this.toAggregate(p);

  }


  async findByIdIncludingArchived(
      id: number,
  ): Promise<PackageAggregate | null> {

      const p =
          await prisma.package_voyage.findUnique({

              where: {
                  id_pack: BigInt(id),
              },

              include: {

                  possede: {
                      include: {
                          vol: {
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
                          },
                      },
                  },

                  heberge: {
                      include: {
                          hotel: true,
                      },
                  },

                  utilise: {
                      include: {
                          transport: true,
                      },
                  },

                  propose: {
                      include: {
                          excursion: true,
                      },
                  },

              },

          });

      if (!p) {

          return null;

      }

      return this.toAggregate(p);

  }


  async createAggregate(
      aggregate: PackageAggregate,
      txParam?: any,
    ): Promise<PackageAggregate> {

      const execute = async (tx: any) => {
        const createdPackage = await tx.package_voyage.create({
          data: {
            mle_pack: crypto.randomUUID(),
            statut_pack: aggregate.getStatus(),
            nom_pack: aggregate.name,
            pays_pack: aggregate.country,
            destination_pack: aggregate.destination,
            image_pack: aggregate.image,
            description_pack: aggregate.description,
            date_depart_pack: aggregate.departureDate,
            date_retour_pack: aggregate.returnDate,
            prix_base_pack: aggregate.basePrice,
            stock_total_pack: aggregate.getTotalStock(),
            stock_dispo_pack: aggregate.getAvailableStock(),
            supp_economy_pack: aggregate.supplements.ECONOMY,
            supp_business_pack: aggregate.supplements.BUSINESS,
            supp_first_pack: aggregate.supplements.FIRST,
            supp_single_pack: aggregate.supplements.SINGLE,
            supp_double_pack: aggregate.supplements.DOUBLE,
            supp_triple_pack: aggregate.supplements.TRIPLE,
            supp_quadruple_pack: aggregate.supplements.QUADRUPLE,
            supp_suite_pack: aggregate.supplements.SUITE,
            supp_bed_only_pack: aggregate.supplements.BED_ONLY,
            supp_bed_breakfast_pack: aggregate.supplements.BED_BREAKFAST,
            supp_half_board_pack: aggregate.supplements.HALF_BOARD,
            supp_full_board_pack: aggregate.supplements.FULL_BOARD,
            supp_all_inclusive_pack: aggregate.supplements.ALL_INCLUSIVE,
            default_flight_class_pack: aggregate.defaultFlightClass ?? "ECONOMY",
            default_room_type_pack: aggregate.defaultRoomType ?? "DOUBLE",
            default_board_type_pack: aggregate.defaultBoardType ?? "BED_ONLY",
            date_heure_creation_pack: new Date(),
            id_user: BigInt(aggregate.ownerId),
          },
        });

        // ======================================
        // Flights
        // ======================================
        for (const [index, flight] of aggregate.flights.entries()) {
          await tx.possede.create({
            data: {
              id_pack: createdPackage.id_pack,
              id_vol: BigInt(flight.getId()),
              ordre: index + 1,
            },
          });
        }

        // ======================================
        // Hotels
        // ======================================
        for (const hotel of aggregate.hotels) {
          await tx.heberge.create({
            data: {
              id_pack: createdPackage.id_pack,
              id_hot: BigInt(hotel.id),
            },
          });
        }

        // ======================================
        // Transports
        // ======================================
        for (const transport of aggregate.transports) {
          await tx.utilise.create({
            data: {
              id_pack: createdPackage.id_pack,
              id_transp: BigInt(transport.id),
            },
          });
        }

        // ======================================
        // Excursions
        // ======================================
        for (const excursion of aggregate.excursions) {
          await tx.propose.create({
            data: {
              id_pack: createdPackage.id_pack,
              id_exc: BigInt(excursion.id),
            },
          });
        }

        return new PackageAggregate(
          Number(createdPackage.id_pack),
          aggregate.name,
          aggregate.country,
          aggregate.destination,
          aggregate.image,
          aggregate.description,
          aggregate.departureDate,
          aggregate.returnDate,
          aggregate.basePrice,
          aggregate.stock,
          aggregate.status,
          aggregate.supplements,
          aggregate.defaultFlightClass,
          aggregate.defaultRoomType,
          aggregate.defaultBoardType,
          aggregate.ownerId,
          aggregate.flights,
          aggregate.hotels,
          aggregate.transports,
          aggregate.excursions,
        );
      };

      // Si une transaction parente existe, on réutilise 'txParam', sinon on en ouvre une nouvelle
      if (txParam) {
        return await execute(txParam);
      } else {
        return await prisma.$transaction(execute);
      }
    }


async updateAggregate(
    aggregate: PackageAggregate,
    txParam?: any,
  ): Promise<PackageAggregate> {
    const execute = async (tx: any) => {
      // 1. Mise à jour des informations du package dans package_voyage
      await tx.package_voyage.update({
        where: {
          id_pack: BigInt(aggregate.id),
        },
        data: {
          statut_pack: aggregate.getStatus(),
          nom_pack: aggregate.name,
          pays_pack: aggregate.country,
          destination_pack: aggregate.destination,
          image_pack: aggregate.image,
          description_pack: aggregate.description,
          date_depart_pack: aggregate.departureDate,
          date_retour_pack: aggregate.returnDate,
          prix_base_pack: aggregate.basePrice,
          stock_total_pack: aggregate.getTotalStock(),
          stock_dispo_pack: aggregate.getAvailableStock(),
          supp_economy_pack: aggregate.supplements.ECONOMY,
          supp_business_pack: aggregate.supplements.BUSINESS,
          supp_first_pack: aggregate.supplements.FIRST,
          supp_single_pack: aggregate.supplements.SINGLE,
          supp_double_pack: aggregate.supplements.DOUBLE,
          supp_triple_pack: aggregate.supplements.TRIPLE,
          supp_quadruple_pack: aggregate.supplements.QUADRUPLE,
          supp_suite_pack: aggregate.supplements.SUITE,
          supp_bed_only_pack: aggregate.supplements.BED_ONLY,
          supp_bed_breakfast_pack: aggregate.supplements.BED_BREAKFAST,
          supp_half_board_pack: aggregate.supplements.HALF_BOARD,
          supp_full_board_pack: aggregate.supplements.FULL_BOARD,
          supp_all_inclusive_pack: aggregate.supplements.ALL_INCLUSIVE,
          default_flight_class_pack: aggregate.defaultFlightClass ?? "ECONOMY",
          default_room_type_pack: aggregate.defaultRoomType ?? "DOUBLE",
          default_board_type_pack: aggregate.defaultBoardType ?? "BED_ONLY",
        },
      });

      // 2. Nettoyage des anciennes relations
      await tx.possede.deleteMany({ where: { id_pack: BigInt(aggregate.id) } });
      await tx.heberge.deleteMany({ where: { id_pack: BigInt(aggregate.id) } });
      await tx.utilise.deleteMany({ where: { id_pack: BigInt(aggregate.id) } });
      await tx.propose.deleteMany({ where: { id_pack: BigInt(aggregate.id) } });

      // 3. Re-création des relations - Vols
      for (const [index, flight] of aggregate.flights.entries()) {
        await tx.possede.create({
          data: {
            id_pack: BigInt(aggregate.id),
            id_vol: BigInt(flight.getId()),
            ordre: index + 1,
          },
        });
      }

      // 4. Re-création des relations - Hôtels
      for (const hotel of aggregate.hotels) {
        await tx.heberge.create({
          data: {
            id_pack: BigInt(aggregate.id),
            id_hot: BigInt(hotel.id),
          },
        });
      }

      // 5. Re-création des relations - Transports
      for (const transport of aggregate.transports) {
        await tx.utilise.create({
          data: {
            id_pack: BigInt(aggregate.id),
            id_transp: BigInt(transport.id),
          },
        });
      }

      // 6. Re-création des relations - Excursions
      for (const excursion of aggregate.excursions) {
        await tx.propose.create({
          data: {
            id_pack: BigInt(aggregate.id),
            id_exc: BigInt(excursion.id),
          },
        });
      }

      return aggregate;
    };

    if (txParam) {
      return await execute(txParam);
    } else {
      return await prisma.$transaction(execute);
    }
  }

async archive(
    id: number,
): Promise<void> {

    await prisma.package_voyage.update({

        where: {
            id_pack: BigInt(id),
        },

        data: {
            statut_pack: PackageStatusValue.ARCHIVED,
        },

    });

}

async restore(
    id: number,
): Promise<void> {

    await prisma.package_voyage.update({

        where: {
            id_pack: BigInt(id),
        },

        data: {
            statut_pack: PackageStatusValue.DRAFT,
        },

    });

}

async unpublish(
    id: number,
): Promise<void> {

    await prisma.package_voyage.update({

        where: {
            id_pack: BigInt(id),
        },

        data: {
            statut_pack: PackageStatusValue.DRAFT,
        },

    });

}

async publish(
    id: number,
): Promise<void> {

    await prisma.package_voyage.update({

        where: {
            id_pack: BigInt(id),
        },

        data: {
            statut_pack: PackageStatusValue.ACTIVE,
        },

    });

}

}
