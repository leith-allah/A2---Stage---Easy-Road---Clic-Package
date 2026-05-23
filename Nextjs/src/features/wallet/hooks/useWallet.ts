
"use client";

import { useEffect, useState } from "react";

import {
  debitWallet,
  getWallet,
  topUpWallet,
} from "../services/wallet.service";

import { Wallet } from "../types/wallet.types";

export default function useWallet() {
  const [wallet, setWallet] =
    useState<Wallet | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadWallet() {
      const data =
        await getWallet();

      setWallet(data);

      setLoading(false);
    }

    loadWallet();
  }, []);

  async function pay(
    amount: number
  ) {
    const updated =
      await debitWallet(amount);

    setWallet({ ...updated });
  }

  async function topUp(
    amount: number
  ) {
    const updated =
      await topUpWallet(amount);

    setWallet({ ...updated });
  }

  return {
    wallet,
    loading,
    pay,
    topUp,
  };
}
