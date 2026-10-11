
"use client";

import { useEffect, useState } from "react";
import BackButton from "@/components/navigation/BackButton";
import { ArrowUpRight, ArrowDownLeft, Receipt, RefreshCw } from "lucide-react";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("RECENT");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/transactions/me");
        if (res.ok) {
          const json = await res.json();
          setTransactions(json.data || json || []);
        }
      } catch (error) {
        console.error("Erreur chargement transactions :", error);
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

  // 🎯 Tri dynamique corrigé (Dates & Montants)
  const sortedTransactions = [...transactions].sort((a, b) => {
    const timeA = new Date(a.date).getTime();
    const timeB = new Date(b.date).getTime();
    const amountA = Number(a.amount || 0);
    const amountB = Number(b.amount || 0);

    if (sortOption === "OLD") return timeA - timeB; // Plus ancienne
    if (sortOption === "AMOUNT_DESC") return amountB - amountA; // Montant décroissant
    if (sortOption === "AMOUNT_ASC") return amountA - amountB; // Montant croissant
    return timeB - timeA; // Plus récente (Par défaut)
  });

  return (
    <section className="min-h-screen bg-slate-50/50 py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* 🟢 RETOUR VERS /dashboard/balance */}
        <BackButton href="/dashboard/balance" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Receipt className="text-blue-600" size={28} />
              Historique des Transactions
            </h1>
            <p className="text-slate-500 text-xs mt-1">
              Consultez l'ensemble des débits, crédits et achats effectués sur votre compte.
            </p>
          </div>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm cursor-pointer"
          >
            <option value="RECENT">Date : Plus récente</option>
            <option value="OLD">Date : Plus ancienne</option>
            <option value="AMOUNT_DESC">Montant : Décroissant</option>
            <option value="AMOUNT_ASC">Montant : Croissant</option>
          </select>
        </div>

        {loading ? (
          <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-100 space-y-2">
            <RefreshCw className="animate-spin mx-auto text-blue-600" size={28} />
            <p className="text-sm">Chargement de vos mouvements...</p>
          </div>
        ) : sortedTransactions.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center text-slate-500 border border-slate-100 space-y-2">
            <Receipt className="mx-auto text-slate-300" size={40} />
            <p className="font-bold text-slate-800">Aucune transaction</p>
            <p className="text-xs">Vos opérations financières apparaîtront ici.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {sortedTransactions.map((tx: any) => {
              const amount = Number(tx.amount || 0);
              const isCredit = Boolean(tx.isCredit);

              return (
                <div
                  key={tx.id}
                  className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                        isCredit
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : "bg-rose-50 text-rose-600 border border-rose-100"
                      }`}
                    >
                      {isCredit ? <ArrowDownLeft size={22} /> : <ArrowUpRight size={22} />}
                    </div>

                    <div className="space-y-0.5">
                      <p className="font-bold text-slate-900 text-sm">
                        {tx.description}
                      </p>
                      <p className="text-xs text-slate-400">
                        {formatDate(tx.date)} • Ref :{" "}
                        <span className="font-mono">{tx.ref}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <strong
                      className={`text-lg font-extrabold ${
                        isCredit ? "text-emerald-600" : "text-slate-900"
                      }`}
                    >
                      {isCredit ? "+" : "-"}{amount.toLocaleString("fr-FR")} DZD
                    </strong>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {tx.status || "SUCCES"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
