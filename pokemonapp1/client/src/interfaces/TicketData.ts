// src/TicketData.ts
import { UserData } from './UserData';

export interface TicketData {
  id: number | null;
  name: string | null;
  description: string | null;
  status: string | null;
  assignedUserId: number | null;
  assignedUser: UserData | null;
  pokemonId: number | null;
  pokemonName: string | null;
  priority: 'Low' | 'Medium' | 'High' | null;
  reportedBy: UserData | null;
  createdAt: string | null;
  updatedAt: string | null;
}
