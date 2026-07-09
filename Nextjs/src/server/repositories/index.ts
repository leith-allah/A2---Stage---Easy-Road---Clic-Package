
import { PrismaPackageRepository } from "./prisma/prisma-package.repository";
import { PrismaFlightRepository } from "./prisma/prisma-flight.repository";
import { PrismaHotelRepository } from "./prisma/prisma-hotel.repository";
import { PrismaTransportRepository } from "./prisma/prisma-transport.repository";
import { PrismaExcursionRepository } from "./prisma/prisma-excursion.repository";

export const packageRepository =
  new PrismaPackageRepository();

export const flightRepository =
  new PrismaFlightRepository();

export const hotelRepository =
  new PrismaHotelRepository();

export const transportRepository =
  new PrismaTransportRepository();

export const excursionRepository =
  new PrismaExcursionRepository();
  