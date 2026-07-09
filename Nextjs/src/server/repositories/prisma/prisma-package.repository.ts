
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


export class PrismaPackageRepository
implements PackageRepository {

  async findAll(): Promise<PackageAggregate[]> {

    const packages =
      await prisma.package_voyage.findMany({

        include: {

          possede: {
            include: {
              vol: true,
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

    return packages.map((p) => {

      const persistence = {

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

        status: p.statut_pack,

        ownerId: Number(p.id_user),

        supplements: {

          economy: Number(p.supp_economy_pack),

          business: Number(p.supp_business_pack),

          first: Number(p.supp_first_pack),

          single: Number(p.supp_single_pack),

          double: Number(p.supp_double_pack),

          triple: Number(p.supp_triple_pack),

          quadruple: Number(p.supp_quadruple_pack),

          suite: Number(p.supp_suite_pack),

          bedOnly: Number(p.supp_bed_only_pack),

          bedBreakfast: Number(p.supp_bed_breakfast_pack),

          halfBoard: Number(p.supp_half_board_pack),

          fullBoard: Number(p.supp_full_board_pack),

          allInclusive: Number(p.supp_all_inclusive_pack),

        },

        flights:
          p.possede.map((pos) => 
            FlightMapper.toEntity(pos.vol)
          ),

        hotels:
          p.heberge.map((h) =>
            HotelMapper.toEntity(h.hotel)
          ),

        transports:
          p.utilise.map((t) =>
            TransportMapper.toEntity(t.transport)
          ),

        excursions:
          p.propose.map((e) =>
            ExcursionMapper.toEntity(e.excursion)
          ),

      };

      return PackageAggregateMapper.fromPersistence(
        persistence
      );

    });

  }

  async findById(
    id: number,
  ): Promise<PackageAggregate | null> {

    const p = await prisma.package_voyage.findUnique({

      where: {
        id_pack: BigInt(id),
      },

      include: {

        possede: {
          include: {
            vol: true,
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

    const persistence = {

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

      status: p.statut_pack,

      ownerId: Number(p.id_user),

      supplements: {

        economy: Number(p.supp_economy_pack),

        business: Number(p.supp_business_pack),

        first: Number(p.supp_first_pack),

        single: Number(p.supp_single_pack),

        double: Number(p.supp_double_pack),

        triple: Number(p.supp_triple_pack),

        quadruple: Number(p.supp_quadruple_pack),

        suite: Number(p.supp_suite_pack),

        bedOnly: Number(p.supp_bed_only_pack),

        bedBreakfast: Number(p.supp_bed_breakfast_pack),

        halfBoard: Number(p.supp_half_board_pack),

        fullBoard: Number(p.supp_full_board_pack),

        allInclusive: Number(p.supp_all_inclusive_pack),

      },

      flights:
        p.possede.map(pos =>
          FlightMapper.toEntity(pos.vol)
        ),

      hotels:
        p.heberge.map(h =>
          HotelMapper.toEntity(h.hotel)
        ),

      transports:
        p.utilise.map(t =>
          TransportMapper.toEntity(t.transport)
        ),

      excursions:
        p.propose.map(e =>
          ExcursionMapper.toEntity(e.excursion)
        ),

    };

    return PackageAggregateMapper.fromPersistence(
      persistence
    );

  }

  async createAggregate(
    aggregate: PackageAggregate,
  ): Promise<PackageAggregate> {

    return await prisma.$transaction(async (tx) => {

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

          supp_economy_pack: aggregate.supplements.economy,

          supp_business_pack: aggregate.supplements.business,

          supp_first_pack: aggregate.supplements.first,

          supp_single_pack: aggregate.supplements.single,

          supp_double_pack: aggregate.supplements.double,

          supp_triple_pack: aggregate.supplements.triple,

          supp_quadruple_pack: aggregate.supplements.quadruple,

          supp_suite_pack: aggregate.supplements.suite,

          supp_bed_only_pack: aggregate.supplements.bedOnly,

          supp_bed_breakfast_pack: aggregate.supplements.bedBreakfast,

          supp_half_board_pack: aggregate.supplements.halfBoard,

          supp_full_board_pack: aggregate.supplements.fullBoard,

          supp_all_inclusive_pack: aggregate.supplements.allInclusive,

          date_heure_creation_pack: new Date(),

          id_user: BigInt(
              aggregate.ownerId
          ),

        },

      })
      
      // ======================================
      // Flights
      // ======================================

      for (const flight of aggregate.flights) {

        await tx.possede.create({

          data: {

            id_pack: createdPackage.id_pack,

            id_vol: BigInt(flight.id),

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

        aggregate.ownerId,

        aggregate.flights,

        aggregate.hotels,

        aggregate.transports,

        aggregate.excursions,

      );

    })
  }


  async updateAggregate(
    aggregate: PackageAggregate,
  ): Promise<PackageAggregate> {

    return await prisma.$transaction(async (tx) => {

      // =====================================
      // Mise à jour du package
      // =====================================

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

          supp_economy_pack: aggregate.supplements.economy,

          supp_business_pack: aggregate.supplements.business,

          supp_first_pack: aggregate.supplements.first,

          supp_single_pack: aggregate.supplements.single,

          supp_double_pack: aggregate.supplements.double,

          supp_triple_pack: aggregate.supplements.triple,

          supp_quadruple_pack: aggregate.supplements.quadruple,

          supp_suite_pack: aggregate.supplements.suite,

          supp_bed_only_pack: aggregate.supplements.bedOnly,

          supp_bed_breakfast_pack: aggregate.supplements.bedBreakfast,

          supp_half_board_pack: aggregate.supplements.halfBoard,

          supp_full_board_pack: aggregate.supplements.fullBoard,

          supp_all_inclusive_pack: aggregate.supplements.allInclusive,

        },

      });

      // =====================================
      // Suppression des anciennes relations
      // =====================================

      await tx.possede.deleteMany({

        where: {

          id_pack: BigInt(aggregate.id),

        },

      });

      await tx.heberge.deleteMany({

        where: {

          id_pack: BigInt(aggregate.id),

        },

      });

      await tx.utilise.deleteMany({

        where: {

          id_pack: BigInt(aggregate.id),

        },

      });

      await tx.propose.deleteMany({

        where: {

          id_pack: BigInt(aggregate.id),

        },

      });

      // =====================================
      // Flights
      // =====================================

      for (const flight of aggregate.flights) {

        await tx.possede.create({

          data: {

            id_pack: BigInt(aggregate.id),

            id_vol: BigInt(flight.id),

          },

        });

      }

      // =====================================
      // Hotels
      // =====================================

      for (const hotel of aggregate.hotels) {

        await tx.heberge.create({

          data: {

            id_pack: BigInt(aggregate.id),

            id_hot: BigInt(hotel.id),

          },

        });

      }

      // =====================================
      // Transports
      // =====================================

      for (const transport of aggregate.transports) {

        await tx.utilise.create({

          data: {

            id_pack: BigInt(aggregate.id),

            id_transp: BigInt(transport.id),

          },

        });

      }

      // =====================================
      // Excursions
      // =====================================

      for (const excursion of aggregate.excursions) {

        await tx.propose.create({

          data: {

            id_pack: BigInt(aggregate.id),

            id_exc: BigInt(excursion.id),

          },

        });

      }

      // les relations arrivent juste après...

      return aggregate;

    });

  }

  async delete(
    id: number,
  ): Promise<void> {

    await prisma.package_voyage.update({

      where: {

        id_pack: BigInt(id),

      },

      data: {

        statut_pack: "ARCHIVED",

      },

    });

  }

}
