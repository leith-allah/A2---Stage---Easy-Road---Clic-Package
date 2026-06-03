
"use client";

import { useMemo, useState } from "react";

import BackButton from "@/components/navigation/BackButton";

import SearchBar from "@/components/ui/SearchBar";
import FilterBar from "@/components/ui/FilterBar";

export default function InvoicesPage() {
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("recent");

  const invoices = [
    {
      id: "FAC-2026-001",
      packageName: "Package Dubai Luxury",
      amount: 350000,
      status: "Payée",
      date: "2026-05-12",
    },
    {
      id: "FAC-2026-002",
      packageName: "Package Turquie",
      amount: 180000,
      status: "En attente",
      date: "2026-05-03",
    },
    {
      id: "FAC-2026-003",
      packageName: "Package Maldives Escape",
      amount: 520000,
      status: "Payée",
      date: "2026-04-28",
    },
  ];

  const filteredInvoices = useMemo(() => {
    let result = [...invoices];

    // Recherche intelligente
    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter((invoice) => {
        return (
          invoice.id.toLowerCase().includes(keyword) ||
          invoice.packageName.toLowerCase().includes(keyword) ||
          invoice.status.toLowerCase().includes(keyword) ||
          invoice.amount.toString().includes(keyword) ||
          invoice.date.toLowerCase().includes(keyword)
        );
      });
    }

    // Filtres
    switch (filter) {
      case "recent":
        result.sort(
          (a, b) =>
            new Date(b.date).getTime() -
            new Date(a.date).getTime()
        );
        break;

      case "old":
        result.sort(
          (a, b) =>
            new Date(a.date).getTime() -
            new Date(b.date).getTime()
        );
        break;

      case "price-asc":
        result.sort((a, b) => a.amount - b.amount);
        break;

      case "price-desc":
        result.sort((a, b) => b.amount - a.amount);
        break;

      case "paid":
        result = result.filter(
          (invoice) => invoice.status === "Payée"
        );
        break;

      case "pending":
        result = result.filter(
          (invoice) => invoice.status === "En attente"
        );
        break;

      default:
        break;
    }

    return result;
  }, [search, filter]);

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Retour */}
        <div className="mb-6">
          <BackButton href="/dashboard/balance" />
        </div>

        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-12">

          {/* Texte */}
          <div>
            <h1 className="text-4xl font-bold text-blue-600">
              Factures
            </h1>

            <p className="text-gray-600 mt-3">
              Consultez et téléchargez toutes les
              factures liées à vos achats de packages.
            </p>
          </div>

          {/* Recherche + Filtres */}
          <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">

            <div className="w-full md:w-80">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Rechercher une facture..."
              />
            </div>

            <FilterBar
              value={filter}
              onChange={setFilter}
              options={[
                {
                  label: "Plus récentes",
                  value: "recent",
                },
                {
                  label: "Plus anciennes",
                  value: "old",
                },
                {
                  label: "Prix croissant",
                  value: "price-asc",
                },
                {
                  label: "Prix décroissant",
                  value: "price-desc",
                },
                {
                  label: "Factures payées",
                  value: "paid",
                },
                {
                  label: "Factures en attente",
                  value: "pending",
                },
              ]}
            />
          </div>
        </div>

        {/* Liste */}
        <div className="space-y-5">
          {filteredInvoices.map((invoice) => (
          <div
            key={invoice.id}
            className="
              bg-white
              rounded-3xl
              shadow-md
              p-6
              grid
              grid-cols-1
              md:grid-cols-[2fr_1fr_1fr_auto]
              items-center
              gap-6
            "
            >
              
              {/* Infos */}
              <div className="space-y-1">
                <p className="text-sm text-gray-500">
                  {invoice.id}
                </p>

                <h2 className="text-xl font-bold">
                  {invoice.packageName}
                </h2>

                <p className="text-gray-500">
                  {new Date(invoice.date).toLocaleDateString(
                    "fr-FR"
                  )}
                </p>
              </div>

              {/* Montant */}
              <div className="text-center">
                <p className="text-gray-500 text-sm">
                  Montant
                </p>

                <h3 className="text-2xl font-bold">
                  {invoice.amount.toLocaleString()} DZD
                </h3>
              </div>

              {/* Status */}
              <div className="text-center">
                <p
                  className={`
                    text-sm
                    font-semibold
                    ${
                      invoice.status === "Payée"
                        ? "text-green-600"
                        : "text-orange-500"
                    }
                  `}
                >
                  {invoice.status}
                </p>
              </div>

              {/* Action */}
              <button
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  transition
                  text-white
                  px-6
                  py-3
                  rounded-full
                  font-semibold
                "
              >
                Télécharger PDF
              </button>
            </div>
          ))}
        </div>

        {/* Aucun résultat */}
        {filteredInvoices.length === 0 && (
          <div
            className="
              bg-white
              rounded-3xl
              shadow-md
              p-16
              text-center
              mt-10
            "
          >
            <h3 className="text-3xl font-bold mb-4">
              Aucun résultat
            </h3>

            <p className="text-gray-600">
              Aucune facture ne correspond
              à votre recherche.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
