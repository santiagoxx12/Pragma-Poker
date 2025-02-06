export interface User {
  id: string;
  name: string;
  viewMode: 'player' | 'spectator';
  isAdmin: boolean;
}
