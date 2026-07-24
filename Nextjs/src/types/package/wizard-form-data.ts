
import type { PackageFormData } from "./package-form-data";
import type { FlightFormData } from "./flight-form-data";
import type { HotelFormData } from "./hotel-form-data";
import type { TransportFormData } from "./transport-form-data";
import type { ExcursionFormData } from "./excursion-form-data";
import type { SupplementFormData } from "./supplement-form-data";

export interface WizardFormData {

    id_pack?: number;

    id_vol?: number;

    id_hot?: number;

    id_transp?: number;

    id_exc?: number;

    supplements: SupplementFormData;

    package: PackageFormData;

    flights: FlightFormData[];

    hotels: HotelFormData[];

    transports: TransportFormData[];

    excursions: ExcursionFormData[];

}
