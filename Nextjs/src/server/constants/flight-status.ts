
export const FLIGHT_STATUS = {

  ACTIVE: "ACTIVE",

  INACTIVE: "INACTIVE",

  ARCHIVED: "ARCHIVED",

} as const;

export type FlightStatus =
  (typeof FLIGHT_STATUS)[keyof typeof FLIGHT_STATUS];
  