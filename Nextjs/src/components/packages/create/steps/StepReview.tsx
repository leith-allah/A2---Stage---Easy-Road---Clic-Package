
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react"; // 👈 Import de l'icône de succès

import { usePackageWizard } from "@/context/usePackageWizard";
import { useWizardValidation } from "@/hooks/useWizardValidation";

import FormSection from "@/components/packages/create/ui/FormSection";

export default function StepReview() {
  const { data, previous, isEdit, packageId } = usePackageWizard();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // 👈 État pour le message de succès
  const router = useRouter();

  const { canSubmit, canLeaveCurrentStep } = useWizardValidation();

  const pack = data.package;

  const reviewFlights = data.flights.filter(
    (flight) =>
      flight.airline !== null ||
      flight.departureAirport !== null ||
      flight.arrivalAirport !== null ||
      flight.flightNumber.trim() !== "" ||
      flight.departureDateTime !== "" ||
      flight.arrivalDateTime !== ""
  );

  const reviewHotels = data.hotels.filter(
    (hotel) =>
      hotel.name.trim() !== "" ||
      hotel.country.trim() !== "" ||
      hotel.city.trim() !== "" ||
      hotel.address.trim() !== "" ||
      hotel.stars > 0
  );

  const reviewTransports = data.transports.filter(
    (transport) =>
      transport.route.trim() !== "" || transport.company.trim() !== ""
  );

  const reviewExcursions = data.excursions.filter(
    (excursion) =>
      excursion.name.trim() !== "" ||
      excursion.location.trim() !== "" ||
      excursion.description.trim() !== ""
  );

  const defaultFlightClass = (
    data.supplements?.defaultFlightClass ||
    data.package?.defaultFlightClass ||
    "ECONOMY"
  ).toUpperCase();

  const defaultRoomType = (
    data.supplements?.defaultRoomType ||
    data.package?.defaultRoomType ||
    "DOUBLE"
  ).toUpperCase();

  const defaultBoardType = (
    data.supplements?.defaultBoardType ||
    data.package?.defaultBoardType ||
    "BED_BREAKFAST"
  ).toUpperCase();

  const activeRoomSupplements = [
    { key: "SINGLE", label: "SINGLE", value: Number(data.supplements.SINGLE || 0) },
    { key: "DOUBLE", label: "DOUBLE", value: Number(data.supplements.DOUBLE || 0) },
    { key: "TRIPLE", label: "TRIPLE", value: Number(data.supplements.TRIPLE || 0) },
    { key: "QUADRUPLE", label: "QUADRUPLE", value: Number(data.supplements.QUADRUPLE || 0) },
    { key: "SUITE", label: "SUITE", value: Number(data.supplements.SUITE || 0) },
  ].filter((s) => s.key !== defaultRoomType && s.value > 0);

  const activeBoardSupplements = [
    { key: "BED_ONLY", label: "Bed Only", value: Number(data.supplements.BED_ONLY || 0) },
    { key: "BED_BREAKFAST", label: "Bed & Breakfast", value: Number(data.supplements.BED_BREAKFAST || 0) },
    { key: "HALF_BOARD", label: "Half Board", value: Number(data.supplements.HALF_BOARD || 0) },
    { key: "FULL_BOARD", label: "Full Board", value: Number(data.supplements.FULL_BOARD || 0) },
    { key: "ALL_INCLUSIVE", label: "All Inclusive", value: Number(data.supplements.ALL_INCLUSIVE || 0) },
  ].filter((s) => s.key !== defaultBoardType && s.value > 0);

  const packagePrice = Number(pack.basePrice ?? 0);

  const formatDate = (date?: string | null) =>
    date ? new Date(date).toLocaleDateString("fr-FR") : "-";

  const validatePackage = async () => {
    try {
      setLoading(true);

      const hasFlights = reviewFlights.length > 0;
      const hasHotels = reviewHotels.length > 0;

      const busSupp = hasFlights
        ? Math.max(
            Number(data.supplements.BUSINESS || 0),
            ...reviewFlights.map((f: any) => Number(f.supplement?.BUSINESS || 0))
          )
        : 0;

      const firstSupp = hasFlights
        ? Math.max(
            Number(data.supplements.FIRST || 0),
            ...reviewFlights.map((f: any) => Number(f.supplement?.FIRST || 0))
          )
        : 0;

      const dto = {
        package: {
          ...data.package,
          defaultFlightClass: hasFlights ? defaultFlightClass : "ECONOMY",
          defaultRoomType: hasHotels ? defaultRoomType : "DOUBLE",
          defaultBoardType: hasHotels ? defaultBoardType : "BED_BREAKFAST",
        },
        supplements: {
          ECONOMY: 0,
          BUSINESS: busSupp,
          FIRST: firstSupp,

          SINGLE: hasHotels ? Number(data.supplements.SINGLE || 0) : 0,
          DOUBLE: hasHotels ? Number(data.supplements.DOUBLE || 0) : 0,
          TRIPLE: hasHotels ? Number(data.supplements.TRIPLE || 0) : 0,
          QUADRUPLE: hasHotels ? Number(data.supplements.QUADRUPLE || 0) : 0,
          SUITE: hasHotels ? Number(data.supplements.SUITE || 0) : 0,

          BED_ONLY: 0,
          BED_BREAKFAST: hasHotels ? Number(data.supplements.BED_BREAKFAST || 0) : 0,
          HALF_BOARD: hasHotels ? Number(data.supplements.HALF_BOARD || 0) : 0,
          FULL_BOARD: hasHotels ? Number(data.supplements.FULL_BOARD || 0) : 0,
          ALL_INCLUSIVE: hasHotels ? Number(data.supplements.ALL_INCLUSIVE || 0) : 0,
        },
        flights: reviewFlights.map((flight) => ({
          flightNumber: flight.flightNumber,
          departureDateTime: flight.departureDateTime,
          arrivalDateTime: flight.arrivalDateTime,
          airlineId: flight.airline!.id,
          departureAirportId: flight.departureAirport!.id,
          arrivalAirportId: flight.arrivalAirport!.id,
        })),
        hotels: reviewHotels.map((hotel) => ({
          name: hotel.name,
          stars: hotel.stars,
          country: hotel.country,
          city: hotel.city,
          address: hotel.address,
        })),
        transports: reviewTransports.map((transport) => ({
          route: transport.route,
          company: transport.company,
        })),
        excursions: reviewExcursions.map((excursion) => ({
          name: excursion.name,
          location: excursion.location,
          description: excursion.description,
        })),
      };

      const url = isEdit && packageId ? `/api/packages/${packageId}` : `/api/packages`;
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de l'enregistrement");
      }

      const result = await response.json();
      
      // 🌟 Affichage de la modale personnalisée puis redirection automatique
      setSuccessMessage(
        isEdit
          ? "Le package a été mis à jour avec succès !"
          : "Le package a été créé avec succès !"
      );

      setTimeout(() => {
        router.push(`/dashboard/packages/${result.id || packageId}`);
      }, 1500);

    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Erreur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* 🌟 MODALE DE SUCCÈS ÉLÉGANTE */}
      {successMessage && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-4 shadow-2xl border border-slate-100">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 size={38} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">Parfait !</h3>
            <p className="text-slate-600 text-sm">{successMessage}</p>
            <div className="pt-2 flex items-center justify-center space-x-2 text-xs text-slate-400">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              <span>Redirection en cours...</span>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold">Vérification du Package</h2>

      {/* PACKAGE */}
      <FormSection title="Package">
        <p><b>Nom :</b> {pack.name}</p>
        <p><b>Pays :</b> {pack.country}</p>
        <p><b>Destination :</b> {pack.destination}</p>
        <p><b>Description :</b> {pack.description || "-"}</p>
        <p><b>Image :</b> {pack.image || "-"}</p>
        <p><b>Date aller :</b> {formatDate(pack.departureDate)}</p>
        <p><b>Date retour :</b> {formatDate(pack.returnDate)}</p>
        <p><b>Stock total :</b> {pack.totalStock} places</p>
      </FormSection>

      {/* VOLS */}
      <FormSection title={`Vols (${reviewFlights.length})`}>
        {reviewFlights.map((flight, index) => {
          const busSupp = Number(flight.supplement?.BUSINESS ?? data.supplements.BUSINESS ?? 0);
          const firstSupp = Number(flight.supplement?.FIRST ?? data.supplements.FIRST ?? 0);

          return (
            <div
              key={index}
              className="rounded-xl border border-slate-200 p-5 space-y-2"
            >
              <h4 className="font-bold text-lg">Vol #{index + 1}</h4>
              <p><b>Numéro :</b> {flight.flightNumber}</p>
              <p><b>Compagnie :</b> {flight.airline?.name ?? "-"}</p>
              <p><b>Départ :</b> {flight.departureAirport?.name ?? "-"}</p>
              <p><b>Arrivée :</b> {flight.arrivalAirport?.name ?? "-"}</p>
              <p>
                <b>Date départ :</b>{" "}
                {flight.departureDateTime
                  ? new Date(flight.departureDateTime).toLocaleString("fr-FR")
                  : "-"}
              </p>
              <p>
                <b>Date arrivée :</b>{" "}
                {flight.arrivalDateTime
                  ? new Date(flight.arrivalDateTime).toLocaleString("fr-FR")
                  : "-"}
              </p>

              <div className="mt-3 pt-3 border-t border-slate-100 text-sm space-y-1 bg-slate-50 p-3 rounded-lg">
                <p className="font-semibold text-slate-700">Classes & Options :</p>
                <p className="text-emerald-600 font-medium">✓ <b>{defaultFlightClass}</b> : Inclus</p>
                {busSupp > 0 && <p className="text-slate-600">✓ <b>Business</b> : +{busSupp.toLocaleString("fr-FR")} DZD</p>}
                {firstSupp > 0 && <p className="text-slate-600">✓ <b>First</b> : +{firstSupp.toLocaleString("fr-FR")} DZD</p>}
              </div>
            </div>
          );
        })}
      </FormSection>

      {/* HÔTELS */}
      <FormSection title={`Hôtels (${reviewHotels.length})`}>
        {reviewHotels.map((hotel, index) => (
          <div
            key={index}
            className="rounded-xl border border-slate-200 p-5 space-y-2"
          >
            <h4 className="font-bold text-lg">Hôtel #{index + 1}</h4>
            <p><b>Nom :</b> {hotel.name}</p>
            <p><b>Pays :</b> {hotel.country}</p>
            <p><b>Ville :</b> {hotel.city}</p>
            <p><b>Adresse :</b> {hotel.address}</p>
            <p><b>Étoiles :</b> {hotel.stars} ⭐</p>
          </div>
        ))}

        {reviewHotels.length > 0 && (
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 mt-4 space-y-3">
            <h5 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
              Options Chambres & Pensions
            </h5>
            
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Chambre :</p>
              <div className="flex flex-wrap gap-x-4 text-sm">
                <span className="text-emerald-600 font-medium">✓ <b>{defaultRoomType}</b> : Inclus</span>
                {activeRoomSupplements.map((s) => (
                  <span key={s.label}>✓ <b>{s.label}</b> : +{s.value.toLocaleString("fr-FR")} DZD</span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase mb-1 mt-2">Pension :</p>
              <div className="flex flex-wrap gap-x-4 text-sm">
                <span className="text-emerald-600 font-medium">✓ <b>{defaultBoardType}</b> : Inclus</span>
                {activeBoardSupplements.map((s) => (
                  <span key={s.label}>✓ <b>{s.label}</b> : +{s.value.toLocaleString("fr-FR")} DZD</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </FormSection>

      {/* TRANSPORTS */}
      <FormSection title={`Transports (${reviewTransports.length})`}>
        {reviewTransports.map((transport, index) => (
          <div
            key={index}
            className="rounded-xl border border-slate-200 p-5 space-y-2"
          >
            <h4 className="font-bold text-lg">Transport #{index + 1}</h4>
            <p><b>Trajet :</b> {transport.route}</p>
            <p><b>Société :</b> {transport.company || "-"}</p>
          </div>
        ))}
      </FormSection>

      {/* EXCURSIONS */}
      <FormSection title={`Excursions (${reviewExcursions.length})`}>
        {reviewExcursions.map((excursion, index) => (
          <div
            key={index}
            className="rounded-xl border border-slate-200 p-5 space-y-2"
          >
            <h4 className="font-bold text-lg">Excursion #{index + 1}</h4>
            <p><b>Nom :</b> {excursion.name}</p>
            <p><b>Lieu :</b> {excursion.location}</p>
            <p><b>Description :</b></p>
            <p className="text-slate-600">{excursion.description || "-"}</p>
          </div>
        ))}
      </FormSection>

      {/* PRIX DE BASE */}
      <FormSection title="Prix">
        <div className="flex items-center justify-between">
          <span className="font-medium text-lg">Prix de base du package</span>
          <span className="text-2xl font-bold text-primary">
            {packagePrice.toLocaleString("fr-FR")} DZD
          </span>
        </div>
        <p className="text-sm text-gray-500 italic mt-2">
          Les suppléments configurés ci-dessus seront appliqués uniquement lors de la réservation selon les choix du client.
        </p>
      </FormSection>

      {/* RÉSUMÉ */}
      <FormSection title="Résumé">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="space-y-1">
            <p>✈ Vols : {reviewFlights.length}</p>
            <p>🏨 Hôtels : {reviewHotels.length}</p>
            <p>🚍 Transports : {reviewTransports.length}</p>
            <p>🎟 Excursions : {reviewExcursions.length}</p>
          </div>

          <div className="text-center">
            <p><b>Nombre de Places :</b></p>
            <p className="text-3xl font-bold text-primary">
              {pack.totalStock.toLocaleString()} PAX
            </p>
          </div>

          <div className="text-right">
            <p><b>Prix de base :</b></p>
            <p className="text-3xl font-bold text-primary">
              {packagePrice.toLocaleString("fr-FR")} DZD
            </p>
          </div>
        </div>
      </FormSection>

      {/* NAVIGATION */}
      <div className="flex justify-between">
        <button
          className="btn"
          disabled={!canLeaveCurrentStep() || loading}
          onClick={previous}
        >
          Retour
        </button>

        <button
          className="btn btn-success"
          disabled={!canSubmit() || loading}
          onClick={validatePackage}
        >
          {loading
            ? isEdit
              ? "Modification..."
              : "Création..."
            : isEdit
            ? "Mettre à jour le Package"
            : "Valider le Package"}
        </button>
      </div>
    </div>
  );
}
