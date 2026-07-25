
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import { fetchPackageById } from "@/features/packages/services/package-detail.service";

import {
  FlightClass,
  RoomType,
  PensionType,
} from "@/features/purchases/types/purchase-options.types";

import { usePurchase } from "@/features/purchases/hooks/usePurchase";
import { PurchaseSuccessModal } from "@/features/bookings/components/PurchaseSuccessModal";

const FLIGHT_OPTIONS = [
  { key: "ECONOMY", label: "Economy" },
  { key: "BUSINESS", label: "Business" },
  { key: "FIRST", label: "First" },
];

const ROOM_OPTIONS = [
  { key: "SINGLE", label: "Single" },
  { key: "DOUBLE", label: "Double" },
  { key: "TRIPLE", label: "Triple" },
  { key: "QUADRUPLE", label: "Quadruple" },
  { key: "SUITE", label: "Suite" },
];

const BOARD_OPTIONS = [
  { key: "BED_ONLY", label: "Bed Only" },
  { key: "BED_BREAKFAST", label: "Bed & Breakfast" },
  { key: "HALF_BOARD", label: "Half Board" },
  { key: "FULL_BOARD", label: "Full Board" },
  { key: "ALL_INCLUSIVE", label: "All Inclusive" },
];

// Extrait la clé par défaut du package
const getDefaultKey = (pkgData: any, category: "flight" | "room" | "board"): string => {
  if (!pkgData) return "";
  let raw = "";
  if (category === "flight") {
    raw = pkgData.defaultFlightClass ?? pkgData.default_flight_class_pack ?? pkgData.defaultFlightClassPack ?? "ECONOMY";
  } else if (category === "room") {
    raw = pkgData.defaultRoomType ?? pkgData.default_room_type_pack ?? pkgData.defaultRoomTypePack ?? "DOUBLE";
  } else if (category === "board") {
    raw = pkgData.defaultBoardType ?? pkgData.default_board_type_pack ?? pkgData.defaultBoardTypePack ?? "BED_ONLY";
  }
  return String(raw).toUpperCase();
};

// Récupère le prix du supplément pour un vol ou pour le package global
const getSuppPrice = (pkgData: any, key: string, flightItem?: any): number => {
  if (!pkgData) return 0;
  const upperKey = key.toUpperCase();
  const lowerKey = key.toLowerCase();

  // Si le vol possède ses propres suppléments
  if (flightItem?.supplement && typeof flightItem.supplement === "object") {
    const val = flightItem.supplement[upperKey] ?? flightItem.supplement[lowerKey];
    if (val !== undefined && val !== null) return Number(val);
  }

  // Sinon recherche globale dans pkgData
  if (pkgData.supplements && typeof pkgData.supplements === "object") {
    const val = pkgData.supplements[upperKey] ?? pkgData.supplements[lowerKey];
    if (val !== undefined && val !== null) return Number(val);
  }

  const camelSuffix = key
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");

  const val =
    pkgData[upperKey] ??
    pkgData[lowerKey] ??
    pkgData[`supp${camelSuffix}`] ??
    pkgData[`supp_${lowerKey}_pack`] ??
    pkgData[`supp_${lowerKey}`];

  return Number(val ?? 0);
};

