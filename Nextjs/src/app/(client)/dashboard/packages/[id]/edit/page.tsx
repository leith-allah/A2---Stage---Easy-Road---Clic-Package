
"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react"; // 👈 Import de l'icône flèche
import { PackageWizardProvider } from "@/context/PackageWizardProvider";
import PackageCreationWizard from "@/components/packages/create/PackageCreationWizard";
import { WizardFormData } from "@/types/package/wizard-form-data";
import { FlightStatusValue } from "@/server/entities/value-objects/flight-status.value-object";

function formatDateTimeForInput(dateVal: any): string {
  if (!dateVal) return "";
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 16);
}

function formatDateForInput(dateVal: any): string {
  if (!dateVal) return "";
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0];
}

export default function EditPackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const packageId = Number(resolvedParams.id);
  const router = useRouter();

  const [wizardInitialData, setWizardInitialData] = useState<WizardFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPackage() {
      try {
        const response = await fetch(`/api/packages/${packageId}`);
        if (!response.ok) {
          throw new Error("Impossible de charger les données du package.");
        }
        const raw = await response.json();

        const mappedFlights = (raw.flights || raw.possede || []).map((item: any) => {
          const flight = item.vol || item;
          return {
            airline: flight.airline || flight.compagnie_aerienne || null,
            departureAirport:
              flight.departureAirport ||
              flight.aeroport_vol_id_aeroport_departToaeroport ||
              null,
            arrivalAirport:
              flight.arrivalAirport ||
              flight.aeroport_vol_id_aeroport_arriveeToaeroport ||
              null,
            status: flight.status || flight.statut_vol || FlightStatusValue.ACTIVE,
            departureDateTime: formatDateTimeForInput(flight.departureDateTime || flight.depart_vol),
            arrivalDateTime: formatDateTimeForInput(flight.arrivalDateTime || flight.arrivee_vol),
            flightNumber: flight.flightNumber || flight.num_vol || "",
            supplement: {
              defaultFlightClass: "ECONOMY",
              ECONOMY: 0,
              BUSINESS: 0,
              FIRST: 0,
            },
          };
        });

        const mappedHotels = (raw.hotels || raw.heberge || []).map((item: any) => {
          const hotel = item.hotel || item;
          return {
            name: hotel.name || hotel.nom_hot || "",
            stars: hotel.stars || hotel.nb_etoiles_hot || 0,
            country: hotel.country || hotel.pays_hot || "",
            city: hotel.city || hotel.ville_hot || "",
            address: hotel.address || hotel.adresse_hot || "",
          };
        });

        const mappedTransports = (raw.transports || raw.utilise || []).map((item: any) => {
          const transport = item.transport || item;
          return {
            route: transport.route || transport.trajet_transp || "",
            company: transport.company || transport.societe_transp || "",
          };
        });

        const mappedExcursions = (raw.excursions || raw.propose || []).map((item: any) => {
          const excursion = item.excursion || item;
          return {
            name: excursion.name || excursion.nom_exc || "",
            location: excursion.location || excursion.lieu_exc || "",
            description: excursion.description || excursion.description_exc || "",
          };
        });

        const mappedData: WizardFormData = {
          package: {
            name: raw.name ?? raw.nom_pack ?? "",
            country: raw.country ?? raw.pays_pack ?? "",
            destination: raw.destination ?? raw.destination_pack ?? "",
            departureDate: formatDateForInput(raw.departureDate || raw.date_depart_pack),
            returnDate: formatDateForInput(raw.returnDate || raw.date_retour_pack),
            description: raw.description ?? raw.description_pack ?? "",
            image: raw.image ?? raw.image_pack ?? "",
            totalStock: raw.totalStock ?? raw.stock_total_pack ?? raw.stockTotal ?? raw.total_stock ?? 0,
            basePrice: raw.basePrice ?? raw.prix_base_pack ?? 0,
          },
          supplements: {
            ECONOMY: raw.supplements?.ECONOMY ?? raw.supp_economy_pack ?? 0,
            BUSINESS: raw.supplements?.BUSINESS ?? raw.supp_business_pack ?? 0,
            FIRST: raw.supplements?.FIRST ?? raw.supp_first_pack ?? 0,
            SINGLE: raw.supplements?.SINGLE ?? raw.supp_single_pack ?? 0,
            DOUBLE: raw.supplements?.DOUBLE ?? raw.supp_double_pack ?? 0,
            TRIPLE: raw.supplements?.TRIPLE ?? raw.supp_triple_pack ?? 0,
            QUADRUPLE: raw.supplements?.QUADRUPLE ?? raw.supp_quadruple_pack ?? 0,
            SUITE: raw.supplements?.SUITE ?? raw.supp_suite_pack ?? 0,
            BED_ONLY: raw.supplements?.BED_ONLY ?? raw.supp_bed_only_pack ?? 0,
            BED_BREAKFAST: raw.supplements?.BED_BREAKFAST ?? raw.supp_bed_breakfast_pack ?? 0,
            HALF_BOARD: raw.supplements?.HALF_BOARD ?? raw.supp_half_board_pack ?? 0,
            FULL_BOARD: raw.supplements?.FULL_BOARD ?? raw.supp_full_board_pack ?? 0,
            ALL_INCLUSIVE: raw.supplements?.ALL_INCLUSIVE ?? raw.supp_all_inclusive_pack ?? 0,
            defaultFlightClass: (
              raw.defaultFlightClass ?? raw.default_flight_class_pack ?? "ECONOMY"
            ).toUpperCase() as any,
            defaultRoomType: (
              raw.defaultRoomType ?? raw.default_room_type_pack ?? "DOUBLE"
            ).toUpperCase() as any,
            defaultBoardType: (
              raw.defaultBoardType ?? raw.default_board_type_pack ?? "BED_BREAKFAST"
            ).toUpperCase() as any,
          },
          flights: mappedFlights.length > 0 ? mappedFlights : [
            {
              airline: null,
              departureAirport: null,
              arrivalAirport: null,
              status: FlightStatusValue.ACTIVE,
              departureDateTime: "",
              arrivalDateTime: "",
              flightNumber: "",
              supplement: {
                defaultFlightClass: "ECONOMY",
                ECONOMY: 0,
                BUSINESS: 0,
                FIRST: 0,
              },
            },
          ],
          hotels: mappedHotels.length > 0 ? mappedHotels : [
            {
              name: "",
              stars: 0,
              country: "",
              city: "",
              address: "",
            },
          ],
          transports: mappedTransports.length > 0 ? mappedTransports : [
            {
              route: "",
              company: "",
            },
          ],
          excursions: mappedExcursions.length > 0 ? mappedExcursions : [
            {
              name: "",
              location: "",
              description: "",
            },
          ],
        };

        setWizardInitialData(mappedData);
      } catch (err: any) {
        setError(err.message || "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    }

    if (packageId) {
      fetchPackage();
    }
  }, [packageId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500 font-medium">Chargement des données du package...</p>
      </div>
    );
  }

  if (error || !wizardInitialData) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="text-red-600 font-semibold">{error || "Package introuvable"}</p>
        <button
          onClick={() => router.push("/dashboard/packages")}
          className="px-4 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition"
        >
          Retour aux packages
        </button>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {/* ⬅️ BOUTON DE RETOUR / ABANDON */}
      <div>
        <button
          type="button"
          onClick={() => router.back()}
          className="
            inline-flex items-center gap-2
            px-4 py-2 rounded-xl
            text-slate-600 hover:text-slate-900
            bg-slate-100 hover:bg-slate-200
            font-medium text-sm
            transition cursor-pointer
            mb-4
          "
        >
          <ArrowLeft size={18} />
          <span>Abandonner et retourner</span>
        </button>

        <h1 className="text-3xl font-bold">Modifier le Package #{packageId}</h1>
        <p className="text-gray-500 mt-1">
          Mettez à jour les informations, vols, hébergements ou options du package.
        </p>
      </div>

      <PackageWizardProvider
        initialData={wizardInitialData}
        disablePersistence={true}
        packageId={packageId}
        isEdit={true}
      >
        <PackageCreationWizard />
      </PackageWizardProvider>
    </section>
  );
}
