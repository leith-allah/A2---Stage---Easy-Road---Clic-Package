
"use client";

import { useState } from "react";
import BackButton from "@/components/navigation/BackButton";
import { Wallet, Send, CheckCircle2, AlertCircle, Info } from "lucide-react";

const MIN_TOPUP = 100;
const MAX_TOPUP = 1_000_000;

export default function TopUpPage() {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(null);
    setErrorMsg(null);

    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount < MIN_TOPUP) {
      setErrorMsg(`Le montant minimum autorisé est de ${MIN_TOPUP} DZD.`);
      return;
    }

    if (numericAmount > MAX_TOPUP) {
      setErrorMsg(`Le montant ne peut pas dépasser le plafond de ${MAX_TOPUP.toLocaleString("fr-FR")} DZD.`);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/wallets/topup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: numericAmount, comment: note }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Erreur lors de l'envoi");

      setSuccess("Votre demande de rechargement a été transmise à l'administration.");
      setAmount("");
      setNote("");
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-slate-50/50 py-12 px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10 space-y-8">
        <div className="flex items-center justify-between border-b pb-4">
          <BackButton href="/dashboard/balance" />
          <a
            href="/dashboard/top-up/history"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 transition"
          >
            Voir l'historique
          </a>
        </div>

        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto border border-blue-100">
            <Wallet size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Recharger mon Solde</h1>
          <p className="text-slate-500 text-xs max-w-md mx-auto">
            Demandez un crédit sur votre portefeuille EasyRoad pour effectuer vos réservations.
          </p>
        </div>

        {success && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium">
            <CheckCircle2 size={20} className="shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium">
            <AlertCircle size={20} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-sm">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-bold text-slate-700">Montant à recharger (DZD) *</label>
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                <Info size={12} className="text-blue-600" />
                Min: {MIN_TOPUP} DZD — Max: {MAX_TOPUP.toLocaleString("fr-FR")} DZD
              </span>
            </div>

            <div className="relative">
              <input
                type="number"
                required
                min={MIN_TOPUP}
                max={MAX_TOPUP}
                onWheel={(e) => (e.target as HTMLInputElement).blur()} // 🚫 Désactive le scroll souris
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Ex: 50000"
                className="w-full border border-slate-200 rounded-2xl p-4 pr-16 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-semibold"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">DZD</span>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-2">Remarques / Motif (Optionnel)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Ex: Virement bancaire effectué le..."
              className="w-full border border-slate-200 rounded-2xl p-4 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-blue-200 transition cursor-pointer text-base disabled:opacity-50"
          >
            <Send size={18} />
            <span>{loading ? "Envoi en cours..." : "Soumettre la demande"}</span>
          </button>
        </form>
      </div>
    </section>
  );
}
