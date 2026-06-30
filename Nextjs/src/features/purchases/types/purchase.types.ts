
import { PURCHASE_STATUS }
from "@/server/constants/purchase-status";

export type PurchaseStatus =

  typeof PURCHASE_STATUS[
    keyof typeof PURCHASE_STATUS
  ];

export interface Purchase {

  id: number;

  bookingNumber: string;

  packageId: number;

  packageTitle: string;

  destination: string;

  image: string;

  travelers: number;

  total: number;

  departureDate: string;

  returnDate: string;

  status: PurchaseStatus;

  createdAt: string;

}
