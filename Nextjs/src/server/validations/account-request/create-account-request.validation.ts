
import { z } from "zod";

export const createAccountRequestSchema = z.object({
  nom_user: z
    .string({ message: "Le nom est obligatoire" })
    .min(2, "Le nom doit contenir au moins 2 caractères"),

  prenom_user: z
    .string({ message: "Le prénom est obligatoire" })
    .min(2, "Le prénom doit contenir au moins 2 caractères"),

  ddn_user: z
    .string({ message: "La date de naissance est obligatoire" })
    .min(1, "La date de naissance est obligatoire")
    .refine((val) => {
      const date = new Date(val);
      if (isNaN(date.getTime())) return false;
      const today = new Date();
      let age = today.getFullYear() - date.getFullYear();
      const monthDiff = today.getMonth() - date.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
        age--;
      }
      return age >= 18;
    }, "L'utilisateur doit être majeur (au moins 18 ans)"),

  nat_user: z
    .string({ message: "La nationalité est obligatoire" })
    .min(2, "La nationalité est obligatoire"),

  nin_user: z
    .string({ message: "Le NIN est obligatoire" })
    .min(1, "Le NIN est obligatoire")
    .regex(/^\d{18}$/, "Le NIN doit contenir exactement 18 chiffres"),

  email_user: z
    .string({ message: "L'adresse email est obligatoire" })
    .min(1, "L'adresse email est obligatoire")
    .email("Adresse email professionnelle invalide"),

  mdp_user: z
    .string({ message: "Le mot de passe est obligatoire" })
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[A-Z]/, "Au moins une lettre majuscule requise")
    .regex(/[a-z]/, "Au moins une lettre minuscule requise")
    .regex(/[0-9]/, "Au moins un chiffre requis"),

  id_agence: z
    .string({ message: "Veuillez sélectionner une agence" })
    .min(1, "Veuillez sélectionner une agence"),

  id_bureau: z.coerce
    .number({ message: "Veuillez sélectionner un bureau d'agence" })
    .min(1, "Veuillez sélectionner un bureau d'agence"),

  id_role: z.coerce.number().default(5), // Rôle Agent par défaut

  // 🟢 SEUL CHAMP OPTIONNEL
  commentaire_demande: z.string().optional().or(z.literal("")),
});
