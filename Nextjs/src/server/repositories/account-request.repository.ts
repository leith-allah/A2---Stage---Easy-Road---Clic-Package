
import { Prisma } from "@prisma/client";

import { prisma } from "@/server/db/prisma";


export class AccountRequestRepository {

  async findAll() {
    return prisma.demande_creation_compte.findMany({
      include: {
        role: true,
        bureau_agence: true,
        utilisateur: true,
      },
      orderBy: {
        date_heure_demande: "desc",
      },
    });
  }

  async findById(id: bigint) {
    return prisma.demande_creation_compte.findUnique({
      where: {
        id_demande_creation: id,
      },
      include: {
        role: true,
        bureau_agence: true,
        utilisateur: true,
      },
    });
  }

  async findPending() {
    return prisma.demande_creation_compte.findMany({
      where: {
        statut_demande_creation: "EN_ATTENTE",
      },
      include: {
        role: true,
        bureau_agence: true,
      },
      orderBy: {
        date_heure_demande: "asc",
      },
    });
  }

  async create(
    data: Prisma.demande_creation_compteCreateArgs["data"]
  ) {
    return prisma.demande_creation_compte.create({
      data,
    });
  }

  async update(
    id: bigint,
    data: Prisma.demande_creation_compteUpdateArgs["data"]
  ) {
    return prisma.demande_creation_compte.update({
      where: {
        id_demande_creation: id,
      },
      data,
    });
  }

  async delete(id: bigint) {
    return prisma.demande_creation_compte.delete({
      where: {
        id_demande_creation: id,
      },
    });
  }

  getPrisma() {
      return prisma;
  }

}
