
export interface AgencyOffice {

  id: number;

  agencyId: number;

  code: string;

  type: string;

  country: string;

  city: string;

  address: string;

  approvalNumber: string;

  rib?: string;

  iban?: string;

  createdAt: Date;

}
