
import {
  Invoice,
} from "../types/invoice.types";

export let mockInvoices:
  Invoice[] = [
  {
    id: 1,

    bookingId: 1,

    packageTitle:
      "Istanbul Premium",

    amount: 240000,

    createdAt: "2026-05-20",

    status: "PAID",
  },
];

export async function
getInvoices() {
  return mockInvoices;
}

type CreateInvoiceData = {
  bookingId: number;

  packageTitle: string;

  amount: number;
};

export async function
createInvoice(
  data: CreateInvoiceData
) {

  const invoice: Invoice = {
    id: Date.now(),

    bookingId:
      data.bookingId,

    packageTitle:
      data.packageTitle,

    amount: data.amount,

    createdAt:
      new Date().toISOString(),

    status: "PAID",
  };

  mockInvoices.unshift(
    invoice
  );

  return invoice;
}
