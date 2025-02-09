export interface User {
  id?: string;
  name: string;
  role: 'admin' | 'player';
  viewMode?: 'player' | 'spectator';
  isAdmin?: boolean;
  isOwner?: boolean;
}
