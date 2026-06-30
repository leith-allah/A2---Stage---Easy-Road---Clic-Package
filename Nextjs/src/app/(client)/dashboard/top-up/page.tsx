
"use client";

import BackButton from "@/components/navigation/BackButton";

import { useState } from "react";

import { createRechargeRequest }
from "@/features/recharge-requests/services/recharge-request.service";


export default function TopUpPage() {

  const [amount, setAmount] =
    useState("");

  const [note, setNote] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");
  
  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      await createRechargeRequest(
        Number(amount),
        note
      );

      setSuccess(
        "Votre demande a été envoyée."
      );

      setAmount("");
      setNote("");

    } catch (error) {

      console.error(error);

      alert(
        "Erreur lors de l'envoi"
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6">
      <div
        className="
          max-w-2xl
          mx-auto
          bg-white
          rounded-3xl
          shadow-xl
          p-10
        "
      >     
        
        {/* Bouton Retour */}
        <div className="mb-6">
          <BackButton href="/dashboard/balance" />
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-600">
            Recharger mon solde
          </h1>

          <p className="text-gray-600 mt-3">
            Envoyez une demande de rechargement de
            portefeuille Clic Package.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label className="block mb-2 font-medium">
              Montant souhaité
            </label>

            <input
              type="number"
              value={amount}
              onChange={(e) =>
                setAmount(
                  e.target.value
                )
              }
              placeholder="0.00"
              className="
                w-full
                border
                rounded-2xl
                p-4
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Note
            </label>

            <textarea
              value={note}
              onChange={(e) =>
                setNote(
                  e.target.value
                )
              }
              rows={5}
              placeholder="Ajouter une note..."
              className="
                w-full
                border
                rounded-2xl
                p-4
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          {
            success && (

              <div
                className="
                  bg-green-100
                  text-green-700
                  p-4
                  rounded-xl
                "
              >
                {success}
              </div>

            )
          }

          <button
            disabled={loading}
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              transition
              text-white
              py-4
              rounded-full
              font-semibold
              shadow-lg
            "
          >
            {
              loading
                ? "Envoi..."
                : "Envoyer la demande"
            }
          </button>

          <div className="mt-6 text-center">

            <a

              href="/dashboard/top-up/history"

              className="
                text-blue-600
                font-medium
              "

            >
              Voir mes demandes
            </a>

          </div>
        </form>
      </div>
    </section>
  );
}
