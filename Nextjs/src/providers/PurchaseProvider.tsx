
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  Purchase,
} from "@/features/purchases/types/purchase.types";

import {
  getMyPurchases,
} from "@/features/purchases/services/purchase.service";

type PurchaseContextType = {

  purchases: Purchase[];

  loading: boolean;

  refresh:
    () => Promise<void>;

};

const PurchaseContext =
  createContext<
    PurchaseContextType | undefined
  >(undefined);

export function PurchaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [
    purchases,
    setPurchases,
  ] = useState<Purchase[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  async function refresh() {

    const data =
      await getMyPurchases();

    setPurchases(data);

  }

  useEffect(() => {

    async function load() {

      try {

        await refresh();

      } catch {

        setPurchases([]);

      } finally {

        setLoading(false);

      }

    }

    load();

  }, []);

  return (

    <PurchaseContext.Provider
      value={{
        purchases,
        loading,
        refresh,
      }}
    >
      {children}
    </PurchaseContext.Provider>

  );

}

export function usePurchaseContext() {

  const context =
    useContext(
      PurchaseContext
    );

  if (!context) {

    throw new Error(
      "PurchaseProvider manquant"
    );

  }

  return context;

}
