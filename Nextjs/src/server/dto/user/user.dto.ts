
export interface UserDto {
  id: number;
  mle: string;
  nin: string;
  firstName: string; // 👈 Nom standard camelCase
  FIRSTName?: string; // 👈 Optionnel pour compatibilité ascendante
  lastName: string;
  birthDate: Date;
  nationality: string;
  status: string;
  email: string;
  createdAt: Date;
  role: string;
  roleId: number | null;
  bureauId: number | null;
}
