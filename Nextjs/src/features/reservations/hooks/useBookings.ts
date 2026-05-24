
"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  cancelBooking,
  createBooking,
  getBookings,
} from "../services/booking.service";

import {
  Booking,
} from "../types/booking.types";

export default function
useBookings() {

  const [
    bookings,
    setBookings,
  ] = useState<Booking[]>(
    []
  );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function load() {

      const data =
        await getBookings();

      setBookings(data);

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

    setBookings((prev) => [
      booking,
      ...prev,
    ]);

    return booking;
  }

  async function cancel(
    id: number
  ) {

    const updated =
      await cancelBooking(id);

    setBookings([...updated]);
  }

  return {
    bookings,
    loading,
    create,
    cancel,
  };
}
