
"use client";

import { useState } from "react";

import {
  createAccountRequest,
} from "@/features/auth/services/auth.service";

export default function RegisterForm() {

  const [form, setForm] = useState({

    nin: "",

    FIRSTName: "",

    lastName: "",

    birthDate: "",

    nationality: "",

    email: "",

    password: "",

    accountType: "CLIENT",

    id_bureau: 1,

  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");



  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setLoading(true);

    setError("");

    setSuccess("");

    try {

      await createAccountRequest({

        nin_user: form.nin,

        nom_user: form.lastName,

        prenom_user: form.FIRSTName,

        ddn_user: form.birthDate,

        nat_user: form.nationality,

        email_user: form.email,

        mdp_user: form.password,

        commentaire_demande: null,

        id_bureau: form.id_bureau,

        id_role:
          form.accountType === "CLIENT"
            ? 5
            : 3,

      });

      setSuccess(

        "Votre demande de création de compte a été envoyée. Un administrateur la validera prochainement."

      );

    } catch (err: any) {

      setError(

        err.message ??

        "Une erreur est survenue."

      );

    } finally {

      setLoading(false);

    }

  }



  return (

    <div
      className="
        w-full
        max-w-2xl
        bg-white
        rounded-2xl
        shadow-xl
        p-10
      "
    >

      <h1
        className="
          text-4xl
          font-bold
          text-blue-600
          mb-8
        "
      >

        Demande de création de compte

      </h1>

      <form
        onSubmit={handleSubmit}
        className="
          grid
          md:grid-cols-2
          gap-5
        "
      >

        <input
          placeholder="NIN"
          value={form.nin}
          onChange={(e) =>
            setForm({
              ...form,
              nin: e.target.value,
            })
          }
        />

        <input
          placeholder="Prénom"
          value={form.FIRSTName}
          onChange={(e) =>
            setForm({
              ...form,
              FIRSTName: e.target.value,
            })
          }
        />

        <input
          placeholder="Nom"
          value={form.lastName}
          onChange={(e) =>
            setForm({
              ...form,
              lastName: e.target.value,
            })
          }
        />

        <input
          type="date"
          value={form.birthDate}
          onChange={(e) =>
            setForm({
              ...form,
              birthDate: e.target.value,
            })
          }
        />

        <input
          placeholder="Nationalité"
          value={form.nationality}
          onChange={(e) =>
            setForm({
              ...form,
              nationality: e.target.value,
            })
          }
        />

        <input
          className="md:col-span-2"
          placeholder="Adresse email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          className="md:col-span-2"
          type="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <div className="md:col-span-2">

          <label
            className="
              block
              mb-2
              font-semibold
            "
          >

            Type de compte

          </label>

          <select

            value={form.accountType}

            onChange={(e) =>
              setForm({
                ...form,
                accountType: e.target.value,
              })
            }

            className="
              w-full
              border
              rounded-lg
              p-3
            "

          >

            <option value="CLIENT">

              Client

            </option>

            <option value="ADMIN">

              Administrateur

            </option>

          </select>

        </div>

        <button

          type="submit"

          disabled={loading}

          className="
            md:col-span-2
            bg-blue-600
            text-white
            rounded-xl
            py-3
            font-semibold
            hover:bg-blue-700
            transition
          "

        >

          {loading

            ? "Envoi..."

            : "Envoyer la demande"}

        </button>

      </form>

      {error && (

        <p
          className="
            mt-5
            text-red-500
          "
        >

          {error}

        </p>

      )}

      {success && (

        <p
          className="
            mt-5
            text-green-600
          "
        >

          {success}

        </p>

      )}

    </div>

  );

}
