export interface Player {
  id: string;
  name: string;
  viewMode: 'player' | 'spectator';
  isAdmin: boolean;
  selectedCard?: string | null;
  avatarUrl?: string;
}

export interface GameState {
  id: string;
  name: string;
  players: Player[];
  revealed: boolean;
  sprint?: string;
  scoringSystem: string[];
}
