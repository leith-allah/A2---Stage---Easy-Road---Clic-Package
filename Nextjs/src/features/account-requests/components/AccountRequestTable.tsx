
"use client";

import { useState } from "react";
import {
  Check,
  X,
  Clock,
  Search,
  User,
  Building2,
  Shield,
  MessageSquare,
  AlertCircle,
  AlertTriangle,
  Fingerprint,
  Calendar,
} from "lucide-react";

type Props = {
  demandes: any[];
};

export default function AccountRequestTable({ demandes }: Props) {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [listeDemandes, setListeDemandes] = useState<any[]>(demandes);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"ALL" | "EN_ATTENTE" | "ACCEPTEE" | "REFUSEE">("ALL");

  const [confirmTarget, setConfirmTarget] = useState<{ type: "ACCEPT" | "REJECT"; item: any } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function executeAction() {
    if (!confirmTarget) return;

    const { type, item } = confirmTarget;
    const reqId = Number(item.id_demande_creation);

    setLoadingId(reqId);
    setConfirmTarget(null);

    const endpoint =
      type === "ACCEPT"
        ? `/api/account-requests/${reqId}/accept`
        : `/api/account-requests/${reqId}/reject`;

    try {
      const response = await fetch(endpoint, { method: "PATCH" });
      const resultat = await response.json();

      if (!response.ok) {
        setErrorMessage(resultat.message || "Une erreur est survenue");
        return;
      }

      setListeDemandes((prev) =>
        prev.map((demande) =>
          Number(demande.id_demande_creation) === reqId
            ? { ...demande, statut_demande_creation: type === "ACCEPT" ? "ACCEPTEE" : "REFUSEE" }
            : demande
        )
      );
    } catch {
      setErrorMessage("Impossible de contacter le serveur.");
    } finally {
      setLoadingId(null);
    }
  }

  // Filtrage
  const filteredDemandes = listeDemandes.filter((item) => {
    const fullName = `${item.prenom_user || ""} ${item.nom_user || ""}`.toLowerCase();
    const email = (item.email_user || "").toLowerCase();
    const nin = (item.nin_user || "").toLowerCase();
    const bureau = (item.bureau_agence?.ville_bureau || item.bureau_agence?.nom_bureau || "").toLowerCase();
    const query = search.toLowerCase();

    const matchesSearch =
      fullName.includes(query) ||
      email.includes(query) ||
      nin.includes(query) ||
      bureau.includes(query);

    if (!matchesSearch) return false;

    if (activeTab !== "ALL") {
      return item.statut_demande_creation === activeTab;
    }

    return true;
  });

  const countPending = listeDemandes.filter((d) => d.statut_demande_creation === "EN_ATTENTE").length;
  const countAccepted = listeDemandes.filter((d) => d.statut_demande_creation === "ACCEPTEE").length;
  const countRejected = listeDemandes.filter((d) => d.statut_demande_creation === "REFUSEE").length;

  const formatDate = (dateVal?: string) => {
    if (!dateVal) return "-";
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return dateVal;
    return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* 🔴 MODALE DE CONFIRMATION */}
      {confirmTarget && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl border border-slate-100 text-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-inner ${
                confirmTarget.type === "ACCEPT"
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-rose-100 text-rose-600"
              }`}
            >
              {confirmTarget.type === "ACCEPT" ? <Check size={32} /> : <AlertTriangle size={32} />}
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-800">
                {confirmTarget.type === "ACCEPT" ? "Accepter la demande ?" : "Refuser la demande ?"}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {confirmTarget.type === "ACCEPT" ? (
                  <>
                    Le compte sera créé pour{" "}
                    <strong className="text-slate-800">
                      {confirmTarget.item.prenom_user} {confirmTarget.item.nom_user}
                    </strong>{" "}
                    et un portefeuille avec solde nul sera automatiquement initialisé.
                  </>
                ) : (
                  <>
                    Vous êtes sur le point de rejeter la demande de{" "}
                    <strong className="text-slate-800">
                      {confirmTarget.item.prenom_user} {confirmTarget.item.nom_user}
                    </strong>.
                  </>
                )}
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmTarget(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl transition text-sm cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={executeAction}
                className={`flex-1 text-white font-bold py-3 px-4 rounded-xl transition shadow-md text-sm cursor-pointer ${
                  confirmTarget.type === "ACCEPT"
                    ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200"
                    : "bg-rose-600 hover:bg-rose-700 shadow-rose-200"
                }`}
              >
                {confirmTarget.type === "ACCEPT" ? "Confirmer l'accès" : "Confirmer le refus"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ⚠️ MODALE D'ERREUR */}
      {errorMessage && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl border border-slate-100 text-center">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <AlertCircle size={32} />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-800">Erreur lors du traitement</h3>
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

      {/* FILTRES & BARRE DE RECHERCHE */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto">
          <button
            onClick={() => setActiveTab("ALL")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === "ALL" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Toutes ({listeDemandes.length})
          </button>
          <button
            onClick={() => setActiveTab("EN_ATTENTE")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === "EN_ATTENTE" ? "bg-amber-500 text-white shadow-sm" : "text-amber-700 hover:bg-amber-50"
            }`}
          >
            <Clock size={14} />
            En attente ({countPending})
          </button>
          <button
            onClick={() => setActiveTab("ACCEPTEE")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === "ACCEPTEE" ? "bg-emerald-600 text-white shadow-sm" : "text-emerald-700 hover:bg-emerald-50"
            }`}
          >
            Acceptées ({countAccepted})
          </button>
          <button
            onClick={() => setActiveTab("REFUSEE")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === "REFUSEE" ? "bg-rose-600 text-white shadow-sm" : "text-rose-700 hover:bg-rose-50"
            }`}
          >
            Refusées ({countRejected})
          </button>
        </div>

        <div className="relative md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Rechercher nom, email, NIN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
          />
        </div>
      </div>

      {/* TABLEAU DES DEMANDES */}
      {filteredDemandes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 space-y-3">
          <AlertCircle className="mx-auto text-slate-300" size={40} />
          <p className="font-bold text-slate-800 text-base">Aucune demande trouvée</p>
          <p className="text-xs">Aucun enregistrement ne correspond à vos critères.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredDemandes.map((demande) => {
            const reqId = Number(demande.id_demande_creation);
            const isPending = demande.statut_demande_creation === "EN_ATTENTE";
            const isAccepted = demande.statut_demande_creation === "ACCEPTEE";
            const isRejected = demande.statut_demande_creation === "REFUSEE";
            const isBusy = loadingId === reqId;

            return (
              <div
                key={reqId}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* IDENTITÉ DU DEMANDEUR */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 font-bold text-lg">
                    <User size={24} />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-bold text-slate-900 text-lg">
                        {demande.prenom_user} {demande.nom_user}
                      </h3>

                      {isPending && (
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 font-bold text-xs px-3 py-1 rounded-full border border-amber-200">
                          <Clock size={12} /> En attente
                        </span>
                      )}
                      {isAccepted && (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 font-bold text-xs px-3 py-1 rounded-full border border-emerald-200">
                          <Check size={12} /> Acceptée
                        </span>
                      )}
                      {isRejected && (
                        <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 font-bold text-xs px-3 py-1 rounded-full border border-rose-200">
                          <X size={12} /> Refusée
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 font-medium">
                      {demande.email_user}
                    </p>

<div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap pt-1">
                      <span className="flex items-center gap-1">
                        <Fingerprint size={13} className="text-blue-600" />
                        NIN : <strong className="font-mono text-slate-700">{demande.nin_user || "-"}</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <Shield size={13} className="text-blue-600" />
                        Rôle : <strong className="text-slate-700">{demande.role?.nom_role || "-"}</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <Building2 size={13} className="text-blue-600" />
                        Bureau : <strong className="text-slate-700">{demande.bureau_agence?.ville_bureau || "-"}</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={13} className="text-blue-600" />
                        Né(e) le : <strong className="text-slate-700">{formatDate(demande.ddn_user)}</strong>
                      </span>
                    </div>

                    {/* 🗓️ AFFICHAGE DES DATES DE CRÉATION ET DE TRAITEMENT */}
                    <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                      <span className="text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                        🗓️ <strong>Demandé le :</strong> {formatDate(demande.date_heure_demande)}
                      </span>

                      {!isPending && demande.date_traitement && (
                        <span
                          className={`px-2.5 py-1 rounded-lg border font-semibold ${
                            isAccepted
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-rose-50 text-rose-700 border-rose-200"
                          }`}
                        >
                          ⚡ <strong>{isAccepted ? "Accepté le :" : "Refusé le :"}</strong>{" "}
                          {formatDate(demande.date_traitement)}
                        </span>
                      )}
                    </div>

                    {demande.commentaire_demande && (
                      <div className="mt-2 text-xs bg-slate-50 text-slate-600 p-2.5 rounded-xl border border-slate-100 flex items-start gap-2 max-w-lg">
                        <MessageSquare size={14} className="text-slate-400 shrink-0 mt-0.5" />
                        <span>{demande.commentaire_demande}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* BOUTONS D'ACTION */}
                <div className="flex items-center justify-end gap-2 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
                  {isPending ? (
                    <>
                      <button
                        onClick={() => setConfirmTarget({ type: "ACCEPT", item: demande })}
                        disabled={isBusy}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-emerald-200 transition cursor-pointer disabled:opacity-50"
                      >
                        <Check size={16} />
                        <span>{isBusy ? "Traitement..." : "Accepter"}</span>
                      </button>

                      <button
                        onClick={() => setConfirmTarget({ type: "REJECT", item: demande })}
                        disabled={isBusy}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl border border-rose-200 transition cursor-pointer disabled:opacity-50"
                      >
                        <X size={16} />
                        <span>Refuser</span>
                      </button>
                    </>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400 italic">
                      Demande {isAccepted ? "approuvée" : "rejetée"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
