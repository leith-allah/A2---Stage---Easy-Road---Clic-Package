
import { getMyPurchases } 
from "@/features/purchases/services/purchase.service";

import { getPurchaseById } 
from "@/features/purchases/services/purchase.service";

import { cancelPurchase } 
from "@/features/purchases/services/purchase.service";


export async function getMyBookings() {
  return getMyPurchases();
}

export async function getBookingById(
  id: number
) {
  return getPurchaseById(id);
}

export async function cancelBooking(
  id: number
) {
  return cancelPurchase(id);
}
