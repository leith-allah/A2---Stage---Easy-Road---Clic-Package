
"use client";

import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import QRCode from "react-qr-code";
import { useAuthContext } from "@/providers/AuthProvider";
import { Plane, Hotel, Bus, Compass, ShieldCheck, Ticket } from "lucide-react";

type Props = {
  booking: any;
};

export default function InvoicePDF({ booking }: Props) {
  const { user } = useAuthContext();

  // Nom et prénom du client strictement issus de la BDD
  const clientName =
    booking.clientName ||
    (booking.user ? `${booking.user.prenom_user ?? booking.user.prenom ?? ''} ${booking.user.nom_user ?? booking.user.nom ?? ''}`.trim() : null) ||
    user?.email ||
    "-";

  const clientEmail = booking.clientEmail || booking.user?.email || user?.email || "-";

  const totalAmount = Number(booking.total ?? booking.montant_total ?? 0);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Options choisies à l'achat OU options par défaut du package BDD
  const flightClass =
    booking.flightClass ||
    booking.package?.defaultFlightClass ||
    booking.package?.default_flight_class_pack;

  const roomType =
    booking.roomType ||
    booking.package?.defaultRoomType ||
    booking.package?.default_room_type_pack;

  const boardType =
    booking.boardType ||
    booking.package?.defaultBoardType ||
    booking.package?.default_board_type_pack;

  const hasOptions = flightClass || roomType || boardType;

  const bookingRef = booking.bookingNumber || booking.mle_ach || String(booking.id);

  // 🎯 QR Code sous forme d'URL propre (zéro bug de caractères chinois sur mobile)
  const qrData = `https://easyroad.com/verify/booking/${bookingRef}`;

  const flightsList = booking.flights || [];
  const hotelsList = booking.hotels || [];
  const transportsList = booking.transports || [];
  const excursionsList = booking.excursions || [];

  const generatePDF = async () => {
    const input = document.getElementById("invoice-voucher-content");
    if (!input) return;

    await new Promise((resolve) => setTimeout(resolve, 300));

    const canvas = await html2canvas(input, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width || 297;

    pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
    pdf.save(`Voucher-EasyRoad-${bookingRef}.pdf`);
  };

  return (
    <>
      <button
        type="button"
        onClick={generatePDF}
        className="
          bg-blue-600
          hover:bg-blue-700
          transition
          text-white
          px-6
          py-3
          rounded-full
          font-semibold
          shadow-md
          hover:shadow-lg
          cursor-pointer
          flex items-center gap-2
        "
      >
        <Ticket size={18} />
        <span>Télécharger Voucher / Facture</span>
      </button>

      {/* DOCUMENT PDF MASQUÉ AVEC RENDU DESIGN A4 */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: "-99999px",
          width: "850px",
          zIndex: -1,
          background: "white",
        }}
      >
        <div
          id="invoice-voucher-content"
          style={{
            backgroundColor: "#ffffff",
            padding: "45px",
            width: "850px",
            color: "#0f172a",
            fontFamily: "Arial, sans-serif",
          }}
          className="space-y-6"
        >
          {/* HEADER AGENCE & VOUCHER */}
          <div className="flex justify-between items-start border-b-2 border-blue-600 pb-6">
            <div className="flex items-center gap-3">
              <img
                src="/logo.ico"
                alt="Logo EasyRoad"
                className="h-16 w-auto object-contain"
              />
            </div>

            <div className="text-right">
              <span className="inline-block bg-blue-50 text-blue-700 font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full border border-blue-200 mb-2">
                Voucher de Confirmation
              </span>
              <p className="font-mono font-bold text-lg text-slate-800">
                N° {bookingRef}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Émis le : {formatDate(booking.createdAt)}
              </p>
            </div>
          </div>

          {/* TITRE DU PACKAGE & INFOS CLIENT */}
          <div className="grid grid-cols-3 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div className="col-span-2 space-y-1">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Package Réservé
              </p>
              <h2 className="text-2xl font-bold text-slate-900">
                {booking.packageTitle || "Package Voyage"}
              </h2>
              <p className="text-sm font-medium text-slate-600">
                📍 Destination : {booking.destination || "-"}
              </p>
            </div>

            <div className="space-y-1 text-sm border-l border-slate-200 pl-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Titulaire de la réservation
              </p>
              <p className="font-bold text-slate-800">{clientName}</p>
              <p className="text-xs text-slate-500">{clientEmail}</p>
              <p className="text-xs font-semibold text-emerald-600 mt-1">
                ✓ Statut : {booking.status || "CONFIRMÉ"}
              </p>
            </div>
          </div>

          {/* FORMULE ET OPTIONS D'ACHAT DYNAMIQUES */}
          {hasOptions && (
            <div className="bg-blue-600 text-white p-4 rounded-2xl flex justify-between items-center text-sm shadow-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} />
                <span className="font-semibold">Formule choisie :</span>
              </div>
              <div className="flex gap-3 font-bold text-xs uppercase tracking-wide flex-wrap">
                {flightClass && (
                  <span className="bg-white/20 px-3 py-1 rounded-lg">
                    ✈️ Vol : {flightClass}
                  </span>
                )}
                {roomType && (
                  <span className="bg-white/20 px-3 py-1 rounded-lg">
                    🏨 Chambre : {roomType}
                  </span>
                )}
                {boardType && (
                  <span className="bg-white/20 px-3 py-1 rounded-lg">
                    🍽️ Pension : {boardType}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* DÉTAILS COMPLETS DU PACKAGE */}
          <div className="space-y-5 text-sm">
            <h3 className="font-bold text-slate-800 text-base border-b pb-2 flex items-center gap-2">
              <span>Prestations Incluses dans le Séjour</span>
            </h3>

            {/* VOLS */}
            {flightsList.length > 0 && (
              <div className="space-y-2">
                <p className="font-bold text-xs text-slate-500 uppercase flex items-center gap-1">
                  <Plane size={14} className="text-blue-600" /> Transport Aérien ({flightsList.length} Vol(s))
                </p>
                <div className="grid gap-2">
                  {flightsList.map((f: any, i: number) => (
                    <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex justify-between items-center text-xs">
                      <div>
                        <strong className="text-slate-800">Vol #{i+1} ({f.flightNumber || "-"})</strong> {f.airline && `— ${f.airline}`}
                        <p className="text-slate-500 mt-0.5">
                          {f.departureAirport || "-"} ➔ {f.arrivalAirport || "-"}
                        </p>
                      </div>
                      <div className="text-right text-slate-600 font-medium">
                        <p>Départ : {formatDate(f.departureDateTime)}</p>
                        <p>Arrivée : {formatDate(f.arrivalDateTime)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* HÔTELS */}
            {hotelsList.length > 0 && (
              <div className="space-y-2">
                <p className="font-bold text-xs text-slate-500 uppercase flex items-center gap-1">
                  <Hotel size={14} className="text-blue-600" /> Hébergement
                </p>
                <div className="grid gap-2">
                  {hotelsList.map((h: any, i: number) => (
                    <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs">
                      <strong className="text-slate-800">{h.name}</strong> {h.stars > 0 && `(${h.stars} ⭐)`}
                      <p className="text-slate-500">
                        📍 {[h.address, h.city, h.country].filter(Boolean).join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TRANSPORTS & EXCURSIONS */}
            <div className="grid grid-cols-2 gap-4">
              {transportsList.length > 0 && (
                <div className="space-y-2">
                  <p className="font-bold text-xs text-slate-500 uppercase flex items-center gap-1">
                    <Bus size={14} className="text-blue-600" /> Transports
                  </p>
                  {transportsList.map((t: any, i: number) => (
                    <div key={i} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-xs">
                      <strong>{t.route || "-"}</strong> {t.company && `(${t.company})`}
                    </div>
                  ))}
                </div>
              )}

              {excursionsList.length > 0 && (
                <div className="space-y-2">
                  <p className="font-bold text-xs text-slate-500 uppercase flex items-center gap-1">
                    <Compass size={14} className="text-blue-600" /> Excursions
                  </p>
                  {excursionsList.map((e: any, i: number) => (
                    <div key={i} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-xs">
                      <strong>{e.name || "-"}</strong> {e.location && `— 📍 ${e.location}`}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RÉCAPITULATIF FINANCIER */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Nombre de Voyageurs</span>
              <span className="font-bold text-slate-800">{booking.travelers || 1} PAX</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Dates de Séjour</span>
              <span className="font-bold text-slate-800">
                {formatDate(booking.departureDate)} ➔ {formatDate(booking.returnDate)}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>TVA / Taxes de séjour</span>
              <span>Incluses (0 DZD)</span>
            </div>
            <div className="flex justify-between border-t border-slate-300 pt-2 text-base font-bold text-slate-900">
              <span>Montant Total Réglé</span>
              <span className="text-blue-600">{totalAmount.toLocaleString("fr-FR")} DZD</span>
            </div>
          </div>

          {/* BAS DE PAGE & QR CODE */}
          <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                <QRCode size={90} value={qrData} />
              </div>
              <div className="text-xs text-slate-500 space-y-1">
                <p className="font-bold text-slate-700">Scan de Contrôle</p>
                <p>Présentez ce document lors du check-in.</p>
                <p className="font-mono text-[10px] text-slate-400">Ref: {bookingRef}</p>
              </div>
            </div>

            <div className="text-right text-xs text-slate-400 space-y-1">
              <p className="font-bold text-slate-700">EasyRoad Travel Agency</p>
              <p>Support : contact@easyroad.com</p>
              <p>Merci pour votre confiance !</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
