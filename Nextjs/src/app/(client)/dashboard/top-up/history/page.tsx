
"use client";

import { useEffect, useState } from "react";
import BackButton from "@/components/navigation/BackButton";
import { getMyRechargeRequests } from "@/features/recharge-requests/services/recharge-request.service";
import { Clock, Check, X, Wallet, MessageSquare, AlertCircle } from "lucide-react";

export default function RechargeHistoryPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getMyRechargeRequests();
        setRequests(data || []);
      } catch (err) {
        console.error("Erreur chargement demandes :", err);
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

  return (
    <section className="min-h-screen bg-slate-50/50 py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <BackButton href="/dashboard/top-up" />
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Wallet className="text-blue-600" size={24} />
            Historique des Rechargements
          </h1>
        </div>

        {loading ? (
          <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-100">
            <p className="text-sm">Chargement de votre historique...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center text-slate-500 border border-slate-100 space-y-2">
            <AlertCircle className="mx-auto text-slate-300" size={36} />
            <p className="font-bold text-slate-800">Aucune demande soumise</p>
            <p className="text-xs">Vous n'avez pas encore effectué de demande de rechargement.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {requests.map((req) => {
              const status = req.statut_demande_recharge || req.status || "PENDING";
              const isPending = status === "PENDING" || status === "EN_ATTENTE";
              const isApproved = status === "APPROVED" || status === "VALIDE" || status === "ACCORDE";

              return (
                <div
                  key={req.id_demande_recharge || req.id}
                  className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <strong className="text-xl font-bold text-slate-900">
                        {Number(req.montant_demande_recharge || req.amount || 0).toLocaleString("fr-FR")} DZD
                      </strong>

                      {isPending && (
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 font-bold text-xs px-3 py-1 rounded-full border border-amber-200">
                          <Clock size={12} /> En attente
                        </span>
                      )}
                      {isApproved && (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 font-bold text-xs px-3 py-1 rounded-full border border-emerald-200">
                          <Check size={12} /> Crédité
                        </span>
                      )}
                      {!isPending && !isApproved && (
                        <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 font-bold text-xs px-3 py-1 rounded-full border border-rose-200">
                          <X size={12} /> Refusé
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-400">
                      🗓️ Demandé le : {formatDate(req.date_heure_demande_recharge || req.createdAt)}
                    </p>

                    {(req.comment_demande_recharge || req.comment) && (
                      <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-xl flex items-center gap-1.5 mt-1 border border-slate-100">
                        <MessageSquare size={13} className="text-slate-400 shrink-0" />
                        <span>{req.comment_demande_recharge || req.comment}</span>
                      </p>
                    )}
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
