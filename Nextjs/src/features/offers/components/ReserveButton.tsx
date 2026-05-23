
"use client";

import { useState } from "react";

import useWallet from
"@/src/features/wallet/hooks/useWallet";

import InsufficientFundsModal from
"@/src/features/wallet/components/InsufficientFundsModal";

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

      if (wallet.balance < total) {
        setError(true);

        return;
      }

      await pay(total);

      setSuccess(true);

    } catch {
      setError(true);

    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={handleReserve}
        disabled={loading}
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
