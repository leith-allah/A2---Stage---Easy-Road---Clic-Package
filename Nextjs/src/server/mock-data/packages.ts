
import { Package } from "@/server/entities/package.entity";

export const packages: Package[] = [
  {
    id: 1,

    name: "Séjour Dubaï",

    country: "Émirats Arabes Unis",

    destination: "Dubai",

    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",

    description:
      "Package premium avec hôtel 5 étoiles et vols inclus.",

    departureDate: new Date("2026-06-12"),

    returnDate: new Date("2026-06-19"),

    basePrice: 350000,

    availableSeats: 25,

    createdAt: new Date(),
  },
];
