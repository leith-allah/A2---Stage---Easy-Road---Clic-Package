
import {api} from "@/src/lib/api";

export type Package = {
  id: number;

  title: string;

  remainingTickets: number;

  price: number;
};

export let mockPackages:
  Package[] = [
  {
    id: 1,

    title: "Dubai Luxury",

    remainingTickets: 12,

    price: 180000,
  },

  {
    id: 2,

    title: "Istanbul Premium",

    remainingTickets: 4,

    price: 120000,
  },
];

export async function
getPackages() {
  return mockPackages;
}

export async function
decreasePackageStock(
  packageId: number,
  quantity: number
) {

  mockPackages =
    mockPackages.map((pkg) => {

      if (pkg.id !== packageId)
        return pkg;

      return {
        ...pkg,

        remainingTickets:
          pkg.remainingTickets -
          quantity,
      };
    });
}

export async function
fetchPackages() {

  try {

    return await api(
      "/packages"
    );

  } catch {

    // FALLBACK MOCK
    return mockPackages;
  }
}
