
"use client";

import { useEffect, useState } from "react";
import FormSection from "@/components/packages/create/ui/FormSection";
import FormInput from "@/components/packages/create/ui/FormInput";
import FormDate from "@/components/packages/create/ui/FormDate";
import FormSelect from "@/components/packages/create/ui/FormSelect";
import FormTextarea from "@/components/packages/create/ui/FormTextarea";
import { createAccountRequestSchema } from "@/server/validations/account-request/create-account-request.validation";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nom_user: "",
    prenom_user: "",
    ddn_user: "",
    nat_user: "Algérienne",
    nin_user: "",
    email_user: "",
    mdp_user: "",
    id_role: 5,
    id_agence: "",
    id_bureau: "",
    commentaire_demande: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agencies, setAgencies] = useState<any[]>([]);
  const [availableBureaux, setAvailableBureaux] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAgencies() {
      try {
        const res = await fetch("/api/agencies/public");
        if (res.ok) {
          const json = await res.json();
          setAgencies(json.data || []);
        }
      } catch (err) {
        console.error("Erreur chargement agences:", err);
      }
    }
    fetchAgencies();
  }, []);

  const handleAgencyChange = (agenceIdStr: string) => {
    const agenceId = Number(agenceIdStr);
    setFormData((prev) => ({
      ...prev,
      id_agence: agenceIdStr,
      id_bureau: "",
    }));

    const selectedAgency = agencies.find((a) => Number(a.id_agence) === agenceId);
    if (selectedAgency && selectedAgency.bureau_agence) {
      setAvailableBureaux(selectedAgency.bureau_agence);
    } else {
      setAvailableBureaux([]);
    }

    if (touched.id_bureau) {
      validateField("id_bureau", "");
    }
  };

  const validateField = (name: string, value: any) => {
    const updatedData = { ...formData, [name]: value };
    const result = createAccountRequestSchema.safeParse(updatedData);

    if (result.success) {
      setErrors((prev) => {
        const newErr = { ...prev };
        delete newErr[name];
        return newErr;
      });
    } else {
      const issue = result.error.issues.find((i) => i.path[0] === name);
      if (issue) {
        setErrors((prev) => ({ ...prev, [name]: issue.message }));
      } else {
        setErrors((prev) => {
          const newErr = { ...prev };
          delete newErr[name];
          return newErr;
        });
      }
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field as keyof typeof formData]);
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const allTouched: Record<string, boolean> = {};
    Object.keys(formData).forEach((key) => (allTouched[key] = true));
    setTouched(allTouched);

    const result = createAccountRequestSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          formattedErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(formattedErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/account-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          id_bureau: Number(formData.id_bureau),
          id_role: Number(formData.id_role),
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Erreur lors de l'envoi de la demande");
      }

      setSuccess(true);
    } catch (err: any) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-10 shadow-xl border border-slate-100 text-center space-y-5 animate-in fade-in">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">Demande Transmise !</h2>
        <p className="text-slate-600 leading-relaxed text-sm">
          Votre demande de création de compte a été soumise avec succès.
          Un administrateur examinera votre dossier et vous recevrez un accès dès validation.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-2xl transition shadow-lg text-sm cursor-pointer"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
      {serverError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium">
          <AlertCircle size={20} className="shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      {/* SECTION 1 : ÉTAT CIVIL */}
      <FormSection
        title="1. Etat Civil & Identité"
        description="Renseignez vos informations personnelles officielles."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Nom"
            required
            value={formData.nom_user}
            onChange={(val) => handleChange("nom_user", val)}
            onBlur={() => handleBlur("nom_user")}
            error={touched.nom_user ? errors.nom_user : undefined}
            placeholder="Ex: Benali"
          />

          <FormInput
            label="Prénom"
            required
            value={formData.prenom_user}
            onChange={(val) => handleChange("prenom_user", val)}
            onBlur={() => handleBlur("prenom_user")}
            error={touched.prenom_user ? errors.prenom_user : undefined}
            placeholder="Ex: Sofiane"
          />

          <FormDate
            label="Date de Naissance"
            required
            value={formData.ddn_user}
            onChange={(val) => handleChange("ddn_user", val)}
            error={touched.ddn_user ? errors.ddn_user : undefined}
          />

          <FormInput
            label="Nationalité"
            required
            value={formData.nat_user}
            onChange={(val) => handleChange("nat_user", val)}
            onBlur={() => handleBlur("nat_user")}
            error={touched.nat_user ? errors.nat_user : undefined}
            placeholder="Ex: Algérienne"
          />

          <div className="md:col-span-2 space-y-1">
            <div className="flex justify-between items-center">
              {/* Label standard */}
            </div>

            <FormInput
              label="Numéro d'Identification Nationale (NIN)"
              required
              value={formData.nin_user}
              onChange={(val) => {
                // 1. On ne garde que les chiffres et on limite à 18
                const cleanVal = val.replace(/\D/g, "").slice(0, 18);
                handleChange("nin_user", cleanVal);
              }}
              onBlur={() => handleBlur("nin_user")}
              error={
                touched.nin_user
                  ? formData.nin_user.length > 0 && formData.nin_user.length < 18
                    ? `Le NIN est incomplet (${formData.nin_user.length}/18 chiffres). Il doit en contenir exactement 18.`
                    : errors.nin_user
                  : undefined
              }
              placeholder="Ex: 102938475610293847"
              maxLength={18}
            />

            {/* 📊 PETIT COMPTEUR VISUEL SOUS LE CHAMP (Gris si vide/complet, Rouge si incomplet) */}
            {formData.nin_user.length > 0 && (
              <div className="flex justify-end pt-1">
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                    formData.nin_user.length === 18
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                      : "bg-rose-50 text-rose-600 border border-rose-200"
                  }`}
                >
                  {formData.nin_user.length} / 18 chiffres
                </span>
              </div>
            )}
          </div>
        </div>
      </FormSection>

      {/* SECTION 2 : IDENTIFIANTS */}
      <FormSection
        title="2. Identifiants & Connexion"
        description="Ces accès vous permettront de vous connecter à la plateforme."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            type="email"
            label="Email Professionnel"
            required
            value={formData.email_user}
            onChange={(val) => handleChange("email_user", val)}
            onBlur={() => handleBlur("email_user")}
            error={touched.email_user ? errors.email_user : undefined}
            placeholder="exemple@agence.com"
          />

          <FormInput
            type="password"
            label="Mot de passe"
            required
            value={formData.mdp_user}
            onChange={(val) => handleChange("mdp_user", val)}
            onBlur={() => handleBlur("mdp_user")}
            error={touched.mdp_user ? errors.mdp_user : undefined}
            placeholder="Min 8 car., 1 majuscule, 1 chiffre"
          />
        </div>
      </FormSection>

      {/* SECTION 3 : AGENCE ET BUREAU D'AGENCE */}
      <FormSection
        title="3. Agence & Bureau de Rattachement"
        description="Sélectionnez votre agence puis le bureau régional dans lequel vous travaillez."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormSelect
            label="Agence Partner"
            required
            value={formData.id_agence}
            onChange={handleAgencyChange}
            options={[
              { value: "", label: "-- Sélectionnez une agence --" },
              ...agencies.map((ag) => ({
                value: String(ag.id_agence),
                label: ag.nom_agence,
              })),
            ]}
            error={touched.id_agence ? errors.id_agence : undefined}
          />

          <FormSelect
            label="Bureau d'Agence"
            required
            value={formData.id_bureau}
            onChange={(val) => handleChange("id_bureau", val)}
            options={
              !formData.id_agence
                ? [{ value: "", label: "⚠️ Choisissez d'abord une agence" }]
                : availableBureaux.length === 0
                ? [{ value: "", label: "Aucun bureau trouvé pour cette agence" }]
                : [
                    { value: "", label: "-- Sélectionnez le bureau --" },
                    ...availableBureaux.map((b) => ({
                      value: String(b.id_bureau),
                      label: `${b.ville_bureau} - ${b.adresse_bureau} (${b.type_bureau})`,
                    })),
                  ]
            }
            error={touched.id_bureau ? errors.id_bureau : undefined}
          />

          <div className="md:col-span-2">
            <FormTextarea
              label="Commentaire / Remarques (Optionnel)"
              value={formData.commentaire_demande}
              onChange={(val) => handleChange("commentaire_demande", val)}
              placeholder="Précisez tout détail utile concernant votre demande d'accès..."
              rows={3}
            />
          </div>
        </div>
      </FormSection>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl shadow-xl hover:shadow-blue-200 transition duration-200 cursor-pointer text-base disabled:opacity-50"
        >
          <Send size={18} />
          <span>{loading ? "Envoi en cours..." : "Envoyer la Demande de Compte"}</span>
        </button>
      </div>
    </form>
  );
}
