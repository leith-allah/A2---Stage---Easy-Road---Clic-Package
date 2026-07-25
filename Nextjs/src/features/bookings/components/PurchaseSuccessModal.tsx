
"use client";

import { CheckCircle2 } from "lucide-react";

type SuccessModalProps = {
  isOpen: boolean;
  bookingId: number | string;
  onCloseAction: () => void;
};

export function PurchaseSuccessModal({ isOpen, bookingId, onCloseAction }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-5 shadow-2xl border border-slate-100">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 size={48} />
        </div>

        <div className="space-y-2">
          <h3 className="text-3xl font-extrabold text-slate-800">
            Voyage Réservé ! 🎉
          </h3>
          <p className="text-slate-600 text-sm">
            Votre réservation a été validée avec succès. Votre e-ticket et votre facture sont désormais disponibles.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <button
            onClick={() => {
              onCloseAction();
              window.location.href = `/dashboard/bookings/${bookingId}`;
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-2xl transition shadow-lg hover:shadow-blue-200 cursor-pointer text-sm"
          >
            Voir ma réservation & Télécharger le Voucher
          </button>
        </div>
      </div>
    </div>
  );
}
