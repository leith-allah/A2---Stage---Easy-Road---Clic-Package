
export interface RechargeRequest {

  id: number;

  userId: number;

  amount: number;

  status: string;

  comment?: string | null;

  createdAt: Date;

}
