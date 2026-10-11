
"use client";

import { useState } from "react";
import { UserDto } from "@/server/dto/user/user.dto";
import { User, Edit3, LogOut, Trash2, CheckCircle2, AlertTriangle, X } from "lucide-react";

type Props = {
  user: UserDto;
};

export default function ProfileHeader({ user }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const initialFirstName = user.firstName || user.FIRSTName || "";
  const initialLastName = user.lastName || "";
  const initialEmail = user.email || "";
  const initialNationality = user.nationality || "";

  const [formData, setFormData] = useState({
    firstName: initialFirstName,
    lastName: initialLastName,
    email: initialEmail,
    nationality: initialNationality,
  });

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  async function handleUpdateProfile(e: React.FormEvent) {
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

      setSuccessMsg("Profil mis à jour avec succès !");
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

  async function handleDeleteAccount() {
    try {
      setLoading(true);
      await fetch("/api/profile/delete", { method: "PATCH" });
      await logout();
    } catch (err: any) {
      alert("Erreur lors de la suppression du compte");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-md p-8 relative space-y-6">
      {/* SUCCESS BANNER */}
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-2xl flex items-center gap-2 text-sm font-medium">
          <CheckCircle2 size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* AVATAR */}
        <div className="w-28 h-28 rounded-full bg-blue-100 border-4 border-blue-50 flex items-center justify-center text-4xl font-extrabold text-blue-600 shadow-inner shrink-0">
          {initialFirstName ? initialFirstName.charAt(0).toUpperCase() : <User size={40} />}
        </div>

        {/* INFOS */}
        <div className="flex-1 space-y-2 text-center md:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-center md:justify-start">
            <h1 className="text-3xl font-bold text-slate-900">
              {initialFirstName} {initialLastName}
            </h1>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200 self-center md:self-auto">
              {user.role}
            </span>
          </div>

          <div className="pt-3 flex flex-col gap-3 text-sm text-left">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase block">Email Professionnel</span>
              <strong className="text-slate-800 break-all">{user.email || "-"}</strong>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase block">Nationalité</span>
                <strong className="text-slate-800">{user.nationality || "-"}</strong>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase block">Matricule</span>
                <strong className="text-slate-800 font-mono">{user.mle || "-"}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* BOUTONS D'ACTION */}
        <div className="flex flex-col gap-3 w-full md:w-auto">
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-2xl transition shadow-md hover:shadow-blue-200 cursor-pointer text-sm"
          >
            <Edit3 size={16} />
            <span>Modifier mon profil</span>
          </button>

          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold px-6 py-3 rounded-2xl transition cursor-pointer text-sm"
          >
            <LogOut size={16} />
            <span>Déconnexion</span>
          </button>

          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex items-center justify-center gap-2 text-rose-500 hover:text-rose-700 font-medium text-xs pt-1 cursor-pointer"
          >
            <Trash2 size={14} />
            <span>Supprimer mon compte</span>
          </button>
        </div>
      </div>

      {/* ✏️ MODALE D'ÉDITION DE PROFIL */}
      {isEditing && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-xl font-bold text-slate-800">Modifier mes informations</h3>
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

            <form onSubmit={handleUpdateProfile} className="space-y-4 text-sm">
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
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl transition cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition shadow-md shadow-blue-200 cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🔴 MODALE CONFIRMATION SUPPRESSION COMPTE */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl border border-slate-100 text-center">
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle size={32} />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-800">Supprimer mon compte ?</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Cette action désactivera définitivement votre accès. Vous serez immédiatement déconnecté.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl transition text-sm cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={loading}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-4 rounded-xl transition shadow-md shadow-rose-200 text-sm cursor-pointer disabled:opacity-50"
              >
                {loading ? "Suppression..." : "Confirmer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
