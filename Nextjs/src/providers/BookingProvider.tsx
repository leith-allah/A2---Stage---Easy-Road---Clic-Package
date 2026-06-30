"use client";

export function BookingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export function useBookingContext() {
  return {
    bookings: [],
    loading: false,
    create: async () => {},
    refresh: async () => {},
  };
}