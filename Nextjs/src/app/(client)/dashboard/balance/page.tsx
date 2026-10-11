
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Wallet, ArrowRightLeft, PlusCircle, Receipt, FileText, ShieldCheck, RefreshCw } from "lucide-react";

export default function BalancePage() {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/wallets/me");
        if (res.ok) {
          const json = await res.json();
          setSummary(json.data || json);
        }
      } catch (error) {
        console.error("Erreur lors du chargement du solde :", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const balance = summary?.balance ?? 0;
  const lastTx = summary?.lastTransaction;

  return (
    <section className="min-h-screen bg-slate-50/50 py-12 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-3">
            <Wallet className="text-blue-600" size={36} />
            Mon Solde
          </h1>
          <p className="text-slate-500 text-sm">
            Gérez le solde et les mouvements de votre portefeuille Clic Package.
          </p>
        </div>

        {/* Balance Card */}
        <div className="w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center border border-slate-100 space-y-4">
          <p className="text-slate-500 font-semibold text-sm uppercase tracking-wider">
            Solde disponible
          </p>

          <h2 className="text-5xl md:text-6xl font-black text-blue-600 tracking-tight">
            {loading ? (
              <RefreshCw className="animate-spin mx-auto text-blue-600" size={48} />
            ) : (
              `${balance.toLocaleString("fr-FR")} DZD`
            )}
          </h2>

          <p className="text-xs text-slate-400">
            Dernière mise à jour : {summary?.lastUpdate ? formatDate(summary.lastUpdate) : "Récemment"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/dashboard/transfer"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-4 px-6 text-center text-sm font-bold shadow-md hover:shadow-blue-200 transition flex items-center justify-center gap-2"
          >
            <ArrowRightLeft size={18} />
            <span>Effectuer un virement</span>
          </Link>

          <Link
            href="/dashboard/top-up"
            className="bg-white hover:bg-slate-50 text-blue-600 border border-blue-200 rounded-2xl py-4 px-6 text-center text-sm font-bold shadow-sm transition flex items-center justify-center gap-2"
          >
            <PlusCircle size={18} />
            <span>Recharger mon solde</span>
          </Link>

          <Link
            href="/dashboard/transactions"
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl py-4 px-6 text-center text-sm font-bold shadow-sm transition flex items-center justify-center gap-2"
          >
            <Receipt size={18} />
            <span>Consulter les transactions</span>
          </Link>

          <Link
            href="/dashboard/invoices"
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl py-4 px-6 text-center text-sm font-bold shadow-sm transition flex items-center justify-center gap-2"
          >
            <FileText size={18} />
            <span>Consulter les factures</span>
          </Link>
        </div>

        {/* Dynamic Quick Info Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* DERNIÈRE TRANSACTION DYNAMIQUE */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 text-center space-y-1">
            <p className="text-xs text-slate-400 font-bold uppercase">
              Dernière transaction
            </p>
            {lastTx ? (
              <>
                <h3
                  className={`font-black text-lg ${
                    lastTx.isCredit ? "text-emerald-600" : "text-slate-900"
                  }`}
                >
                  {lastTx.isCredit ? "+" : "-"}{lastTx.amount.toLocaleString("fr-FR")} DZD
                </h3>
                <p className="text-slate-500 text-xs truncate" title={lastTx.description}>
                  {lastTx.description}
                </p>
              </>
            ) : (
              <p className="text-slate-400 text-xs pt-2">Aucune transaction</p>
            )}
          </div>

          {/* NOMBRE DE FACTURES REEL */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 text-center space-y-1">
            <p className="text-xs text-slate-400 font-bold uppercase">Factures</p>
            <h3 className="font-extrabold text-2xl text-slate-900">
              {summary?.invoicesCount ?? 0}
            </h3>
            <p className="text-slate-500 text-xs">Achat(s) effectué(s)</p>
          </div>

          {/* STATUT DU COMPTE REEL */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 text-center space-y-1">
            <p className="text-xs text-slate-400 font-bold uppercase">Statut du compte</p>
            <h3 className="font-extrabold text-lg text-emerald-600 flex items-center justify-center gap-1">
              <ShieldCheck size={18} />
              {summary?.accountStatus || "Vérifié"}
            </h3>
            <p className="text-slate-500 text-xs">Accès Sécurisé</p>
          </div>
        </div>
      </div>
    </section>
  );
}
