
"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import QRCode from "react-qr-code";
import InvoicePDF from "@/features/bookings/components/InvoicePDF";
import BookingStatusBadge from "@/features/bookings/components/BookingStatusBadge";
import { useEffect, useState } from "react";

import {
  Plane,
  Hotel,
  MapPin,
  Calendar,
  Users,
  CreditCard,
  ArrowLeft,
  Compass,
  Bus,
} from "lucide-react";

import {
  getBookingById,
  cancelBooking,
} from "@/features/bookings/services/booking.service";

export default function BookingDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  // Helper pour formater Heure + Date
  const formatDateTime = (dateVal?: string) => {
    if (!dateVal) return "-";
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return dateVal;
    return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    async function loadBooking() {
      try {
        const data = await getBookingById(Number(params.id));
        setBooking(data);
      } catch (error) {
        console.error("Erreur lors du chargement de la réservation :", error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      loadBooking();
    }
  }, [params.id]);

  const handleCancelBooking = async () => {
    if (!booking) return;

    const confirmed = confirm(
      "Êtes-vous sûr de vouloir annuler cette réservation ?"
    );

    if (!confirmed) return;

    try {
      setCancelling(true);
      await cancelBooking(Number(booking.id));

      setBooking((prev: any) => ({
        ...prev,
        status: "ANNULE",
      }));

      alert("Votre réservation a été annulée avec succès.");
    } catch (err: any) {
      alert(err.message || "Impossible d'annuler la réservation.");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-slate-100 p-10 flex justify-center items-center">
        <p className="text-xl font-medium text-slate-500">
          Chargement de la réservation...
        </p>
      </section>
    );
  }

  if (!booking) {
    return (
      <section className="min-h-screen bg-slate-100 p-10 text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-800">
          Réservation introuvable
        </h1>
        <Link
          href="/dashboard/bookings"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Retour à mes réservations
        </Link>
      </section>
    );
  }

  const isCancelled =
    booking.status === "ANNULE" || booking.status === "REMBOURSE";

  const formatDate = (dateVal?: string) => {
    if (!dateVal) return "-";
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return dateVal;
    return d.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const bookingRef =
    booking.bookingNumber || booking.mle_ach || String(booking.id);

  // QR Code propre en ASCII (évite les caractères chinois sur téléphone)
  const qrData = [
    "EASYROAD E-TICKET",
    `Ref: ${bookingRef}`,
    `Package: ${booking.packageTitle || booking.package?.nom_pack || "Package"}`,
    `Depart: ${formatDate(booking.departureDate)}`,
    `Statut: CONFIRME`
  ].join("\n");

  // 🔍 EXTRACTION UNIVERSELLE DES DONNÉES DU PACKAGE (Domaine ou Prisma brut)
  const pkg = booking.package || booking;

  // 1. VOLS
  const rawFlights = pkg.flights || pkg.possede || booking.flights || booking.possede || [];
  const flightsList = rawFlights.map((item: any) => {
    const v = item.vol || item;
    return {
      flightNumber: v.flightNumber || v.num_vol || "-",
      airline:
        typeof v.airline === "string" && v.airline.trim() !== ""
          ? v.airline
          : v.airline?.name ||
            v.compagnie_aerienne?.nom_compagnie ||
            v.compagnie_aerienne?.nom_compagnie_aerienne ||
            v.compagnie_aerienne?.nom ||
            v.compagnie ||
            "-",
      departureAirport:
        v.departureAirport?.name ||
        v.aeroport_vol_id_aeroport_departToaeroport?.nom_aeroport ||
        v.departureAirport ||
        "-",
      arrivalAirport:
        v.arrivalAirport?.name ||
        v.aeroport_vol_id_aeroport_arriveeToaeroport?.nom_aeroport ||
        v.arrivalAirport ||
        "-",
      departureDateTime: v.departureDateTime || v.depart_vol || "",
      arrivalDateTime: v.arrivalDateTime || v.arrivee_vol || "",
    };
  });

  // 2. HÔTELS
  const rawHotels = pkg.hotels || pkg.heberge || booking.hotels || booking.heberge || [];
  const hotelsList = rawHotels.map((item: any) => {
    const h = item.hotel || item;
    return {
      name: h.name || h.nom_hot || "Hôtel",
      stars: h.stars || h.nb_etoiles_hot || 0,
      city: h.city || h.ville_hot || "",
      country: h.country || h.pays_hot || "",
      address: h.address || h.adresse_hot || "",
    };
  });

  // 3. TRANSPORTS
  const rawTransports = pkg.transports || pkg.utilise || booking.transports || booking.utilise || [];
  const transportsList = rawTransports.map((item: any) => {
    const t = item.transport || item;
    return {
      route: t.route || t.trajet_transp || "-",
      company: t.company || t.societe_transp || "",
    };
  });

  // 4. EXCURSIONS
  const rawExcursions = pkg.excursions || pkg.propose || booking.excursions || booking.propose || [];
  const excursionsList = rawExcursions.map((item: any) => {
    const e = item.excursion || item;
    return {
      name: e.name || e.nom_exc || "-",
      location: e.location || e.lieu_exc || "",
      description: e.description || e.description_exc || "",
    };
  });

  const hasPackageDetails =
    flightsList.length > 0 ||
    hotelsList.length > 0 ||
    transportsList.length > 0 ||
    excursionsList.length > 0;

  return (
    <section className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* BOUTON RETOUR */}
        <div>
          <Link
            href="/dashboard/bookings"
            className="
              inline-flex items-center gap-2
              px-4 py-2 rounded-xl
              text-slate-600 hover:text-slate-900
              bg-white hover:bg-slate-200
              font-medium text-sm
              transition shadow-sm
            "
          >
            <ArrowLeft size={18} />
            <span>Mes réservations</span>
          </Link>
        </div>

        {/* HEADER TOP */}
        <div className="flex flex-col xl:flex-row justify-between gap-6">
          <div>
            <div className="flex gap-4 items-center flex-wrap">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
                {booking.packageTitle || pkg.nom_pack || pkg.name || "Réservation Voyage"}
              </h1>

              <BookingStatusBadge status={booking.status} />
            </div>

            <p className="text-slate-600 mt-3 text-lg font-medium">
              📍 {booking.destination || pkg.destination_pack || pkg.destination || "-"}
            </p>

            <p className="text-slate-500 mt-1 font-mono text-sm">
              🎫 N° Réservation : <span className="font-bold">{bookingRef}</span>
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-4 flex-wrap">
            {!isCancelled && (
              <button
                type="button"
                onClick={handleCancelBooking}
                disabled={cancelling}
                className="
                  bg-red-100
                  text-red-600
                  hover:bg-red-200
                  disabled:opacity-50
                  transition
                  px-6
                  py-3
                  rounded-full
                  font-semibold
                  cursor-pointer
                "
              >
                {cancelling ? "Annulation..." : "Annuler"}
              </button>
            )}

            <InvoicePDF booking={booking} />
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid xl:grid-cols-[1fr_350px] gap-8 items-start">
          {/* LEFT COLUMN */}
          <div className="space-y-8">
            {/* IMAGE */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100">
              <img
                src={
                  booking.image?.trim()
                    ? booking.image
                    : pkg.image_pack?.trim()
                    ? pkg.image_pack
                    : pkg.image?.trim()
                    ? pkg.image
                    : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                }
                alt="Voyage"
                className="w-full h-[400px] object-cover"
              />
            </div>

            {/* DESCRIPTION DU PACKAGE */}
            {booking.description && (
              <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100">
                <h3 className="font-bold text-slate-800 text-lg mb-2">Description du Séjour</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{booking.description}</p>
              </div>
            )}

            {/* OPTIONS SÉLECTIONNÉES PAR LE CLIENT À L'ACHAT */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-slate-100 space-y-4">
              <h2 className="text-2xl font-bold text-slate-800 border-b pb-3">
                Formule & Options Choisies
              </h2>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100">
                  <span className="text-xs text-blue-600 font-bold uppercase tracking-wider block mb-1">
                    ✈️ Classe Vol
                  </span>
                  <strong className="text-slate-800 text-base">
                    {booking.flightClass || "-"}
                  </strong>
                </div>

                <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100">
                  <span className="text-xs text-blue-600 font-bold uppercase tracking-wider block mb-1">
                    🏨 Hébergement
                  </span>
                  <strong className="text-slate-800 text-base">
                    {booking.roomType || "-"}
                  </strong>
                </div>

                <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100">
                  <span className="text-xs text-blue-600 font-bold uppercase tracking-wider block mb-1">
                    🍽️ Pension
                  </span>
                  <strong className="text-slate-800 text-base">
                    {booking.boardType || "-"}
                  </strong>
                </div>
              </div>
            </div>

            {/* INFORMATIONS GLOBALES VOYAGE */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-slate-100 space-y-6">
              <h2 className="text-2xl font-bold text-slate-800 border-b pb-4">
                Informations Clés
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <Calendar className="mb-3 text-blue-600" size={24} />
                  <p className="text-slate-500 text-xs uppercase font-medium">Départ</p>
                  <h3 className="font-bold text-slate-800 mt-1">
                    {formatDate(booking.departureDate || pkg.date_depart_pack || pkg.departureDate)}
                  </h3>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <Calendar className="mb-3 text-blue-600" size={24} />
                  <p className="text-slate-500 text-xs uppercase font-medium">Retour</p>
                  <h3 className="font-bold text-slate-800 mt-1">
                    {formatDate(booking.returnDate || pkg.date_retour_pack || pkg.returnDate)}
                  </h3>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <Users className="mb-3 text-blue-600" size={24} />
                  <p className="text-slate-500 text-xs uppercase font-medium">Voyageurs</p>
                  <h3 className="font-bold text-slate-800 mt-1">
                    {booking.travelers || booking.nb_voyageurs || 1} PAX
                  </h3>
                </div>
              </div>
            </div>

            {/* DÉTAILS DU PACKAGE (VOLS, HÔTELS, TRANSPORTS, EXCURSIONS) */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-slate-100 space-y-8">
              <h2 className="text-2xl font-bold text-slate-800 border-b pb-4">
                Contenu du Package
              </h2>

              {!hasPackageDetails && (
                <p className="text-slate-500 text-sm italic">
                  Les prestations de ce package sont incluses directement selon la formule de votre réservation.
                </p>
              )}

              {/* VOLS */}
              {flightsList.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                    <Plane className="text-blue-600" size={20} /> Vols Inclus ({flightsList.length})
                  </h3>
                  <div className="grid gap-4">
                    {flightsList.map((flight: any, idx: number) => (
                      <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2 text-sm">
                        <div className="flex justify-between font-bold text-slate-800">
                          <span>Vol #{idx + 1} - N° {flight.flightNumber}</span>
                          <span className="text-blue-600">{flight.airline}</span>
                        </div>
                          <p className="text-slate-600">
                            <strong>Départ :</strong> {flight.departureAirport} {flight.departureDateTime && `(${formatDateTime(flight.departureDateTime)})`}
                          </p>
                          <p className="text-slate-600">
                            <strong>Arrivée :</strong> {flight.arrivalAirport} {flight.arrivalDateTime && `(${formatDateTime(flight.arrivalDateTime)})`}
                          </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* HÔTELS */}
              {hotelsList.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                    <Hotel className="text-blue-600" size={20} /> Hébergements ({hotelsList.length})
                  </h3>
                  <div className="grid gap-4">
                    {hotelsList.map((hotel: any, idx: number) => (
                      <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-1 text-sm">
                        <h4 className="font-bold text-slate-800 text-base">
                          {hotel.name} {hotel.stars > 0 ? `(${hotel.stars} ⭐)` : ""}
                        </h4>
                        <p className="text-slate-600">
                          📍 {[hotel.city, hotel.country, hotel.address].filter(Boolean).join(", ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TRANSPORTS */}
              {transportsList.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                    <Bus className="text-blue-600" size={20} /> Transports ({transportsList.length})
                  </h3>
                  <div className="grid gap-3">
                    {transportsList.map((t: any, idx: number) => (
                      <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-sm">
                        <strong className="text-slate-800">{t.route}</strong>
                        {t.company && <span className="text-slate-500"> — {t.company}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* EXCURSIONS */}
              {excursionsList.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                    <Compass className="text-blue-600" size={20} /> Excursions ({excursionsList.length})
                  </h3>
                  <div className="grid gap-3">
                    {excursionsList.map((exc: any, idx: number) => (
                      <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-sm space-y-1">
                        <p className="font-bold text-slate-800">
                          {exc.name} {exc.location && `(📍 ${exc.location})`}
                        </p>
                        {exc.description && <p className="text-slate-600 text-xs">{exc.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* PAIEMENT */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-slate-100">
              <div className="flex items-center gap-4 mb-6">
                <CreditCard className="text-blue-600" size={28} />
                <h2 className="text-2xl font-bold text-slate-800">Paiement</h2>
              </div>

              <div className="flex justify-between items-center flex-wrap gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div>
                  <p className="text-slate-500 text-sm font-medium">Montant Total Réglé</p>
                  <h3 className="text-4xl font-extrabold text-blue-600 mt-1">
                    {Number(booking.total ?? booking.montant_total ?? 0).toLocaleString("fr-FR")}{" "}
                    DZD
                  </h3>
                </div>

                <div
                  className={`px-5 py-2.5 rounded-full font-bold text-sm tracking-wide ${
                    isCancelled
                      ? "bg-red-100 text-red-700 border border-red-200"
                      : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                  }`}
                >
                  {isCancelled ? "ANNULÉ" : "RÉGLÉ & PAYÉ"}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-8">
            {/* QR TICKET DYNAMIQUE ET ENRICHI */}
            <div className="bg-white rounded-3xl shadow-lg p-8 text-center border border-slate-100">
              <h2 className="text-2xl font-bold mb-6 text-slate-800">
                E-Ticket QR Code
              </h2>

              <div className="bg-white p-4 rounded-2xl inline-block border border-slate-200 shadow-inner">
                <QRCode value={qrData} size={190} />
              </div>

              <p className="text-slate-500 text-xs mt-4">
                Scannez ce QR Code pour vérifier la validité de la réservation lors de l'embarquement.
              </p>
            </div>

            {/* HISTORIQUE / TIMELINE PERSONNALISÉ */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-slate-100">
              <h2 className="text-2xl font-bold mb-6 text-slate-800">
                Historique
              </h2>

              <div className="space-y-6 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
                {/* 🔵 ITEM 1 : Réservation confirmée */}
                <div className="flex gap-4 items-start relative z-10">
                  <div className="w-4 h-4 rounded-full bg-blue-600 ring-4 ring-white mt-1 shrink-0 shadow-sm" />
                  <div>
                    <h3 className="font-bold text-blue-600 text-sm">
                      Réservation confirmée
                    </h3>
                    <p className="text-slate-500 text-xs font-medium">
                      {formatDate(booking.createdAt || booking.date_achat)}
                    </p>
                  </div>
                </div>

                {/* 🟢 ITEM 2 : Paiement validé */}
                <div className="flex gap-4 items-start relative z-10">
                  <div
                    className={`w-4 h-4 rounded-full ring-4 ring-white mt-1 shrink-0 shadow-sm ${
                      isCancelled ? "bg-red-500" : "bg-emerald-600"
                    }`}
                  />
                  <div>
                    <h3
                      className={`font-bold text-sm ${
                        isCancelled ? "text-red-600" : "text-emerald-600"
                      }`}
                    >
                      {isCancelled ? "Réservation Annulée" : "Paiement validé"}
                    </h3>
                    <p className="text-slate-500 text-xs font-medium">
                      {formatDate(booking.createdAt || booking.date_achat)}
                    </p>
                  </div>
                </div>

                {/* 🩵 ITEM 3 : E-Ticket généré */}
                {!isCancelled && (
                  <div className="flex gap-4 items-start relative z-10">
                    <div className="w-4 h-4 rounded-full bg-sky-400 ring-4 ring-white mt-1 shrink-0 shadow-sm" />
                    <div>
                      <h3 className="font-bold text-sky-500 text-sm">
                        E-Ticket généré
                      </h3>
                      <p className="text-slate-500 text-xs font-medium">
                        Prêt pour le départ
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* BOUTON RETOUR BAS */}
            <Link
              href="/dashboard/bookings"
              className="
                block
                bg-slate-200
                hover:bg-slate-300
                transition
                text-center
                py-4
                rounded-full
                font-semibold
                text-slate-700
              "
            >
              Retour aux réservations
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
