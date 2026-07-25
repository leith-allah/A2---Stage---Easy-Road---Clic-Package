
import type { City } from "./city";

export interface Airport {

    id: number;

    name: string;

    iataCode: string;

    icaoCode: string;

    latitude: number;

    longitude: number;

    city: City;

}
