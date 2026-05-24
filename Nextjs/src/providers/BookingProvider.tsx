
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  createBooking,
  getBookings,
} from "@/src/features/bookings/services/booking.service";

import {
  Booking,
} from "@/src/features/bookings/types/booking.types";

type BookingContextType = {
  bookings: Booking[];

  loading: boolean;

  create:
    typeof createBooking;

  refresh:
    () => Promise<void>;
};

const BookingContext =
  createContext<
    BookingContextType
      | undefined
  >(undefined);

export function
BookingProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [bookings, setBookings] =
    useState<Booking[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function refresh() {

    const data =
      await getBookings();

    setBookings([...data]);
  }

  useEffect(() => {

    async function load() {

      await refresh();

      setLoading(false);
    }

    load();

  }, []);

  async function create(
    data: Parameters<
      typeof createBooking
    >[0]
  ) {

    const booking =
      await createBooking(data);

    await refresh();

    return booking;
  }

  return (
    <BookingContext.Provider
      value={{
        bookings,
        loading,
        create,
        refresh,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function
useBookingContext() {

  const context =
    useContext(BookingContext);

  if (!context) {
    throw new Error(
      "BookingProvider manquant"
    );
  }

  return context;
}
