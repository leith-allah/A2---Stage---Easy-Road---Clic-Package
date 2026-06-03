
import {
  createBooking,
} from "@/features/bookings/services/booking.service";

import {
  debitWallet,
} from "@/features/wallet/services/wallet.service";

import {
  createTransaction,
} from "@/features/transactions/services/transaction.service";

import {
  createNotification,
} from "@/features/notifications/services/notification.service";

import {
  createInvoice,
} from "@/features/invoices/services/invoice.service";

import {
  decreasePackageStock,
} from "@/features/packages/services/package.service";


type BookingFlowData = {
  packageId: number;

  packageTitle: string;

  travelers: number;

  total: number;

  departureDate: string;

  remainingTickets: number;
};

export async function
createBookingFlow(
  data: BookingFlowData
) {

  // STOCK
  if (
    data.travelers >
    data.remainingTickets
  ) {
    throw new Error(
      "Stock insuffisant"
    );
  }

  // WALLET
  await debitWallet(data.total);

  await createNotification({
  title:
    "Réservation confirmée",

  message:
    `Votre réservation pour ${data.packageTitle} a été confirmée.`,

  type: "SUCCESS",

  category: "BOOKING",
  });


  // BOOKING
  const booking =
    await createBooking({
      packageId: data.packageId,

      packageTitle:
        data.packageTitle,

      travelers:
        data.travelers,

      total: data.total,

      departureDate:
        data.departureDate,
    });

    await createInvoice({
      bookingId: booking.id,

      packageTitle:
        booking.packageTitle,

      amount: booking.total,
    });

    await decreasePackageStock(
      data.packageId,
      data.travelers
    );

  // TODO:
  // notifications
  // invoices
  // transactions
  // stock sync

  return booking;
}
