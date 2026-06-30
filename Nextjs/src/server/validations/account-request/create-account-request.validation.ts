
import { z } from "zod";

export const createAccountRequestSchema = z.object({

  nom_user: z.string().min(2),

  prenom_user: z.string().min(2),

  ddn_user: z.string(),

  nat_user: z.string(),

  nin_user: z.string(),

  email_user: z.string().email(),

  mdp_user: z.string().min(8),

  role_demande: z.string(),

  commentaire_demande: z.string().optional(),

});
