
export interface RechargeRequestDto {

  id: number;

  amount: number;

  status: string;

  comment?: string | null;

  createdAt: Date;

}
