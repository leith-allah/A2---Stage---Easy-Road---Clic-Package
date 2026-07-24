
import { CityDto } from "../city/city.dto";

export interface AirportDto {

  id: number;

  name: string;

  iataCode: string;

  icaoCode: string;

  latitude: number;

  longitude: number;

  city: CityDto;

}
