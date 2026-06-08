
export interface NotificationDto {

  id: number;

  userId: number;

  status: string;

  amount: number;

  comment?: string | null;

  createdAt: string;

}
