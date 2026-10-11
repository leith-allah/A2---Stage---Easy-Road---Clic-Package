
"use client";

import { useEffect, useState } from "react";
import { Building2, MapPin, CheckCircle2, RefreshCw } from "lucide-react";

export default function AgencyCard() {
  const [agencyData, setAgencyData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAgency() {
      try {
        const res = await fetch("/api/users/my-agency");
        if (res.ok) {
          const data = await res.json();
          setAgencyData(data.data || data);
        }
      } catch (err) {
        console.error("Erreur chargement agence :", err);
      } finally {
        setLoading(false);
      }
    }
    loadAgency();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-md p-8 text-center text-slate-400">
        <RefreshCw className="animate-spin mx-auto mb-2 text-blue-600" size={24} />
        <p className="text-xs">Chargement des informations de l'agence...</p>
      </div>
    );
  }

  const agencyName = agencyData?.agency?.nom_agence || agencyData?.agency?.nom || "EasyRoad Agency";
  const officesList = agencyData?.offices || [];

  return (
    <div className="bg-white rounded-3xl shadow-md p-8 space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 border-b pb-4 flex items-center gap-2">
        <Building2 className="text-blue-600" size={24} />
        Agence & Rattachement
      </h2>

      <div className="grid md:grid-cols-3 gap-4 text-sm">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
          <span className="text-xs text-slate-400 font-bold uppercase block">Raison Sociale</span>
          <strong className="text-slate-800 text-base">{agencyName}</strong>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
          <span className="text-xs text-slate-400 font-bold uppercase block">Statut Réseau</span>
          <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
            <CheckCircle2 size={16} /> Compte Agréé
          </span>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
          <span className="text-xs text-slate-400 font-bold uppercase block">Bureaux Rattachés</span>
          <strong className="text-slate-800 text-base">{officesList.length || 1} Bureau(x)</strong>
        </div>
      </div>

      {officesList.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="font-bold text-slate-800 text-sm">Bureaux Régionaux</h3>
          <div className="grid gap-2">
            {officesList.map((office: any, i: number) => (
              <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">
                  {office.nom_bureau || office.nom || `Bureau #${i+1}`}
                </span>
                <span className="text-slate-500 flex items-center gap-1">
                  <MapPin size={12} className="text-blue-600" />
                  {office.ville_bureau || office.adresse_bureau || "Alger"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
