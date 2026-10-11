
"use client";

import { useState } from "react";
import { UserDto } from "@/server/dto/user/user.dto";
import {
  User,
  Fingerprint,
  Calendar,
  Globe,
  Mail,
  ShieldAlert,
  Edit3,
  CheckCircle2,
  X,
} from "lucide-react";

type Props = {
  user: UserDto;
};

export default function PersonalCard({ user }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const initialFirstName = user.firstName || user.FIRSTName || "";
  const initialLastName = user.lastName || "";

  const [formData, setFormData] = useState({
    firstName: initialFirstName,
    lastName: initialLastName,
    email: user.email || "",
    nationality: user.nationality || "",
  });

  const formatDate = (dateVal?: Date | string) => {
    if (!dateVal) return "-";
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return String(dateVal);
    return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMsg(null);

      const res = await fetch("/api/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Erreur lors de la mise à jour");
      }

      setSuccessMsg("Informations personnelles mises à jour !");
      setIsEditing(false);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-md p-8 space-y-6">
      {/* HEADER CARTE */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <User className="text-blue-600" size={24} />
            Informations Personnelles
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Vos données d'état civil enregistrées sur votre compte.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-blue-200 transition cursor-pointer"
        >
          <Edit3 size={16} />
          <span>Modifier mes infos</span>
        </button>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-2xl flex items-center gap-2 text-sm font-medium">
          <CheckCircle2 size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      {/* GRILLE DES INFOS CIVILES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
          <span className="text-xs text-slate-400 font-bold uppercase flex items-center gap-1.5">
            <User size={14} className="text-blue-600" /> Nom & Prénom
          </span>
          <strong className="text-slate-800 text-base block pt-0.5">
            {initialFirstName} {initialLastName}
          </strong>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
          <span className="text-xs text-slate-400 font-bold uppercase flex items-center gap-1.5">
            <Fingerprint size={14} className="text-blue-600" /> NIN (N° Identification Nationale)
          </span>
          <strong className="text-slate-800 font-mono text-base block pt-0.5">
            {user.nin || "-"}
          </strong>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
          <span className="text-xs text-slate-400 font-bold uppercase flex items-center gap-1.5">
            <Calendar size={14} className="text-blue-600" /> Date de Naissance
          </span>
          <strong className="text-slate-800 text-base block pt-0.5">
            {formatDate(user.birthDate)}
          </strong>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
          <span className="text-xs text-slate-400 font-bold uppercase flex items-center gap-1.5">
            <Globe size={14} className="text-blue-600" /> Nationalité
          </span>
          <strong className="text-slate-800 text-base block pt-0.5">
            {user.nationality || "-"}
          </strong>
        </div>

        {/* ✉️ EMAIL PROFESSIONNEL EN LIGNE SEULE (col-span-2) */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1 md:col-span-2">
          <span className="text-xs text-slate-400 font-bold uppercase flex items-center gap-1.5">
            <Mail size={14} className="text-blue-600" /> Email Professionnel
          </span>
          <strong className="text-slate-800 text-base block pt-0.5 break-all">
            {user.email || "-"}
          </strong>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1 md:col-span-2">
          <span className="text-xs text-slate-400 font-bold uppercase flex items-center gap-1.5">
            <ShieldAlert size={14} className="text-blue-600" /> Matricule Agent / Agent Code
          </span>
          <strong className="text-slate-800 font-mono text-base block pt-0.5">
            {user.mle || "-"}
          </strong>
        </div>
      </div>

      {/* ✏️ MODALE DE MODIFICATION */}
      {isEditing && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-xl font-bold text-slate-800">
                Modifier mes informations personnelles
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {errorMsg && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3.5 rounded-xl text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Prénom</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Nom</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Email Professionnel</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Nationalité</label>
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl transition cursor-pointer text-xs"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition shadow-md shadow-blue-200 cursor-pointer text-xs disabled:opacity-50"
                >
                  {loading ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
