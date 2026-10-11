
"use client";

import { useEffect, useMemo, useState } from "react";
import BackButton from "@/components/navigation/BackButton";
import SearchBar from "@/components/ui/SearchBar";
import FilterBar from "@/components/ui/FilterBar";
import { FileText, Download, RefreshCw, AlertCircle } from "lucide-react";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("recent");

  useEffect(() => {
    async function loadInvoices() {
      try {
        const res = await fetch("/api/invoices/me");
        if (res.ok) {
          const json = await res.json();
          setInvoices(json.data || []);
        }
      } catch (err) {
        console.error("Erreur chargement factures :", err);
      } finally {
        setLoading(false);
      }
    }
    loadInvoices();
  }, []);

  const filteredInvoices = useMemo(() => {
    let result = [...invoices];

    // Recherche par mot-clé
    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter((invoice) => {
        const id = (invoice.id || "").toLowerCase();
        const pack = (invoice.packageName || "").toLowerCase();
        const status = (invoice.status || "").toLowerCase();
        const amount = (invoice.amount || 0).toString();

        return (
          id.includes(keyword) ||
          pack.includes(keyword) ||
          status.includes(keyword) ||
          amount.includes(keyword)
        );
      });
    }

    // Filtres & Tri
    switch (filter) {
      case "recent":
        result.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;

      case "old":
        result.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;

      case "price-asc":
        result.sort((a, b) => Number(a.amount) - Number(b.amount));
        break;

      case "price-desc":
        result.sort((a, b) => Number(b.amount) - Number(a.amount));
        break;

      case "paid":
        result = result.filter((invoice) => invoice.status === "Payée");
        break;

      case "PENDING":
        result = result.filter((invoice) => invoice.status === "En attente");
        break;

      default:
        break;
    }

    return result;
  }, [invoices, search, filter]);

  const handleDownloadPDF = (invoice: any) => {
    // Imprime la vue de la facture / Reçu
    window.print();
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="min-h-screen bg-slate-50/50 py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 🟢 RETOUR VERS /dashboard/balance */}
        <BackButton href="/dashboard/balance" />

        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 border-b pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <FileText className="text-blue-600" size={32} />
              Factures & Reçus
            </h1>
            <p className="text-slate-500 text-xs mt-1">
              Consultez et téléchargez toutes les factures officielles liées à vos réservations de packages.
            </p>
          </div>

          {/* Recherche + Filtres */}
          <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">
            <div className="w-full md:w-80">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Rechercher réf, package..."
              />
            </div>

            <FilterBar
              value={filter}
              onChange={setFilter}
              options={[
                { label: "Plus récentes", value: "recent" },
                { label: "Plus anciennes", value: "old" },
                { label: "Prix croissant", value: "price-asc" },
                { label: "Prix décroissant", value: "price-desc" },
                { label: "Factures payées", value: "paid" },
                { label: "Factures en attente", value: "PENDING" },
              ]}
            />
          </div>
        </div>

        {/* Etat de chargement */}
        {loading ? (
          <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-100 space-y-3">
            <RefreshCw className="animate-spin mx-auto text-blue-600" size={32} />
            <p className="text-sm">Chargement de vos factures...</p>
          </div>
        ) : filteredInvoices.length === 0 ? (
          /* Aucun résultat */
          <div className="bg-white rounded-3xl border border-slate-100 p-16 text-center space-y-2">
            <AlertCircle className="mx-auto text-slate-300" size={40} />
            <h3 className="text-xl font-bold text-slate-800">Aucune facture trouvée</h3>
            <p className="text-xs text-slate-500">
              {search.trim()
                ? "Aucun enregistrement ne correspond à vos critères de recherche."
                : "Vous n'avez pas encore effectué d'achat de package."}
            </p>
          </div>
        ) : (
          /* Liste Dynamique */
          <div className="space-y-4">
            {filteredInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] items-center gap-6"
              >
                {/* Infos Package */}
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                    {invoice.id}
                  </span>

                  <h2 className="text-lg font-bold text-slate-900 pt-1">
                    {invoice.packageName}
                  </h2>

                  <p className="text-xs text-slate-400">
                    Acheté le {formatDate(invoice.date)}
                    {invoice.nbVoyageurs && ` • ${invoice.nbVoyageurs} voyageur(s)`}
                  </p>
                </div>

                {/* Montant */}
                <div className="text-left md:text-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    Total
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {Number(invoice.amount).toLocaleString("fr-FR")} DZD
                  </h3>
                </div>

                {/* Statut */}
                <div className="text-left md:text-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      invoice.status === "Payée"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </div>

                {/* Bouton Télécharger PDF */}
                <button
                  onClick={() => handleDownloadPDF(invoice)}
                  className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                >
                  <Download size={14} />
                  <span>PDF</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
