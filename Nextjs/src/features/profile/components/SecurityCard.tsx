
"use client";

import { useState } from "react";
import { Lock, ShieldCheck, CheckCircle2, X } from "lucide-react";

export default function SecurityCard() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMsg("Les nouveaux mots de passe ne correspondent pas");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg(null);

      const res = await fetch("/api/users/me/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Erreur lors de la modification");
      }

      setSuccessMsg("Mot de passe modifié avec succès !");
      setIsPasswordModalOpen(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-md p-8 space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 border-b pb-4 flex items-center gap-2">
        <Lock className="text-blue-600" size={24} />
        Sécurité du Compte
      </h2>

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-2xl flex items-center gap-2 text-sm font-medium">
          <CheckCircle2 size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="space-y-6">
        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="space-y-1">
            <p className="font-bold text-slate-800 text-sm">Mot de passe</p>
            <p className="text-slate-500 text-xs">
              Modifiez votre mot de passe d'accès régulièrement.
            </p>
          </div>

          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="text-blue-600 hover:text-blue-700 font-bold text-xs bg-blue-50 hover:bg-blue-100 px-4 py-2.5 rounded-xl border border-blue-200 transition cursor-pointer"
          >
            Changer le mot de passe
          </button>
        </div>

        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="space-y-1">
            <p className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-emerald-600" />
              Double Authentification (2FA)
            </p>
            <p className="text-slate-500 text-xs">
              Protection renforcée via code de sécurité.
            </p>
          </div>

          <span className="text-xs font-bold text-slate-400 bg-slate-200/60 px-3 py-1.5 rounded-lg">
            Désactivée
          </span>
        </div>
      </div>

      {/* 🔐 MODALE CHANGEMENT DE MOT DE PASSE */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-xl font-bold text-slate-800">Changer de mot de passe</h3>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
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

            <form onSubmit={handleChangePassword} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Nouveau mot de passe (min 8 car.)
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Confirmer le nouveau mot de passe
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl transition cursor-pointer text-xs"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition shadow-md shadow-blue-200 cursor-pointer text-xs disabled:opacity-50"
                >
                  {loading ? "Modification..." : "Mettre à jour"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
