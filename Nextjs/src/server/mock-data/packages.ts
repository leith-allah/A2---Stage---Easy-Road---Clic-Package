
import { Package } from "@/server/entities/package.entity";

export const packages: Package[] = [
  {
    id: 1,
    name: "Séjour Dubaï",
    destination: "Dubai",
    price: 1200,
    availableStock: 25,
    createdAt: new Date(),
  },
];
