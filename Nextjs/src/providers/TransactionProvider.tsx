
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getTransactions,
  createTransaction,
} from "@/features/transactions/services/transaction.service";

import {
  Transaction,
} from "@/features/transactions/types/transaction.types";

type TransactionContextType = {
  transactions:
    Transaction[];

  loading: boolean;

  create:
    typeof createTransaction;

  refresh:
    () => Promise<void>;
};

const TransactionContext =
  createContext<
    TransactionContextType
      | undefined
  >(undefined);

export function
TransactionProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [
    transactions,
    setTransactions,
  ] = useState<
    Transaction[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  async function refresh() {

    const data =
      await getTransactions();

    setTransactions([
      ...data,
    ]);
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
      typeof createTransaction
    >[0]
  ) {

    const transaction =
      await createTransaction(
        data
      );

    await refresh();

    return transaction;
  }

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        create,
        refresh,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function
useTransactionContext() {

  const context =
    useContext(
      TransactionContext
    );

  if (!context) {
    throw new Error(
      "TransactionProvider manquant"
    );
  }

  return context;
}
