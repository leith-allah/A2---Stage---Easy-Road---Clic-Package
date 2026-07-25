
import { Prisma } from "@prisma/client";

export type AchatWithRelations = Prisma.achat_packageGetPayload<{
  include: {
    package_voyage: {
      include: {
        possede: {
          include: {
            vol: {
              include: {
                compagnie_aerienne: true;
                aeroport_vol_id_aeroport_departToaeroport: true;
                aeroport_vol_id_aeroport_arriveeToaeroport: true;
              };
            };
          };
        };
        heberge: { include: { hotel: true } };
        utilise: { include: { transport: true } };
        propose: { include: { excursion: true } };
      };
    };
  };
}>;

type AchatPackageMapped = {
  id: number;
  bookingNumber: string;
  packageId: number;
  packageTitle: string;
  destination: string;
  image: string;
  travelers: number;
  total: number;
  departureDate: Date | string;
  returnDate: Date | string;
  status: string;
  createdAt: Date;
  flights: any[];
  hotels: any[];
  transports: any[];
  excursions: any[];
};


export const AchatPackageMapper = {
  fromPrisma(data: any): any {
    const pkg = data.package_voyage;
    const user = data.utilisateur;

    return {
      id: Number(data.id_achat_pack),
      bookingNumber: data.ref_achat_pack,
      packageId: Number(data.id_pack),

      // 👤 CLIENT
      clientName: user
        ? `${user.prenom_user || user.prenom || ""} ${user.nom_user || user.nom || ""}`.trim()
        : "",
      clientEmail: user?.email_user || user?.email || "",

      // 📦 PACKAGE
      packageTitle: pkg?.nom_pack || "",
      destination: pkg?.destination_pack || "",
      description: pkg?.description_pack || "",
      image: pkg?.image_pack || "",
      travelers: data.nb_voyageurs,
      
      // 🎯 OPTIONS : Priorité au choix de l'achat, sinon Valeur Par Défaut du Package en BDD
      flightClass:
        data.classe_vol_achat_pack ||
        pkg?.default_flight_class_pack ||
        pkg?.defaultFlightClass ||
        null,

      roomType:
        data.type_chambre_achat_pack ||
        pkg?.default_room_type_pack ||
        pkg?.defaultRoomType ||
        null,

      boardType:
        data.pension_achat_pack ||
        pkg?.default_board_type_pack ||
        pkg?.defaultBoardType ||
        null,

      // 💰 COMPTABILITÉ & STATUT
      total: Number(data.total_achat_pack),
      departureDate: pkg?.date_depart_pack || "",
      returnDate: pkg?.date_retour_pack || "",
      status: data.statut_achat_pack,
      createdAt: data.date_heure_achat_pack,

      // ✈️ 🏨 🚍 🎟️ PRESTATIONS DE LA BDD
      flights: (pkg?.possede || []).map((item: any) => ({
        flightNumber: item.vol?.num_vol || "",
        airline: item.vol?.compagnie_aerienne?.nom_compagnie || item.vol?.compagnie_aerienne?.nom || "",
        departureAirport: item.vol?.aeroport_vol_id_aeroport_departToaeroport?.nom_aeroport || "",
        arrivalAirport: item.vol?.aeroport_vol_id_aeroport_arriveeToaeroport?.nom_aeroport || "",
        departureDateTime: item.vol?.depart_vol || "",
        arrivalDateTime: item.vol?.arrivee_vol || "",
      })),

      hotels: (pkg?.heberge || []).map((item: any) => ({
        name: item.hotel?.nom_hot || "",
        stars: item.hotel?.nb_etoiles_hot || 0,
        city: item.hotel?.ville_hot || "",
        country: item.hotel?.pays_hot || "",
        address: item.hotel?.adresse_hot || "",
      })),

      transports: (pkg?.utilise || []).map((item: any) => ({
        route: item.transport?.trajet_transp || "",
        company: item.transport?.societe_transp || "",
      })),

      excursions: (pkg?.propose || []).map((item: any) => ({
        name: item.excursion?.nom_exc || "",
        location: item.excursion?.lieu_exc || "",
        description: item.excursion?.description_exc || "",
      })),
    };
  },

  toDto(data: any): any {
    return data;
  },
};
