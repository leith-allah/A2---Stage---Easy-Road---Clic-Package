
"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getTransactions,
} from "@/features/transactions/services/transaction.service";

import BackButton from "@/components/navigation/BackButton";


export default function TransactionsPage() {
  const [
    transactions,
    setTransactions,
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    async function load() {

      try {

        const result =
          await getTransactions();

        setTransactions(
          result
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    }

    load();

  }, []);

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-5xl mx-auto">
                
        {/* Bouton Retour */}
        <div className="mb-6">
          <BackButton href="/dashboard/balance" />
        </div>
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-blue-600">
              Transactions
            </h1>

            <p className="text-gray-600 mt-2">
              Historique complet des opérations du compte.
            </p>
          </div>

          {/* Tri */}
          <select
            className="
              border
              rounded-2xl
              px-5
              py-3
              bg-white
              shadow-sm
              outline-none
            "
          >
            <option>Trier par</option>
            <option>Type</option>
            <option>Date la plus récente</option>
            <option>Date la plus ancienne</option>
            <option>Montant croissant</option>
            <option>Montant décroissant</option>
          </select>
        </div>

        {/* Liste */}
        {
          loading && (
            <p>
              Chargement...
            </p>
          )
        }
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="
                bg-white
                rounded-2xl
                shadow-md
                p-6
                flex
                items-center
                justify-between
                gap-6
              "
            >
              <div className="flex flex-col">
                <span
                  className="
                    text-sm
                    text-blue-600
                    font-semibold
                    mb-1
                  "
                >
                  {transaction.type}
                </span>

                <h2 className="font-bold text-lg">
                  {transaction.type}
                </h2>

                <p className="text-gray-500 text-sm">
                  {transaction.status}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold">
                  {transaction.amount} DZD
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
