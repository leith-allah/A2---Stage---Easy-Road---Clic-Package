
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getWallet,
  debitWallet,
  topUpWallet,
} from "@/features/wallet/services/wallet.service";

import {
  Wallet,
} from "@/features/wallet/types/wallet.types";

type WalletContextType = {
  wallet: Wallet | null;

  loading: boolean;

  pay: (
    amount: number
  ) => Promise<void>;

  topUp: (
    amount: number
  ) => Promise<void>;

  refresh:
    () => Promise<void>;
};

const WalletContext =
  createContext<
    WalletContextType | undefined
  >(undefined);

export function WalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [wallet, setWallet] =
    useState<Wallet | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function refresh() {

    const data =
      await getWallet();

    setWallet({ ...data });
  }

  useEffect(() => {

    async function load() {

      await refresh();

      setLoading(false);
    }

    load();

  }, []);

  async function pay(
    amount: number
  ) {

    await debitWallet(amount);

    await refresh();
  }

  async function topUp(
    amount: number
  ) {

    await topUpWallet(amount);

    await refresh();
  }

  return (
    <WalletContext.Provider
      value={{
        wallet,
        loading,
        pay,
        topUp,
        refresh,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWalletContext() {

  const context =
    useContext(WalletContext);

  if (!context) {
    throw new Error(
      "WalletProvider manquant"
    );
  }

  return context;
}