export default function PackageDetailsPage() {
  const { purchase, loading: purchaseLoading } = usePurchase();
  const params = useParams();

  const [pkg, setPkg] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [travellers, setTravellers] = useState(1);

  // 🌟 États pour la modale de succès
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [createdBookingId, setCreatedBookingId] = useState<number | string | null>(null);

  // Maintient la classe sélectionnée pour CHAQUE vol (index -> classe)
  const [flightClasses, setFlightClasses] = useState<Record<number, FlightClass>>({});
  // Maintient la chambre sélectionnée pour CHAQUE hôtel (index -> chambre)
  const [roomTypes, setRoomTypes] = useState<Record<number, RoomType>>({});
  // Maintient la pension sélectionnée pour CHAQUE hôtel (index -> pension)
  const [pensions, setPensions] = useState<Record<number, PensionType>>({});

  useEffect(() => {
    async function load() {
      if (!params.id) return;

      const data = await fetchPackageById(Number(params.id));
      setPkg(data);

      if (data) {
        // Initialisation des classes par vol
        if (Array.isArray(data.flights) && data.flights.length > 0) {
          const initFlights: Record<number, FlightClass> = {};
          data.flights.forEach((f: any, idx: number) => {
            const def = (f.defaultClass || f.defaultFlightClass || getDefaultKey(data, "flight")).toUpperCase();
            initFlights[idx] = def as FlightClass;
          });
          setFlightClasses(initFlights);
        }

        // Initialisation des chambres/pensions par hôtel
        if (Array.isArray(data.hotels) && data.hotels.length > 0) {
          const initRooms: Record<number, RoomType> = {};
          const initBoards: Record<number, PensionType> = {};
          data.hotels.forEach((h: any, idx: number) => {
            initRooms[idx] = (h.defaultRoomType || getDefaultKey(data, "room")).toUpperCase() as RoomType;
            initBoards[idx] = (h.defaultBoardType || getDefaultKey(data, "board")).toUpperCase() as PensionType;
          });
          setRoomTypes(initRooms);
          setPensions(initBoards);
        }
      }

      setLoading(false);
    }

    load();
  }, [params.id]);

  // Calcul dynamique du prix total selon chaque choix individuel
  const totalPrice = useMemo(() => {
    if (!pkg) return 0;

    let base = Number(pkg.basePrice ?? 0);

    // Suppléments vols
    if (Array.isArray(pkg.flights)) {
      pkg.flights.forEach((flight: any, idx: number) => {
        const defClass = (flight.defaultClass || flight.defaultFlightClass || getDefaultKey(pkg, "flight")).toUpperCase();
        const selected = flightClasses[idx] || defClass;
        if (selected.toUpperCase() !== defClass) {
          base += getSuppPrice(pkg, selected, flight);
        }
      });
    }

    // Suppléments hôtels
    if (Array.isArray(pkg.hotels)) {
      pkg.hotels.forEach((hotel: any, idx: number) => {
        const defRoom = (hotel.defaultRoomType || getDefaultKey(pkg, "room")).toUpperCase();
        const selectedRoom = roomTypes[idx] || defRoom;
        if (selectedRoom.toUpperCase() !== defRoom) {
          base += getSuppPrice(pkg, selectedRoom);
        }

        const defBoard = (hotel.defaultBoardType || getDefaultKey(pkg, "board")).toUpperCase();
        const selectedBoard = pensions[idx] || defBoard;
        if (selectedBoard.toUpperCase() !== defBoard) {
          base += getSuppPrice(pkg, selectedBoard);
        }
      });
    }

    return base * travellers;
  }, [pkg, travellers, flightClasses, roomTypes, pensions]);

  if (loading) return <p className="p-8">Chargement...</p>;
  if (!pkg) return <p className="p-8">Package introuvable</p>;

  async function handlePurchase() {
    try {
      const firstFlightClass = flightClasses[0] || getDefaultKey(pkg, "flight") || "ECONOMY";
      const firstRoomType = roomTypes[0] || getDefaultKey(pkg, "room") || "DOUBLE";
      const firstPension = pensions[0] || getDefaultKey(pkg, "board") || "BED_ONLY";

      const result = await purchase({
        packageId: pkg.id,
        nbVoyageurs: travellers,
        classeVol: firstFlightClass as FlightClass,
        typeChambre: firstRoomType as RoomType,
        pension: firstPension as PensionType,
      });

      // 🌟 Ouvre la modale avec l'ID de réservation
      setCreatedBookingId(result?.id ?? result?.id_achat_pack ?? pkg.id);
      setIsSuccessModalOpen(true);
    } catch (e: any) {
      alert(e.message);
    }
  }

  const availableSeats =
    pkg.availableSeats ??
    pkg.stock_dispo_pack ??
    pkg.stockDispo ??
    pkg.totalStock ??
    0;

  const hasFlights = Array.isArray(pkg.flights) && pkg.flights.length > 0;
  const hasHotels = Array.isArray(pkg.hotels) && pkg.hotels.length > 0;

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-10">
      <div>
        <h1 className="text-4xl font-bold">{pkg.name}</h1>
        <p className="text-gray-500 mt-2">
          {pkg.country} • {pkg.destination}
        </p>
      </div>

      {pkg.image && (
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full max-h-[500px] object-cover rounded-xl"
        />
      )}

      <div>
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <p className="leading-relaxed">{pkg.description || "Aucune description fournie."}</p>
      </div>

      <div className="space-y-4">
        <Info
          label="Date départ"
          value={new Date(pkg.departureDate).toLocaleDateString("fr-FR")}
        />
        <Info
          label="Date retour"
          value={new Date(pkg.returnDate).toLocaleDateString("fr-FR")}
        />
        <Info label="Places disponibles" value={String(availableSeats)} />
        <Info
          label="Prix de base"
          value={`${Number(pkg.basePrice ?? 0).toLocaleString("fr-FR")} DA`}
        />
      </div>

      {/* VOLS AVEC LEURS CLASSES ET SUPPLÉMENTS RESPECTIFS */}
      {hasFlights && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Vol(s)</h2>
          <div className="space-y-4">
            {pkg.flights.map((flight: any, index: number) => {
              const defClass = (flight.defaultClass || flight.defaultFlightClass || getDefaultKey(pkg, "flight")).toUpperCase();

              return (
                <div key={flight.id || index} className="border rounded-xl p-5 space-y-3 bg-white shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-slate-800">
                        Vol #{index + 1} - {flight.airline?.name || "Compagnie"}
                      </h3>
                      <p className="text-sm text-slate-600 mt-0.5">
                        {flight.departureAirport?.city?.name ? `${flight.departureAirport.city.name} - ` : ""}
                        {flight.departureAirport?.name}
                        {" → "}
                        {flight.arrivalAirport?.city?.name ? `${flight.arrivalAirport.city.name} - ` : ""}
                        {flight.arrivalAirport?.name}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 font-mono text-xs font-semibold rounded-full">
                      Vol : {flight.flightNumber}
                    </span>
                  </div>

                  <div className="text-sm text-slate-600 grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <p><b>Départ :</b> {new Date(flight.departureDateTime).toLocaleString("fr-FR")}</p>
                    <p><b>Arrivée :</b> {new Date(flight.arrivalDateTime).toLocaleString("fr-FR")}</p>
                  </div>

                  {/* Classes & Suppléments spécifiques à ce vol */}
                  <div className="mt-3 pt-3 border-t border-slate-100 text-sm space-y-1 bg-slate-50 p-3 rounded-lg">
                    <p className="font-semibold text-slate-700 mb-1">Classes & Options pour ce vol :</p>
                    <p className="text-emerald-600 font-medium">✓ <b>{defClass}</b> : Inclus</p>
                    {FLIGHT_OPTIONS.filter((opt) => opt.key.toUpperCase() !== defClass).map((opt) => {
                      const supp = getSuppPrice(pkg, opt.key, flight);
                      if (supp <= 0) return null;
                      return (
                        <p key={opt.key} className="text-slate-600">
                          ✓ <b>{opt.label}</b> : +{supp.toLocaleString("fr-FR")} DA
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* HÔTELS AVEC LEURS OPTIONS RESPECTIVES */}
      {hasHotels && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Hôtel(s)</h2>
          <div className="space-y-4">
            {pkg.hotels.map((hotel: any, index: number) => {
              const defRoom = (hotel.defaultRoomType || getDefaultKey(pkg, "room")).toUpperCase();
              const defBoard = (hotel.defaultBoardType || getDefaultKey(pkg, "board")).toUpperCase();

              return (
                <div key={hotel.id || index} className="border rounded-xl p-5 space-y-3 bg-white shadow-sm">
                  <h3 className="font-bold text-lg text-slate-800">
                    Hôtel #{index + 1} - {hotel.name} {"⭐".repeat(hotel.stars)}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {hotel.city}, {hotel.country} • {hotel.address || hotel.adress}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 text-sm space-y-2 bg-slate-50 p-3 rounded-lg">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase">Chambre :</p>
                      <div className="flex flex-wrap gap-x-4 text-sm mt-0.5">
                        <span className="text-emerald-600 font-medium">✓ <b>{defRoom}</b> : Inclus</span>
                        {ROOM_OPTIONS.filter((o) => o.key.toUpperCase() !== defRoom).map((o) => {
                          const supp = getSuppPrice(pkg, o.key);
                          if (supp <= 0) return null;
                          return (
                            <span key={o.key} className="text-slate-600">
                              ✓ <b>{o.label}</b> : +{supp.toLocaleString("fr-FR")} DA
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase mt-1">Pension :</p>
                      <div className="flex flex-wrap gap-x-4 text-sm mt-0.5">
                        <span className="text-emerald-600 font-medium">✓ <b>{defBoard}</b> : Inclus</span>
                        {BOARD_OPTIONS.filter((o) => o.key.toUpperCase() !== defBoard).map((o) => {
                          const supp = getSuppPrice(pkg, o.key);
                          if (supp <= 0) return null;
                          return (
                            <span key={o.key} className="text-slate-600">
                              ✓ <b>{o.label}</b> : +{supp.toLocaleString("fr-FR")} DA
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TRANSPORTS */}
      {pkg.transports?.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Transport(s)</h2>
          <div className="space-y-4">
            {pkg.transports.map((transport: any, index: number) => (
              <div key={transport.id || index} className="border rounded-lg p-4">
                <p className="font-semibold">{transport.company}</p>
                <p>{transport.route}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EXCURSIONS */}
      {((pkg.excursions && pkg.excursions.length > 0) || (pkg.package_excursions && pkg.package_excursions.length > 0)) && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Excursion(s)</h2>
          <div className="space-y-4">
            {(pkg.excursions || pkg.package_excursions).map((excursion: any, index: number) => {
              const name = excursion.name || excursion.nom_excursion || excursion.nom;
              const location = excursion.location || excursion.lieu_excursion || excursion.lieu;
              const desc = excursion.description || excursion.description_excursion;

              return (
                <div key={excursion.id || index} className="border rounded-lg p-4">
                  {name && <p className="font-semibold">{name}</p>}
                  {location && <p className="text-gray-600">{location}</p>}
                  {desc && <p className="mt-1">{desc}</p>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* FORMULAIRE DE RÉSERVATION AVEC CHOIX PAR VOL ET PAR HÔTEL */}
      <div className="border rounded-xl p-6 bg-white shadow-sm space-y-6">
        <h2 className="text-3xl font-bold text-slate-900">Réservation</h2>

        <div className="space-y-5">
          <div>
            <label className="block mb-2 font-medium text-slate-700">Voyageurs</label>
            <input
              type="number"
              min={1}
              max={availableSeats || 1}
              value={travellers}
              onChange={(e) => setTravellers(Number(e.target.value))}
              className="border rounded-lg p-2.5 w-full bg-slate-50 focus:bg-white transition"
            />
          </div>

          {/* SÉLECTEURS CLASSE PAR VOL */}
          {hasFlights &&
            pkg.flights.map((flight: any, index: number) => {
              const defClass = (flight.defaultClass || flight.defaultFlightClass || getDefaultKey(pkg, "flight")).toUpperCase();
              const availableOpts = FLIGHT_OPTIONS.filter((opt) => {
                const isDefault = opt.key.toUpperCase() === defClass;
                const supp = getSuppPrice(pkg, opt.key, flight);
                return isDefault || supp > 0;
              });

              if (availableOpts.length <= 1) return null;

              return (
                <div key={index}>
                  <label className="block mb-2 font-medium text-slate-700">
                    {pkg.flights.length > 1
                      ? `Classe Vol #${index + 1} (${flight.flightNumber})`
                      : "Classe Vol"}
                  </label>
                  <select
                    value={flightClasses[index] || defClass}
                    onChange={(e) =>
                      setFlightClasses((prev) => ({
                        ...prev,
                        [index]: e.target.value as FlightClass,
                      }))
                    }
                    className="border rounded-lg p-2.5 w-full bg-white shadow-sm"
                  >
                    {availableOpts.map((opt) => {
                      const isDefault = opt.key.toUpperCase() === defClass;
                      const price = getSuppPrice(pkg, opt.key, flight);
                      const priceText = isDefault ? "Inclus" : `+${price.toLocaleString("fr-FR")} DA`;
                      return (
                        <option key={opt.key} value={opt.key}>
                          {opt.label} ({priceText})
                        </option>
                      );
                    })}
                  </select>
                </div>
              );
            })}

          {/* SÉLECTEURS CHAMBRE ET PENSION PAR HÔTEL */}
          {hasHotels &&
            pkg.hotels.map((hotel: any, index: number) => {
              const defRoom = (hotel.defaultRoomType || getDefaultKey(pkg, "room")).toUpperCase();
              const availableRooms = ROOM_OPTIONS.filter((opt) => {
                const isDefault = opt.key.toUpperCase() === defRoom;
                const supp = getSuppPrice(pkg, opt.key);
                return isDefault || supp > 0;
              });

              const defBoard = (hotel.defaultBoardType || getDefaultKey(pkg, "board")).toUpperCase();
              const availableBoards = BOARD_OPTIONS.filter((opt) => {
                const isDefault = opt.key.toUpperCase() === defBoard;
                const supp = getSuppPrice(pkg, opt.key);
                return isDefault || supp > 0;
              });

              return (
                <div key={index} className="space-y-4">
                  {availableRooms.length > 1 && (
                    <div>
                      <label className="block mb-2 font-medium text-slate-700">
                        {pkg.hotels.length > 1
                          ? `Type de Chambre - Hôtel #${index + 1} (${hotel.name})`
                          : "Type de Chambre"}
                      </label>
                      <select
                        value={roomTypes[index] || defRoom}
                        onChange={(e) =>
                          setRoomTypes((prev) => ({
                            ...prev,
                            [index]: e.target.value as RoomType,
                          }))
                        }
                        className="border rounded-lg p-2.5 w-full bg-white shadow-sm"
                      >
                        {availableRooms.map((opt) => {
                          const isDefault = opt.key.toUpperCase() === defRoom;
                          const price = getSuppPrice(pkg, opt.key);
                          const priceText = isDefault ? "Inclus" : `+${price.toLocaleString("fr-FR")} DA`;
                          return (
                            <option key={opt.key} value={opt.key}>
                              {opt.label} ({priceText})
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  )}

                  {availableBoards.length > 1 && (
                    <div>
                      <label className="block mb-2 font-medium text-slate-700">
                        {pkg.hotels.length > 1
                          ? `Pension - Hôtel #${index + 1} (${hotel.name})`
                          : "Pension"}
                      </label>
                      <select
                        value={pensions[index] || defBoard}
                        onChange={(e) =>
                          setPensions((prev) => ({
                            ...prev,
                            [index]: e.target.value as PensionType,
                          }))
                        }
                        className="border rounded-lg p-2.5 w-full bg-white shadow-sm"
                      >
                        {availableBoards.map((opt) => {
                          const isDefault = opt.key.toUpperCase() === defBoard;
                          const price = getSuppPrice(pkg, opt.key);
                          const priceText = isDefault ? "Inclus" : `+${price.toLocaleString("fr-FR")} DA`;
                          return (
                            <option key={opt.key} value={opt.key}>
                              {opt.label} ({priceText})
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  )}
                </div>
              );
            })}

          <div className="text-3xl font-bold text-primary pt-2">
            Total : {totalPrice.toLocaleString("fr-FR")} DA
          </div>

          <button
            onClick={handlePurchase}
            disabled={purchaseLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            {purchaseLoading ? "Réservation..." : "Réserver"}
          </button>
        </div>
      </div>

      {/* 🌟 MODALE DE SUCCÈS D'ACHAT */}
      {createdBookingId && (
        <PurchaseSuccessModal
          isOpen={isSuccessModalOpen}
          bookingId={createdBookingId}
          onCloseAction={() => setIsSuccessModalOpen(false)}
        />
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b pb-3">
      <p className="text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
