
"use client";

import { useEffect, useState } from "react";
import {
  getAllRechargeRequests,
  approveRechargeRequest,
  rejectRechargeRequest,
} from "@/features/recharge-requests/services/admin-recharge-request.service";
import {
  Check,
  X,
  Clock,
  Search,
  Wallet,
  User,
  MessageSquare,
  RefreshCw,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";

export default function RechargeRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"ALL" | "PENDING" | "APPROVED" | "REJECTED">("ALL");
  const [search, setSearch] = useState("");

  // 🌟 ÉTATS POUR LES MODALES SANS NATIVE ALERT/CONFIRM
  const [rejectTarget, setRejectTarget] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      const data = await getAllRechargeRequests();
      setRequests(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des demandes :", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // Traducteur d'erreurs techniques vers un français clair
  const getFriendlyErrorMessage = (rawError: string): string => {
    const err = rawError.toLowerCase();

    if (err.includes("business wallet balance insufficient") || err.includes("solde insuffisant")) {
      return "Le solde du portefeuille entreprise (BUSINESS) est insuffisant pour créditer ce montant.";
    }
    if (err.includes("limit") || err.includes("plein") || err.includes("dépassera")) {
      return "Action impossible : le portefeuille du client a atteint son plafond maximum autorisé.";
    }
    if (err.includes("client wallet not found") || err.includes("portefeuille introuvable")) {
      return "Le portefeuille associé à ce client est introuvable.";
    }
    if (err.includes("already processed") || err.includes("déjà")) {
      return "Cette demande de rechargement a déjà été traitée.";
    }

    return rawError || "Une erreur est survenue lors du traitement de la demande.";
  };

  async function handleApprove(id: number) {
    try {
      setProcessingId(id);
      await approveRechargeRequest(id);
      await load();
    } catch (error: any) {
      setErrorMessage(getFriendlyErrorMessage(error.message));
    } finally {
      setProcessingId(null);
    }
  }

  async function confirmReject() {
    if (!rejectTarget) return;

    const id = Number(rejectTarget.id_demande_recharge);
    try {
      setProcessingId(id);
      await rejectRechargeRequest(id);
      setRejectTarget(null);
      await load();
    } catch (error: any) {
      setRejectTarget(null);
      setErrorMessage(getFriendlyErrorMessage(error.message));
    } finally {
      setProcessingId(null);
    }
  }

  // Helpers de statut
  const isPending = (status: string) => status === "PENDING" || status === "EN_ATTENTE";
  const isApproved = (status: string) => status === "APPROVED" || status === "VALIDE" || status === "ACCORDE";
  const isRejected = (status: string) => status === "REJECTED" || status === "REFUSE";

  // Filtrage
  const filteredRequests = requests.filter((req) => {
    const status = req.statut_demande_recharge || "";
    const user = req.utilisateur || {};
    const clientName = `${user.prenom_user || user.prenom || ""} ${user.nom_user || user.nom || ""}`.toLowerCase();
    const clientEmail = (user.email_user || user.email || "").toLowerCase();
    const comment = (req.comment_demande_recharge || "").toLowerCase();
    const query = search.toLowerCase();

    const matchesSearch =
      clientName.includes(query) ||
      clientEmail.includes(query) ||
      comment.includes(query) ||
      String(req.montant_demande_recharge).includes(query);

    if (!matchesSearch) return false;

    if (activeTab === "PENDING") return isPending(status);
    if (activeTab === "APPROVED") return isApproved(status);
    if (activeTab === "REJECTED") return isRejected(status);

    return true;
  });

  const countPending = requests.filter((r) => isPending(r.statut_demande_recharge)).length;
  const countApproved = requests.filter((r) => isApproved(r.statut_demande_recharge)).length;
  const countRejected = requests.filter((r) => isRejected(r.statut_demande_recharge)).length;

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
    <section className="p-8 max-w-7xl mx-auto space-y-8 relative">
      {/* 🔴 MODALE DE CONFIRMATION DE REFUS */}
      {rejectTarget && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl border border-slate-100 text-center">
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle size={32} />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-800">
                Refuser la demande ?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Vous êtes sur le point de rejeter la demande de rechargement de{" "}
                <strong className="text-slate-800">
                  {Number(rejectTarget.montant_demande_recharge).toLocaleString("fr-FR")} DZD
                </strong>{" "}
                pour{" "}
                <strong className="text-slate-800">
                  {rejectTarget.utilisateur
                    ? `${rejectTarget.utilisateur.prenom_user || rejectTarget.utilisateur.prenom || ""} ${rejectTarget.utilisateur.nom_user || rejectTarget.utilisateur.nom || ""}`
                    : `Client #${rejectTarget.id_user}`}
                </strong>.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setRejectTarget(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl transition text-sm cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={confirmReject}
                disabled={processingId !== null}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-4 rounded-xl transition shadow-md shadow-rose-200 text-sm cursor-pointer disabled:opacity-50"
              >
                {processingId !== null ? "Refus..." : "Confirmer le refus"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ⚠️ MODALE D'ERREUR DYNAMIQUE */}
      {errorMessage && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl border border-slate-100 text-center">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <AlertCircle size={32} />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-800">
                Impossible de traiter la demande
              </h3>
              <p className="text-slate-600 text-sm bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200/80 text-left leading-relaxed">
                {errorMessage}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl transition shadow-lg text-sm cursor-pointer"
            >
              Compris
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <Wallet className="text-blue-600" size={32} />
            Demandes de Rechargement
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Gérez et validez les crédits des portefeuilles clients.
          </p>
        </div>

        <button
          onClick={load}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition shadow-sm self-start md:self-auto cursor-pointer"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          <span>Actualiser</span>
        </button>
      </div>

      {/* RECHERCHE ET ONGLETS */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto">
          <button
            onClick={() => setActiveTab("ALL")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === "ALL"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Toutes ({requests.length})
          </button>
          <button
            onClick={() => setActiveTab("PENDING")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === "PENDING"
                ? "bg-amber-500 text-white shadow-sm"
                : "text-amber-700 hover:bg-amber-50"
            }`}
          >
            <Clock size={14} />
            En attente ({countPending})
          </button>
          <button
            onClick={() => setActiveTab("APPROVED")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === "APPROVED"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-emerald-700 hover:bg-emerald-50"
            }`}
          >
            Valides ({countApproved})
          </button>
          <button
            onClick={() => setActiveTab("REJECTED")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === "REJECTED"
                ? "bg-rose-600 text-white shadow-sm"
                : "text-rose-700 hover:bg-rose-50"
            }`}
          >
            Refusées ({countRejected})
          </button>
        </div>

        <div className="relative md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Chercher client, montant..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
          />
        </div>
      </div>

      {/* LISTE DES DEMANDES */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 space-y-3">
          <RefreshCw className="animate-spin mx-auto text-blue-600" size={32} />
          <p className="font-medium text-sm">Chargement des demandes...</p>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 space-y-3">
          <AlertCircle className="mx-auto text-slate-300" size={40} />
          <p className="font-bold text-slate-800 text-base">Aucune demande trouvée</p>
          <p className="text-xs">Aucun rechargement ne correspond à vos critères.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredRequests.map((req) => {
            const reqId = Number(req.id_demande_recharge);
            const user = req.utilisateur;
            const clientName = user
              ? `${user.prenom_user || user.prenom || ""} ${user.nom_user || user.nom || ""}`.trim()
              : `Client #${req.id_user}`;
            const clientEmail = user?.email_user || user?.email || "-";
            const amount = Number(req.montant_demande_recharge || 0);
            const status = req.statut_demande_recharge || "PENDING";
            const isReqPending = isPending(status);
            const isReqApproved = isApproved(status);
            const isReqRejected = isRejected(status);
            const isBusy = processingId === reqId;

            return (
              <div
                key={reqId}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* BLOC CLIENT & MONTANT */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                    <User size={24} />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-bold text-slate-900 text-lg">
                        {clientName}
                      </h3>

                      {isReqPending && (
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 font-bold text-xs px-3 py-1 rounded-full border border-amber-200">
                          <Clock size={12} /> En attente
                        </span>
                      )}
                      {isReqApproved && (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 font-bold text-xs px-3 py-1 rounded-full border border-emerald-200">
                          <Check size={12} /> Validée
                        </span>
                      )}
                      {isReqRejected && (
                        <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 font-bold text-xs px-3 py-1 rounded-full border border-rose-200">
                          <X size={12} /> Refusée
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 font-medium">
                      {clientEmail} • ID Client : <span className="font-mono font-semibold">{String(req.id_user)}</span>
                    </p>

                    {/* 🗓️ AFFICHAGE DYNAMIQUE DES 2 DATES (DEMANDE ET VALIDATION/REFUS) */}
                    <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-500">
                      <span>
                        🗓️ <strong>Demandé le :</strong> {formatDate(req.date_heure_demande_recharge)}
                      </span>

                      {!isReqPending && (
                        <span
                          className={`px-2 py-0.5 rounded-md font-semibold ${
                            isReqApproved
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                        >
                          ⚡ <strong>{isReqApproved ? "Validé le :" : "Refusé le :"}</strong>{" "}
                          {formatDate(req.date_traitement || req.updatedAt || req.date_heure_demande_recharge)}
                        </span>
                      )}
                    </div>

                    {req.comment_demande_recharge && (
                      <div className="mt-2 text-xs bg-slate-50 text-slate-600 p-2.5 rounded-xl border border-slate-100 flex items-start gap-2 max-w-lg">
                        <MessageSquare size={14} className="text-slate-400 shrink-0 mt-0.5" />
                        <span>{req.comment_demande_recharge}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* BLOC PRIX ET ACTIONS */}
                <div className="flex flex-col sm:flex-row lg:flex-col sm:items-center lg:items-end justify-between gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
                  <div className="text-left lg:text-right">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
                      Montant Demandé
                    </span>
                    <strong className="text-2xl font-extrabold text-blue-600">
                      {amount.toLocaleString("fr-FR")} DZD
                    </strong>
                  </div>

                  {/* BOUTONS VALIDER / REFUSER */}
                  {isReqPending ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleApprove(reqId)}
                        disabled={isBusy}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-emerald-200 transition cursor-pointer disabled:opacity-50"
                      >
                        <Check size={16} />
                        <span>{isBusy ? "Validation..." : "Valider"}</span>
                      </button>

                      <button
                        onClick={() => setRejectTarget(req)}
                        disabled={isBusy}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl border border-rose-200 transition cursor-pointer disabled:opacity-50"
                      >
                        <X size={16} />
                        <span>Refuser</span>
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400 italic">
                      Demande déjà traitée
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
