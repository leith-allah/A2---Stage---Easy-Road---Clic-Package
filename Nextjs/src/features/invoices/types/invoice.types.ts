
export type InvoiceStatus =
  | "PAID"
  | "PENDING"
  | "REFUNDED";

export type Invoice = {
  id: number;

  bookingId: number;

  packageTitle: string;

  amount: number;

  createdAt: string;

  status: InvoiceStatus;
};
