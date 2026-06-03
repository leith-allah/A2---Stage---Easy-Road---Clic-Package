
"use client";

import { useState } from "react";

import useWallet from
"@/features/wallet/hooks/useWallet";

import InsufficientFundsModal from
"@/features/wallet/components/InsufficientFundsModal";

import {createBookingFlow} from 
"@/features/bookings/services/bookingFlow.service";


type Props = {
  total: number;
};

export default function ReserveButton({
  total,
}: Props) {

  const { wallet, pay } =
    useWallet();

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] =
    useState(false);

  async function handleReserve() {

    console.log("CLICK");

    console.log(wallet);

    console.log(total);

    if (!wallet) {
      alert("Portefeuille en chargement");

      return;
    }

    try {

      setLoading(true);

      await createBookingFlow({
        packageId: 1,

        packageTitle:
          "Dubai Luxury",

        travelers: 2,

        total,

        departureDate:
          "2026-08-12",

        remainingTickets: 12,
      });

      setSuccess(true);

    } catch (error) {

      console.log(error);

      setError(true);

    } finally {

      setLoading(false);
    }

  }

  return (
    <>
      <button
        onClick={handleReserve}
        disabled={loading || !wallet}
        className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          disabled:opacity-50
          transition
          text-white
          py-4
          rounded-full
          font-bold
          text-lg
        "
      >
        {loading
          ? "Traitement..."
          : success
          ? "Réservation Confirmée"
          : "Réserver Maintenant"}
      </button>

      <InsufficientFundsModal
        open={error}
        onClose={() => setError(false)}
      />
    </>
  );
}
