
"use client";

import { useState } from "react";
import BackButton from "@/components/navigation/BackButton";
import { Send, CheckCircle2, AlertCircle, ArrowRightLeft, Info } from "lucide-react";

const MAX_TRANSFER = 500_000; // 500 000 DZD

export default function TransferPage() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleTransfer(e: React.FormEvent) {
    e.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);

    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      setErrorMsg("Saisissez un montant valide.");
      return;
    }

    if (numAmount > MAX_TRANSFER) {
      setErrorMsg(`Le montant ne peut pas dépasser le plafond de ${MAX_TRANSFER.toLocaleString("fr-FR")} DZD par virement.`);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/wallets/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipient, amount: numAmount, note }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Erreur lors du virement");

      setSuccessMsg(json.message || "Virement effectué avec succès !");
      setRecipient("");
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
        <BackButton href="/dashboard/balance" />

        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto border border-blue-100">
            <ArrowRightLeft size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Effectuer un Virement</h1>
          <p className="text-slate-500 text-xs max-w-md mx-auto">
            Transférez instantanément des fonds vers un autre compte EasyRoad via Email ou N° de portefeuille.
          </p>
        </div>

        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium">
            <CheckCircle2 size={20} className="shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium">
            <AlertCircle size={20} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleTransfer} className="space-y-6 text-sm">
          <div>
            <label className="block font-bold text-slate-700 mb-2">Destinataire (Email ou N° Compte) *</label>
            <input
              type="text"
              required
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Ex: agent@agence.com ou N° de portefeuille"
              className="w-full border border-slate-200 rounded-2xl p-4 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-bold text-slate-700">Montant du virement (DZD) *</label>
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                <Info size={12} className="text-blue-600" />
                Max par virement : {MAX_TRANSFER.toLocaleString("fr-FR")} DZD
              </span>
            </div>

            <div className="relative">
              <input
                type="number"
                required
                min={1}
                max={MAX_TRANSFER}
                onWheel={(e) => (e.target as HTMLInputElement).blur()} // 🚫 Désactive le scroll
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full border border-slate-200 rounded-2xl p-4 pr-16 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-semibold"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">DZD</span>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-2">Motif du virement (Optionnel)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Ajouter une note au destinataire..."
              className="w-full border border-slate-200 rounded-2xl p-4 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-blue-200 transition cursor-pointer text-base disabled:opacity-50"
          >
            <Send size={18} />
            <span>{loading ? "Traitement..." : "Valider le Virement"}</span>
          </button>
        </form>
      </div>
    </section>
  );
}
