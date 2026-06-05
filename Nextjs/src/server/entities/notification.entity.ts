
export interface Notification {

  id: number;

  userId: number;

  status: string;

  amount: number;

  comment?: string | null;

  createdAt: Date;

}
